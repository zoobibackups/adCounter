import React from "react"
import ShimmerPlaceHolder, { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import { View } from "react-native";
import { wp } from "../constants/scaling";
const ShimmerPlaceholderAnimated = createShimmerPlaceholder(LinearGradient)
const ShimmerPlaceholder = () => {
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", height: 70, width: wp(96) }} >
                <View style={{ width: 70, height: 70 }}  >
                    <ShimmerPlaceHolder
                        duration={5000}
                        LinearGradient={() => (
                            <LinearGradient
                                start={{ x: .1, y: .1 }}
                                end={{ x: 1, y: .1 }}
                                colors={['#0001', '#fff']}
                                style={{ width: 70, height: 70 }}
                            />
                        )}

                        style={{ width: 70, height: 70 }} />
                </View>
                <View style={{ height: 60, width: wp(77), marginLeft: 4, backgroundColor: "#fff" }}  >
                    <ShimmerPlaceholderAnimated
                        duration={5000}
                        style={{ width: wp(76), height: 19, marginTop: 1 }}
                        location={[0, .4]}
                        shimmerColors={['#0001', '#fff']}
                    />
                    <ShimmerPlaceholderAnimated
                        location={[1, .4]}
                        style={{ width: wp(76), height: 19, marginTop: 1 }}
                        shimmerColors={['#0001', '#fff']}
                    />
                    <View style={{ flexDirection: "row", width: wp(77), marginTop: 1 }} >
                        <ShimmerPlaceholderAnimated
                            style={{ width: 20, marginRight: 5, height: 20 }}
                            location={[0, .4]}
                            shimmerColors={['#0001', '#fff']}
                        />
                        <ShimmerPlaceholderAnimated
                            style={{ width: wp(40) - 10, marginRight: 5, height: 20 }}
                            location={[0, .4]}
                            shimmerColors={['#0001', '#fff']}
                        />
                        <ShimmerPlaceholderAnimated
                            style={{ width: wp(31.4), height: 20 }}
                            location={[0, .4]}
                            shimmerColors={['#0001', '#fff']}
                        />
                    </View>

                </View>
            </View>
            <View
                style={{
                    width: wp(100) - 8,
                    height: 180,
                    alignSelf:"center",
                    backgroundColor: '#0000',
                }}
            >
                <ShimmerPlaceholderAnimated
                    style={{
                        width: wp(100) - 18,
                        height: 180,
                        backgroundColor: '#0000',
                    }}
                    location={[0, .8]}
                    shimmerColors={['#0001', '#fff']}
                    // LinearGradient={() => (
                    //     <LinearGradient

                    //         colors={['#0001', '#fff']}
                    //         style={{
                    //             width: wp(100) - 8,
                    //             height: 180,
                    //             backgroundColor: '#0000',
                    //         }}
                    //     />
                    // )}

                />
            </View>
            <View
                style={{
                    width: wp(100) - 80,
                    height: 40,
                    marginBottom: 10,
                    marginTop: 5,
                    justifyContent:"center",
                    alignItems:"center",
                    alignSelf:"center",
                    backgroundColor: '#0000',
                }}
            >
                <ShimmerPlaceHolder
                    style={{
                        width: wp(100) - 80,
                        height: 45,
                        borderRadius: 100,
                       
                        backgroundColor: '#0000',

                    }}

                    LinearGradient={() => (
                        <LinearGradient
                            start={{ x: .5, y: -.5 }}
                            end={{ x: 0, y: .1 }}
                            colors={['#0001', '#fff']}
                            style={{
                                width: wp(100) - 8,
                                height: 45,
                                alignSelf: "center",
                                backgroundColor: '#0000',
                            }}
                        />
                    )}

                />
            </View>
        </View>
    )
}
export default ShimmerPlaceholder