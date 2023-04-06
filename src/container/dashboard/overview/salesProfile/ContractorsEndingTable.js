import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getContractorsEnding } from '../../../../redux/salesProfile/actionCreator';
import { formatCurrenyValue } from '../../../../utility/utility';

const ContractorsEndingTable = ({ user }) => {
  const { email } = user;
  const dispatch = useDispatch();

  const { contractorsEnding } = useSelector(state => {
    return {
      contractorsEnding: state.salesProfile.contractorsEnding,
    };
  });

  useEffect(() => {
    if (getContractorsEnding && email) {
      dispatch(getContractorsEnding({ email }));
    }
  }, [dispatch, email]);

  const dataSource = [];

  if (contractorsEnding) {
    contractorsEnding.map((ce, index) => {
      let bgColor = 'rgb(255, 77, 79)';
      const color = 'white';
      if (ce.days_until_end > 60) {
        bgColor = 'rgb(82, 196, 26)';
      } else if (ce.days_until_end > 30) {
        bgColor = 'rgb(250, 173, 20)';
      } else {
        bgColor = 'rgb(255, 77, 79)';
      }
      return dataSource.push({
        key: index,
        name: ce.name,
        days_until_end: <Badge count={ce.days_until_end} style={{ backgroundColor: bgColor, color }} />,
        spread: formatCurrenyValue(ce.spread).split('.')[0],
      });
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Days Until End',
      dataIndex: 'days_until_end',
      key: 'days_until_end',
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
    },
  ];

  return (
    <Cards title="Contractors Ending Soon" size="default">
      <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
    </Cards>
  );
};

ContractorsEndingTable.propTypes = {
  user: PropTypes.object,
};

export default ContractorsEndingTable;
