import Styled from 'styled-components';
import { PageHeader } from 'antd';

const PageHeaderStyle = Styled(PageHeader)`
  margin-bottom: 25px;
  
  .ant-page-header-heading-sub-title {
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  .title-counter {
    margin: 0px 20px 0px 20px; 
  }
  
  .page-header-actions button.ant-btn-white svg {
    width: 12px;
    height: 12px;
    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 2px;
    color: #5f63f2;
  }
  i +span, svg +span, img +span {
      ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
  }
`;

export { PageHeaderStyle };
