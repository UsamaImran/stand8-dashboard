import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Skeleton } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

const DailyOverview = lazy(() => import('./overview/salesTextus/DailyOverview'));
const CompanyWide = lazy(() => import('./overview/recruiterTextus/CompanyWide'));
const TextUsUsersData = lazy(() => import('./overview/salesTextus/TextUsUsersData'));

const TextUsReport = ({ user }) => {
  return (
    <>
      <Main className="m-0" style={{ width: '100%', padding: 0 }}>
        <Cards title="TextUs">
          <Main>
            <Row justify="center" gutter={25}>
              <Col style={{ marginBottom: '25px', marginTop: '20px' }} xxl={10} xl={10} lg={12} xs={24}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <DailyOverview user={user} />
                </Suspense>
              </Col>
              <Col style={{ marginBottom: '25px', marginTop: '20px' }} xxl={14} xl={14} lg={12} xs={24}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <CompanyWide user={user} />
                </Suspense>
              </Col>

              <Col xxl={24} xs={24}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <TextUsUsersData user={user} />
                </Suspense>
              </Col>
            </Row>
          </Main>
        </Cards>
      </Main>
    </>
  );
};

TextUsReport.propTypes = {
  user: PropTypes.object,
};

export default TextUsReport;
