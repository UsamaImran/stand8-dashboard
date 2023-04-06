import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Typography, Badge } from 'antd';
import placementsPDF from './PlacementsPDF';
import { TrafficTableWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { switchColor } from '../../../../utility/utility';
import { Button } from '../../../../components/buttons/buttons';

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

  const [state, setState] = useState({
    values: {},
    searchText: '',
    searchedColumn: '',
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    modalVisible: false,
    modalData: null,
  });

  const onChange = (pagination, filters, sorter, extra) => {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
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
    },
  ];

  return (
    <TableWrapper>
      {pdfDownload && (
        <Button type="primary" onClick={() => placementsPDF(tableData)} className="pdf-download">
          Download PDF
        </Button>
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
      <table id="placements_report_pdf_table" style={{ display: 'none' }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Contractor</th>
            <th>Placement</th>
            <th>Recruiter</th>
            <th>Salesperson</th>
            <th>End Date</th>
            <th>Days Before End</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {row.contractor}
                  <br />
                  {row.client}
                </td>
                <td>{row.placement_id}</td>
                <td>{row.recruiter}</td>
                <td>{row.salesperson}</td>
                <td>{row.end_date}</td>
                <td>{row.days_before_end}</td>
                <td>{row.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableWrapper>
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
    float: right;
    transform: translate(0px, -60px);
    margin-left: 8px;
  }
  .loading-spin {
    width: 100px;
    height: 100%;
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 40vh;
  }
`;
