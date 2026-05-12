# React Component Patterns

## 1. Functional Component Pattern

```jsx
import React, { useState, useEffect } from 'react';

export const MyComponent = ({ title, onSubmit, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Component initialization
    return () => {
      // Cleanup
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="component">
      <h1>{title}</h1>
      {children}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};
```

## 2. Custom Hook Pattern

```jsx
import { useState, useCallback, useEffect } from 'react';

export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('API error');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Usage
const { data, loading, error } = useApi('/api/exams');
```

## 3. Compound Component Pattern

```jsx
// Dialog component with composition
export const Dialog = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Dialog.Header = ({ title }) => (
  <div className="dialog-header">
    <h2>{title}</h2>
  </div>
);

Dialog.Body = ({ children }) => (
  <div className="dialog-body">{children}</div>
);

Dialog.Footer = ({ children }) => (
  <div className="dialog-footer">{children}</div>
);

// Usage
<Dialog isOpen={true} onClose={handleClose}>
  <Dialog.Header title="Confirm" />
  <Dialog.Body>Are you sure?</Dialog.Body>
  <Dialog.Footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </Dialog.Footer>
</Dialog>
```

## 4. Form Hook Pattern

```jsx
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit
    onSubmit(values);
  };

  return {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  };
};

// Usage
const { values, handleChange, handleSubmit } = useForm(
  { email: '', password: '' },
  handleLogin
);
```

## 5. Context Provider Pattern

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggle = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Usage
const App = () => (
  <ThemeProvider>
    <Content />
  </ThemeProvider>
);
```

## Best Practices

### Props
- Use destructuring for clarity
- Provide default props
- Document prop types with TypeScript or PropTypes
- Keep prop count reasonable (< 5)

### State Management
- Keep state close to where it's used
- Lift state only when necessary
- Consider useReducer for complex state

### Performance
- Memoize expensive computations
- Use useCallback for event handlers
- Implement lazy loading for routes
- Avoid inline object/function definitions in JSX

### Organization
- One component per file
- Keep related logic in custom hooks
- Use clear, descriptive names
- Add JSDoc comments for public APIs

### Accessibility
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
