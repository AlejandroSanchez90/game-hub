import React from 'react';
import Wrapper from './wrapper';
import Toggle from './toggle';

type Props = {};

function Sidebar({}: Props) {
  return (
    <Wrapper>
      <Toggle />
    </Wrapper>
  );
}

export default Sidebar;
