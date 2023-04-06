import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

import { placementsTableGetData } from '../../redux/placements/actionCreator';

const PlacementsDataTableEdit = lazy(() => import('./overview/placements/PlacementsDataTableEdit'));

const PlacementsReportEdit = () => {
  const dispatch = useDispatch();
  const { placementsTableData } = useSelector(state => state.placementsReducer);

  const placementCount = placementsTableData?.length;

  const [state, setState] = useState({
    data: placementsTableData,
  });

  useEffect(() => {
    if (placementsTableGetData) {
      dispatch(placementsTableGetData({ pushed: false }));
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

  return (
    <>
      <PageHeader
        ghost
        title="30/60/90 Report Edit"
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
              <PlacementsDataTableEdit pdfDownload={false} data={state.data} />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default PlacementsReportEdit;
