import React, { useMemo, useEffect, useState } from 'react';
import { round } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import moment, { utc } from 'moment';
import { Row, Col, Typography } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PlacementModal } from './PlacementDetails';
import { CardBarChart2, EChartCard } from '../../style';
import Heading from '../../../../components/heading/heading';
import { ChartjsBarChartTransparent } from '../../../../components/charts/chartjs';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getCompanyOverview } from '../../../../redux/companyOverview/actionCreator';
import { formatCurrenyValue } from '../../../../utility/utility';
import { graphLabels } from '../../../../constants';

const { Text } = Typography;

const chartOptions = {
  legend: {
    display: false,
    labels: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

const monthAndYearLabel = graphLabels.slice(0, moment().month()).map(item => `${item} ${new Date().getFullYear()}`);

const CompanyCardSection = () => {
  const dispatch = useDispatch();
  const [rangeText, setRangeText] = useState();
  const [placementModalVisible, setPlacementModalVisible] = useState(false);
  const [placementDate, setPlacementDate] = useState({ startDate: '', endDate: '' });

  const {
    companyOverview,
    // companyOverviewLoading,
    // companyOverviewErr
  } = useSelector(state => {
    return {
      companyOverview: state.companyOverview.companyOverview,
      companyOverviewLoading: state.companyOverview.companyOverviewLoading,
      // companyOverviewErr: state.companyOverview.companyOverviewErr,
    };
  });

  const { currentMonthSpread, currentMonthJobOrders, currentMonthPlacements, currentMonthInterviews } = useMemo(() => {
    return {
      currentMonthSpread:
        companyOverview && companyOverview.spread.find(ele => ele.date_part === moment().month() + 1)?.sum,
      currentMonthJobOrders:
        companyOverview && companyOverview.jobOrders.find(ele => ele.date_part === moment().month() + 1)?.count,
      currentMonthPlacements:
        companyOverview && companyOverview.placements.find(ele => ele.date_part === moment().month() + 1)?.count,
      currentMonthInterviews:
        companyOverview && companyOverview.interviews.find(ele => ele.date_part === moment().month() + 1)?.count,
    };
  }, [companyOverview]);

  const { spreadPercent, jobOrdersPercent, placementsPercent, interviewsPercent } = useMemo(() => {
    return {
      spreadPercent: companyOverview && round(companyOverview.spreadPercent, 2),
      jobOrdersPercent: companyOverview && round(companyOverview.jobOrdersPercent, 2),
      placementsPercent: companyOverview && round(companyOverview.placementsPercent, 2),
      interviewsPercent: companyOverview && round(companyOverview.interviewsPercent, 2),
    };
  }, [companyOverview]);

  useEffect(() => {
    const startDate =
      moment
        .utc()
        .startOf('year')
        .unix() * 1000;
    const endDate = moment.utc().unix() * 1000;

    if (getCompanyOverview) {
      dispatch(getCompanyOverview(startDate, endDate));
    }
  }, [dispatch]);

  useEffect(() => {
    const startDate = moment
      .utc()
      .startOf('month')
      .format('DD MMM');
    const endDate = moment.utc().format('DD MMM');
    setRangeText(`${startDate} - ${endDate}`);
  }, []);

  const onHoverBar = element => {
    if (element && element.length > 0) {
      // const index = element[0]._index
      // const startDate = moment(new Date(0, index, moment().date())).startOf('month').format('DD MMM');
      // const endDate = moment(new Date(0, index, moment().date())).format('DD MMM')
      // setRangeText(startDate + " - " + endDate)
    }
  };

  const onPlacementClickHandler = element => {
    if (element.length > 0) {
      // eslint-disable-next-line no-underscore-dangle
      const month = element[0]._index;
      console.log('month', month);
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
      setPlacementDate({ startDate, endDate });
      setPlacementModalVisible(true);
    }
  };

  const oncurrentCardClickHandler = () => {
    const month = moment().month();
    console.log('month', month);
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
    setPlacementDate({ startDate, endDate });
    setPlacementModalVisible(true);
  };

  return (
    <>
      <Row style={{ margin: '0px 0px 10px 0px' }}>
        <Col>
          <Text keyboard>{rangeText}</Text>
        </Col>
      </Row>
      <Row gutter={25}>
        <Col xxl={6} md={12} sm={12} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">
                    {currentMonthSpread ? `${formatCurrenyValue(currentMonthSpread)}` : `$${0}`}
                  </Heading>
                  <span>Spread</span>
                  <p>
                    <span className={spreadPercent >= 0 ? 'growth-upward' : 'growth-downward'}>
                      <FeatherIcon icon={spreadPercent >= 0 ? 'arrow-up' : 'arrow-down'} />
                      {Math.abs(spreadPercent)}%
                    </span>
                    <span>Since last month</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="card-chunk">
                <ChartjsBarChartTransparent
                  labelPrefix="$"
                  labels={monthAndYearLabel}
                  datasets={[
                    {
                      data: companyOverview?.spread.map(({ sum }) => sum),
                      backgroundColor: '#EFEFFE',
                      hoverBackgroundColor: '#5F63F2',
                      label: 'Spread',
                      barPercentage: 1,
                    },
                  ]}
                  options={{
                    ...chartOptions,
                    onHover: (e, element) => {
                      onHoverBar(element);
                    },
                  }}
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={6} md={12} sm={12} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">{currentMonthJobOrders || 0}</Heading>
                  <span>Job Orders</span>
                  <p>
                    <span className={jobOrdersPercent >= 0 ? 'growth-upward' : 'growth-downward'}>
                      <FeatherIcon icon={jobOrdersPercent >= 0 ? 'arrow-up' : 'arrow-down'} />
                      {Math.abs(jobOrdersPercent)}%
                    </span>
                    <span>Since last month</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="card-chunk">
                <ChartjsBarChartTransparent
                  labels={monthAndYearLabel}
                  datasets={[
                    {
                      data: companyOverview?.jobOrders.map(({ count }) => count),
                      backgroundColor: '#FFF0F6',
                      hoverBackgroundColor: '#FF69A5',
                      label: 'Job Orders',
                      barPercentage: 1,
                    },
                  ]}
                  options={{
                    ...chartOptions,
                    onHover: (e, element) => {
                      onHoverBar(element);
                    },
                  }}
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>

        <Col xxl={6} md={12} sm={12} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">{currentMonthInterviews || 0}</Heading>
                  <span>Interviews</span>
                  <p>
                    <span className={interviewsPercent >= 0 ? 'growth-upward' : 'growth-downward'}>
                      <FeatherIcon icon={interviewsPercent >= 0 ? 'arrow-up' : 'arrow-down'} />
                      {Math.abs(interviewsPercent)}%
                    </span>
                    <span>Since last month</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="card-chunk">
                <ChartjsBarChartTransparent
                  labels={monthAndYearLabel}
                  datasets={[
                    {
                      data: companyOverview?.interviews.map(({ count }) => count),
                      backgroundColor: '#E8FAF4',
                      hoverBackgroundColor: '#20C997',
                      label: 'Interviews',
                      barPercentage: 1,
                    },
                  ]}
                  options={{
                    ...chartOptions,
                    onHover: (e, element) => {
                      onHoverBar(element);
                    },
                  }}
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={6} md={12} sm={12} xs={24}>
          <Cards headless>
            <EChartCard>
              <div
                className="card-chunk"
                onClick={() => oncurrentCardClickHandler()}
                style={{ cursor: 'pointer' }}
                title="Click to view detials of this month"
              >
                <CardBarChart2>
                  <Heading as="h1">{currentMonthPlacements || 0}</Heading>
                  <span>Placements</span>
                  <p>
                    <span className={placementsPercent >= 0 ? 'growth-upward' : 'growth-downward'}>
                      <FeatherIcon icon={placementsPercent >= 0 ? 'arrow-up' : 'arrow-down'} />
                      {Math.abs(placementsPercent)}%
                    </span>
                    <span>Since last month</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="card-chunk">
                <ChartjsBarChartTransparent
                  barStyle={{ cursor: 'pointer' }}
                  labels={monthAndYearLabel}
                  datasets={[
                    {
                      data: companyOverview?.placements.map(({ count }) => count),
                      backgroundColor: '#E9F5FF',
                      hoverBackgroundColor: '#2C99FF',
                      label: 'Placements',
                      barPercentage: 1,
                    },
                  ]}
                  options={{
                    ...chartOptions,
                    onHover: (e, element) => {
                      onHoverBar(element);
                    },
                    onClick: (e, element) => {
                      onPlacementClickHandler(element);
                    },
                  }}
                />
              </div>
            </EChartCard>
          </Cards>
          {placementModalVisible && (
            <PlacementModal
              visibility={placementModalVisible}
              setModalVisibility={setPlacementModalVisible}
              date={placementDate}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompanyCardSection;
