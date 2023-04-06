import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Button, Spin, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import AsanaPortfolioModal from './overview/asanaPortfolio/AsanaPortfolioModal';
import { Cards } from '../../components/cards/frame/cards-frame';
import { asanaPortfolioGet, asanaPortfolioDelete } from '../../redux/asanaPortfolio/actionCreators';
import { alertModal } from '../../components/modals/antd-modals';
import { AsanaTableWrapper } from '../styled';

const AsanaPortfolio = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();
  const { portfolios, isLoading } = useSelector(state => {
    return {
      portfolios: state.asanaPortfolio.portfolios,
      isLoading: state.asanaPortfolio.isLoading,
    };
  });

  useEffect(() => {
    dispatch(asanaPortfolioGet());
  }, [dispatch]);

  const showModal = data => {
    if (data) {
      setModalData({ ...data, edit: true });
    }
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalData({});
    setModalVisible(false);
  };

  const showConfirm = data => {
    alertModal.confirm({
      title: 'Do you want to delete this portfolio?',
      content: '',
      onOk() {
        dispatch(asanaPortfolioDelete(data));
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: 'Portfolio Id',
      dataIndex: 'portfolio_id',
      responsive: ['md'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      responsive: ['lg'],
    },
    {
      title: 'Status',
      dataIndex: 'active',
      responsive: ['md'],
      render: active => {
        if (active) {
          return <Tag color="#87d068">Active</Tag>;
        }
        return <Tag color="#f50">Inactive</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: data => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div
              onClick={() => showModal(data)}
              onKeyPress={() => showModal(data)}
              key="asana-portfolio-edit"
              role="button"
              tabIndex="0"
              style={{
                cursor: 'pointer',
              }}
            >
              <FeatherIcon icon="edit" size={14} />
            </div>
            <div
              onClick={() => showConfirm(data)}
              onKeyPress={() => showConfirm(data)}
              key="asana-portfolio-delete"
              role="button"
              tabIndex="0"
              style={{
                marginLeft: '5px',
                cursor: 'pointer',
              }}
            >
              <FeatherIcon icon="trash-2" color="red" size={14} />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <AsanaTableWrapper>
        {isLoading && (
          <div className="spinner-wrapper">
            <div className="loading-spin">
              <Spin size="large" />
            </div>
          </div>
        )}

        <div className="full-width-table">
          <Row>
            <Col xs={24}>
              <Cards
                title="Asana Portfolio"
                isbutton={
                  <div key="6" className="page-header-actions">
                    <Button type="primary" onClick={() => showModal()}>
                      Add Portfolio
                    </Button>
                  </div>
                }
              >
                <Table
                  className="table-responsive"
                  pagination={{
                    defaultPageSize: 20,
                    total: portfolios.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                  }}
                  dataSource={portfolios}
                  columns={columns}
                />
              </Cards>
            </Col>
          </Row>
        </div>
        {modalVisible && <AsanaPortfolioModal data={modalData} hideModal={hideModal} modalVisible={modalVisible} />}
      </AsanaTableWrapper>
    </>
  );
};

export default AsanaPortfolio;
