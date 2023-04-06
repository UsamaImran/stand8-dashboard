import React, { Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';

import AsanaSettingModal from './overview/asana/AsanaSettingModal';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';

const Asana = () => {
  const [state, setState] = useState({
    modalVisible: false,
  });

  const hideModal = () => {
    setState({
      modalVisible: false,
    });
  };

  const openModal = () => {
    setState({
      modalVisible: true,
    });
  };

  return (
    <>
      <PageHeader
        ghost
        title="Asana Manager"
        buttons={[
          <div key="6" className="page-header-actions">
            <Button size="small" type="primary" onClick={openModal}>
              <FeatherIcon icon="link" size={14} />
              Connect to Asana
            </Button>
          </div>,
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
              Asana
            </Suspense>
          </Col>
        </Row>
      </Main>
      <AsanaSettingModal hideModal={hideModal} modalVisible={state.modalVisible} />
    </>
  );
};

export default Asana;
