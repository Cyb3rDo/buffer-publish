import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/components';

import Modal from '../Modal';
import PreferencesRow from '../PreferencesRow';
import Toggle from '../Toggle';

const TwoFactorAuth = ({
  machineState,
  isEnabled,
  /* editMode,
  type,
  phoneAreaCode,
  phoneNumber,
  confirmationCode,
  recoveryCode, */
  transition,
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text color={'outerSpace'}>Two Factor Authentication</Text>
      <div
        style={{
          marginTop: '0.5rem',
          maxWidth: '700px',
        }}
      >
        <PreferencesRow
          machineState={machineState}
        />
        <Modal
          machineState={machineState}
          transition={transition}
        />
      </div>
    </div>
    <Toggle
      machineState={machineState}
      enabled={isEnabled}
      onClick={() => transition(isEnabled ? 'DISABLE' : 'ENABLE')}
    />
  </div>
);

TwoFactorAuth.propTypes = {
  machineState: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  /* editMode: PropTypes.bool.isRequired,
  type: PropTypes.type.isRequired,
  phoneAreaCode: PropTypes.phoneAreaCode.isRequired,
  phoneNumber: PropTypes.phoneNumber.isRequired,
  confirmationCode: PropTypes.confirmationCode.isRequired,
  recoveryCode: PropTypes.string.isRequired, */
  transition: PropTypes.func.isRequired,
};

export default TwoFactorAuth;
