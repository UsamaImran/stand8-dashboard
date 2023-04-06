import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { Table } from 'antd';
import { UserTableStyleWrapper } from '../../../pages/style';
import { TableWrapper } from '../../../styled';

const SyntheticTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        title: 'No',
        dataIndex: 'recno',
        key: 'recno',
      },
      {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: 'CustomerFirstName',
        dataIndex: 'customerfirstname',
        key: 'customerfirstname',
      },
      {
        title: 'CustomerLastName',
        dataIndex: 'customerlastname',
        key: 'customerlastname',
      },
      {
        title: 'Street',
        dataIndex: 'street',
        key: 'street',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Zip',
        dataIndex: 'zip',
        key: 'zip',
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: 'Card Type',
        dataIndex: 'cardtype',
        key: 'cardtype',
      },
      {
        title: 'Credit Limit',
        dataIndex: 'creditlimit',
        key: 'creditlimit',
      },
      {
        title: 'BOM Balance',
        dataIndex: 'bombalance',
        key: 'bombalance',
      },
      {
        title: 'Payments',
        dataIndex: 'payments',
        key: 'payments',
      },
      {
        title: 'New Charges',
        dataIndex: 'newcharges',
        key: 'newcharges',
      },
      {
        title: 'Finance Charges',
        dataIndex: 'financecharges',
        key: 'financecharges',
      },
      {
        title: 'Interest',
        dataIndex: 'interest',
        key: 'interest',
      },
      {
        title: 'EOM Balance',
        dataIndex: 'eombalance',
        key: 'eombalance',
      },
      {
        title: 'Days Delinquent',
        dataIndex: 'daysdelinquent',
        key: 'daysdelinquent',
      },
    ],
    [],
  );

  return (
    <UserTableStyleWrapper>
      <TableWrapper className="table-responsive">
        <Table dataSource={data} columns={columns} exportable />
      </TableWrapper>
    </UserTableStyleWrapper>
  );
};

SyntheticTable.propTypes = {
  data: propTypes.array,
};

SyntheticTable.defaultProps = {
  data: [],
};

export default SyntheticTable;
