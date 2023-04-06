import React, { Suspense, useState, useEffect } from 'react';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spin, Skeleton, Select, Button, Table } from 'antd';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { CalendarButtonFilter } from '../../components/buttons/calendar-button/calendar-button-filter';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getRecruiterAlignment, getRecruiterAssignments } from '../../redux/recruiterAlignment/actionCreator';

import { Main, RecruiterAlignmentWrapper } from '../styled';
import { Button as FilterButton } from '../../components/buttons/buttons';

const { Option } = Select;

const RecruiterAlignment = () => {
  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
  });

  const [data, setData] = useState([]);

  const handleChangeDateRange = selectedRange => {
    setDateRange(selectedRange);
  };

  useEffect(() => {
    if (getRecruiterAlignment) {
      dispatch(getRecruiterAlignment());
    }
  }, [dispatch]);

  const handleChange = (email, values) => {
    const newData = [...data];
    if (newData.find(x => x.email === email)) {
      setData(newData.map(x => (x.email === email ? { email, jobIds: values } : x)));
    } else {
      setData([...newData, { email, jobIds: values }]);
    }
  };

  const {
    recruitersAlignment,
    recruitersAlignmentLoading,
    recruitersAssignments,
    recruitersAssignmentsLoading,
  } = useSelector(state => {
    return {
      recruitersAlignment: state.recruitersAlignment.recruitersAlignment,
      recruitersAlignmentLoading: state.recruitersAlignment.recruitersAlignmentLoading,
      recruitersAssignments: state.recruitersAlignment.recruitersAssignments,
      recruitersAssignmentsLoading: state.recruitersAlignment.recruitersAssignmentsLoading,
    };
  });

  const submit = () => {
    dispatch(getRecruiterAssignments(dateRange, data));
  };

  const tableData =
    recruitersAlignment &&
    recruitersAlignment.recruiters.map((item, index) => ({
      ...item,
      key: index,
    }));

  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => {
        return (
          <div>
            <div className="user-name">{record.fullName}</div>
            <div className="user-email">{record.email}</div>
          </div>
        );
      },
    },
    {
      title: 'Job Search / Job Assigned',
      dataIndex: 'prescreens',
      key: 'prescreens',
      responsive: ['md'],
      render: (text, record) => {
        return (
          <div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select jobs"
              defaultValue={[]}
              onChange={e => handleChange(record.email, e)}
            >
              {recruitersAlignment?.openJobs?.map(opt => (
                <Option key={opt.id}>
                  {opt.id}-{opt.title}
                </Option>
              ))}
            </Select>
          </div>
        );
      },
    },
  ];

  const expandedRowRender = e => {
    const jobTableColumns = [
      {
        title: 'Job',
        dataIndex: 'jobId',
        key: 'jobId',
      },
      {
        title: 'Prescreens',
        dataIndex: 'prescreens',
        key: 'prescreens',
      },
      {
        title: 'Submittals',
        dataIndex: 'submissions',
        key: 'submissions',
        responsive: ['md'],
      },
      {
        title: 'Submittals to Customer',
        dataIndex: 'customerSendOut',
        key: 'customerSendOut',
        responsive: ['md'],
      },
    ];
    const mDataSource = recruitersAssignments && recruitersAssignments.filter(item => item.email === e.email);
    const jobTableData =
      recruitersAssignments &&
      mDataSource &&
      mDataSource[0] &&
      mDataSource[0].data.map(item => ({
        key: item.jobId,
        jobId: item.jobId,
        prescreens: item.data[0].count,
        submissions: item.data[2].count,
        customerSendOut: item.data[1].count,
      }));

    return (
      <>
        <Cards title={`${e.fullName} Recruiter`}>
          {recruitersAssignmentsLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : jobTableData ? (
            <Table columns={jobTableColumns} dataSource={jobTableData} bordered pagination={{ pageSize: 5 }} />
          ) : (
            <div>No Data, please select Jobs</div>
          )}
        </Cards>
      </>
    );
  };

  return (
    <>
      <PageHeader
        ghost
        title="Recruiters Alignment"
        buttons={[
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <div key="6" className="page-header-actions" style={{ marginLeft: '10px' }}>
              <CalendarButtonPageHeader key="1" dateRange={dateRange} onChangeDate={handleChangeDateRange} />
              <FilterButton size="small" key="4" type="primary" onClick={() => {}}>
                <CalendarButtonFilter
                  key="salesPerfCustomDateRange"
                  style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                  dateRange={dateRange}
                  onChangeDate={handleChangeDateRange}
                >
                  <FeatherIcon icon="filter" size={14} />
                  &nbsp; Filter
                </CalendarButtonFilter>
              </FilterButton>
            </div>
          </div>,
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
              <Cards title="Recruiters" size="default">
                {recruitersAlignmentLoading ? (
                  <div className="sd-spin">
                    <Spin />
                  </div>
                ) : (
                  <RecruiterAlignmentWrapper>
                    <Table
                      className="table-responsive"
                      pagination={false}
                      dataSource={tableData}
                      columns={columns}
                      expandable={{ expandedRowRender }}
                    />
                    <Row justify="center" gutter={25} className="bottom">
                      <Col xxl={24} xs={24}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => submit()}
                          style={{ width: 120, marginTop: 24, marginLeft: 8, height: 47, marginBottom: 12 }}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </RecruiterAlignmentWrapper>
                )}
              </Cards>
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default RecruiterAlignment;
