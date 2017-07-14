import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ProfileListItem from './index';

const avatarUrl = 'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png';

storiesOf('ProfileListItem')
  .addDecorator(checkA11y)
  .add('should display twitter profile list item', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
    />
  ))
  .add('should display number of notifications', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      notifications={1}
    />
  ))
  .add('should display locked', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      notifications={1}
      locked
    />
  ))
  .add('should display selected', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      notifications={1}
      selected
    />
  ));
