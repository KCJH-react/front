import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './common/component/Header';
import Footer from './common/component/Footer';
import Main from './page/Main';
import Signin from './page/Auth/Signin';
import Signup from './page/Auth/Signup';
import Mypage from './page/Auth/Mypage';
import 'react-datepicker/dist/react-datepicker.css';
import Items from './page/Items/Items';
import NewChallenge from './page/RandomChallenge/NewChallenge';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Main />}></Route>
        </Route>
        <Route path="/auth" element={<Home />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="mypage" element={<Mypage />} />
        </Route>
        <Route path="/items" element={<Home />}>
          <Route path="" element={<Items />} />
        </Route>
        <Route path="/RandomChallenge" element={<Home />}>
          <Route path="newChallenge" element={<NewChallenge />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
