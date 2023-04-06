import React from 'react';
import propTypes from 'prop-types';

import './style.css';

const GetCalenderTypeList = ({ list, setCurrentCalender, currentCalender }) => {
  const style = {
    fontSize: '13px',
    fontWeight: '500',
    color: '#9299B8',
    border: '1px solid #F1F2F6',
    borderLeft: '0px',
    display: 'block',
    borderRadius: '4px',
    padding: '6px 13.24px',
    cursor: 'pointer',
  };
  return (
    <ul style={{ display: 'flex' }}>
      {list.map((type, index) => (
        <li
          key={index}
          onClick={() => setCurrentCalender(index)}
          style={currentCalender === index ? { ...style, backgroundColor: '#5F63F2', color: 'white' } : style}
          role="presentation"
          onKeyPress={() => setCurrentCalender(index)}
        >
          {type}
        </li>
      ))}
    </ul>
  );
};

GetCalenderTypeList.propTypes = {
  setCurrentCalender: propTypes.func,
  list: propTypes.array,
  currentCalender: propTypes.string,
};

export default GetCalenderTypeList;
