import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ReservationForm from './pages/ReservationForm';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import AdminPage from './pages/AdminPage';
import ReservationQueryForm from './pages/ReserverationQueryForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reservationQuery" element={<ReservationQueryForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
