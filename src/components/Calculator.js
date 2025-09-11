import React, { useState } from 'react';
//import './App.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput('');
  const backspace = () => setInput(input.slice(0, -1));

  const toggleSign = () => {
    if (input) {
      try {
        const evaluated = eval(input);
        setInput((-evaluated).toString());
      } catch {
        setInput('Error');
      }
    }
  };

  const calculate = () => {
    try {
      setInput(Function('"use strict";return (' + input + ')')().toString());
    } catch {
      setInput('Error');
    }
  };

  return (
    <div className="calculator-container">
      <div className="solar-strip" />
      <input className="display" value={input || '0'} readOnly />

      <div className="keypad">
        {[
          'AC', 'Del', '%', '/',
          '7', '8', '9', '*',
          '4', '5', '6', '-',
          '1', '2', '3', '+',
          '±', '0', '.', '='
        ].map((btn, i) => (
          <button
            key={i}
            className={btn === '=' ? 'equals' : ''}
            onClick={() => {
              if (btn === 'AC') clear();
              else if (btn === 'Del') backspace();
              else if (btn === '=') calculate();
              else if (btn === '±') toggleSign();
              else handleClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
