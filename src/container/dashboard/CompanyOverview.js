import React, { Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import CompanyLeaderBoard from './overview/company/CompanyLeaderBoard';
import CompanyCardSection from './overview/company/CompanyCardsSection';
import CompanyRevenue from './overview/company/CompanyRevenue';
import RevenueByHiringManager from './overview/company/RevenueByHiringManager';
import TopPerformers from './overview/company/TopPerformers';

import SpreadHistoryChart from './overview/company/SpreadHistoryChart';
import UsersPerformance from './overview/company/UsersPerformance';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import '../../static/css/style.css';

const CompanyOverview = () => {
  const companyOverview = () => {
    const cardsWidth = { width: '100%' };
    return (
      <>
        <div>
          <PageHeader ghost title="Company Overview" />
          <Main>
            {/* <CompanyCardSection /> */}
            <Row justify="center" gutter={25}>
              <Col xxl={12} lg={12} xs={25} md={25} sm={25} style={cardsWidth}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  {/* <CompanyRevenue /> */}
                </Suspense>
              </Col>
              <Col xxl={12} lg={12} xs={25} md={25} sm={25} style={cardsWidth}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  {/* <RevenueByHiringManager /> */}
                </Suspense>
              </Col>
              <Col xxl={12} lg={12} xs={25} md={25} sm={25} style={cardsWidth}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <TopPerformers />
                </Suspense>
              </Col>
              <Col xxl={12} lg={12} xs={25} md={25} sm={25} style={cardsWidth}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  {/* <CompanyLeaderBoard /> */}
                </Suspense>
              </Col>

              <Col xxl={25} xs={25} style={cardsWidth}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <UsersPerformance />
                </Suspense>
              </Col>

              <Col xxl={25} xs={25} style={cardsWidth}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  {/* <SpreadHistoryChart /> */}
                </Suspense>
              </Col>
            </Row>
          </Main>
        </div>
      </>
    );
  };

  return <>{companyOverview()}</>;
};

export default CompanyOverview;
