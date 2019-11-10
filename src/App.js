import React from 'react';
import { Provider } from 'rendition';
import styled, { createGlobalStyle } from 'styled-components';

import { Nav } from './components/Nav';
import { Devices } from './components/Devices';

const GlobalStyle = createGlobalStyle([], {
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    minHeight: '100%',
  },
  body: {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  '#root': {
    minHeight: '100vh',
  },
});

const FullHeightProvider = styled(Provider)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  return (
    <FullHeightProvider>
      <GlobalStyle />

      <Nav />

      <Devices />
    </FullHeightProvider>
  );
};
