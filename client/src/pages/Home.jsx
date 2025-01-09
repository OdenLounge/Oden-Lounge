import { useNavigation } from 'react-router-dom';
import Hero from '../ui/Hero';
// import HomeMenu from '../ui/HomeMenu';
import NavBar from '../ui/NavBar';
import Loader from '../ui/Loader';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isLoading && <Loader />}

      <NavBar type="primary" isOpen={isOpen} setIsOpen={setIsOpen} />
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
