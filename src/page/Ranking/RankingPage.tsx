import React, { useEffect, useState } from "react";
import RankingToggle from "./RankingToggle";
import RankingTable from "./RankingTable";
import type { TableRow } from "./RankingTable"; // ⚠️ type-only import
import { fetchRankingData } from "../../react-query/reactQuery";

const RANKING_BASE = "/api/v1/ranking";
const RANK_TYPE = "TOTAL";

// 백엔드 /me 응답(가변 필드 고려한 안전 타입)
type BackMe = {
  userid?: string;
  userId?: string;
  level?: number;
  success_count?: number;
  successCount?: number;
  points?: number;
  score?: number;
  rankPosition?: number;
};

// 페이지 상단 “내 랭킹 카드” 표시용 타입
type MyRank = {
  username: string;
  level: number;
  clearCount: number;
  points: number;
  rankPosition?: number;
};

const RankingPage: React.FC = () => {
  const [mode, setMode] = useState<"전체" | "친구">("전체");

  // 상단 카드(내 정보)
  const [myRank, setMyRank] = useState<MyRank | null>(null);
  const [myError, setMyError] = useState("");

  // 하단 테이블(전체 랭킹)
  const [rows, setRows] = useState<TableRow[]>([]);
  const [topError, setTopError] = useState("");

  // 1) 내 랭킹 불러오기 (/me) — 보통 인증 필요(axiosInstance가 토큰 자동 주입)
  useEffect(() => {
    (async () => {
      try {
        const raw = await fetchRankingData(
          `${RANKING_BASE}/me?type=${RANK_TYPE}`
        );
        // 백엔드가 공용 Response<T> 래핑일 수도 있고 아닐 수도 있어 방어적으로 추출
        const payload: BackMe =
          (raw?.data as BackMe) ?? (raw as BackMe) ?? ({} as BackMe);

        const username = String(payload.userid ?? payload.userId ?? "");
        const level = Number(payload.level ?? 0);
        const clearCount = Number(
          payload.success_count ?? payload.successCount ?? 0
        );
        const points = Number(payload.points ?? payload.score ?? 0);
        const rankPosition = payload.rankPosition
          ? Number(payload.rankPosition)
          : undefined;

        setMyRank({ username, level, clearCount, points, rankPosition });
        setMyError("");
      } catch (e) {
        console.error("[/me] error", e);
        setMyRank(null);
        setMyError("내 랭킹 정보를 불러오지 못했습니다.");
      }
    })();
  }, []);

  // 2) 전체 랭킹 불러오기 (/topRanks)
  useEffect(() => {
    (async () => {
      try {
        const raw = await fetchRankingData(
          `${RANKING_BASE}/topRanks?type=${RANK_TYPE}`
        );
        const list: any[] =
          raw?.rankingList ?? raw?.data?.rankingList ?? ([] as any[]);

        // DB success_count → clearCount, points 없으면 score 사용
        const normalized: TableRow[] = list.map((r: any) => ({
          username: String(r?.userid ?? r?.userId ?? ""),
          level: Number(r?.level ?? 0),
          clearCount: Number(r?.success_count ?? r?.successCount ?? 0),
          points: Number(r?.points ?? r?.score ?? 0),
        }));

        setRows(normalized);
        setTopError("");
      } catch (e) {
        console.error("[/topRanks] error", e);
        setRows([]);
        setTopError("전체 랭킹을 불러오지 못했습니다.");
      }
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      {/* 상단: 내 랭킹 카드 */}
      <section className="mb-4">
        {myRank ? (
          <div className="bg-green-100 border border-green-200 p-4 rounded-md">
            <div className="font-semibold mb-1">
              {myRank.username} 님 환영합니다.
            </div>
            <div className="text-sm text-gray-700">
              LV.{myRank.level} · 챌린지 클리어 횟수: {myRank.clearCount}회 · 보유 포인트:{" "}
              {myRank.points.toLocaleString()} pt
              {typeof myRank.rankPosition === "number" ? (
                <> · 전체 랭킹: {myRank.rankPosition}위</>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 p-4 rounded-md text-sm text-gray-700">
            {myError || "내 랭킹 정보를 불러오는 중입니다..."}
          </div>
        )}
      </section>

      {/* 중간: 모드 토글 */}
      <header className="mb-2">
        <h2 className="text-xl font-bold text-gray-700">
          {mode === "전체" ? "전체 랭킹" : "친구 랭킹"}
        </h2>
      </header>
      <RankingToggle selected={mode} onToggle={setMode} />

      {/* 하단: 랭킹 테이블 */}
      <section className="mt-4">
        {mode === "전체" ? (
          topError ? (
            <div className="text-red-600">{topError}</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              표시할 랭킹이 없습니다.
            </div>
          ) : (
            <RankingTable data={rows} />
          )
        ) : (
          <div className="p-8 text-center text-gray-500">
            친구 랭킹은 준비 중입니다.
          </div>
        )}
      </section>
    </main>
  );
};

export default RankingPage;
