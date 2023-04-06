import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

import FeatherIcon from 'feather-icons-react';
import SyntheticTable from './overview/synthetic/SyntheticTable';
import FinancialForm from './overview/synthetic/FinancialForm';
import RentalHistoryForm from './overview/synthetic/RentalHistoryForm';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button as CSVButton } from '../../components/buttons/buttons';

const { Option } = Select;

const keysMap = [
  'recno',
  'account',
  'customerfirstname',
  'customerlastname',
  'street',
  'city',
  'zip',
  'state',
  'cardtype',
  'creditlimit',
  'bombalance',
  'newcharges',
  'payments',
  'financecharges',
  'interest',
  'eombalance',
  'daysdelinquent',
];

const SyntheticData = () => {
  const { syntheticdata, isLoading } = useSelector(state => {
    return {
      syntheticdata: state.syntheticdataReducer.syntheticdata,
      isLoading: state.syntheticdataReducer.syntheticdataLoading,
    };
  });

  const [selectedOption, setSelectedOption] = useState('synthetic_data_demos');

  const source = useMemo(
    () =>
      syntheticdata?.map(row => {
        const rowData = row
          .split(', ')
          .map((item, index) => {
            const cellKey = keysMap[index];
            if (cellKey) {
              return {
                [cellKey]: item.replace(/'/g, ''),
              };
            }
            return null;
          })
          .filter(x => x);

        return Object.assign(...rowData);
      }),
    [syntheticdata],
  );

  const handleChange = value => {
    setSelectedOption(value);
  };

  return (
    <SyntheticWrapper>
      {isLoading && (
        <div className="spinner-wrapper">
          <div className="loading-spin">
            <Spin size="large" />
          </div>
        </div>
      )}

      <PageHeader
        ghost
        title={<StyledTitle src={require('../../static/img/s8-synthetic.png')} alt="stand 8 synthetic logo" />}
        buttons={[
          <div key="6">
            <Select defaultValue={selectedOption} style={{ width: 200 }} onChange={handleChange}>
              <Option value="synthetic_data_demos">Financial</Option>
              <Option value="synthetic_data_rentalhistory_demos">Mortgage Application</Option>
              <Option value="synthetic_data_telecom_demos">Telecom</Option>
              <Option value="synthetic_data_healthcare_demos">Healthcare</Option>
            </Select>
          </div>,
        ]}
      />

      {selectedOption !== 'synthetic_data_rentalhistory_demos' && <FinancialForm />}
      {selectedOption === 'synthetic_data_rentalhistory_demos' && <RentalHistoryForm />}

      <StyledMain>
        <Cards
          isbutton={
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                top: '3px',
              }}
            >
              <div key="6" className="page-header-actions" style={{ marginLeft: '10px' }}>
                {source && (
                  <CSVLink
                    filename="Synthetic Data Report.csv"
                    data={source}
                    type="primary"
                    className="btn btn-primary"
                  >
                    <CSVButton size="small" key="4" type="primary">
                      <FeatherIcon size={16} icon="file" />
                      Export to CSV
                    </CSVButton>
                  </CSVLink>
                )}
              </div>
            </div>
          }
          title="Synthetic Data"
          size="large"
        >
          <SyntheticTable data={source} />
        </Cards>
      </StyledMain>
    </SyntheticWrapper>
  );
};

export default SyntheticData;

const SyntheticWrapper = styled.div`
  .spinner-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #f4f5f798;
    z-index: 500;
    .loading-spin {
      position: absolute;
      z-index: 999;
      left: 40vw;
      top: 50vh;
    }
  }
`;

const StyledTitle = styled.img`
  height: 38px;
`;

const StyledMain = styled.div`
  background-color: white;
  margin: 0px 30px 20px;
  padding: 2rem;
  label {
    color: red;
  }
  .ant-form-item {
    display: block;
  }
  .ant-form-item-control-input-content {
    display: flex;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 48px !important;
    display: flex;
    align-items: center;
  }

  .ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector {
    border-color: #f5222d !important;
  }

  .ant-form-item-has-error
    .ant-input-group-addon
    .ant-select.ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px solid;
  }

  .ant-card-head {
    border: 0px;
  }

  .ant-card-body {
    padding-top: 0px !important;
  }
`;
