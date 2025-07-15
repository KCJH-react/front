import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const naviPage = (uri: string) => {
    navigate(uri);
  };
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl p-6  lg:justify-between lg:px-6"
      >
        <div className="flex-2">
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
        <div className="flex-1 flex justify-around px-10 mx-10 my-auto">
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
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
          >
            포인트 교환
          </a>
          <a
            href="#"
            className="flex-1 text-center text-md/6 font-bold text-gray-900"
          >
            마이페이지
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-2 lg:justify-end m-auto">
          <a
            href="#"
            className="text-sm/6 text-gray-900 font-bold"
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
