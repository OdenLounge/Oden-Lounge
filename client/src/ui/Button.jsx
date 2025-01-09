import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base =
    'inline-block border text-sm bg-slate-900 font-semibold uppercase tracking-wide text-slate-200 transition-colors duration-300 hover:bg-slate-300 hover:text-slate-950 focus:bg-slate-200 focus:outline-none focus:ring focus:ring-slate-200 focus:ring-offset-2 disabled:cursor-not-allowed ';
  const styles = {
    primary: base + ' md:px-6 md:py-4  px-4 py-3',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300  hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5  px-4 py-2.5',
    main:
      base +
      'md:px-6 md:py-4  px-4 py-3 relative inline-block border-2 border-white bg-transparent px-8 py-3 text-lg font-semibold uppercase text-white transition-transform duration-900 ease-in-out hover:translate-y-[-5px] hover:scale-105 hover:opacity-90',
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

// Prop validation
Button.propTypes = {
  children: PropTypes.node.isRequired, // Content of the button (can be string, element, etc.)
  disabled: PropTypes.bool, // Boolean indicating if the button is disabled
  to: PropTypes.object,
  type: PropTypes.string,
};

// Default props
// Button.defaultProps = {
//   disabled: false, // Default value for 'disabled' if not provided
// };

export default Button;
