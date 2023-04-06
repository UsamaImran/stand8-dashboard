import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { UserTableStyleWrapper } from '../../../pages/style';
import { TableWrapper } from '../../../styled';

import { getUserLogs } from '../../../../redux/userLogs/actionCreator';

const UserLogTable = () => {
  const dispatch = useDispatch();
  const { userLogs, loggedinUser } = useSelector(state => {
    return {
      userLogs: state.userLogs.userLogs,
      loggedinUser: state.auth.user,
    };
  });

  useEffect(() => {
    dispatch(getUserLogs());
  }, [dispatch]);

  const usersTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <>
            {record?.User?.firstName} {record?.User?.lastName}
          </>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => {
        return <>{record?.User?.email}</>;
      },
    },
    {
      title: 'Action Type',
      dataIndex: 'actionType',
      key: 'actionType',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => (
        <span style={{ textAlign: 'right' }}>
          {moment(record?.date)
            .tz(loggedinUser.timezone)
            .format('D MMM, YYYY | hh:mm:ss A')}
        </span>
      ),
    },
  ];

  return (
    <UserTableStyleWrapper>
      <TableWrapper className="table-responsive">
        {userLogs && (
          <Table
            dataSource={userLogs}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 10,
              total: userLogs.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        )}
      </TableWrapper>
    </UserTableStyleWrapper>
  );
};

export default UserLogTable;
