import React from 'react';
import styled from 'styled-components';
import { Button, Box, Flex, Input } from 'rendition';

const width = '300px';

const RenamerWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  margin: 1rem 0 1rem 0;
`;

const RenameButton = styled(Button)`
  width: ${width};
`;

const RenameInput = styled(Input)`
  display: ${props => (props.inputFieldHidden ? 'none' : 'static')};
  width: ${width};
`;

export const Renamer = props => (
  <RenamerWrapper>
    <Box my='5px'>
      <RenameInput
        placeholder={props.placeholder}
        inputFieldHidden={props.inputFieldHidden}
        onChange={props.onChange}
        value={props.inputFieldHidden ? '' : props.placeholder}
      />
    </Box>
    <Box my='5px'>
      <RenameButton secondary onClick={props.onRename}>
        {props.inputFieldHidden ? 'Rename' : 'Done'}
      </RenameButton>
    </Box>
  </RenamerWrapper>
);
