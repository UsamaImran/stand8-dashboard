import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Figure2,
  Figure3,
  Figure6,
  Figure7,
  BannerWrapper,
  BannerNormal,
  BannerCarouselWrap,
  BannerLongWrap,
  BannerCardWrap,
  BannerCtaWrap,
} from './Style';
import { Button } from '../buttons/buttons';
import { Cards } from '../cards/frame/cards-frame';
import RatioCardOne from '../../container/dashboard/overview/salesProfile/RatioCardOne';

const Banner1 = () => {
  return (
    <BannerNormal>
      <Cards headless bodyStyle={{ minHeight: '270px' }}>
        <h2>15 Days Free Trail</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</p>
        <Button className="btn-outlined" size="small" outlined type="primary">
          Start
        </Button>
      </Cards>
    </BannerNormal>
  );
};

const Banner2 = () => {
  return (
    <BannerWrapper>
      <Cards className="mb-70" bodyStyle={{ background: '#5F63F2', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure2>
          <img src={require('../../static/img/banner/1.png')} alt="" />
          <figcaption>
            <h2>Upgrade your plan</h2>
            <p>Lorem ipsum dolor sit amet</p>
            <Button size="large" type="white">
              Upgrade
            </Button>
          </figcaption>
        </Figure2>
      </Cards>
    </BannerWrapper>
  );
};

const Banner3 = () => {
  return (
    <BannerWrapper>
      <Cards bodyStyle={{ borderRadius: '10px', minHeight: '270px', background: '#5F63F2' }} headless>
        <Figure3>
          <img src={require('../../static/img/ideal-team.png')} alt="" />
          <figcaption>
            <h2>Earn More Money</h2>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner4 = () => {
  return (
    <BannerWrapper>
      <Cards bodyStyle={{ background: '#272B41', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure3 className="theme-3">
          <img src={require('../../static/img/banner/3.png')} alt="" />
          <figcaption>
            <h2>Win Your Bonus</h2>
            <p>Weekly performance bonus</p>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner5 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: '#5F63F2',
          borderRadius: '10px',
          minHeight: '265px',
          display: 'flex',
          alignItems: 'center',
        }}
        headless
      >
        <Figure3 className="theme-wide">
          <img src={require('../../static/img/banner/4.png')} alt="" />
          <figcaption>
            <h2>Congratulations Jhon!</h2>
            <p>Best Seller on the last month.</p>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner6 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: `url(${require('../../static/img/banner/5.png')})`,
          backgroundSize: 'cover',
          borderRadius: '10px',
          minHeight: '265px',
          display: 'flex',
          direction: 'ltr',
          alignItems: 'center',
        }}
        headless
      >
        <Figure6>
          <img src={require('../../static/img/banner/badge.svg')} alt="" />
          <figcaption>
            <h2>Up to 50 OFF</h2>
            <Button className="btn-outlined" size="small" outlined type="danger">
              Buy Now
            </Button>
          </figcaption>
        </Figure6>
      </Cards>
    </BannerWrapper>
  );
};

const RapidInnovationCard = () => {
  return (
    <BannerNormal className="theme-wide">
      <Cards headless>
        <Figure7>
          <figcaption>
            <img src={require('../../static/img/cards-logo/rapid.png')} alt="" />
            <h3>Rapid Innovation</h3>
            <p>
              Innovation is key for competitive advantage no matter what industry. Reduce risk while making sure your
              applications and data stay safe within internal or external projects
            </p>
          </figcaption>
        </Figure7>
      </Cards>
    </BannerNormal>
  );
};

const MonetizeDataCard = () => {
  return (
    <BannerNormal className="theme-wide">
      <Cards headless>
        <Figure7>
          <figcaption>
            <img src={require('../../static/img/cards-logo/monetize.png')} alt="" />
            <h3>Monetize Data</h3>
            <p>
              Moving faster to create newer revenue streams without impacting privacy. Speed up POCs and save costs
              while keeping compliance and governance at the front of your plan.
            </p>
          </figcaption>
        </Figure7>
      </Cards>
    </BannerNormal>
  );
};

const GenerateBusinessInsightCard = () => {
  return (
    <BannerNormal className="theme-wide">
      <Cards headless>
        <Figure7>
          <figcaption>
            <img src={require('../../static/img/cards-logo/businessinsight.png')} alt="" />
            <h3>Generate Business Insight</h3>
            <p>
              With the correct Synthetic Data plan in your organization, it provides a more holistic data analysis while
              giving the ability to build robust models.
            </p>
          </figcaption>
        </Figure7>
      </Cards>
    </BannerNormal>
  );
};

const BannerCarousel = () => {
  return (
    <BannerCarouselWrap>
      <Carousel autoplay>
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require('../../static/img/banner/8.png')} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require('../../static/img/banner/8.png')} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require('../../static/img/banner/8.png')} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
      </Carousel>
    </BannerCarouselWrap>
  );
};

const BannerLong = () => {
  return (
    <BannerLongWrap>
      <div className="banner-long-inner">
        <h2>Up To Date </h2>
        <img src={require('../../static/img/banner/9.png')} alt="" />
      </div>
    </BannerLongWrap>
  );
};

const BannerCard = () => {
  return (
    <BannerCardWrap>
      <div
        className="banner-card-inner"
        style={{ backgroundImage: `url("${require('../../static/img/banner/card-banner-1.png')}")` }}
      >
        <h2>Need More Space?</h2>
        <Button size="small" type="white">
          Buy Storage
        </Button>
      </div>
    </BannerCardWrap>
  );
};

