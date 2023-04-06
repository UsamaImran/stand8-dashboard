import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row, Spin } from 'antd';
import moment from 'moment';
import { UserCard } from './style';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import ava from '../../../../static/img/profile/avatar.png';
import { getAccountSummary } from '../../../../redux/salesProfile/actionCreator';
import { getRoundedOffFormatValues } from '../../../../components/utilities/utilities';

import {
  calculatePreviousSpreadPercentage,
  getPreviousSpreadPercentage,
  terminateZeroFromArray,
} from '../../../../utility/sales-recruiterUtils';
import { formatCurrenyValue } from '../../../../utility/utility';

const UserCards = ({ user }) => {
  const { name, designation, email, img } = user;
  const dispatch = useDispatch();

  const { accountSummary, spreadHistory, isLoading } = useSelector(state => {
    return {
      accountSummary: state.salesProfile.accountSummary,
      spreadHistory: state.salesProfile.spreadHistory,
      isLoading: state.salesProfile.spreadHistoryLoading,
    };
  });

  const percent = calculatePreviousSpreadPercentage(spreadHistory?.yData);
  // const spread = terminateZeroFromArray(spreadHistory?.yData);

  useEffect(() => {
    if (getAccountSummary && email) {
      dispatch(getAccountSummary({ email }));
    }
  }, [dispatch, email]);

  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          <figure>
            <img src={img || ava} alt="" />
          </figure>
          {isLoading ? (
            <Spin />
          ) : (
            <figcaption>
              <div className="card__content">
                <Heading className="card__name" as="h6">
                  <Link to="#">{name}</Link>
                </Heading>
                <p className="card__designation">{designation}</p>
              </div>

              <div className="card__info">
                <Row gutter={15}>
                  <Col xs={10}>
                    <div className="info-single">
                      <Heading className="info-single__title" as="h2">
                        {/* {formatCurrenyValue(spreadHistory ? spread[spread.length - 1] : 0).split('.')[0]} */}
                        {accountSummary ? getRoundedOffFormatValues(accountSummary.currentSpread) : 0} {'  '}
                        {getPreviousSpreadPercentage(percent)}
                      </Heading>
                      <p>
                        {accountSummary
                          ? `Current Spread for ${moment(accountSummary.currentDate).format('MM/DD/YYYY')}`
                          : 'Current Spread'}
                      </p>
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="info-single">
                      <Heading className="info-single__title" as="h2">
                        {accountSummary ? accountSummary.openJobs : 0}
                      </Heading>
                      <p>Open Jobs</p>
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="info-single">
                      <Heading className="info-single__title" as="h2">
                        {accountSummary ? accountSummary.contractors : 0}
                      </Heading>
                      <p>Contractors</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </figcaption>
          )}
        </Cards>
      </div>
    </UserCard>
  );
};

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
