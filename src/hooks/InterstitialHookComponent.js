import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useEffect, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Config from '../../env';
import colors from '../constants/theme';
const InterstitialHookComponent = forwardRef((props, ref) => {
  const {AddsConfig} = useSelector(state => state.remoteAdsReducer);
  const {isPurchased} = useSelector(state => state.adReducer);
  const navigation = useNavigation();
  const {children, width, item} = props;
  const [loading, setLoading] = useState(false);
  const {load, show, error, isLoaded, isClicked, isClosed, isOpened, revenue} =
    useInterstitialAd(AddsConfig.INTER_HOME ? Config.INTERSTIAL_AD_ID : '');
  useEffect(() => {
    if (error !== undefined) {
      setLoading(false);
      navigation.navigate(item.route);
      AsyncStorage.setItem('canShowAppOpenAd', 'true');
    }
  }, [error]);

  useEffect(() => {
    if (isLoaded) {
      show();

      AsyncStorage.setItem('canShowAppOpenAd', 'false');
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isClosed) {
      console.log(`${Platform.OS} interstitial hook isClosed ${item.route}`);
      AsyncStorage.setItem('canShowAppOpenAd', 'true');
    }
  }, [isClosed]);

  useEffect(() => {
    if (isOpened) {
      navigation.navigate(item.route);
      AsyncStorage.setItem('canShowAppOpenAd', 'false');

      setLoading(false);
    }
  }, [isOpened]);

  const loadAd = () => {
    setLoading(true);
    load();
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (
          item.route == 'WorldClockScreen' ||
          item.route == 'CompassScreen' ||
          item.route == 'IPAddressFinderScreen'
        ) {
          navigation.navigate(item.route);
        } else if (isPurchased) {
          navigation.navigate(item.route);
        } else {
          loadAd();
        }
      }}
      style={{...styles.testSpacing, width: width}}
      ref={ref}>
      {loading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
});

export default InterstitialHookComponent;

const styles = StyleSheet.create({
  testSpacing: {
    paddingVertical: moderateScale(7),
    borderColor: colors.borderColor,
    borderWidth: moderateScale(0.75),
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
    // width: moderateScale(100),
    height: moderateScale(60),
  },
});
