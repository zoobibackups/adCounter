import * as React from "react";
import {
    AdsConsent,
    AdsConsentDebugGeography,
} from "react-native-google-mobile-ads";

// https://github.com/invertase/react-native-google-mobile-ads/issues/274
export function useAdsConsent() {
  const checkIfCanServePersonalizedAds = React.useCallback(async () => {
    try {
      AdsConsent.reset();
    } catch (err) {}

    try {
      await AdsConsent.loadAndShowConsentFormIfRequired();
    } catch (err) {
      if (__DEV__) {
        console.debug(
          `[AD CONSENT] Could not load or show consent form: ${err}`,
        );
      }
    }

    try {
      const consentInfo = await AdsConsent.requestInfoUpdate({
        debugGeography: AdsConsentDebugGeography.EEA,
        testDeviceIdentifiers: ["EMULATOR"],
      });

      console.log({ consentInfo });
    } catch (err) {}

    try {
      // https://stackoverflow.com/questions/63583003/admob-tcf-error-when-using-google-ump-sdk/64740925#64740925
      const userChoices = await AdsConsent.getUserChoices();
      const canServePersonalizedAds =
        userChoices.storeAndAccessInformationOnDevice &&
        userChoices.selectBasicAds &&
        userChoices.createAPersonalisedAdsProfile &&
        userChoices.selectPersonalisedAds &&
        userChoices.measureAdPerformance &&
        userChoices.applyMarketResearchToGenerateAudienceInsights &&
        userChoices.developAndImproveProducts;

      console.log({ canServePersonalizedAds, userChoices });

      return canServePersonalizedAds;
    } catch (err) {
      if (__DEV__) {
        console.debug(`[AD CONSENT] Could not fetch user choices: ${err}`);
      }

      return false;
    }
  }, []);

  return checkIfCanServePersonalizedAds;
}