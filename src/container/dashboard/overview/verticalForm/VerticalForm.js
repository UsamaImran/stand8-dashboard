import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { idealteamplayer } from '../../../../redux/IdealTeamPlayer/actionCreators';
import { BasicFormWrapper } from '../../../styled';

const VerticalForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => {
    return {
      isLoading: state.IdealTeamPlayerReducer.isLoading,
    };
  });

  const onSubmit = values => {
    const { player_name: playerName, nominating_reason: nominatingReason } = values;

    dispatch(
      idealteamplayer(
        {
          playerName,
          nominatingReason,
        },
        form,
      ),
    );
  };

  return (
    <BasicFormWrapper>
      <VerticalFormStyleWrap>
        <Cards title="Ideal Team Player">
          <Form layout="vertical" form={form} name="ideal-team-player" onFinish={onSubmit}>
            <Form.Item
              rules={[{ required: true }]}
              name="player_name"
              label="Name of the team member you are nominating?"
            >
              <Input placeholder="Name of employee" size="large" disabled={isLoading} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name="nominating_reason"
              label="Why are you nominating this person?"
            >
              <Input placeholder="Explain why" size="large" disabled={isLoading} />
            </Form.Item>
            <div className="sDash_form-action" style={{ paddingBottom: '90px' }}>
              <Button
                className="btn-signin"
                type="primary"
                size="large"
                htmlType="submit"
                disabled={isLoading}
                loading={isLoading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Cards>
      </VerticalFormStyleWrap>
    </BasicFormWrapper>
  );
};

export { VerticalForm };
