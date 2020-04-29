import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ResultDiv = styled.div `
  color: #FFF;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const Info = styled.div `
  font-size: 18px;
  margin-bottom: .5rem;

`;

const Price = styled.div `
  font-size: 30px;
  margin: .5rem 0;

  span {
    font-weight: bold;
  }
`;

const Cotizacion = ({result}) => {

  if (Object.keys(result).length === 0) return null;

  

  return ( 
    <ResultDiv>
      <Price>El precio es: <span>{result.PRICE}</span></Price>
      <Info>Precio mas alto del día: <span>{result.HIGHDAY}</span></Info>
      <Info>Precio mas bajo del día: <span>{result.LOWDAY}</span></Info>
      <Info>Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></Info>
      <Info>Última actualización: <span>{result.LASTUPDATE}</span></Info>
      
    </ResultDiv>
   );
}

Cotizacion.propTypes = {
  result: PropTypes.object,
};
 
export default Cotizacion;