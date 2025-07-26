interface RankingUser {
  nickname: string;
  level: number;
  clearCount: number;
  points: number;
  profileImage?: string;
}

interface RankingTableProps {
  data: RankingUser[];
}

const RankingTable: React.FC<RankingTableProps> = ({ data }) => {
  const getMedalClass = (rank: number) => {
    switch (rank) {
      case 0:
        return 'border-yellow-400';
      case 1:
        return 'border-gray-400';
      case 2:
        return 'border-orange-500';
      default:
        return 'border-transparent';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-base text-left border border-gray-300">
  <thead className="bg-green-100 text-gray-800 text-lg">
    <tr>
      <th className="px-6 py-4">순위</th>
      <th className="px-6 py-4">닉네임</th>
      <th className="px-6 py-4">레벨</th>
      <th className="px-6 py-4">챌린지 클리어 횟수</th>
      <th className="px-6 py-4">포인트</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user, index) => (
      <tr key={index} className="border-t border-gray-200">
        <td className="px-6 py-4 font-bold text-lg">{index + 1}</td>
        <td className="px-6 py-4 flex items-center gap-4">
          <img
            src={user.profileImage || 'https://via.placeholder.com/60'}
            alt="profile"
            className={`w-16 h-16 rounded-full border-2 ${getMedalClass(index)}`}
          />
          <span className="text-base w-[100px] truncate whitespace-nowrap overflow-hidden">{user.nickname}</span>
        </td>
        <td className="px-6 py-4 text-lg">Lv.{user.level}</td>
        <td className="px-6 py-4 text-lg">{user.clearCount.toLocaleString()} 회</td>
        <td className="px-6 py-4 text-lg">{user.points.toLocaleString()} pt</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default RankingTable;
