import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types';

import styled from 'styled-components';

import Axios from 'axios';
import Error from './Error';

import { useMoneda } from '../hooks/useMoneda';
import { useCryptoMoneda } from '../hooks/useCryptoMoneda';

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background .3s ease;
  opacity: ${props => props.loading  === 'true' ? .7 : undefined};

  &:hover {
    background: #326AC0;
    cursor: pointer;
  }

`;


const Form = ({ setCryptoMoneda, setMoneda, boolean = false }) => {

  // state list cryptoMonedas

  const [cryptoList, setListCrypto] = useState([]);
  const [error, setError] = useState(false);

  const Monedas = [
    {code: 'USD', name: 'Dollar de Estados Unidos'},
    {code: 'MXN', name: 'Peso Mexicano'},
    {code: 'COP', name: 'Peso Colombiano'},
    {code: 'EUR', name: 'Euro'},
  ]

  // utilizar useMoneda

  const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', Monedas);

  // utilizar useCryptoMoneda

  const [cryptoMoneda, SelectCrypto] = useCryptoMoneda('Elige tu Criptomoneda', '', cryptoList);

  // Traer datos de la API.

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const response = await Axios.get(url);
      const { data: { Data } } = response;
    
      setListCrypto(Data);
    }
    
    fetchData();

  }, []);

  // Submit

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar si ambos campos estan llenos

    if (moneda.trim() === '' || cryptoMoneda.trim() === '') return setError(true);

    setError(false);
    // Pasar los datos al component pricipal.

    setMoneda(moneda);
    setCryptoMoneda(cryptoMoneda);

  }
  return ( 
    <form
    onSubmit={handleSubmit}
    >
      {/* Select es un método, pero devuelve html
      podríamos llamar la función así {SelectMoneda()} ó 
      <SelectMoneda />, el reultado es igual y no hay error.

      */}
      { error && <Error message="Todos los campos son obligatorios" /> }

      <SelectMoneda />

      <SelectCrypto />

      <Button 
      type="submit"
      value={boolean ? 'un momento...' : "Calcular"}
      disabled={boolean}
      loading={boolean.toString()}
      />
    </form>
   );
}

Form.propTypes = {
  setCryptoMoneda: PropTypes.func,
  setMoneda: PropTypes.func,
  boolean: PropTypes.bool,
};
 
export default Form;
