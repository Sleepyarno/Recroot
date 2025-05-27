import React from 'react';

const TextArea = React.forwardRef((
  {
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
    disabled = false,
    className = '',      // For additional wrapper styling
    textareaClassName = '', // For direct textarea styling
    labelClassName = '',  // For label styling
    error,
    ...props
  },
  ref
) => {
  const baseTextareaStyles = "form-textarea mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed";
  const errorTextareaStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-600";

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
      <textarea
        ref={ref}
        id={id || name}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`${baseTextareaStyles} ${errorTextareaStyles} ${textareaClassName}`.trim()}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea; 