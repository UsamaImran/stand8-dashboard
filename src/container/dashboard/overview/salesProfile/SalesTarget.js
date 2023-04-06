import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import FeatherIcon from 'feather-icons-react';
import { Spin } from 'antd';
import { SalesTargetWrap } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import HalfProgressBar from '../../../../components/utilities/progressBar';
import { getWeeklySalesTarget } from '../../../../redux/salesProfile/actionCreator';
import { getRoundedOffFormatValues } from '../../../../components/utilities/utilities';

// const moreContent = (
//   <>
//     <Link to="#">
//       <FeatherIcon size={16} icon="printer" />
//       <span>Printer</span>
//     </Link>
//     <Link to="#">
//       <FeatherIcon size={16} icon="book-open" />
//       <span>PDF</span>
//     </Link>
//     <Link to="#">
//       <FeatherIcon size={16} icon="file-text" />
//       <span>Google Sheets</span>
//     </Link>
//     <Link to="#">
//       <FeatherIcon size={16} icon="x" />
//       <span>Excel (XLSX)</span>
//     </Link>
//     <Link to="#">
//       <FeatherIcon size={16} icon="file" />
//       <span>CSV</span>
//     </Link>
//   </>
// );

const SalesTarget = ({ user }) => {
  const { email } = user;
  const dispatch = useDispatch();

  const { weeklySalesTarget, isLoading } = useSelector(state => {
    return {
      weeklySalesTarget: state.salesProfile.weeklySalesTarget,
      // accountSummary: state.salesProfile.accountSummary,
      isLoading: state.salesProfile.spreadHistoryLoading,
    };
  });

  useEffect(() => {
    if (getWeeklySalesTarget && email) {
      dispatch(getWeeklySalesTarget({ email }));
    }
  }, [dispatch, email]);

  return (
    <SalesTargetWrap>
      <Cards title="President's Club Goal">
        {isLoading ? (
          <div
            className="sd-spin"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25%' }}
          >
            <Spin />
          </div>
        ) : (
          <>
            {' '}
            <div className="target-progressbar-wrap">
              <HalfProgressBar
                percent={
                  weeklySalesTarget
                    ? ((parseFloat(weeklySalesTarget.revenue) / weeklySalesTarget.target) * 100).toFixed(0)
                    : 0
                }
              />
            </div>
            <div className="s-target-list d-flex justify-content-between">
              <div className="s-target-list__item target-revinue">
                <h2>{weeklySalesTarget ? getRoundedOffFormatValues(weeklySalesTarget.revenue) : 0}</h2>
                <p>Spread</p>
              </div>
              <div className="s-target-list__item">
                <h2>{weeklySalesTarget ? getRoundedOffFormatValues(weeklySalesTarget.target) : 0}</h2>
                <p>Target</p>
              </div>
            </div>{' '}
          </>
        )}
      </Cards>
    </SalesTargetWrap>
  );
};

SalesTarget.propTypes = {
  user: PropTypes.object,
};

export default SalesTarget;
