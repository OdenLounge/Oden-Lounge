import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function NavBar({ isOpen, setIsOpen, type = 'primary' }) {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define background classes based on the type prop
  const backgroundClass = {
    primary: 'bg-transparent text-white',
    secondary:
      'bg-black bg-opacity-95 text-white pb-5 shadow-md sticky top-0 z-50',
    menu: 'bg-transparent bg-opacity-95 text-white pb-5 shadow-md z-50',
  }[type];

  // Navigation Links Array with 'name' and 'to' attributes
  const navLinks = [
    { name: 'HOME', to: '/' },
    { name: 'ABOUT US', to: '/about' },
    { name: 'MENU', to: '/menu' },
    { name: 'GALLERY', to: '/gallery' },
    { name: 'CONTACT US', to: '/contact' },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 }, // Add staggerChildren for smooth animation
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Link animation
  };

  return (
    <nav
      className={`absolute left-0 top-0 z-50 w-full text-base ${backgroundClass} pt-8 transition-all duration-300`}
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-6">
        {/* Header (Logo and Menu Button) */}
        {!isOpen && (
          <>
            {/* Logo Section */}
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/assets/Oden logo.svg"
                className="h-8"
                alt="Oden logo"
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              aria-controls="navbar-default"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // X Icon for close
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon for open
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </>
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden md:block">
          <ul className="flex flex-col md:flex-row md:space-x-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="group relative block px-3 py-2 hover:text-gray-300"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:right-0 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/reservationQuery"
                className="block rounded border border-white px-6 py-2 transition-all hover:bg-white hover:text-gray-900"
              >
                RESERVATIONS
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black text-white md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <button
                type="button"
                className="absolute right-6 top-4 z-50 flex h-10 w-10 items-center justify-center text-white"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <motion.ul
                className="flex flex-col items-center gap-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants} // Parent variant with staggerChildren
              >
                {navLinks.map((link, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <Link
                      to={link.to}
                      className="text-xl font-medium hover:text-gray-300"
                      onClick={() => setIsOpen(false)} // Close menu on link click
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default NavBar;
