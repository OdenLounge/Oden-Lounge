import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types'; // Import PropTypes

const PageWrapper = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Prop validation
PageWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node
};

export default PageWrapper;
