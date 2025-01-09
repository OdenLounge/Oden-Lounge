import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Loader from './Loader'; // Import your loader component
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa'; // Social media icons

function Hero() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle the button click with delay
  const handleReservationClick = () => {
    setLoading(true); // Show the loader overlay
    setTimeout(() => {
      setLoading(false); // Hide loader after delay
      navigate('/reservation'); // Navigate to reservation page
    }, 1000); // 2-second delay
  };

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center text-white">
      {/* Background Video */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover"
          src="https://res.cloudinary.com/dgdkk60jf/video/upload/v1736339490/ODEN-VIDEO_mtknrh.mp4"
          autoPlay
          muted
          loop
        ></video>
        {/* Dark Overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-60"></div>
      </div>

      {/* Video Content */}
      <div className="relative z-10 px-4 font-serif sm:px-6 md:px-8">
        <h3 className="text-xl font-light uppercase tracking-wide sm:text-2xl md:text-2xl lg:text-3xl">
          Welcome To
        </h3>
        <h1 className="lg:9xl font-serif text-5xl font-extrabold tracking-wide sm:mb-20 sm:text-6xl md:text-[5.5rem]">
          <span className="mr-2 sm:mr-5">ODEN</span>LOUNGE
        </h1>

        {/* Button */}
        <div className="mt-6">
          <button onClick={handleReservationClick}>
            <Button type="main">Make a Reservation</Button>
          </button>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="hidden lg:absolute lg:left-6 lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:transform lg:animate-draw-border lg:flex-col lg:items-center lg:space-y-6 lg:rounded-lg lg:border-2 lg:border-slate-600 lg:p-4 lg:opacity-0">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-3xl text-white hover:text-blue-600" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-3xl text-white hover:text-pink-600" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-3xl text-white hover:text-blue-400" />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-3xl text-white hover:text-black" />
        </a>
        <a
          href="https://wa.me/yourNumber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-3xl text-white hover:text-green-500" />
        </a>
      </div>

      {/* Mobile view icons */}

      <div className="absolute bottom-0 left-1/2 mb-20 flex w-[80dvh] -translate-x-1/2 transform flex-row justify-center space-x-6 p-2 lg:hidden">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-3xl text-white hover:text-blue-600" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-3xl text-white hover:text-pink-600" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-3xl text-white hover:text-blue-400" />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-3xl text-white hover:text-black" />
        </a>
        <a
          href="https://wa.me/yourNumber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-3xl text-white hover:text-green-500" />
        </a>
      </div>

      {/* Full-screen Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader /> {/* Display the loader in the center */}
        </div>
      )}
    </section>
  );
}

export default Hero;
