import React from 'react';
import styled from 'styled-components';

const size = 10;
const tableHeaderHeight = 42;
const rowHeight = 49;

export const Triangle = styled.div`
  display: static;
  position: relative;
  left: ${-size + 'px'};
  top: ${props =>
    tableHeaderHeight +
    props.position * rowHeight +
    rowHeight / 2 -
    size +
    'px'}
  width: 0;
  height: 0;
  border-top: ${size + 'px solid transparent'};
  border-bottom: ${size + 'px solid transparent'};
  border-right: ${size + 'px solid #2A506F'};

  @media (max-width: 700px) {
    display: none;
  }
`;
