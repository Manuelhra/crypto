import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Axios from 'axios';

import image from './assets/cryptomonedas.png';
import Form from './components/Form';
import Cotizacion from './components/Cotizacion';


const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media screen and (min-width: 998px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin: 50px 0;

  &::after {
    content: '';
    width: 100px;
    background: #66A2FE;
    height: 6px;
    display: block;
  }
`;



function App() {
  const [moneda, setMoneda] = useState('')
  const [cryptoMoneda, setCryptoMoneda] = useState('')
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Evitar que se ejecute cuando se renderice el componente

    if (moneda.trim() === '' || cryptoMoneda.trim() === '') return;

    const fetchData = async () => {

      setLoading(true);

      try {
        const ulr = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}`

        const response = await Axios.get(ulr);
  
        setResult(response.data.DISPLAY[cryptoMoneda][moneda]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      };
    }

    fetchData();

  }, [moneda, cryptoMoneda]);

  return (
    <Container>
      <div>
        <Image
        src={image} 
        alt="Imagen cripto"
        />
  
      </div>
      <div>
        <Heading>
          Cotiza criptomonedas al instante
        </Heading>

        <Form 
          setMoneda={setMoneda}
          setCryptoMoneda={setCryptoMoneda}
          boolean={loading}

        />

        <Cotizacion  
        result={result} 
        
        />
      </div>
    </Container>
  );
}

export default App;
