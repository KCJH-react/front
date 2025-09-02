import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const naviPage = (uri: string) => {
    navigate(uri);
  };
  return (
    <header className="bg-white mb-5">
      <nav
        aria-label="Global"
        className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto]"
      >
        <div className="p-5 m-auto md:m-0">
          <a
            href="#"
            onClick={() => {
              naviPage('/');
            }}
          >
            <span className="sr-only">Your Company</span>
            <img alt="" src={logo} className="h-12 w-auto" />
          </a>
        </div>
        <div className="m-5 w-full grid grid-cols-1 md:grid-cols-5 gap-5 justify-self-center">
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
            onClick={() => {
              naviPage('/RandomChallenge/newChallenge');
            }}
          >
            랜덤 챌린지
          </a>
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
          >
            개인 챌린지
          </a>
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
          >
            랭킹
          </a>
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
            onClick={() => {
              naviPage('/items');
            }}
          >
            포인트 교환
          </a>
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
            onClick={() => {
              naviPage('/mypage');
            }}
          >
            마이페이지
          </a>
        </div>
        <div className="p-5 ml-auto">
          <a
            href="#"
            className="text-gray-900 font-bold"
            onClick={() => {
              naviPage('/auth/signin');
            }}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
export default Header;
