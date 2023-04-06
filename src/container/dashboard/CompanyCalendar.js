import React, { useState, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';

import Calenders from '../calendar/Calendar';
import '../../static/css/style.css';
import { CALENDER_DATA_TYPE } from '../../constants';

const CompanyCalendar = () => {
  const [currentCalender, setCurrentCalender] = useState(0);
  return (
    <Row justify="center" gutter={2} style={{ padding: '10px' }}>
      <Col xxl={24} xs={24}>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards headless>
            <Calenders
              currentCalender={currentCalender}
              setCurrentCalender={setCurrentCalender}
              user={{ email: 'company' }}
              type={CALENDER_DATA_TYPE.COMPANY}
            />
          </Cards>
        </Suspense>
      </Col>
    </Row>
  );
};

export default CompanyCalendar;
