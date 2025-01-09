import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../ui/NavBar';
import PageWrapper from '../components/PageWrapper';

const images = [
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340322/IMG-20241231-WA0020_cj0pho.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340319/IMG-20241231-WA0017_puvuko.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340318/IMG-20241231-WA0016_g0iril.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340316/IMG-20241231-WA0012_zwhouk.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340315/IMG-20241231-WA0009_uafwo3.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340315/IMG-20241231-WA0011_mdzzmi.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340312/IMG-20241231-WA0008_ffuwya.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340310/IMG-20241231-WA0007_aqnddx.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340310/IMG-20241231-WA0006_var2hf.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340309/IMG-20241231-WA0005_fzhnbv.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340308/IMG-20241231-WA0004_xrehl0.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340308/1000096488_vaqr0d.jpg',
  'https://res.cloudinary.com/dgdkk60jf/image/upload/v1736340308/IMG-20241231-WA0001_efjfjm.jpg',
  // Add more image paths as needed
];

function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically cycle through images every 4 seconds (if needed for updates)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageWrapper>
        <NavBar type="secondary" isOpen={isOpen} setIsOpen={setIsOpen} />

        {!isOpen && (
          <div className="relative h-screen bg-slate-300 text-slate-900">
            {/* Left Image Frame */}
            <div className="absolute left-0 top-0 z-10 hidden h-full w-1/4 overflow-hidden md:block">
              <motion.img
                key="left-image" // Static key for load animation
                src={images[currentIndex]}
                alt="Left Frame"
                className="h-full w-full object-cover"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Right Image Frame */}
            <div className="absolute right-0 top-0 z-10 hidden h-full w-1/4 overflow-hidden md:block">
              <motion.img
                key="right-image" // Static key for load animation
                src={images[(currentIndex + 1) % images.length]}
                alt="Right Frame"
                className="h-full w-full object-cover"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Content in the Center */}
            <div className="relative z-10 mx-auto flex h-auto w-full flex-col items-center justify-center px-6 pt-5 sm:w-2/4 md:px-12 xl:px-24">
              <h2 className="text-center text-3xl font-bold italic md:text-4xl">
                “Come for a drink, Stay for a meal”
              </h2>
              <p className="mt-6 w-full text-center">
                Oden Lounge is the first of its kind in the heart of Crewe, and
                our aim is to create an atmosphere that is not just for
                relaxation and entertainment for our esteemed customers, but
                where pleasant memories can be made.
              </p>
              <p className="mt-4 text-center">
                The conception of Oden Lounge in Crewe was based on the need to
                bring together the fast-growing multicultural community under
                one roof to experience a variety of amazing services we have to
                offer. A few of our services include the provision of alcoholic
                and non-alcoholic beverages from a wide selection such as
                cocktails, spirits, wines, and beers; a variety of African and
                intercontinental dishes; regular DJ performances mixed with
                recorded music from different parts of the world; and hosting
                private events and parties. Our mission is to contribute
                immensely to the social development of Crewe through the
                provision of an inclusive space where people can have a break
                from the stresses of day-to-day life and integrate nicely into
                the community.
              </p>
              <p className="mt-4 text-center">
                We look forward to welcoming you to our exquisite lounge.
              </p>
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default AboutUs;
