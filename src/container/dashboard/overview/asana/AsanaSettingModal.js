import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import { Modal, Input, Form, Button, Spin } from 'antd';

import { asanaSettingsUpdate } from '../../../../redux/asana/actionCreator';

const AsanaSettingModal = ({ modalVisible, hideModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const setHideModal = () => {
    setIsLoading(false);
    hideModal();
  };

  const onFinish = values => {
    dispatch(asanaSettingsUpdate({ ...values, cb: setHideModal }));
  };

  return (
    <Modal title="Asana Settings" visible={modalVisible} onOk={hideModal} onCancel={hideModal} footer={null}>
      {isLoading && (
        <div className="loading-spin">
          <Spin size="large" />
        </div>
      )}
      <div className="asanaSetting-modal">
        <BasicFormWrapper>
          <Form name="asanaSettings" onFinish={onFinish}>
            <Form.Item
              name="clientId"
              label="Client ID"
              rules={[
                {
                  required: true,
                  message: 'Please input Asana Client ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="clientSecret"
              label="Client Secret"
              rules={[
                {
                  required: true,
                  message: 'Please input Asana Client Secret!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="redirectURL"
              label="Redirect URL"
              rules={[
                {
                  required: true,
                  message: 'Please input Asana Redirect URL!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AsanaSettingModal.propTypes = {
  modalVisible: PropTypes.bool,
  hideModal: PropTypes.func,
};

export default AsanaSettingModal;

const BasicFormWrapper = Styled.div`
    .ant-form {
        .form-item{
            margin-bottom: 30px;
            label{
                font-weight: 500;
                display: block;
                margin-bottom: 15px;
            }
            .ant-cascader-picker{
                width: 100%;
                min-height: 48px;
                .ant-cascader-input{
                    min-height: 48px;
                }
            }
        }
        .ant-input-affix-wrapper > input.ant-input{
            padding-top: 12px;
            padding-bottom: 12px;
        }
        .ant-input-affix-wrapper .ant-input-prefix svg{
            color: #9299B8;
        }
    }
    .ant-form-item-control-input{
        min-height: auto !important;
    }
    .ant-form-item{
        flex-flow: column;
        &:not(:last-child){
            margin-bottom: 26px;
        }
        &:last-child{
            margin-bottom: 0;
        }
        .ant-form-item-label{
            text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
            label{
                height: fit-content;
                margin-bottom: 6px;
            }
        }
        .ant-form-item-control-input{
            input,
            textarea{
                color: ${({ theme }) => theme['gray-color']};
                &:placeholder{
                    color: ${({ theme }) => theme['light-color']};
                }
            }
            input[type="password"]{
                padding-top: 12px;
                padding-bottom: 12px;
            }
            .ant-picker-input input{
                padding: 12px;
            }
            button{
                height: 44px;
            }
            .ant-input-affix-wrapper{
                padding: 0 11px;
            }
        }
        .ant-select-single{
            .ant-select-selector{
                padding: 0 20px;
                height: 48px !important;
                border: 1px solid ${({ theme }) => theme['border-color-normal']};
                .ant-select-selection-item{
                    line-height: 46px !important;
                    padding: 0 !important;
                }
                .ant-select-selection-placeholder{
                    line-height: 46px !important;
                }
            }
        }
    }
    .setting-form-actions{
        margin: 48px 0 14px;
        @media only screen and (max-width: 575px){
            margin: 40px 0 14px;
        }
        button{
            border-radius: 6px;
            height: 44px;
            margin-bottom: 14px;
            &.ant-btn-light{
                border: 1px solid ${({ theme }) => theme['border-color-light']};
                background-color: ${({ theme }) => theme['bg-color-light']};
            }
        }
    }
    .ant-form-item-control-input{
        .input-prepend{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            height: 48px;
            border-radius: ${({ theme }) => (theme.rtl ? '0 4px 4px 0' : '4px 0 0 4px')};
            z-index: 10;
            border: 1px solid ${({ theme }) => theme['border-color-normal']};
            background-color: ${({ theme }) => theme['bg-color-light']};
            svg,
            i{
                color: ${({ theme }) => theme['gray-color']};
            }
        }
        .input-prepend-wrap{
            .ant-input-number{
                input{
                    ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 70px;
                }
            }
        }
        .ant-input-number{
            width: 100% !important;
            border: 1px solid ${({ theme }) => theme['border-color-normal']};
        }
    }
    .add-record-form{
        margin: 25px 0 35px 0;
        
        .record-form-actions{
            padding-right: 40px;
        }
        .ant-btn{
            height: 44px;
            font-size: 14px;
            font-weight: 500;
        }
        .ant-radio-group{
            margin-bottom: -4px;
            .ant-radio-wrapper{
                margin-bottom: 4px;
            }
        }
    }
    .adTodo-form{
        .btn-adTodo {
            font-size: 14px;
        }
    }

    .sDash_form-action{
        margin: -7.5px;
        button{
            font-size: 14px;
            font-weight: 500;
            border-radius: 6px;
            margin: 7.5px;
            padding: 6.4px 19px;
            &.ant-btn-light{
                height: 44px;
                background-color: #F1F2F6;
                border-color: #F1F2F6;
            }
        }
        .ant-form-item{
            margin-bottom: 25px !important;
        }
        .ant-btn-light{
            background-color: #F8F9FB;
        }
    }
    .sDash_color-picker{
        border: 1px solid #E3E6EF;
        border-radius: 4px;
        padding: 11px 14px;
        input{
            width: 100%;
            border: 0 none;
            background-color: #fff;
            &::-webkit-color-swatch{
                min-height: 18px;
                border: 1px solid #C6D0DC;
            }
        }
    }
`;
