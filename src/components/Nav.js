import React from 'react';
import dayjs from 'dayjs';
import { Flex, Txt } from 'rendition';

export const Nav = () => {
  const now = dayjs();

  const day = now.format('dddd, D MMMM, YYYY');
  const time = now.format('HH:mm A');

  return (
    <Flex
      p={3}
      bg='secondary.main'
      color='white'
      justifyContent='space-between'
    >
      <Txt>{day}</Txt>
      <Txt>{time}</Txt>
      <Txt>Jane Doe</Txt>
    </Flex>
  );
};
