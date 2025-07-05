import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './common/component/Header';
import Footer from './common/component/Footer';
import Main from './page/Main';
import Signin from './page/Authentication/Signin';
import Signup from './page/Authentication/Signup';
import Mypage from './page/Authentication/Mypage';

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
