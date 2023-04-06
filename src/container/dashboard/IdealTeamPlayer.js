import React from 'react';
import { Row, Col } from 'antd';
import { VerticalForm } from './overview/verticalForm/VerticalForm';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { IdealBanner } from '../../components/banners/Banners';

const FormLayout = () => {
  return (
    <>
      <PageHeader ghost title="Ideal Team Player" />
      <Main>
        <Row gutter={25}>
          <Col lg={12} xs={24}>
            <VerticalForm />
          </Col>
          <Col lg={12} xs={24}>
            <IdealBanner />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default FormLayout;