const BannerCard2 = () => {
  return (
    <BannerCardWrap>
      <div
        className="banner-card-inner theme-2"
        style={{ backgroundImage: `url("${require('../../static/img/banner/card-banner-2.png')}")` }}
      >
        <h2>Create Sale Report</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>
        <Button size="small" type="white">
          Learn More
        </Button>
      </div>
    </BannerCardWrap>
  );
};

const BannerCta = () => {
  return (
    <BannerCtaWrap>
      <div
        className="banner-cta align-center-v"
        style={{ backgroundImage: `url("${require('../../static/img/banner/cta-banner-1.png')}")` }}
      >
        <div className="banner-cta__content">
          <h2>Dedicated Support</h2>
          <Button size="small" type="primary">
            Learn More
          </Button>
        </div>
      </div>
    </BannerCtaWrap>
  );
};

const BannerCta2Sales = ({ jobOrders, interviews, clientVisits, placements, clientSendOuts }) => {
  const { user } = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });
  const contentStyle = {
    height: '250px',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',

    borderRadius: '4px',
  };

  const isDataLoaded = () => jobOrders && interviews && clientVisits && placements;

  return (
    <BannerCtaWrap>
      <div className="banner-cta align-center-v theme-2" style={{ backgroundColor: '#270886' }}>
        <div>
          <h2 style={{ color: 'white' }}>
            Welcome Back {user.firstName} {user.lastName}
          </h2>
          {!isDataLoaded() ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} />{' '}
            </div>
          ) : (
            <>
              <BannerCarouselWrap>
                <Carousel style={{ width: '400px', height: '300px', marginTop: '20%' }} effect="fade">
                  {' '}
                  <div>
                    <h3 style={contentStyle}>
                      <RatioCardOne data={jobOrders} />
                    </h3>
                  </div>{' '}
                  <div>
                    <h3 style={contentStyle}>
                      <RatioCardOne data={clientVisits} />
                    </h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>
                      {' '}
                      <RatioCardOne data={interviews} />
                    </h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>
                      {' '}
                      <RatioCardOne data={placements} />
                    </h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>
                      {' '}
                      <RatioCardOne data={clientSendOuts} />
                    </h3>
                  </div>
                </Carousel>
              </BannerCarouselWrap>
            </>
          )}
        </div>
      </div>
    </BannerCtaWrap>
  );
};

const BannerCta2Recruitment = ({ interviews, placements, customerSendOuts, prescreens }) => {
  const { user } = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });
  const contentStyle = {
    height: '250px',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',

    borderRadius: '4px',
  };
  // const dot = () => <p style={{ width: '6px', height: '6px', borderRadius: '50%' }}></p>;
  const isDataLoaded = () => customerSendOuts && interviews && customerSendOuts && placements;
  return (
    <BannerCtaWrap>
      <div className="banner-cta align-center-v theme-2" style={{ backgroundColor: '#270886' }}>
        <div>
          <h2 style={{ color: 'white' }}>
            Welcome Back {user.firstName} {user.lastName}
          </h2>
          {!isDataLoaded() ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} />{' '}
            </div>
          ) : (
            <>
              <BannerCarouselWrap>
                <Carousel
                  style={{ width: '400px', height: '300px', marginTop: '20%' }}
                  effect="fade"
                  dotStyle={{ width: '4px', height: '4px' }}
                >
                  {' '}
                  <div>
                    <h3 style={contentStyle}>
                      <RatioCardOne data={placements} />
                    </h3>
                  </div>{' '}
                  <div>
                    <h3 style={contentStyle}>
                      <RatioCardOne data={interviews} />
                    </h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>
                      {' '}
                      <RatioCardOne data={customerSendOuts} />
                    </h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>
                      {' '}
                      <RatioCardOne data={prescreens} />
                    </h3>
                  </div>
                </Carousel>
              </BannerCarouselWrap>
            </>
          )}
        </div>
      </div>
    </BannerCtaWrap>
  );
};

const IdealBanner = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: `url(${require('../../static/img/ideal-team.png')})`,
          backgroundSize: 'cover',
          borderRadius: '10px',
          minHeight: '460px',
          display: 'flex',
          direction: 'ltr',
          justifyContent: 'right',
        }}
        headless
      >
        <Figure2>
          <figcaption style={{ lineHeight: '23px' }}>
            <h2 style={{ fontWeight: '400' }}>Tell us who you</h2>
            <h2 style={{ fontWeight: '400' }}>are nominating</h2>
            <h2 style={{ fontWeight: '400' }}>and why you are</h2>
            <h2 style={{ fontWeight: '400' }}>nominating them.</h2>
          </figcaption>
        </Figure2>
      </Cards>
    </BannerWrapper>
  );
};

// Todo need to check the props type
BannerCta2Sales.propTypes = {
  jobOrders: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  interviews: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  clientVisits: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  placements: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  clientSendOuts: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
};
// Todo need to check the props type
BannerCta2Recruitment.propTypes = {
  prescreens: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  interviews: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  placements: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  customerSendOuts: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
};

export {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  RapidInnovationCard,
  MonetizeDataCard,
  GenerateBusinessInsightCard,
  BannerCarousel,
  BannerLong,
  BannerCard,
  BannerCard2,
  BannerCta,
  BannerCta2Sales,
  BannerCta2Recruitment,
  IdealBanner,
};
