"use client"

import { useState, useRef, useEffect, ChangeEventHandler } from 'react';

const AutoGrowTextarea = ({disabled = false, required = false, className = "", placeholder = "", value = null as string | null, onChange = ((() => {}) as ChangeEventHandler<HTMLTextAreaElement>)}) => {
  const [localValue, setLocalValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setLocalValue(e.target.value);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to 'auto' to shrink it when necessary
      textareaRef.current.style.height = 'auto';
      // Set the height based on the scrollHeight to grow as content increases
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value === null ? localValue : value}
      onChange={handleChange}
      style={{ overflow: 'hidden', resize: 'none' }}
      rows={1}
      required={required}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default AutoGrowTextarea;
