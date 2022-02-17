import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import ColorNav from '../ColorNav/ColorNav';
import Footer from '../Footer/Footer';

const Layout = () => (
  <div className="App" data-testid="app-wrapper">
    <Header />
    <Search />
    <Nav />
    <ColorNav />
    {/* <Outlet> renders whatever child route is currently active,
        think of it as a placeholder for the child routes. */}
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
