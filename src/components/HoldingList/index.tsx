import { View, Text, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { HoldingListProps, StockHoldingInterface } from '../../types';
import { USER_PREFERRED_CURRENCY } from '../../constants';
import { getProfitLoss } from '../../utils/profitLossUtils';
import { Style } from './style';

const HoldingList = (props: HoldingListProps) => {

    const { data, containerStyle, contentContainerStyle, listItemStyle } = props;

    // Callback for rendering each stock holding item in the list
    const _renderList = useCallback(({ item }: { item: StockHoldingInterface }) => {
        return (
            <View style={[listItemStyle?.containerStyle || Style.listContainerStyle]}>

                {/* Stock Symbol and Quantity View */}
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={[listItemStyle?.stockTitleStyle || Style.stockTitleStyle]}>{item.symbol.toUpperCase()}</Text>
                    <View style={Style.flexRow}>
                        <Text style={[listItemStyle?.subtitleStyle || Style.subtitleStyle]}>LTP: </Text>
                        <Text style={[listItemStyle?.liveAmountStyle || Style.liveAmountStyle]}>{USER_PREFERRED_CURRENCY} {item.ltp.toFixed(2)}</Text>
                    </View>
                </View>

                {/* LTP and Profit/Loss View */}
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                    <Text style={[listItemStyle?.stockQuantityStyle || Style.stockQuantityStyle]}>{item.quantity}</Text>
                    <View style={Style.flexRow}>
                        <Text style={[listItemStyle?.subtitleStyle || Style.subtitleStyle]}>P/L: </Text>
                        <Text style={[listItemStyle?.liveAmountStyle || Style.liveAmountStyle]}>{USER_PREFERRED_CURRENCY} {getProfitLoss(item).toFixed(2)}</Text>
                    </View>
                </View>

            </View>
        )
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={_renderList}
            style={[containerStyle || Style.containerStyle]}
            contentContainerStyle={[contentContainerStyle || Style.contentContainerStyle]}
        />
    )
}

export default HoldingList