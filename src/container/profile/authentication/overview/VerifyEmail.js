// Todo: need to remove axios

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Button } from '../../../../components/buttons/buttons';

const VerifyEmail = () => {
  const { token } = useParams();
  const [resMsg, setResMsg] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/verify-email/${token}`)
      .then(({ data }) => {
        setResMsg(data.message);
      })
      .catch(err => {
        setResMsg(err.response.data.message);
      });
  });

  return (
    <div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h1>{resMsg}</h1>
        <Link to="/login">
          <Button size="default" type="primary" block>
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(VerifyEmail);
