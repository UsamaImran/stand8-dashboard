import { Badge, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getPlacementStartingSoon } from '../../../../redux/recruiterProfile/actionCreator';
import { formatCurrenyValue } from '../../../../utility/utility';

function PlacementsStartingTable({ user }) {
  const { email } = user;
  const dispatch = useDispatch();

  const { placementStartingData } = useSelector(state => {
    return {
      placementStartingData: state.recruiterProfile.placementStartingSoonData,
    };
  });

  useEffect(() => {
    if (getPlacementStartingSoon && email) dispatch(getPlacementStartingSoon(email));
  }, [email, dispatch]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Days Starting',
      dataIndex: 'days_until_start',
      key: 'days_until_start',
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
    },
  ];

  const filteredData =
    placementStartingData && placementStartingData.filter(placement => placement.days_until_start > 0);
  filteredData.sort((a, b) => a.days_until_start - b.days_until_start);
  const getMappedData = () => {
    return filteredData.map(item => {
      return {
        ...item,
        name: (
          <div>
            {item.name} <br /> <span style={{ color: 'gray', fontSize: '12px' }}>{item.employmentType}</span>
          </div>
        ),
        spread: formatCurrenyValue(item.spread.toFixed(2)).split('.')[0],
        days_until_start: (
          <Badge
            count={item.days_until_start}
            style={{ backgroundColor: item.days_until_start < 30 ? 'rgb(82, 196, 26)' : 'rgb(250, 173, 20)' }}
          />
        ),
      };
    });
  };

  return (
    <Cards title="Placements Starting Soon" size="default">
      <Table columns={columns} dataSource={getMappedData()} pagination={false} />
    </Cards>
  );
}

export default PlacementsStartingTable;
