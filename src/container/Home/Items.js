import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/FontAwesome';

function Items(props) {

    const { onBuyData, item } = props;

    const onBuyFood = () => {
        onBuyData && onBuyData(item);
    };

    if (item.empty) return <View cls="flx-i m-5" />;

    return (
        <TouchableOpacity onPress={onBuyFood}>
            <View cls={['bd-border bdRadius-8']} style={{ zIndex: 2 }}>
                {item.packPayInfos[0].promotionInfo !== null ? (
                    <View style={{ position: 'absolute', zIndex: 1, elevation: 1 }}>
                        <ImageBackground
                            source={require('../../assets/images/red-col.png')}
                            style={{ width: 59, height: 58, top: 5, position: 'relative', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 9,
                                    transform: [{ rotate: '314deg' }],
                                    fontWeight: 'bold',
                                    alignItem: 'center',
                                    paddingBottom: 15,
                                }}
                            >
                                {item.packPayInfos[0].promotionInfo}
                            </Text>
                        </ImageBackground>
                    </View>
                ) : null}
                <View
                    cls={['m-6 mt-10 bdWidth-1 pv-5 bdRadius-8']}
                    style={{ borderColor: 'blueLight' }}
                >
                    <View>
                        {item.validity !== null ?
                            <View cls='flx-row aic' style={{ justifyContent: 'flex-end' }}>
                                <Text
                                    cls="ph-5 mr-5 pt-2"
                                    style={{
                                        color: 'white',
                                        fontSize: 11,
                                        height: 20,
                                        borderRadius: 5,
                                        overflow: 'hidden',
                                        backgroundColor: item?.validityColor || 'orange',
                                    }}
                                >
                                    {item.validity}
                                </Text></View>
                            : null}
                    </View>
                    {item.quota !== null ?
                        <View cls='jcc aic'>
                            <Text
                                cls={['f-21 ff-medium b']}
                                style={{
                                    textAlign: 'center',
                                    color: 'orange',
                                    top: 3,
                                }}
                            >
                                {item.quota}
                            </Text>
                        </View>
                        : <View cls='jcc aic'>
                            <Text
                                cls={['f-18 ff-medium b']}
                                style={{
                                    textAlign: 'center',
                                    color: 'orange',
                                    top: 3,
                                    paddingHorizontal: 30
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>}
                    {item?.discount !== 0 &&
                        item?.cashback !== 0 ? (
                        <View cls="flx-row" style={{ justifyContent: 'center', top: 5 }}>
                            <Text
                                cls={['f-12']}
                                style={{ textDecorationLine: 'line-through', color: 'grey' }}
                            >
                                {' '}
                                {item?.price !== 0
                                    ? numeral(item?.price || 0).format('0,0')
                                    : 0}{' '}
                                <Text cls={['f-8']}>$</Text>
                            </Text>
                        </View>
                    ) : null}
                    {item?.promotionInfo !== null ? (
                        <View
                            cls="flx-row pt-6 pb-8"
                            style={{ justifyContent: 'center', top: 5 }}
                        >
                            <Text cls={['f-20']} style={{ color: 'black' }}>
                                {item?.price !== 0
                                    ? numeral(
                                        Math.round(
                                            `${(1 - (item?.discount || 0)) *
                                            item?.price
                                            }`
                                        )
                                    ).format('0,0')
                                    : 0}
                                <Text cls={['f-11']}>$</Text>
                            </Text>
                        </View>
                    ) : (
                        <View
                            cls="flx-row pt-6 pb-8"
                            style={{ justifyContent: 'center' }}
                        >
                            <Text cls={['f-20']} style={{ color: 'black' }}>
                                {' '}
                                {item?.price !== 0
                                    ? numeral(item?.price || 0).format('0,0')
                                    : 0}{' '}
                                <Text cls={['f-11']}>$</Text>
                            </Text>
                        </View>
                    )}
                    {/* <TouchableOpacity
              cls="flx-row jcc aic"
              onPress={onBuyFood}
              style={{
                top: 5,
                backgroundColor: 'blueLight',
                paddingTop: 5,
                paddingBottom: 5,
                borderBottomEndRadius: 6,
                borderBottomStartRadius: 6,
              }}
            >
              <Image
                style={{ width: 15, height: 15 }}
                source={require('../../assets/images/red-col.png')}
              />
              <Text
                cls={['f-15 b ff-regular white b']}
                style={{ overflow: 'hidden', paddingLeft: 8 }}
              >
                Buy
              </Text>
            </TouchableOpacity> */}
                    <Icon.Button
                        name="shopping-basket"
                        backgroundColor="#3b5998"
                        onPress={onBuyFood}
                    >
                        Buy
                    </Icon.Button>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default Items;
