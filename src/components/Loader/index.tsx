import { ActivityIndicator } from 'react-native'
import React from 'react'
import { Style } from './style'
import { LoaderProps } from '../../types'
import { Palette } from '../../resources/theme/palette'

function Loader(props: LoaderProps) {

    const { color, size } = props

    return (
        <ActivityIndicator
            style={Style.position}
            size={size || "large"}
            color={color || Palette.purple}
        />
    )
}

export default Loader