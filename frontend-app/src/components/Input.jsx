import React from 'react';

const Input = React.forwardRef((
  {
    label,
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    disabled = false,
    className = '', // For additional wrapper styling
    inputClassName = '', // For direct input styling
    labelClassName = '', // For label styling
    error,
    ...props
  },
  ref
) => {
  const baseInputStyles = "form-input mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 h-10 p-2 disabled:opacity-70 disabled:cursor-not-allowed";
  const errorInputStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-600";

  return (
    <div className={`mb-4 ${className}`.trim()}>
      {label && (
        <label 
          htmlFor={id || name} 
          className={`block text-sm font-medium text-gray-300 mb-1 ${labelClassName}`.trim()}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id || name}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseInputStyles} ${errorInputStyles} ${inputClassName}`.trim()}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input; 