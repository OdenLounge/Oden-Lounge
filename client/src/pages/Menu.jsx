import { useEffect, useState } from 'react';
import NavBar from '../ui/NavBar';
import axios from 'axios';
import Loader from '../ui/Loader';
import PageWrapper from '../components/PageWrapper';

const CATEGORY_BACKGROUNDS = {
  Starters:
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343258/Starters_rty4vc.jpg',
  Mains:
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343254/Mains_zc8kct.jpg',
  Soups:
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343254/Soups_dszelv.jpg',
  Swallows:
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343258/Swallows_drmzgh.jpg',
  Burgers:
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343253/Burgers_vlktit.jpg',
  'Oden Platter':
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343254/OdenPlatter_ahnrlb.jpg',
  Drinks:
    'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736343253/Drinks_ghgujd.jpg',
};

const API_URL = 'http://localhost:5000';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('');
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false); // Track scrolling state

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/menu/mainMenuItems`);

        const menuData = response.data.categories;
        setMenuItems(menuData);
        setActiveCategory(Object.keys(menuData)[0]); // Set the first category as active by default
      } catch (error) {
        console.error('Error fetching menu:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true); // Set scrolling state to true when user scrolls down
      } else {
        setScrolling(false); // Reset when scroll position is at the top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <PageWrapper>
        {/* Background Wrapper */}

        <NavBar type="menu" isOpen={isOpen} setIsOpen={setIsOpen} />
        {!isOpen && (
          <div
            className="relative z-0 min-h-screen"
            style={{
              backgroundImage: `url(${CATEGORY_BACKGROUNDS[activeCategory]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Fixed Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Main Content */}
            <div className="relative z-10 pb-10 pt-28 text-gray-200">
              {/* Header */}
              <h1 className="relative mb-4 text-center font-serif text-4xl font-semibold text-white md:text-5xl">
                <img
                  src="/assets/MenuSvg.svg" // Updated path
                  alt="Vector"
                  className="absolute left-1/2 top-0 mt-4 w-16 -translate-x-1/2 sm:w-12 md:w-20"
                />
                ODEN MENU
              </h1>

              {/* Category Tabs */}
              {loading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <Loader /> {/* Display the loader in the center */}
                </div>
              ) : (
                <div
                  className={`sticky top-0 z-20 mb-8 flex flex-wrap justify-center gap-6 py-4 ${
                    scrolling ? 'bg-transparent' : '' // Add background color when scrolled
                  }`}
                >
                  {Object.keys(menuItems).map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 font-serif text-lg font-medium uppercase tracking-widest ${
                        activeCategory === category
                          ? 'border-b-2 border-amber-500 text-amber-500'
                          : 'text-white hover:text-amber-400'
                      } transition duration-300`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Menu Items */}
              <div className="flex justify-center">
                <div className="grid w-11/12 grid-cols-1 gap-6 md:w-3/5 md:grid-cols-2">
                  {menuItems[activeCategory] &&
                  menuItems[activeCategory].length > 0 ? (
                    menuItems[activeCategory].map((item, index) => (
                      <div
                        key={index}
                        className="flex rounded-lg bg-slate-800 bg-opacity-80 p-6 font-serif shadow-lg transition-transform duration-300 hover:scale-105"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="mr-6 h-32 w-32 rounded-md object-cover"
                        />
                        <div className="text-left">
                          <h3 className="font-serif text-2xl font-semibold text-amber-500">
                            {item.name}
                          </h3>
                          <p className="mt-2 font-tenor text-sm text-gray-300">
                            {item.description}
                          </p>
                          <p className="mt-3 text-lg font-bold text-amber-400">
                            £{item.price}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-gray-300">
                      Loading Menu...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default Menu;
