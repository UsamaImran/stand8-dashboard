import { Modal, PageHeader, Spin, Table, Select } from 'antd';
import propTypes from 'prop-types';
import moment, { utc } from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { graphLabels, PLACEMENT_DETAILS_COLUMNS } from '../../../../constants';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { getPlacementDetails } from '../../../../redux/companyOverview/actionCreator';
import { formatCurrenyValue } from '../../../../utility/utility';
import Heading from '../../../../components/heading/heading';

export const PlacementModal = ({ visibility, setModalVisibility, date }) => {
  const { startDate, endDate } = date;
  const dispatch = useDispatch();
  const { isMobile } = useWindowDimensions();
  const { placementDetails, isLoading } = useSelector(state => {
    return {
      placementDetails: state.companyOverview.placementDetails,
      isLoading: state.companyOverview.placementDetailsLoading,
    };
  });
  const { Option } = Select;
  const [selectedMonth, setSelectedMonth] = useState(
    moment(startDate)
      .utc()
      .month(),
  );
  useEffect(() => {
    if (visibility) dispatch(getPlacementDetails(startDate, endDate));
  }, [dispatch]);

  const getMappedData = () => {
    return (
      placementDetails &&
      placementDetails.map(item => {
        return {
          ...item,
          spread_amount: item.spread_amount ? formatCurrenyValue(item.spread_amount) : '$0',
          spread: item.spread_amount ? item.spread_amount : 0,
          clientContact_name: (
            <figcaption>
              <Heading className="user-name" as="h6">
                {item.clientContact_name}
              </Heading>
              <div className="user-designation"> {item.clientCorporation_name}</div>
            </figcaption>
          ),
          clientName: item.clientContact_name,
          title: (
            <figcaption>
              <Heading className="user-name" as="h6">
                {item.title}
              </Heading>
              <div className="user-designation"> {item.employmentType}</div>
            </figcaption>
          ),
          jobTitle: item.title,
          candidate_nameSorter: item.candidate_name,
          candidate_name: (
            <figcaption>
              <Heading className="user-name" as="h6">
                {item.candidate_name}
              </Heading>
              <div className="user-designation"> {moment(+item.dateBegin).format('MM/DD/YYYY')}</div>
            </figcaption>
          ),
        };
      })
    );
  };
  const onMonthSelect = index => {
    setSelectedMonth(index);
    const month = index;
    const startDate =
      moment
        .utc()
        .month(month)
        .startOf('month')
        .unix() * 1000;
    const endDate =
      moment
        .utc()
        .month(month)
        .endOf('month')
        .unix() * 1000;
    dispatch(getPlacementDetails(startDate, endDate));
  };
  return (
    <Modal
      width={isMobile ? '90%' : '60%'}
      visible={visibility}
      footer={false}
      destroyOnClose
      onCancel={() => setModalVisibility(false)}
    >
      {isLoading ? (
        <Spin style={{ display: 'flex', justifyContent: 'center' }} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
            <PageHeader title={`${graphLabels[selectedMonth]}`} subTitle={'(Placement Details)'} />

            <div style={{ padding: '26px 30px 26px 30px' }}>
              <Select
                defaultValue={`${graphLabels[selectedMonth]}`}
                onChange={onMonthSelect}
                style={{ width: '200px' }}
              >
                {graphLabels.map((item, index) => (
                  <Option value={index}>{item}</Option>
                ))}
              </Select>
            </div>
          </div>
          <Table
            scroll={{ x: true, y: 500 }}
            columns={PLACEMENT_DETAILS_COLUMNS}
            dataSource={getMappedData()}
            pagination={{
              defaultPageSize: 10,
              total: getMappedData().length > 0 ? getMappedData().length : 0,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </div>
      )}
    </Modal>
  );
};

PlacementModal.propTypes = {
  date: propTypes.object,
  visibility: propTypes.bool,
  setModalVisibility: propTypes.func,
};
