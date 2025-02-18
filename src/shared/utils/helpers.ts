import { Platform } from 'react-native';
import { ReactElement } from 'react';
import { COLORS } from '@styles/theme';
import { MEDIA_TYPE } from '@constant';
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage, MessageType, Icon } from 'react-native-flash-message';

export const openCamera = (options = {}) => {
  return new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      height: 400,
      width: 400,
      cropping: true,
      mediaType: MEDIA_TYPE.PHOTO,
      ...options,
    })
      .then(async image => resolve(image))
      .catch(err => reject(err));
  });
};

export const openGallery = (options = {}) => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      height: 400,
      width: 400,
      cropping: true,
      mediaType: MEDIA_TYPE.PHOTO,
      ...options,
    })
      .then(image => resolve(image))
      .catch(err => reject(err));
  });
};

export const showFlash = (
  message: string,
  type: MessageType = 'success',
  icon: ReactElement<any> | Icon = 'none',
  floating = false,
) => {
  showMessage({
    message,
    type,
    floating,
    icon,
    textStyle: { color: COLORS.text, textAlign: 'center' },
    titleStyle: { color: COLORS.text, textAlign: 'center' },
    style: { backgroundColor: COLORS.primary },
  });
};

export const isIOS = () => {
  return Platform.OS == 'ios';
};

export const emptyFunction = () => { };
