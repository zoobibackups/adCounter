import React from 'react';
import { StyleSheet,View } from 'react-native';
import {
    AdsConsent,
    AdsConsentDebugGeography,
    AdsConsentStatus,
} from 'react-native-google-mobile-ads';
import { moderateScale } from 'react-native-size-matters';
import CustomButton from './src/components/CustomButton';

const UmpSdkScreen = ({navigation}) => {  
  const checkPermission = async () => {
    try {
      const isEEA =
        (
          await AdsConsent.requestInfoUpdate({
            debugGeography: AdsConsentDebugGeography.EEA,
            tagForUnderAgeOfConsent: false,
            testDeviceIdentifiers:["5480725A-4AE9-4D08-9129-59FA0A6A4EF3"]
          })
        ).privacyOptionsRequirementStatus === AdsConsentStatus.REQUIRED;
     
      AdsConsent.loadAndShowConsentFormIfRequired()
        .then(data => {
          console.log(data, 'DATA');
        })
        .catch(err => {
          console.log(err, 'ERROR');
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{marginTop: moderateScale(100)}}></View>
      <View style={{position: 'absolute', bottom: moderateScale(20)}}>
        <CustomButton onPress={() => checkPermission()} />
      </View>
    </View>
  );
};

export default UmpSdkScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
