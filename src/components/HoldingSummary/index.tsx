import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { USER_PREFERRED_CURRENCY } from '../../constants';
import { getTodaysProfitLoss, getTotalCurrentValue, getTotalInvestmentValue, getTotalProfitLoss } from '../../utils/profitLossUtils';
import { Style } from './style';
import { HoldingSummaryProps } from '../../types';

const HoldingSummary = (props: HoldingSummaryProps) => {

    const { data } = props;

    const [summary, showSummary] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => showSummary(!summary)}
            activeOpacity={1}
            style={Style.footer}>
            <Text style={[Style.expander, {
                transform: [{ rotate: summary ? '0deg' : '180deg' }]
            }]}>▼</Text>

            {/* Summary Details */}
            {summary && (
                <>
                    {/* Current Value Row */}
                    <View style={Style.row}>
                        <Text style={Style.title}>Current Value:</Text>
                        <Text style={Style.subtitle}>{USER_PREFERRED_CURRENCY}{getTotalCurrentValue(data).toFixed(2)}</Text>
                    </View>

                    {/* Total Investment Row */}
                    <View style={Style.row}>
                        <Text style={Style.title}>Total Investment:</Text>
                        <Text style={Style.subtitle}>{USER_PREFERRED_CURRENCY}{getTotalInvestmentValue(data).toFixed(2)}</Text>
                    </View>

                    {/* Today's Profit & Loss Row */}
                    <View style={[Style.row, { marginBottom: 20 }]}>
                        <Text style={Style.title}>Today's Profit & Loss:</Text>
                        <Text style={Style.subtitle}>{USER_PREFERRED_CURRENCY}{getTodaysProfitLoss(data).toFixed(2)}</Text>
                    </View>
                </>
            )}

            {/* Total Profit & Loss Row */}
            <View style={Style.row}>
                <Text style={Style.title}>Profit & Loss:</Text>
                <Text style={Style.subtitle}>{USER_PREFERRED_CURRENCY}{getTotalProfitLoss(data).toFixed(2)}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default HoldingSummary