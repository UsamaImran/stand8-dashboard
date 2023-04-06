import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton, Select, Modal } from 'antd';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SettingWrapper } from './style';
import SalesTextUsReport from './SalesTextusReport';
import SalesVoIPReport from './SalesVoIPReport';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getSaleUsers, getWeeklySummary, setModalVisibility } from '../../redux/salesProfile/actionCreator';
import Calenders from '../calendar/Calendar';
import getTabsMetaData from '../../tabsMetaData';
import '../../static/css/style.css';
import { CALENDER_DATA_TYPE, SALES_QUOTA } from '../../constants';
import { BannerCta2Sales } from '../../components/banners/Banners';
import Banner from '../../static/img/banner/banner.png';
import {
  getClientSendOuts,
  getClientVisits,
  getInterviews,
  getJobOrders,
  getPlacements,
} from '../../utility/sales-recruiterUtils';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const { Option } = Select;

const UserCards = lazy(() => import('./overview/salesProfile/UserCard'));
const CoverSection = lazy(() => import('./overview/salesProfile/CoverSection'));
const Overview = lazy(() => import('./overview/salesProfile/Overview'));
const SalesTarget = lazy(() => import('./overview/salesProfile/SalesTarget'));
const RatioCardOne = lazy(() => import('./overview/salesProfile/RatioCardOne'));

const SalesProfile = () => {
  const { isMobile } = useWindowDimensions();
  const dispatch = useDispatch();
  const [saleUser, setSaleUser] = useState({ id: '', email: '', fullName: '' });
  const [currentTab, setCurrentTab] = useState(0);
  const [currentCalender, setCurrentCalender] = useState(0);
  const getStyleCondition = tabNumber => (currentTab === tabNumber ? { display: 'block' } : { display: 'none' });

  const { weeklySummary, saleUsers, authUser } = useSelector(state => {
    return {
      weeklySummary: state.salesProfile.weeklySummary,
      saleUsers: state.salesProfile.saleUserData || [],
      authUser: state.auth.user,
      spreadHistory: state.salesProfile.spreadHistory,
    };
  });

  // const userRole = authUser.role;

  // TODO: need to add the dependency
  useEffect(() => {
    if (saleUsers.length > 0) {
      setSaleUser(saleUsers[0]);
    }
  }, [saleUsers]);

  useEffect(() => {
    if (getWeeklySummary && saleUser.email && currentTab === 0) {
      dispatch(getWeeklySummary({ email: saleUser.email }));
    }
  }, [dispatch, saleUser]);

  useEffect(() => {
    if (getSaleUsers) {
      dispatch(getSaleUsers(authUser.role === 'salesperson' && { email: authUser.email }));
    }
  }, [dispatch, authUser.role, authUser.email]);

  const GetTabs = () => {
    const tabs = getTabsMetaData();
    const styles = { cursor: 'pointer', height: '50px', marginTop: '20px', borderRadius: '2px' };
    const listStyles = {
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      borderRadius: '10px',
    };
    return (
      <ul style={isMobile ? listStyles : undefined}>
        {tabs.map((tab, index) => {
          return (
            <li
              style={currentTab === index ? { ...styles, borderBottom: '2px solid #5F63F2', color: '#5F63F2' } : styles}
              key={index}
              onClick={() => setCurrentTab(index)}
              onKeyPress={() => setCurrentTab(index)}
              role="presentation"
            >
              {tab.tabName}
            </li>
          );
        })}
      </ul>
    );
  };

  const DisplayMobileView = () => {
    return isMobile ? (
      <Suspense
        fallback={
          <Cards headless>
            <Skeleton active />
          </Cards>
        }
      >
        <div className="coverWrapper" style={{ marginBottom: 15 }}>
          <CoverSection />
          <nav className="profileTab-menu">
            <GetTabs />
          </nav>
        </div>
      </Suspense>
    ) : (
      ''
    );
  };
  const componentsList = [
    <Overview user={{ email: saleUser.email, username: saleUser.fullName, startDate: saleUser.startDate }} />,
    <SalesTextUsReport user={{ email: saleUser.email, username: saleUser.fullName }} />,
    <SalesVoIPReport user={{ email: saleUser.email, username: saleUser.fullName }} />,
    <Calenders
      currentCalender={currentCalender}
      setCurrentCalender={setCurrentCalender}
      user={{ email: saleUser.email, username: saleUser.fullName }}
      type={CALENDER_DATA_TYPE.SALES}
    />,
  ];

  let jobOrders = false;
  let clientVisits = false;
  let clientSendOuts = false;
  let interviews = false;
  let placements = false;

  if (weeklySummary) {
    jobOrders = getJobOrders(weeklySummary.jobOrders, SALES_QUOTA.JOB_ORDERS);
    clientVisits = getClientVisits(weeklySummary.clientVisits, SALES_QUOTA.CLIENT_VISITS);
    clientSendOuts = getClientSendOuts(weeklySummary.clientSendOuts, SALES_QUOTA.CLIENT_SENDOUTS);
    interviews = getInterviews(weeklySummary.interviews, SALES_QUOTA.INTERVIEWS);
    placements = getPlacements(weeklySummary.placements, SALES_QUOTA.PLACEMENTS);
  }

  const avatar = saleUser?.dash_user ? saleUser?.dash_user[0]?.avatar : null;
  const coverImg = saleUser?.dash_user ? saleUser?.dash_user[0]?.coverImg : null;

  return (
    <SalesProfileWrapper>
      <PageHeader
        ghost
        title="Sales Profile"
        buttons={[
          <div key="6">
            <Select
              value={saleUser.id}
              style={{ width: 200 }}
              onChange={e => {
                const sUser = saleUsers.filter(user => {
                  return user.id === e;
                });
                setSaleUser(sUser.length > 0 ? sUser[0] : { id: '', email: '', fullName: '' });
              }}
            >
              {saleUsers.map((user, index) => {
                return (
                  <Option key={index} value={user.id}>
                    {user.fullName}
                  </Option>
                );
              })}
            </Select>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24} style={getStyleCondition(0)}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar active paragraph={{ rows: 3 }} />
                </Cards>
              }
            >
              <UserCards
                user={{
                  name: saleUser.fullName || 'No User',
                  designation: 'Business Development Manager',
                  img: avatar,
                  email: saleUser.email || '',
                }}
              />
            </Suspense>
            {DisplayMobileView()}
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active paragraph={{ rows: 10 }} />
                </Cards>
              }
            >
              <SalesTarget user={{ email: saleUser.email }} />
            </Suspense>

            <WeeklyGoal>
              <Cards headless>
                {' '}
                <p>Weekly Goals</p>
              </Cards>
            </WeeklyGoal>

            <RatioCardOne data={jobOrders} />
            <RatioCardOne data={clientVisits} />
            <RatioCardOne data={clientSendOuts} />
            <RatioCardOne data={interviews} />
            <RatioCardOne data={placements} />
          </Col>

          <Col xxl={currentTab !== 0 ? 24 : 18} lg={currentTab !== 0 ? 24 : 16} md={currentTab !== 0 ? 24 : 14} xs={24}>
            <SettingWrapper>
              {!isMobile || currentTab !== 0 ? (
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <div className="coverWrapper" style={{ marginBottom: 15 }}>
                    <CoverSection coverImg={coverImg} />
                    <nav className="profileTab-menu">
                      <GetTabs />
                    </nav>
                  </div>
                </Suspense>
              ) : null}
              {componentsList[currentTab]}
            </SettingWrapper>
          </Col>
        </Row>
      </Main>{' '}
    </SalesProfileWrapper>
  );
};

