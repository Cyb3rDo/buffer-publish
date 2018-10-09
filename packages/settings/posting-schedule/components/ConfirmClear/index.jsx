import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  CircleTwitterIcon,
  CircleFacebookIcon,
  CircleInstagramIcon,
  CircleLinkedInIcon,
  Button,
  CloseIcon,
  Text,
} from '@bufferapp/components';

const profileBadgeStyle = {
  position: 'relative',
  height: '2rem',
  width: '2rem',
  flexShrink: '0',
};

const profileBadgeIconStyle = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  height: '1rem',
  width: '1rem',
  display: 'flex',
};

const profileBadgeBackgroundStyle = {
  position: 'absolute',
  bottom: '0.05rem',
  right: '0.05rem',
  background: 'white',
  borderRadius: '50%',
  height: '0.90rem',
  width: '0.90rem',
};

const middleContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const containerStyle = {
  backgroundColor: 'white',
  padding: '20px',
  maxWidth: '355px',
};

const buttonsStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
};

const profileNameStyle = {
  fontWeight: 'bold',
};

const profileTypeStyle = {
  textTransform: 'capitalize',
};

const closeButtonStyle = {
  position: 'absolute',
  right: '15px',
};

const textContainerStyle = {
  marginRight: '15px',
};

const ProfileBadgeIcon = (type) => {
  switch (type) {
    case 'twitter':
      return <CircleTwitterIcon color={'twitter'} />;
    case 'facebook':
      return <CircleFacebookIcon color={'facebook'} />;
    case 'instagram':
      // TODO: need instagram color
      return <CircleInstagramIcon color={'torchRed'} />;
    case 'linkedin':
      return <CircleLinkedInIcon color={'linkedin'} />;
    default:
      return null;
  }
};

const ConfirmClear = ({
  profileName,
  profileType,
  profileService,
  onCancelClick,
  onConfirmClick,
  onCloseClick,
  avatar,
 }) => (
   <div style={containerStyle}>
     <span style={closeButtonStyle}>
       <Button noStyle onClick={onCloseClick}>
         <CloseIcon />
       </Button>
     </span>
     <Text size="large">Are you sure?</Text>
     <div style={middleContainerStyle}>
       <div style={textContainerStyle}>
         <Text>Would you us to remove all your posting times for the <span style={profileNameStyle}>{profileName}</span> <span style={profileTypeStyle}>{` ${profileService} ${profileType}?`}</span>
         </Text>
       </div>
       <div style={profileBadgeStyle}>
         <Image
           border={'circle'}
           src={avatar}
           height={'100%'}
           width={'100%'}
           verticalAlignBottom
         />
         <div style={profileBadgeBackgroundStyle} />
         <div style={profileBadgeIconStyle}>
           <ProfileBadgeIcon type={profileService} />
         </div>
       </div>
     </div>
     <div style={buttonsStyle}>
       <Button tertiary onClick={onCancelClick}>Cancel</Button>
       <Button tertiary onClick={onConfirmClick}>{'I\'m sure, empty it'}</Button>
     </div>
   </div>);

ConfirmClear.propTypes = {
  profileName: PropTypes.string.isRequired,
  profileService: PropTypes.string.isRequired,
  profileType: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ConfirmClear;
