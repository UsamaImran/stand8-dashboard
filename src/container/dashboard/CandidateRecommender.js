import React from 'react';
import { Select, Input, Form, Button, DatePicker } from 'antd';
import styled from 'styled-components';
import { PageHeader } from '../../components/page-headers/page-headers';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CandidateRecommender = () => {
  const [form] = Form.useForm();

  const children = [];
  for (let i = 10; i < 36; i += 1) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  return (
    <CandidateRecommenderWrapper>
      <PageHeader
        ghost
        title={
          <StyledTitle
            src={require('../../static/img/candidate-recommender.png')}
            alt="STAND 8 Candidate Recommender"
          />
        }
      />

      <StyledMain>
        <Form name="candidateRecommender" form={form}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <Form.Item name="bullhorn_job_id" label="Bullhorn Job Id" style={{ flex: 1 }}>
              <Select style={{ flex: 1 }} defaultValue="bullhorn_job_id_01">
                <Option value="bullhorn_job_id_01">bullhorn job id 01</Option>
                <Option value="bullhorn_job_id_02">bullhorn job id 02</Option>
                <Option value="bullhorn_job_id_03">bullhorn job id 03</Option>
                <Option value="bullhorn_job_id_04">bullhorn job id 04</Option>
                <Option value="bullhorn_job_id_05">bullhorn job id 05</Option>
              </Select>
            </Form.Item>
            <Form.Item name="job_date" label="Date of Job" style={{ flex: 1 }}>
              <RangePicker />
            </Form.Item>
            <Form.Item name="job_number" label="Number of Jobs to Search" style={{ flex: 1 }}>
              <Input placeholder="Enter Value" />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '46px' }}>
            <Form.Item name="job_description" label="Job Description" style={{ flex: 2 }}>
              <TextArea className="jobDescription" />
            </Form.Item>
            <StyledRightWrapp style={{ flex: 3 }}>
              <div className="headTitle" style={{ display: 'flex' }}>
                <div style={{ flex: 1 }} />
                <div style={{ flex: 1 }}>C.R. Results</div>
                <div style={{ flex: 1 }}>User Additions/Corrections</div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 3 }}>
                  <Form.Item name="job_skills" label="Important Skills" style={{ flex: 1 }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      className="job-skills"
                      defaultValue={[
                        'a10',
                        'c12',
                        'b11',
                        'd13',
                        'e14',
                        'f15',
                        'g16',
                        'h17',
                        'i18',
                        'j19',
                        'k20',
                        'l21',
                        'm22',
                      ]}
                      disabled
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ flex: 2 }}>
                  <Form.Item name="job_skills_input">
                    <Select
                      mode="multiple"
                      className="job-skills-input"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={[]}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 3 }}>
                  <Form.Item name="experience" label="Your Experience" style={{ flex: 1 }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      defaultValue={['1 years', '2 years', '3 years']}
                      disabled
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ flex: 2 }}>
                  <Form.Item name="experience_input">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={[]}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 3 }}>
                  <Form.Item name="education" label="Your Education" style={{ flex: 1 }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      defaultValue={['Education 1', 'Education 2']}
                      disabled
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ flex: 2 }}>
                  <Form.Item name="education_input">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={[]}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 3 }}>
                  <Form.Item name="location" label="Your Location" style={{ flex: 1 }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      defaultValue={['Location 1', 'Location 2']}
                      disabled
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ flex: 2 }}>
                  <Form.Item name="location_input">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={[]}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 3 }}>
                  <Form.Item name="position_duration" label="Position Duration" style={{ flex: 1 }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      defaultValue={['Position 1', 'Position 2']}
                      disabled
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ flex: 2 }}>
                  <Form.Item name="position_input">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={[]}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </StyledRightWrapp>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flex: 1, marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
              <div style={{ flex: 1 }} />

              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 260, marginLeft: 8, height: 47, marginBottom: 24 }}
                >
                  Find Similar Jobs
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 260, marginLeft: 8, height: 47, marginBottom: 24 }}
                >
                  Find Similar Candidates
                </Button>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }} />
            </div>
          </div>
        </Form>
      </StyledMain>
    </CandidateRecommenderWrapper>
  );
};

export default CandidateRecommender;

const CandidateRecommenderWrapper = styled.div``;

const StyledTitle = styled.img`
  height: 38px;
`;

const StyledMain = styled.div`
  background-color: white;
  margin: 0px 30px 20px;
  padding: 2rem;
  label {
    color: red;
  }
  .ant-form-item {
    display: block;
  }
  .ant-form-item-control-input-content {
    display: flex;
    height: 48px;
  }

  .ant-form-item-control-input .ant-picker {
    width: 100%;
    padding: 0 12px 0 12px;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 48px !important;
    display: flex;
    align-items: center;
  }

  .ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector {
    border-color: #f5222d !important;
  }

  .ant-form-item-has-error
    .ant-input-group-addon
    .ant-select.ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px solid;
  }

  .ant-card-head {
    border: 0px;
  }

  .ant-card-body {
    padding-top: 0px !important;
  }

  .jobDescription {
    min-height: 450px;
    width: 90%;
  }
`;

const StyledRightWrapp = styled.div`
  .headTitle {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
  }
  .ant-row.ant-form-item {
    display: flex !important;
  }

  label {
    min-width: 140px;
  }

  .ant-form-item-control-input-content {
    display: flex;
    height: auto;
  }
  .job-skills {
    .ant-select-selector {
      min-height: 150px !important;
    }
  }
  .job-skills-input {
    .ant-select-selector {
      min-height: 150px !important;
    }
  }
`;
