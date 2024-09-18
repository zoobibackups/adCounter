import {Platform} from 'react-native';

const fonts = {
  Black: 'Montserrat-Black',
  ExtraBold: 'Montserrat-ExtraBold',
  Bold: 'Montserrat-Bold',
  Digital: Platform.OS == 'android' ? 'Digital' : 'Digital-7',
  SemiBold: 'Montserrat-SemiBold',
  Medium: 'Montserrat-Medium',
  Regular: 'Montserrat-Regular',
  Light: 'Montserrat-Light',
  Thin: 'Montserrat-Thin',
};
export default fonts;
