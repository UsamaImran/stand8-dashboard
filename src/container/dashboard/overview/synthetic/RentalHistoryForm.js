import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Form, Button, Select } from 'antd';
import styled from 'styled-components';
import { states } from '../../../../components/utilities/states';

import { getRentalHistory } from '../../../../redux/syntheticdata/actionCreator';

const { Option } = Select;

const RentalHistoryForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [preSelector, setPreSelector] = useState({
    recordLengthMonth: 'all',
    pastDue: 'all',
    creditScore: 'all',
    securedDebt: 'all',
    unsecuredDebt: 'all',
  });

  const handleChange = (fieldName, value) => {
    setPreSelector({
      ...preSelector,
      [fieldName]: value,
    });
  };

  const onFinish = values => {
    dispatch(
      getRentalHistory({
        state: values.state === undefined ? null : values.state,
        recordLengthMonth: values.recordLengthMonth === undefined ? null : values.recordLengthMonth,
        prefixRecordLengthMonth: values.prefixrecordLengthMonth,
        pastDue: values.pastDue === undefined ? null : values.pastDue,
        prefixPastDue: values.prefixPastDue,
        creditScore: values.creditScore === undefined ? null : values.creditScore,
        prefixCreditScore: values.prefixcreditScore,
        securedDebt: values.securedDebt === undefined ? null : values.securedDebt,
        prefixSecuredDebt: values.prefixSecuredDebt,
        unsecuredDebt: values.unsecuredDebt === undefined ? null : values.unsecuredDebt,
        prefixUnsecuredDebt: values.prefixUnsecuredDebt,
        judgements: values.judgements === undefined ? null : values.judgements,
        criminalRecord: values.criminalRecord === undefined ? null : values.criminalRecord,
        recordCount: values.recordCount === undefined ? 10 : values.recordCount,
      }),
    );
    setPreSelector({
      recordLengthMonth: 'all',
      pastDue: 'all',
      creditScore: 'all',
      securedDebt: 'all',
      unsecuredDebt: 'all',
    });
  };

  const prefixSelector = prefixValue => (
    <Form.Item name={`prefix${prefixValue}`} noStyle initialValue="all">
      <Select
        value={preSelector[prefixValue]}
        style={{ width: 80 }}
        defaultValue="all"
        onChange={value => handleChange(prefixValue, value)}
      >
        <Option value="all">ALL</Option>
        <Option value="eq">=</Option>
        <Option value="greater">{'>'}</Option>
        <Option value="less">{'<'}</Option>
      </Select>
    </Form.Item>
  );

  return (
    <StyledMain>
      <Title>Mortgage Application</Title>
      <Form name="placement" form={form} onFinish={onFinish}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item name="state" style={{ flex: 1 }} label="State">
            <Select style={{ width: '100%' }} placeholder="Select a state">
              {states.map(item => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="recordLengthMonth"
            label="Record Length (Month)"
            style={{ flex: 1 }}
            rules={[
              { required: preSelector.recordLengthMonth !== 'all', message: 'Record Length (Month) is required' },
            ]}
          >
            <Input addonBefore={prefixSelector('recordLengthMonth')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="pastDue"
            label="Past Due"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.pastDue !== 'all', message: 'Past Due is required' }]}
          >
            <Input addonBefore={prefixSelector('pastDue')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="creditScore"
            label="Credit Score"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.creditScore !== 'all', message: 'Credit Score is required' }]}
          >
            <Input addonBefore={prefixSelector('creditScore')} placeholder="Enter Value" />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item
            name="securedDebt"
            label="Secured Debt"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.securedDebt !== 'all', message: 'Secured Debt is required' }]}
          >
            <Input addonBefore={prefixSelector('securedDebt')} placeholder="Enter Value" />
          </Form.Item>

          <Form.Item
            name="unsecuredDebt"
            label="Unsecured Debt"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.unsecuredDebt !== 'all', message: 'Unsecured Debt is required' }]}
          >
            <Input addonBefore={prefixSelector('unsecuredDebt')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item name="judgements" label="Judgements" style={{ flex: 1 }} initialValue="all">
            <Select style={{ flex: 1 }} defaultValue="all">
              <Option value="all">ALL</Option>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <Form.Item name="criminalRecord" label="Criminal Record" style={{ flex: 1 }} initialValue="all">
            <Select style={{ flex: 1 }} defaultValue="all">
              <Option value="all">ALL</Option>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
            <div style={{ flex: 1 }} />

            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
              <Form.Item name="recordCount" label="Record Count(Ex: 10, 20, 30...)" style={{ flex: 1 }}>
                <Input placeholder="Enter Value" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 120, marginLeft: 8, height: 47, marginBottom: 24 }}
              >
                Submit
              </Button>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }} />
          </div>
        </div>
      </Form>
    </StyledMain>
  );
};

export default RentalHistoryForm;

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

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 30px;
`;
