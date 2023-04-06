import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Form, Button, Select } from 'antd';
import styled from 'styled-components';

import { getSyntheticdata } from '../../../../redux/syntheticdata/actionCreator';

const { Option } = Select;

const FinancialForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [preSelector, setPreSelector] = useState({
    creditLimit: 'all',
    endBalance: 'all',
    newCharges: 'all',
    beginningBalance: 'all',
    payments: 'all',
    financeCharges: 'all',
    interest: 'all',
  });

  const onFinish = values => {
    dispatch(
      getSyntheticdata({
        cardtype: values.cardType,
        creditlimit: values.creditLimit === undefined ? null : values.creditLimit,
        prefixCreditlimit: values.prefixcreditLimit,

        bombalance: values.beginningBalance === undefined ? null : values.beginningBalance,
        prefixBombalance: values.prefixbeginningBalance,

        newcharges: values.newCharges === undefined ? null : values.newCharges,
        prefixNewcharges: values.prefixnewCharges,

        payments: values.payments === undefined ? null : values.payments,
        prefixPayments: values.prefixpayments,

        interest: values.interest === undefined ? null : values.interest,
        prefixInterest: values.prefixinterest,

        financecharges: values.financeCharges === undefined ? null : values.financeCharges,
        prefixFinanceCharges: values.prefixfinanceCharges,

        eombalance: values.endBalance === undefined ? null : values.endBalance,
        prefixEombalance: values.prefixendBalance,

        daysdelinquent: values.days,
        recordCount: values.recordCount === undefined ? 10 : values.recordCount,
      }),
    );
    setPreSelector({
      creditLimit: 'all',
      beginningBalance: 'all',
      payments: 'all',
      newCharges: 'all',
      financeCharges: 'all',
      interest: 'all',
      endBalance: 'all',
    });
  };

  const handleChange = (fieldName, value) => {
    setPreSelector({
      ...preSelector,
      [fieldName]: value,
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
      <Title>Financial</Title>
      <Form name="placement" form={form} onFinish={onFinish}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item
            name="creditLimit"
            label="Credit Limit"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.creditLimit !== 'all', message: 'Credit Limit is required' }]}
          >
            <Input addonBefore={prefixSelector('creditLimit')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="beginningBalance"
            label="Beginning of Month Balance"
            style={{ flex: 1 }}
            rules={[
              { required: preSelector.beginningBalance !== 'all', message: 'Beginning of Month Balance is required' },
            ]}
          >
            <Input addonBefore={prefixSelector('beginningBalance')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="payments"
            label="Payments"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.payments !== 'all', message: 'Beginning of Month Balance is required' }]}
          >
            <Input addonBefore={prefixSelector('payments')} placeholder="Enter Value" />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item
            name="newCharges"
            label="New Charges"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.newCharges !== 'all', message: 'New Charges is required' }]}
          >
            <Input addonBefore={prefixSelector('newCharges')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="financeCharges"
            label="Finance Charges"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.financeCharges !== 'all', message: 'Finance Charges is required' }]}
          >
            <Input addonBefore={prefixSelector('financeCharges')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item name="cardType" label="Card Type" style={{ flex: 1 }} initialValue="ALL">
            <Select style={{ width: 180 }} defaultValue="ALL">
              <Option value="ALL">ALL</Option>
              <Option value="PLATINUM">PLATINUM</Option>
              <Option value="SILVER">SILVER</Option>
              <Option value="GOLD">GOLD</Option>
            </Select>
          </Form.Item>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item
            name="interest"
            label="Interest"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.interest !== 'all', message: 'Interested is required' }]}
          >
            <Input addonBefore={prefixSelector('interest')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="endBalance"
            label="End of Month Balance"
            style={{ flex: 1 }}
            rules={[{ required: preSelector.endBalance !== 'all', message: 'End of Month Balance is required' }]}
          >
            <Input addonBefore={prefixSelector('endBalance')} placeholder="Enter Value" />
          </Form.Item>
          <Form.Item name="days" label="Days Delinquent" style={{ flex: 1 }} initialValue="all">
            <Select style={{ width: 180 }} defaultValue="all">
              <Option value="all">ALL</Option>
              <Option value="lessZero">{'< 0'}</Option>
              <Option value="lessFifteen">{'< 15 Days'}</Option>
              <Option value="lessMonth">{'< 30 Days'}</Option>
              <Option value="greaterMonth">{'> 30 Days'}</Option>
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
            <div style={{ flex: 1 }} />
          </div>
        </div>
      </Form>
    </StyledMain>
  );
};

export default FinancialForm;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 30px;
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
