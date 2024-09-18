import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import NativeAdView, {
    AdBadge,
    AdvertiserView,
    CallToActionView,
    HeadlineView,
    IconView,
    NativeMediaView,
    TaglineView
} from 'react-native-admob-native-ads';
import fonts from '../constants/fonts';
import { hp, wp } from '../constants/scaling';
import ShimmerPlaceholder from './ShimmerPlaceholder';

function Logger(tag = 'AD', type, value) {
    console.log(`[${tag}][${type}]:`, value);
}

export const NativeAdLanguage = ({ error, setError, loadOnMount = true }) => {


    const [aspectRatio, setAspectRatio] = useState(1.5);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false)
    const nativeAdRef = useRef();

    const onAdFailedToLoad = event => {
        setError(true);
        setLoading(false);
        console.log(event, 'failed');
    };

    const onAdLoaded = data => {
        console.log(data, 'ATATATATATTA');
        // Logger('AD', 'LOADED', 'Ad has loaded successfully');
    };

    const onAdClicked = () => {
        Logger('AD', 'CLICK', 'User has clicked the Ad');
    };

    const onAdImpression = () => {
        Logger('AD', 'IMPRESSION', 'Ad impression recorded');
    };

    const onNativeAdLoaded = event => {
        Logger('AD Laded', '', '', '');
        setLoading(false);
        setLoaded(true);
        setError(false);
        setAspectRatio(event.aspectRatio);
    };

    const onAdLeftApplication = () => {
        Logger('AD', 'LEFT', 'Ad left application');
    };

    useEffect(() => {
        console.log("I M heee to load the adds");

        try {
            nativeAdRef.current?.loadAd();
        } catch (error) {
            console.log(error, "ERRO");
        }

    }, [loadOnMount]);
    return (
        <NativeAdView
            ref={nativeAdRef}
            adUnitID={"ca-app-pub-3940256099942544/2247696110"}
            onAdLoaded={onAdLoaded}
            onAdFailedToLoad={onAdFailedToLoad}
            onAdLeftApplication={onAdLeftApplication}
            onAdClicked={onAdClicked}
            onAdImpression={onAdImpression}
            onNativeAdLoaded={onNativeAdLoaded}
            refreshInterval={3000}
            style={styles.mainContainer}
            videoOptions={{
                customControlsRequested: true,
            }}
            mediationOptions={{
                nativeBanner: true,
            }}>
            {loading || error ? (
                <ShimmerPlaceholder />
            ) : (
                <View style={{ flex: 1, width: wp(96), height:hp(50) }}>
                    <View
                        style={{
                            ...styles.upperRow,
                            opacity: loading || error || !loaded ? 0 : 1,
                        }}>
                        <IconView
                            style={styles.iconView}
                        />
                        <View
                            style={{
                                paddingHorizontal: 8,
                                flexShrink: 1,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 1,
                                    alignItems: 'center',
                                }}>
                                <AdBadge
                                    textStyle={{
                                        fontFamily: fonts.Medium,
                                        fontSize: 10,
                                        color: '#fff',
                                    }}
                                    style={{

                                        width: 25,
                                        backgroundColor: '#f57105',
                                        borderColor: '#f57105',
                                        height: 16,
                                    }}
                                />
                                <HeadlineView
                                    hello="abc"
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 13,
                                        marginLeft: 30,
                                        fontFamily: fonts.Medium,
                                        color: 'black',
                                    }}
                                />
                            </View>
                            <TaglineView
                                numberOfLines={2}
                                style={{
                                    fontSize: 12,
                                    fontFamily: fonts.Medium,
                                    color: 'black',
                                }}
                            />
                            <AdvertiserView
                                style={{
                                    fontSize: 10,
                                    fontFamily: fonts.Medium,
                                    color: 'gray',
                                }}
                            />


                        </View>
                    </View>

                    <NativeMediaView
                        resizeMode={"contain"}
                        style={styles.mediaView}
                    />
                    <View style={styles.lowerRow} />
                    <CallToActionView
                        style={styles.buttonStyle}
                        allCaps
                        buttonAndroidStyle={{
                           
                            backgroundColor: "#f57105",
                            borderRadius: 100
                        }}
                        textStyle={styles.buttonTxtStyle}
                    />
                </View>
            )}
        </NativeAdView>
    );
};

export default NativeAdLanguage;

const styles = StyleSheet.create({
    mainContainer: {
        width:'100%',
        height: hp(45),
        backgroundColor: '#0000',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#0003',
        alignSelf: 'center',
    },
    upperRow: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        maxWidth: '100%',
    },
    lowerRow:{
        height:20
    },
    iconView: {
        width: 62,
        height: 62,
        borderRadius: 7
    },
    mediaView: {
        width: wp(100) - 40,
        height: 160,
        minHeight:160,
        marginVertical: 10,
        maxHeight: 160,
        borderRadius: 7,
        overflow: "hidden",
        backgroundColor: '#0090FF',
        alignSelf: "center"
    },
    buttonStyle: {
        minHeight: 45,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginVertical: 5,
        backgroundColor: "#f57105",
        borderRadius: 100,
        alignSelf: 'center',
        width: wp(92),
    },
    buttonTxtStyle: {
        fontSize: 13,
        fontFamily: fonts.Bold,
        flexWrap: 'wrap',
        textAlign: 'center',
        color: 'white',
    }
});
