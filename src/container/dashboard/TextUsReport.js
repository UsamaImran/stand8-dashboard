import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

const DailyOverview = lazy(() => import('./overview/textus/DailyOverview'));
const CompanyWide = lazy(() => import('./overview/textus/CompanyWide'));
const TextUsUsersData = lazy(() => import('./overview/textus/TextUsUsersData'));

const TextUsReport = () => {
  return (
    <>
      <Main style={{ marginTop: '20px' }}>
        <Cards
          ghost
          title="TextUs Overview"
          buttons={
            [
              // <div key="6" className="page-header-actions">
              //   <ExportButtonPageHeader />
              //   <ShareButtonPageHeader />
              //   <Button size="small" type="primary">
              //     <FeatherIcon icon="plus" size={14} />
              //     Add New
              //   </Button>
              // </div>,
            ]
          }
        >
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
                  <DailyOverview />
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
                  <CompanyWide />
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
                  <TextUsUsersData />
                </Suspense>
              </Col>
            </Row>
          </Main>
        </Cards>{' '}
      </Main>
    </>
  );
};

export default TextUsReport;
