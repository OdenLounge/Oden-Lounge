import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === -1)
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

// Prop validation
LinkButton.propTypes = {
  children: PropTypes.node.isRequired, // Content of the button (can be string, element, etc.)
  to: PropTypes.node.isRequired, // Content of the button (can be string, element, etc.)
};

export default LinkButton;
