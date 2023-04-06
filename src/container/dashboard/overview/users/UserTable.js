import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import UserEditModal from './UserEditModal';
import UserPasswordModal from './UserPasswordModal';
import { UserTableStyleWrapper } from '../../../pages/style';
import { TableWrapper } from '../../../styled';
import { Button } from '../../../../components/buttons/buttons';
import { alertModal } from '../../../../components/modals/antd-modals';
import { role } from '../../../../config/userRole';
import Heading from '../../../../components/heading/heading';

import { getUsers, deleteUser } from '../../../../redux/users/actionCreator';
import { readEditUser } from '../../../../redux/editUser/actionCreator';

const UserListTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, loggedinUser } = useSelector(state => {
    return {
      users: state.users.users,
      loggedinUser: state.auth.user,
    };
  });

  const [state, setState] = useState({
    modalVisible: false,
    passModalVisible: false,
    modalData: null,
    passModalData: null,
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const goEditScreen = user => {
    dispatch(readEditUser(user));
    history.push('/admin/user/settings');
  };

  const showPassModal = userId => {
    setState({
      ...state,
      passModalVisible: true,
      passModalData: userId,
    });
  };

  const showConfirm = userId => {
    alertModal.confirm({
      title: 'Do you want to delete this user?',
      content: '',
      onOk() {
        dispatch(deleteUser(userId));
      },
      onCancel() {},
    });
  };

  const usersTableData = users.filter(item => loggedinUser.id !== item.id).map(item => ({ ...item, key: item.id }));

  const usersTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <div className="user-info">
            <figure>
              <img
                style={{ width: '40px', borderRadius: '50%' }}
                src={record.avatar ? record.avatar : '/static/media/empty.dad4e971.png'}
                alt=""
              />
            </figure>
            <figcaption>
              <Heading className="user-name" as="h6">
                {record.firstName} {record.lastName}
              </Heading>
              <span className="user-designation">{role[record.role]}</span>
            </figcaption>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Last Active Date',
      dataIndex: 'user_logs',
      key: 'user_logs',
      render: (_, record) => {
        return (
          <span className="user-designation">
            {record.user_logs[0]
              ? moment(record.user_logs[0]?.date)
                  .tz(loggedinUser.timezone)
                  .format('D MMM, YYYY | hh:mm:ss A')
              : null}
          </span>
        );
      },
    },
    {
      title: 'Timezone',
      dataIndex: 'timezone',
      key: 'timezone',
    },
    {
      title: 'Status',
      dataIndex: 'verified',
      key: 'verified',
      render: verified => (
        <div style={{ display: 'flex' }}>
          <Tag color={verified ? '#87d068' : '#f50'}>{verified ? 'verified' : 'not verified'}</Tag>
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',

      render: (_, user) => (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => goEditScreen(user)}>
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon" type="danger" to="#" shape="circle" onClick={() => showPassModal(user.id)}>
              <FeatherIcon icon="pocket" size={16} />
            </Button>
            <Button className="btn-icon" type="danger" to="#" shape="circle" onClick={() => showConfirm(user.id)}>
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const hideModal = () => {
    setState({
      modalVisible: false,
    });
  };

  const hidePassModal = () => {
    setState({
      passModalVisible: false,
    });
  };

  return (
    <UserTableStyleWrapper>
      <TableWrapper className="table-responsive">
        <Table
          scroll={{ x: true }}
          rowSelection={rowSelection}
          dataSource={usersTableData}
          columns={usersTableColumns}
          pagination={{
            defaultPageSize: 5,
            total: usersTableData.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />

        <UserEditModal
          data={state?.modalData}
          loggedinUserRole={loggedinUser.role}
          hideModal={hideModal}
          modalVisible={state.modalVisible}
        />

        <UserPasswordModal
          data={state?.passModalData}
          hideModal={hidePassModal}
          modalVisible={state.passModalVisible}
        />
      </TableWrapper>
    </UserTableStyleWrapper>
  );
};

export default UserListTable;
