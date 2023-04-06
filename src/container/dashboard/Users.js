import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import UserCreateModal from './overview/users/UserCreateModal';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';

const List = lazy(() => import('./overview/users/List'));

const Users = () => {
  const [state, setState] = useState({
    createModalVisible: false,
  });

  const showCreateModal = () => {
    setState({
      ...state,
      createModalVisible: true,
    });
  };

  const hideCreateModal = () => {
    setState({
      createModalVisible: false,
    });
  };

  return (
    <>
      <PageHeader
        ghost
        title="Users Manager"
        buttons={[
          <Button key={212} size="small" type="primary" onClick={() => showCreateModal()}>
            <FeatherIcon icon="plus" size={14} />
            Invite
          </Button>,
        ]}
      />
      <Main>
        <Row justify="center" gutter={25}>
          <Col xxl={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <List />
            </Suspense>
          </Col>
        </Row>
      </Main>
      <UserCreateModal hideModal={hideCreateModal} modalVisible={state.createModalVisible} />
    </>
  );
};

export default Users;
