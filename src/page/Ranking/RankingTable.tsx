import React from "react";

export type TableRow = {
  username: string;     // userid 매핑
  level: number;
  clearCount: number;   // DB success_count 매핑
  points: number;
};

interface RankingTableProps {
  data: TableRow[];
}

const RankingTable: React.FC<RankingTableProps> = ({ data }) => (
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full bg-white">
      <thead className="bg-green-100">
        <tr>
          <th className="px-6 py-3 text-left">순위</th>
          <th className="px-6 py-3 text-left">유저이름</th>
          <th className="px-6 py-3 text-left">레벨</th>
          <th className="px-6 py-3 text-left">챌린지 클리어 횟수</th>
          <th className="px-6 py-3 text-left">포인트</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.username + idx} className="border-b">
            <td className="px-6 py-4">{idx + 1}</td>
            <td className="px-6 py-4">{row.username}</td>
            <td className="px-6 py-4">{row.level}</td>
            <td className="px-6 py-4">{row.clearCount}</td>
            <td className="px-6 py-4">{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RankingTable;
