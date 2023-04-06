import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Skeleton, Select } from 'antd';
import { weekStartDate, weekEndDate, weekStartDateTimestamp, weekEndDateTimestamp } from '../../utility/moment';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

import { placementsTableGetData } from '../../redux/placements/actionCreator';

const PlacementsDataTable = lazy(() => import('./overview/placements/PlacementsDataTable'));

const { Option } = Select;

const PlacementsReport = () => {
  const dispatch = useDispatch();
  const { placementsTableData } = useSelector(state => {
    return {
      placementsTableData: state.placementsReducer.placementsTableData,
    };
  });

  const placementCount = placementsTableData?.length;

  const [state, setState] = useState({
    data: placementsTableData,
    weekActive: 0,
  });

  useEffect(() => {
    if (placementsTableGetData) {
      dispatch(
        placementsTableGetData({
          pushed: true,
          start_date: weekStartDateTimestamp(0),
          end_date: weekEndDateTimestamp(0),
        }),
      );
    }
  }, [dispatch]);

  const handleSearch = searchText => {
    const data = placementsTableData.filter(item => item.contractor.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      data,
    });
  };

  useEffect(() => {
    if (placementsTableData) {
      setState({
        data: placementsTableData,
      });
    }
  }, [placementsTableData]);

  const handleActiveChange = value => {
    const currentWSDTimestamp = weekStartDateTimestamp(value);
    const currentWEDTimestamp = weekEndDateTimestamp(value);
    const params = {
      pushed: true,
      start_date: currentWSDTimestamp,
      end_date: currentWEDTimestamp,
    };
    setState({
      ...state,
      weekActive: value,
    });
    dispatch(placementsTableGetData(params));
  };

  return (
    <>
      <PageHeader
        ghost
        title="30/60/90 Report"
        subTitle={
          <>
            <span className="title-counter">{placementCount} Placements </span>
            <AutoComplete
              onSearch={handleSearch}
              dataSource={placementsTableData}
              placeholder="Search by Name"
              width="100%"
              patterns
            />
          </>
        }
        buttons={[
          <Select
            key="1"
            defaultValue={`Week ${weekStartDate(0)} ~ ${weekEndDate(0)}`}
            style={{ marginRight: '150px', width: '280px', height: '32px' }}
            onChange={handleActiveChange}
          >
            <Option value={0}>{`Week ${weekStartDate(0)} ~ ${weekEndDate(0)}`}</Option>
            <Option value={-1}>{`Week ${weekStartDate(-1)} ~ ${weekEndDate(-1)}`}</Option>
            <Option value={-2}>{`Week ${weekStartDate(-2)} ~ ${weekEndDate(-2)}`}</Option>
            <Option value={-3}>{`Week ${weekStartDate(-3)} ~ ${weekEndDate(-3)}`}</Option>
          </Select>,
        ]}
      />
      <Main>
        <Row justify="center" gutter={25}>
          <Col xxl={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <PlacementsDataTable data={state.data} />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default PlacementsReport;
