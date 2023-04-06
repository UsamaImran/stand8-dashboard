import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Popover } from '../../popup/popup';
import { Button } from '../buttons';

const ListCallsButtonPageHeader = () => {
  const [value, setValue] = useState('All');

  const content = (
    <>
      <NavLink to="#" onClick={() => setValue('All')}>
        <span>All</span>
      </NavLink>
      <NavLink to="#" onClick={() => setValue('Connected')}>
        <span>Connected</span>
      </NavLink>
    </>
  );
  return (
    <Popover placement="bottomLeft" content={content} trigger="click">
      <Button size="small" type="white">
        {value}
        <FeatherIcon icon="chevron-down" size={14} />
      </Button>
    </Popover>
  );
};

export { ListCallsButtonPageHeader };
