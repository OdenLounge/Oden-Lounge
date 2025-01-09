import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ReservationForm from './pages/ReservationForm';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import QueryForm from './pages/ReserverationQueryForm';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/reservation',
    element: <ReservationForm />,
  },
  {
    path: '/about',
    element: <AboutUs />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/reservationQuery',
    element: <QueryForm />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
