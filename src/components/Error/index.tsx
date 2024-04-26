import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import { ErrorProps } from '../../types'

const Error = (props: ErrorProps) => {

    const { containerStyle, titleStyle } = props;

    return (
        <View style={[containerStyle || Style.errorWrapper]}>
            <Text style={[titleStyle || Style.errorText]}>Something went wrong. Please try again later.</Text>
        </View>
    )
}

export default Error