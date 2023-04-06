import React from 'react';
import UserListTable from './UserTable';
import UserLogTable from './UserLogTable';
import { Cards } from '../../../../components/cards/frame/cards-frame';

const List = () => {
  return (
    <div>
      <Cards title="User List">
        <UserListTable />
      </Cards>
      <Cards title="User Login histories">
        <UserLogTable />
      </Cards>
    </div>
  );
};

export default List;
