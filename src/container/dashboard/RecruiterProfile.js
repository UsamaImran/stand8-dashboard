import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton, Select, Modal } from 'antd';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import RecruiterTextusReport from './RecruiterTextusReport';
import SalesVoIPReport from './SalesVoIPReport';
import { SettingWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getWeeklySummary, getRecruiterUsers, setModalVisibility } from '../../redux/recruiterProfile/actionCreator';
import getTabsMetaData from '../../tabsMetaData';
import Calenders from '../calendar/Calendar';
import { CALENDER_DATA_TYPE, RECRUITER_QUOTA } from '../../constants';
import { BannerCta2Recruitment } from '../../components/banners/Banners';
// import { isRecruiter } from '../../utility/helpers';
import Banner from '../../static/img/banner/banner.png';
import { getCustomerSendOut, getInterviews, getPlacements, getPreScreens } from '../../utility/sales-recruiterUtils';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const { Option } = Select;

const UserCards = lazy(() => import('./overview/recruiterProfile/UserCard'));
const CoverSection = lazy(() => import('./overview/recruiterProfile/CoverSection'));
const Overview = lazy(() => import('./overview/recruiterProfile/Overview'));
const SalesTarget = lazy(() => import('./overview/recruiterProfile/SalesTarget'));
const RatioCardOne = lazy(() => import('./overview/recruiterProfile/RatioCardOne'));

