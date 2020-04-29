import React, { useState } from 'react'

import styled from 'styled-components';

const Label = styled.label`
  font-family: 'Bevas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const SelectContainer = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 1.8rem;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
`;


export const useMoneda = (label, initialState, options) => {

  // state del custom hook
  const [state, setState] = useState(initialState);

  const Select = () => (
    <>
      <Label>{label}</Label>
      <SelectContainer
      onChange={(event) => setState(event.target.value) }
      value={state}
      >
        <option value="">--Seleccione--</option>
        {options.map((option) => (
          <option
          key={option.code} 
          value={option.code}
          >
          {option.name}</option>
        ))}
      </SelectContainer>
    </>
  );

  // retornar state, interfaz y función que modifica el state

  return [state, Select, setState];
};