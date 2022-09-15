import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, FlatList, Platform } from 'react-native';
import axios from 'axios';
import Items from './Items';
import TopItems from './TopItems';

function Home() {
    const [foodCategory, setFoodCategory] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [categoryHeight, setCategoryHeight] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const topRef = useRef(null);
    const setRef = useRef(null);

    useEffect(() => {
        fetchAPI();
    }, []);

    const fetchAPI = () => {
        axios({
            method: 'get',
            url: 'https://63219b4282f8687273b51b7b.mockapi.io/sample/piechart/foodList',
        }).then((response) => {
            if (response?.data) {
                setFoodCategory(response.data);
            } else {
                setFoodCategory([]);
            }
        }).catch(err => {
            setFoodCategory([]);
        });
    }

    const isSeletedCategoryType = (index) => {
        return activeIndex === index;
    }

    const onClickTab = (categoryType, index) => {
        foodCategory.map((item) => {
            if (categoryType.categoryId === item.categoryId) {
                setRef.current.scrollToIndex({
                    animated: true,
                    index: index,
                    viewPosition: 0
                });
                setActiveIndex(index);
            }
        });
    }

    const getItemLayout = (data, index) => (
        {
            length: totalHeight,
            offset: totalHeight * index,
            index,
        }
    )

    const scrollToActiveIndex = (index) => {
        if (index < foodCategory.length) {
            setActiveIndex(index);
            topRef.current.scrollToIndex({
                animated: true,
                index: index,
                viewPosition: 0
            });
        } else {
            setActiveIndex(foodCategory.length - 1);
            topRef.current.scrollToIndex({
                animated: true,
                index: foodCategory.length - 1,
                viewPosition: 0
            });
        }
    }

    const onLayout = ({ nativeEvent }) => {
        if (totalHeight <= 0) {
            setTotalHeight(nativeEvent.layout.height);
            setCategoryHeight(nativeEvent.layout.height / 2);
        }
    }

    const _fetchMore = () => {
        fetchAPI();
    };

    const selectFoodItem = (food) => {
        if (!selectedItem || (selectedItem && selectedItem.id !== food.id)) {
            setSelectedItem(food);
        }
    };

    const onBuyFood = (item) => {
        if (item && item.id) {
            setSelectedItem(item);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    <FlatList
                        ref={topRef}
                        data={foodCategory}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(index) => index.toString()}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                            <TopItems item={item} onPress={() => onClickTab(item, index)}
                                isSelected={isSeletedCategoryType(index)} />
                        )} />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={setRef}
                        getItemLayout={getItemLayout}
                        onMomentumScrollEnd={(ev) => {
                            if (Platform.OS === 'android') {
                                if (ev.nativeEvent.contentOffset.y >= 0) {
                                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.y / categoryHeight));
                                } else {
                                    scrollToActiveIndex(Math.floor(0 / categoryHeight));
                                }
                            }
                        }}
                        onScrollEndDrag={(ev) => {
                            if (Platform.OS === 'ios') {
                                if (ev.nativeEvent.contentOffset.y > 0) {
                                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.y / categoryHeight));
                                } else {
                                    scrollToActiveIndex(Math.floor(0 / categoryHeight));
                                }
                            }
                        }}
                        contentContainerCls="pt-6"
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={foodCategory}
                        keyExtractor={(it) => it.id}
                        onEndReached={() => _fetchMore()}
                        removeClippedSubviews
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View onLayout={(event) => onLayout(event)}>
                                <View style={{ flexDirection: 'row' }}>
                                    {item?.categoryName ?
                                        <Text cls="ff fw5"
                                            style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginHorizontal: 6 }}
                                        >{item.categoryName}</Text> : null}
                                    {item?.imageUrl ? (
                                        <Image
                                            source={{ uri: item.imageUrl }}
                                            style={{ width: 27, height: 28, borderRadius: 4, right: 7, position: 'absolute' }}
                                        />) : null}
                                </View>
                                {item?.promotionDesc ?
                                    <Text cls="ff fw5"
                                        style={{ color: 'orange', fontSize: 13, marginVertical: 8, marginHorizontal: 6 }}
                                    >{item.promotionDesc}</Text> : null}
                                {/* <FlatList
                                    data={item.foodItems}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(index) => index.toString()}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        <View style={{ flex: 1 }}>
                                            <Items
                                                item={item}
                                                onPress={selectFoodItem}
                                                onBuyFood={onBuyFood}
                                            />
                                        </View>
                                    )}
                                /> */}
                                <View style={{ height: 8 }} />
                            </View>
                        )
                        }
                    />
                </View>
            </View>
        </View>
    );
}

export default Home;