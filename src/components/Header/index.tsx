import React from 'react'
import { View, Text } from 'react-native'
import { Style } from './style'
import { HeaderProps } from '../../types'

function Header(props: HeaderProps) {

    const { containerStyle, titleStyle } = props;

    return (
        <View style={[containerStyle || Style.header]}>
            <Text style={[titleStyle || Style.headerFont]}>Upstox Holding</Text>
        </View>
    )
}

export default Header