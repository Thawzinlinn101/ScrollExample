import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function TopItems(props) {
    const { item, onPress, isSelected } = props;
    return (
        <>
            {item && item.categoryName ?
                <TouchableOpacity onPress={onPress}
                    style={{
                        padding: 12, backgroundColor: isSelected ? 'orange' : 'white', borderRadius: 12, marginRight: 20, marginVertical: 10, shadowColor: 'grey',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 8, marginHorizontal: 6, elevation: 5,
                    }}>
                    <Text style={{ color: isSelected ? 'white' : 'orange' }}>{item.categoryName}</Text>
                </TouchableOpacity>
                : null}
        </>
    );
}

export default TopItems;
