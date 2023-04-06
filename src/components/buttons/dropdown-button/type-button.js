import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Popover } from '../../popup/popup';
import { Button } from '../buttons';

const DropdownTypeButtonPageHeader = () => {
  const [value, setValue] = useState('Daily Breakdown');

  const content = (
    <>
      <NavLink to="#" onClick={() => setValue('Daily Breakdown')}>
        <span>Daily Breakdown</span>
      </NavLink>
      <NavLink to="#" onClick={() => setValue('Hourly Breakdown')}>
        <span>Hourly Breakdown</span>
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

export { DropdownTypeButtonPageHeader };
