import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Input } from '@bufferapp/components';

class SetupSMS extends React.Component {
  constructor() {
    super();
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.inputContainer) {
      const input = this.inputContainer.querySelector('input');
      input.focus();
      input.select();
    }
  }
  handlePhoneChange(event) {
    this.props.setPhoneNumber(event.target.value);
  }
  handleSubmit() {
    this.props.submitPhoneNumber();
  }
  render() {
    const {
      transition,
      updatePhoneNumber,
      loading,
      error,
      editMode,
    } = this.props;
    return (
      <Fragment>
        <div style={{ textAlign: 'center' }}>
          <Text size="large">
            {!editMode && 'Set up your phone number'}
            {editMode && 'Change your phone number'}
          </Text>
          {!editMode && <div style={{ margin: '12px 0' }}>
            <Text size="mini" weight="medium">
              This will be the device we send verification codes each time you log into Buffer.
            </Text>
          </div>}
        </div>
        <div style={{ padding: '16px 0 20px' }} ref={(el) => { this.inputContainer = el; }}>
          <div style={{ paddingBottom: '4px' }}>
            <Text size="mini" weight="medium">Phone number (incl. country code)</Text>
          </div>
          <Input
            type="text"
            placeholder="e.g., +1 123-555-1234"
            input={{
              value: updatePhoneNumber,
              onChange: this.handlePhoneChange,
            }}
            meta={{
              error,
              touched: Boolean(error),
              submitting: loading,
            }}
          />
        </div>
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div style={{ display: 'inline', paddingRight: '20px' }}>
            {!editMode && <Button tertiary onClick={() => transition('BACK')}>Back</Button>}
            {editMode && <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>}
          </div>
          <Button onClick={this.handleSubmit} disabled={loading}>
            {loading ? 'Please wait…' : 'Next'}
          </Button>
        </div>
      </Fragment>
    );
  }
}

SetupSMS.propTypes = {
  transition: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  submitPhoneNumber: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default SetupSMS;
