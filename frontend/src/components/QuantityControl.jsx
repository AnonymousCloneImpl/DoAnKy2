import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function QuantityControl({ initialQuantity, maxQuantity, onChange }) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const adjustQuantity = (amount) => {
    setQuantity((prevQuantity) => {
      const newValue = prevQuantity + amount;
      const newQuantity = Math.min(Math.max(newValue, 1), maxQuantity);
      onChange(newQuantity);
      return newQuantity;
    });
  };

  const limitQuantity = (value) => {
    const newValue = parseInt(value, 10) || 1;
    const newQuantity = Math.min(Math.max(newValue, 1), maxQuantity);
    setQuantity(newQuantity, () => onChange(newQuantity));
  };

  const resetIfEmpty = (value) => {
    if (value === '' || maxQuantity === 0) {
      setQuantity(1, () => onChange(1));
    }
  };

  return (
    <div className="quantity-control">
      <button className="quantity-decrease" onClick={() => adjustQuantity(-1)}><FontAwesomeIcon icon={faMinus} /></button>
      <input
        type="number"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={(e) => limitQuantity(e.target.value)}
        onBlur={(e) => resetIfEmpty(e.target.value)}
        className="quantity-input"
      />
      <button className="quantity-increase" onClick={() => adjustQuantity(1)}><FontAwesomeIcon icon={faPlus} /></button>
    </div>
  );
};