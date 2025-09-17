interface UserProfileCardProps {
  profileImage?: string;
  nickname: string;
  level: number;
  clearCount: number;
  points: number;
  totalRank: number;
  friendRank: number;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  profileImage,
  nickname,
  level,
  clearCount,
  points,
  totalRank,
  friendRank,
}) => {
  return (
    <div className="bg-green-100 rounded-md p-4 flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <img
          src={profileImage || 'https://placehold.co/60'}
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <div className="text-sm">
          <p className="font-semibold">{nickname} 님 환영합니다.</p>
          <p>Lv.{level} 챌린지 클리어 횟수: {clearCount}회</p>
          <p>보유 포인트: {points.toLocaleString()} pt</p>
        </div>
      </div>
      <div className="text-sm text-right">
        <p>전체 랭킹</p>
        <p className="font-bold text-lg">{totalRank.toLocaleString()}위</p>
        <p>친구 랭킹</p>
        <p className="font-bold text-lg">{friendRank}위</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
