import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Example Component Template
 * 
 * This is a template showing best practices for React components:
 * - Proper prop validation
 * - State management with hooks
 * - Error boundaries
 * - Accessibility considerations
 * - JSDoc documentation
 */

/**
 * Button component with loading state and accessibility support
 * 
 * @component
 * @example
 * // Basic usage
 * return <Button>Click me</Button>
 * 
 * @example
 * // With callback
 * return <Button onClick={handleClick}>Submit</Button>
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button style variant
 * @param {boolean} [props.isLoading=false] - Show loading state
 * @param {boolean} [props.disabled=false] - Disable button
 * @param {Function} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Button text
 * @returns {React.ReactElement} Button component
 */
export const Button = ({
  variant = 'primary',
  isLoading = false,
  disabled = false,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold transition-colors';
  
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⚙️</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * Card component for content grouping
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.title] - Card title
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} Card component
 */
export const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`} role="article">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
};

/**
 * Example: Using components together
 */
export const ExampleUsage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Submit completed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Example Form">
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded"
            placeholder="your@email.com"
          />
        </div>
        
        <Button
          variant="primary"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Card>
  );
};

export default ExampleUsage;
