import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, Input, Form, Select, Button, Spin } from 'antd';
import { AddPortfolio, BasicFormWrapper } from './styled';
import { asanaPortfolioAdd, asanaPortfolioEdit } from '../../../../redux/asanaPortfolio/actionCreators';

const { Option } = Select;

const AsanaPortfolioModal = ({ data, hideModal, modalVisible }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const setHideModal = () => {
    form.resetFields();
    setIsLoading(false);
    hideModal();
  };

  const onFinish = values => {
    setIsLoading(true);
    const { portfolio_id: portfolioId, name, description = '', active } = values;
    if (data.edit) {
      dispatch(
        asanaPortfolioEdit({
          editId: data.id,
          portfolioId,
          name,
          description,
          active,
          cb: setHideModal,
          editData: { ...data, portfolioId, name, description, active: active === 'true' },
        }),
      );
    } else {
      dispatch(
        asanaPortfolioAdd({
          portfolioId,
          name,
          description,
          active,
          cb: setHideModal,
        }),
      );
    }
  };

  return (
    <Modal title="Add Portfolio" visible={modalVisible} onOk={hideModal} onCancel={hideModal} footer={null}>
      <div className="project-modal">
        <AddPortfolio>
          {isLoading && (
            <div className="loading-spin">
              <Spin size="large" />
            </div>
          )}
          <BasicFormWrapper>
            <Form
              form={form}
              name="portfolio"
              onFinish={onFinish}
              initialValues={{ ...data, active: data?.active?.toString() || 'true' }}
            >
              <Form.Item name="portfolio_id" rules={[{ required: true }]}>
                <Input placeholder="Portfolio Id" disabled={isLoading} />
              </Form.Item>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" disabled={isLoading} />
              </Form.Item>
              <Form.Item name="description">
                <Input placeholder="Description" disabled={isLoading} />
              </Form.Item>

              <Form.Item name="active" label="Status">
                <Select
                  name="active"
                  defaultValue={data?.recruiter || 'true'}
                  style={{ width: '100%' }}
                  disabled={isLoading}
                >
                  <Option value="true">Active</Option>
                  <Option value="false">Inactive</Option>
                </Select>
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
                  <Form.Item>
                    <Button htmlType="button" onClick={hideModal} styles={{ marginRight: '20px' }} disabled={isLoading}>
                      Cancel
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isLoading}>
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </BasicFormWrapper>
        </AddPortfolio>
      </div>
    </Modal>
  );
};

AsanaPortfolioModal.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool,
};

export default AsanaPortfolioModal;
