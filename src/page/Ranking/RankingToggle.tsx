

type Mode = '전체' | '친구';

interface RankingToggleProps {
  selected: Mode;
  onToggle: (mode: Mode) => void;
}

const RankingToggle: React.FC<RankingToggleProps> = ({ selected, onToggle }) => {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <button
        className={`px-4 py-2 border rounded-md ${
          selected === '전체' ? 'bg-green-500 text-white font-bold' : 'bg-white'
        }`}
        onClick={() => onToggle('전체')}
      >
        전체 랭킹
      </button>
      <button
        className={`px-4 py-2 border rounded-md ${
          selected === '친구' ? 'bg-green-500 text-white font-bold' : 'bg-white'
        }`}
        onClick={() => onToggle('친구')}
      >
        친구 랭킹
      </button>
    </div>
  );
};

export default RankingToggle;