SalesProfile.propTypes = {
  // match: propTypes.object,
};

export default SalesProfile;

const WeeklyGoal = Styled.div`
  .ant-card-body {
    padding: 15px 25px!important;
    background: #5f63f2;
    border-radius: 12px;

    p {
      margin-bottom: 0;
      font-size: 22px;
      font-weight: 500;
      color: white;
    }
  }
`;

const SalesProfileWrapper = Styled.div`
  .ant-card {
    margin-bottom: 15px!important;
  }
`;

export const ModalOnStartSale = () => {
  const dispatch = useDispatch();
  const { isModalVisible, weeklySummary, authUser } = useSelector(state => {
    return {
      isModalVisible: state.salesProfile.isModalVisible,
      weeklySummary: state.salesProfile.weeklySummary,
      authUser: state.auth.user,
    };
  });

  useEffect(() => {
    const item = localStorage.getItem('weeklySummaryModal');
    if (!item) {
      localStorage.setItem('weeklySummaryModal', 'true');
      dispatch(setModalVisibility(true));
    }
  }, []);

  useEffect(() => {
    if (getWeeklySummary && authUser.email) {
      dispatch(getWeeklySummary({ email: authUser.email }));
    }
  }, [dispatch]);

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  const imgDivStyle = { marginTop: '190px' };

  let jobOrders = false;
  let clientVisits = false;
  let clientSendOuts = false;
  let interviews = false;
  let placements = false;

  if (weeklySummary) {
    jobOrders = getJobOrders(weeklySummary.jobOrders, SALES_QUOTA.JOB_ORDERS);
    clientVisits = getClientVisits(weeklySummary.clientVisits, SALES_QUOTA.CLIENT_VISITS);
    clientSendOuts = getClientSendOuts(weeklySummary.clientSendOuts, SALES_QUOTA.CLIENT_SENDOUTS);
    interviews = getInterviews(weeklySummary.interviews, SALES_QUOTA.INTERVIEWS);
    placements = getPlacements(weeklySummary.placements, SALES_QUOTA.PLACEMENTS);
  }

  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => dispatch(setModalVisibility(false))}
      destroyOnClose
      width="50%"
      bodyStyle={{ backgroundColor: '#270886', height: 'auto', borderRadius: '10px' }}
      footer={false}
    >
      <div style={wrapperStyle}>
        <BannerCta2Sales
          clientVisits={clientVisits}
          interviews={interviews}
          placements={placements}
          jobOrders={jobOrders}
          clientSendOuts={clientSendOuts}
        />
        <div style={imgDivStyle}>
          <img src={Banner} alt="banner" />
        </div>
      </div>
    </Modal>
  );
};
