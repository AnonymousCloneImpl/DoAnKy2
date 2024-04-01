import React from 'react';

const ValidationInput = ({ label, type, value, onChange, placeholder, id, required, pattern, errorMessage }) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        required={required}
        pattern={pattern}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ValidationInput;
