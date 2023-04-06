/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Styled from 'styled-components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, Select, DatePicker, Button, Spin } from 'antd';
import {
  placementsCorporateUsers,
  placementUpdateData,
  placementDeleteById,
} from '../../../../redux/placements/actionCreator';

const { Option } = Select;
const dateFormat = 'MM-DD-YYYY';

// eslint-disable-next-line react/prop-types
const PlacementsModal = ({ data, hideModal, modalVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { placementsCorporateUsersData } = useSelector(state => {
    return {
      placementsCorporateUsersData: state.placementsReducer.placementsCorporateUsersData,
    };
  });

  useEffect(() => {
    if (placementsCorporateUsers) {
      dispatch(placementsCorporateUsers());
    }
  }, [dispatch]);

  const setHideModal = () => {
    setIsLoading(false);
    hideModal();
  };

  const deletePlacement = () => {
    // eslint-disable-next-line camelcase
    const { placement_id } = data;
    dispatch(
      placementDeleteById({
        placement_id,
        cb: setHideModal,
      }),
    );
  };

  const onFinish = values => {
    setIsLoading(true);
    const { salesperson, recruiter, notes, enddate } = values;
    // eslint-disable-next-line camelcase
    const { id, candidate_id, placement_id } = data;
    // eslint-disable-next-line camelcase
    const updatedEndDate = enddate === 'undefined' ? null : enddate?.utc().unix() * 1000;
    const salespersonUser =
      salesperson === 'undefined' ? null : placementsCorporateUsersData.filter(user => user.value === salesperson);
    const recruiterUser =
      recruiter === 'undefined' ? null : placementsCorporateUsersData.filter(user => user.value === recruiter);
    dispatch(
      placementUpdateData({
        id,
        candidate_id,
        placement_id,
        salesperson,
        recruiter,
        notes,
        updatedEndDate,
        salespersonUserName: salespersonUser[0] && salespersonUser[0].label,
        recruiterUserName: recruiterUser[0] && recruiterUser[0].label,
        cb: setHideModal,
      }),
    );
  };

  return (
    <Modal title="Edit Placements" visible={modalVisible} onOk={hideModal} onCancel={hideModal} footer={null}>
      <div className="project-modal">
        <AddUser>
          {isLoading && (
            <div className="loading-spin">
              <Spin size="large" />
            </div>
          )}
          <BasicFormWrapper>
            <Form name="placement" onFinish={onFinish}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <Form.Item name="placementid" style={{ flex: 1 }}>
                  <Input defaultValue={data?.placement_id} disabled />
                </Form.Item>
                <Form.Item name="person" style={{ flex: 1 }}>
                  <Input defaultValue={data?.contractor} disabled />
                </Form.Item>
              </div>

              <Form.Item name="company">
                <Input defaultValue={data?.client} disabled />
              </Form.Item>

              <Form.Item name="salesperson" label="Salesperson">
                <Select defaultValue={data?.salesperson} style={{ width: '100%' }} disabled={isLoading}>
                  {placementsCorporateUsersData?.map((user, index) => {
                    return (
                      <Option value={user.value} key={index}>
                        {user.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item name="recruiter" label="Recruiter">
                <Select defaultValue={data?.recruiter} style={{ width: '100%' }} disabled={isLoading}>
                  {placementsCorporateUsersData?.map((user, index) => {
                    return (
                      <Option value={user.value} key={index}>
                        {user.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item name="enddate" label="End Date">
                <DatePicker
                  // eslint-disable-next-line react/prop-types
                  defaultValue={moment(data?.end_date, dateFormat)}
                  format={dateFormat}
                  style={{ width: '100%' }}
                  disabled={isLoading}
                />
              </Form.Item>
              <Form.Item name="notes">
                <Input placeholder="Notes" disabled={isLoading} />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flex: 1 }}>
                <Form.Item>
                  <Button
                    htmlType="button"
                    onClick={deletePlacement}
                    styles={{ marginRight: '20px' }}
                    disabled={isLoading}
                    danger
                  >
                    Delete
                  </Button>
                </Form.Item>
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
        </AddUser>
      </div>
    </Modal>
  );
};

export default PlacementsModal;

const AddUser = Styled.div`
  .loading-spin {
    width: 100px;
    height: 100%;
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
  }
  .form-title{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 36px;
  }
  .add-user-wrap{
   $: 
  }
  .add-user-bottom{
    margin-top: 20px;
    button + button{
      ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
    }
    .ant-btn-light{
      background: ${({ theme }) => theme['bg-color-light']};
      border: 1px solid #F1F2F6;
    }
    &.text-right{
      @media only screen and (max-width: 767px){
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')} !important;
      }
    }
  }
  .card-nav{
    ul{
      flex-wrap: wrap;
      margin-bottom: -4px -10px;
      @media only screen and (max-width: 575px){
        justify-content: center;
      }
      li{
        margin: 4px 10px !important;
        &:not(:last-child){
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 26px;
          @media only screen and (max-width: 575px){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
          }
        }
        a{
          position: relative;
          padding: 22px 0;
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme['gray-color']};
          @media only screen and (max-width: 575px){
            padding: 0;
          }
          &:after{
            position: absolute;
            ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 0;
            bottom: -4px;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            content: '';
            opacity: 0;
            visibility: hidden;
            background-color: ${({ theme }) => theme['primary-color']};
            @media only screen and (max-width: 575px){
              display: none;
            }
          }
          &.active{
            color: ${({ theme }) => theme['primary-color']};
            &:after{
              opacity: 1;
              visibility: visible;
            }
            svg,
            img,
            i,
            span{
              color: ${({ theme }) => theme['primary-color']};
            }
          }
          svg,
          img,
          i,
          span{
            color: ${({ theme }) => theme['light-color']};
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
          }
        }
      }
    }
  }

  /* // Photo Upload */
  .photo-upload{
    position: relative;
    max-width: 260px;
    margin-bottom: 30px;
    .ant-upload-select{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      position: absolute;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 85px;
      bottom: 5px;
      z-index: 10;
      background-color: ${({ theme }) => theme['white-color']};
      span{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        z-index: -1;
        background-color: ${({ theme }) => theme['primary-color']};
      }
      svg,
      i,
      span{
        color: ${({ theme }) => theme['white-color']};
      }
      a{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    img{
      border-radius: 50%;
    }
    .info{
      background-color: transparent;
    }
    figcaption{
      ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
      .info{
        h1,
        h2,
        h3,
        h4,
        h5,
        h6{
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
  }

  .user-work-form{
    .ant-picker{
      padding: 0 15px 0 0;
    }
  }
  .user-info-form{
    .ant-select-single .ant-select-selector .ant-select-selection-item{
      color: ${({ theme }) => theme['gray-color']};
    }
  }
  .social-form{
    .ant-form-item-control-input-content{
      .ant-input-prefix{
        width: 44px;
        height: 44px;
        border-radius: 4px;
      }
    }
    .ant-form-item-control-input{
      height: 44px;
      .ant-input-affix-wrapper{
        &:hover,
        &:focus,
        &.ant-input-affix-wrapper-focused{
          border-color: #E3E6EF;
        }
        .ant-input{
          height: 42px;
          ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 0;
        }
      }
    }
    .ant-input-prefix{
      position: relative;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: -11px;
      span{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme['primary-color']};
        i,
        svg,
        span.fa{
          color: #fff;
          font-size: 16px;
        }
        .fa-facebook{
          background-color: #3B5998;
        }
        .fa-twitter{
          background-color: #38B8FF;
        }
        .fa-linkedin{
          background-color: #2CAAE1;
        }
        .fa-instagram{
          background-color: #FF0300;
        }
        .fa-github{
          background-color: #292929;
        }
        .fa-youtube{
          background-color: #FE0909;
        }
      }
    }
  }
`;

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