const RecruiterProfile = () => {
  const { isMobile } = useWindowDimensions();
  const [recruiterUser, setRecruiterUser] = useState({ id: '', email: '', fullName: '' });
  const dispatch = useDispatch();

  const { weeklySummary, recruiterUsers, authUser } = useSelector(state => {
    return {
      weeklySummary: state.recruiterProfile.weeklySummary,
      recruiterUsers: state.recruiterProfile.recruiterUserData || [],
      authUser: state.auth.user,
      isLoading: state.recruiterProfile.spreadHistoryLoading,
    };
  });

  // const userRole = authUser.role;
  useEffect(() => {
    if (recruiterUsers.length > 0) {
      setRecruiterUser(recruiterUsers[0]);
    }
  }, [recruiterUsers]);

  useEffect(() => {
    if (getWeeklySummary && recruiterUser.email) {
      dispatch(getWeeklySummary({ email: recruiterUser.email }));
    }
  }, [dispatch, recruiterUser]);

  useEffect(() => {
    const { role, email } = authUser;
    if (getRecruiterUsers) {
      dispatch(getRecruiterUsers(role === 'recruiter' && { email }));
    }
  }, [dispatch, authUser]);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentCalender, setCurrentCalender] = useState(0);
  const getStyleCondition = () => (currentTab !== 0 ? 'none' : 'block');
  const displayStyle = { display: getStyleCondition() };
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
              onClick={() => setCurrentTab(index)}
              key={index}
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
  const componentsList = [
    <div style={displayStyle}>
      <Overview
        user={{ email: recruiterUser.email, username: recruiterUser.fullName, startDate: recruiterUser.startDate }}
      />
    </div>,
    <RecruiterTextusReport user={{ email: recruiterUser.email, username: recruiterUser.fullName }} />,
    <SalesVoIPReport user={{ email: recruiterUser.email, username: recruiterUser.fullName }} />,
    <Calenders
      currentCalender={currentCalender}
      setCurrentCalender={setCurrentCalender}
      user={{ email: recruiterUser.email, username: recruiterUser.fullName }}
      type={CALENDER_DATA_TYPE.RECRUITER}
    />,
  ];

  let prescreens = false;
  let customerSendOuts = false;
  let interviews = false;
  let placements = false;
  if (weeklySummary) {
    prescreens = getPreScreens(weeklySummary.prescreens, RECRUITER_QUOTA.PRESCREENS);
    customerSendOuts = getCustomerSendOut(weeklySummary.customerSendOuts, RECRUITER_QUOTA.SENDOUT_TO_CUSTOMERS);
    interviews = getInterviews(weeklySummary.interviews, RECRUITER_QUOTA.INTERVIEWS);
    placements = getPlacements(weeklySummary.placements, RECRUITER_QUOTA.PLACEMENTS);
  }

  const avatar = recruiterUser?.dash_user ? recruiterUser?.dash_user[0]?.avatar : null;
  const coverImg = recruiterUser?.dash_user ? recruiterUser?.dash_user[0]?.coverImg : null;

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

  return (
    <RecruiterProfileWrapper>
      {/* {isRecruiter(userRole) ? (
        <ModalOnStart
          interviews={interviews}
          prescreens={prescreens}
          customerSendOuts={customerSendOuts}
          placements={placements}
        />
      ) : null} */}
      {/* <ModalOnStart
        interviews={interviews}
        prescreens={prescreens}
        customerSendOuts={customerSendOuts}
        placements={placements}
      /> */}
      <PageHeader
        ghost
        title="Recruiter Profile"
        buttons={[
          <div key="6">
            <Select
              value={recruiterUser.id}
              style={{ width: 200 }}
              onChange={e => {
                const sUser = recruiterUsers.filter(user => {
                  return user.id === e;
                });
                setRecruiterUser(sUser.length > 0 ? sUser[0] : { id: '', email: '', fullName: '' });
              }}
            >
              {recruiterUsers.map((user, index) => {
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
          <Col xxl={6} lg={8} md={10} xs={24} style={displayStyle}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar active paragraph={{ rows: 3 }} />
                </Cards>
              }
            >
              <UserCards
                user={{
                  name: recruiterUser.fullName || 'No User',
                  designation: 'IT Recruiter',
                  img: avatar,
                  email: recruiterUser.email || '',
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
              <SalesTarget user={{ email: recruiterUser.email, username: recruiterUser.fullName }} />
            </Suspense>

            <WeeklyGoal>
              <Cards headless>
                <p>Weekly Goals</p>
              </Cards>
            </WeeklyGoal>

            <RatioCardOne data={prescreens} />
            <RatioCardOne data={customerSendOuts} />
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

              {/* <Overview user={{ email: recruiterUser.email, username: recruiterUser.fullName }} /> */}
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </RecruiterProfileWrapper>
  );
};

RecruiterProfile.propTypes = {
  // match: propTypes.object,
};

export default RecruiterProfile;

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

const RecruiterProfileWrapper = Styled.div`
  .ant-card {
    margin-bottom: 15px!important;
  }
`;

export const ModalOnStartRecruiter = () => {
  const dispatch = useDispatch();

  const { isModalVisible, weeklySummary, authUser } = useSelector(state => {
    return {
      weeklySummary: state.recruiterProfile.weeklySummary,

      authUser: state.auth.user,
      isModalVisible: state.recruiterProfile.isModalVisible,
    };
  });

  useEffect(() => {
    if (getWeeklySummary && authUser.email) {
      dispatch(getWeeklySummary({ email: authUser.email }));
    }
  }, [dispatch]);

  useEffect(() => {
    const item = localStorage.getItem('weeklySummaryModal');
    if (!item) {
      localStorage.setItem('weeklySummaryModal', 'true');
      dispatch(setModalVisibility(true));
    }
  }, []);
  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  const imgDivStyle = { marginTop: '190px' };
  let prescreens = false;
  let customerSendOuts = false;
  let interviews = false;
  let placements = false;
  if (weeklySummary) {
    prescreens = getPreScreens(weeklySummary.prescreens, RECRUITER_QUOTA.PRESCREENS);
    customerSendOuts = getCustomerSendOut(weeklySummary.customerSendOuts, RECRUITER_QUOTA.SENDOUT_TO_CUSTOMERS);
    interviews = getInterviews(weeklySummary.interviews, RECRUITER_QUOTA.INTERVIEWS);
    placements = getPlacements(weeklySummary.placements, RECRUITER_QUOTA.PLACEMENTS);
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
        <BannerCta2Recruitment
          interviews={interviews}
          prescreens={prescreens}
          customerSendOuts={customerSendOuts}
          placements={placements}
        />
        <div style={imgDivStyle}>
          <img src={Banner} alt="banner" />
        </div>
      </div>
    </Modal>
  );
};
