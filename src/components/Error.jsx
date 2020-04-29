import React from 'react'

import PropTypes from 'prop-types';

import styled from 'styled-components';

const MessageError = styled.p`
  background: #b7322c;
  padding: 1rem;
  color: #FFF;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-family: 'Bebas Neue', cursive;
`;

const Error = ({ message }) => {
  return ( 
    <MessageError>
      {message}
    </MessageError>
   );
}

Error.propTypes = {
  message: PropTypes.string,
};

 
export default Error;