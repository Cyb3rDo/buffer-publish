import React from 'react';
import PropTypes from 'prop-types';
import { isSupportedFeature, isSupportedPlan } from '../../utils';

const WithFeatureLoader = (WrappedComponent) => {
  const FeatureLoader = ({
                           productFeatures,
                           isFreeUser,
                           ...other
                         }) => {
    const {
      planName,
      features,
    } = productFeatures;

    const featureChecker = {
      isSupportedPlan: testPlan => isSupportedPlan(testPlan, planName),
      isSupportedFeature: testFeature => isSupportedFeature(testFeature, features),
      isProUser: () => isSupportedPlan('pro', planName),
      isFreeUser: () => isSupportedPlan('free', planName),
    };

    return (<WrappedComponent
      {...other}
      features={featureChecker}
    />);
  };

  FeatureLoader.propTypes = {
    productFeatures: PropTypes.shape({
      planName: PropTypes.string,
      features: PropTypes.any,
    }),
    isFreeUser: PropTypes.bool,
  };

  FeatureLoader.defaultProps = {
    productFeatures: {},
    isFreeUser: false,
  };

  return FeatureLoader;
};

export default WithFeatureLoader;
