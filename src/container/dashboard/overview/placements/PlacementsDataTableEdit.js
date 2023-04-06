import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import { Table, Typography, Spin, Alert, Badge } from 'antd';
import FeatherIcon from 'feather-icons-react';
import PlacementsModal from './PlacementsModal';
import placementsPDF from './PlacementsPDF';
import { TrafficTableWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { switchColor } from '../../../../utility/utility';
import { placementsUpdatePushed } from '../../../../redux/placements/actionCreator';

const { Text } = Typography;

const PlacementsDataTable = ({ pdfDownload, data }) => {
  const tableData =
    data &&
    data
      .slice()
      .sort((a, b) => parseInt(a.days_before_end, 10) - parseInt(b.days_before_end, 10))
      .map(item => ({
        ...item,
        key: item.id,
      }));

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    values: {},
    searchText: '',
    searchedColumn: '',
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    modalVisible: false,
    modalData: null,
    alertVisible: false,
  });

  const onChange = (pagination, filters, sorter, extra) => {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
  };

  const showModal = row => {
    setState({
      ...state,
      modalVisible: true,
      modalData: row,
    });
  };

  const hideModal = () => {
    setState({
      modalVisible: false,
    });
  };

  const setLoading = () => {
    setIsLoading(false);
  };

  const submitReport = () => {
    if (state.selectedRowKeys) {
      setIsLoading(true);
      dispatch(
        placementsUpdatePushed({
          placementsIds: state.selectedRowKeys,
          pushed_date: moment()
            .utc()
            .unix(),
          cb: setLoading,
        }),
      );
    } else if (!state.alertVisible)
      setState({
        ...state,
        alertVisible: true,
      });
  };

  const locationColumns = [
    {
      title: 'Contractor',
      dataIndex: 'contractor',
      key: 'contractor',
      render: (text, record) => {
        return (
          <>
            {text} <br />
            <Text type="secondary" style={{ color: 'rgba(0,0,0,.45)' }}>
              {record.client}
            </Text>
          </>
        );
      },
    },
    {
      title: 'Placement ID',
      dataIndex: 'placement_id',
      key: 'placement_id',
      responsive: ['lg'],
    },
    {
      title: 'Recruiter',
      dataIndex: 'recruiter',
      key: 'recruiter',
      responsive: ['lg'],
    },
    {
      title: 'Salesperson',
      dataIndex: 'salesperson',
      key: 'salesperson',
      responsive: ['lg'],
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      responsive: ['md'],
    },
    {
      title: 'Days Before End',
      dataIndex: 'days_before_end',
      key: 'days_before_end',
      responsive: ['md'],
      render: text => {
        return (
          <>
            <Badge count={text} style={{ backgroundColor: switchColor(text), minWidth: '31px' }} />
          </>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      responsive: ['md'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: text => (
        <div
          onClick={() => showModal(text)}
          onKeyPress={() => showModal(text)}
          key="placement-record-action"
          role="button"
          tabIndex="0"
        >
          <FeatherIcon icon="edit" size={14} />
        </div>
      ),
    },
  ];

  const onCloseAlert = () => {
    setState({
      ...state,
      alertVisible: false,
    });
  };

  return (
    <>
      <TableWrapper>
        {isLoading && (
          <div className="loading-spin">
            <Spin size="large" />
          </div>
        )}
        <Button type="primary" onClick={() => submitReport()} className="pdf-download">
          Submit Report
        </Button>
        {pdfDownload && (
          <Button type="primary" onClick={() => placementsPDF(tableData)} className="pdf-download">
            Download PDF
          </Button>
        )}
        {state.alertVisible && (
          <Alert message="Please select the rows" type="warning" showIcon closable onClose={() => onCloseAlert()} />
        )}
        <div className="full-width-table">
          <Cards headless>
            <TrafficTableWrapper>
              <div className="table-bordered table-responsive">
                <Table
                  columns={locationColumns}
                  dataSource={tableData}
                  onChange={onChange}
                  pagination={false}
                  rowSelection={{
                    type: state.selectionType,
                    ...rowSelection,
                  }}
                />
              </div>
            </TrafficTableWrapper>
          </Cards>
        </div>
        <PlacementsModal data={state?.modalData} hideModal={hideModal} modalVisible={state.modalVisible} />
      </TableWrapper>
    </>
  );
};

PlacementsDataTable.propTypes = {
  data: propTypes.array,
  pdfDownload: propTypes.bool,
};

PlacementsDataTable.defaultProps = {
  data: [],
  pdfDownload: true,
};

export default PlacementsDataTable;

const TableWrapper = styled.div`
  .pdf-download {
    position: absolute;
    top: -65px;
    right: 8px;
  }
  .loading-spin {
    width: 100px;
    height: 100%;
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 40vh;
  }
  .ant-alert-warning {
    margin-bottom: 16px;
  }
`;
