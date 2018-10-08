import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Link, Text } from '@bufferapp/components';

const upgradeCtaStyle = {
  transform: 'translate(0, 1px)',
  margin: '0 42px 0 0',
  display: 'inline-block',
  minWidth: '60px',
  textAlign: 'center',
};

const SecondaryTabNavigation = ({
  selectedTabId,
  onTabClick,
  shouldShowUpgradeCta,
  showUpgradeModal,
}) =>
  /* wrapper div with "tabs" id necessary as a selector
  for a11y focus after selecting profile in sidebar */
  <div id="tabs" style={{ paddingLeft: '0.5rem' }}>
    <Tabs
      selectedTabId={selectedTabId}
      onTabClick={onTabClick}
    >
      <Tab tabId={'queue'}>Queue</Tab>
      <Tab tabId={'sent'}>Sent Posts</Tab>
      <Tab tabId={'settings'}>Settings</Tab>
      {shouldShowUpgradeCta &&
        <div style={upgradeCtaStyle}>
          <Text size="mini">
            <Link
              padding="18px 13px 17px 13px"
              block
              unstyled
              newTab
              href={'#'}
              onClick={(e) => { e.preventDefault(); showUpgradeModal(); }}
            >
              Upgrade
            </Link>
          </Text>
        </div>
      }
    </Tabs>
  </div>;

SecondaryTabNavigation.defaultProps = {
  shouldShowUpgradeCta: false,
};

SecondaryTabNavigation.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  shouldShowUpgradeCta: PropTypes.bool.isRequired,
  showUpgradeModal: PropTypes.func.isRequired,
};

export default SecondaryTabNavigation;
