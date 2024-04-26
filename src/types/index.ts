import { StyleProp, TextStyle, ViewStyle } from "react-native"

export interface UserStockInterface {
    userHolding: StockHoldingInterface[]
}

export interface StockHoldingInterface {
    symbol: string,
    quantity: number,
    ltp: number,
    avgPrice: number,
    close: number
}

export interface LoaderProps {
    color?: string,
    size?: number | "small" | "large"
}

export interface HeaderProps {
    containerStyle?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
}

export interface ErrorProps {
    containerStyle?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
}

export interface HoldingListProps {
    data: StockHoldingInterface[],
    containerStyle?: StyleProp<ViewStyle>,
    listItemStyle?: {
        containerStyle?: StyleProp<ViewStyle>,
        stockTitleStyle?: StyleProp<TextStyle>,
        stockQuantityStyle?: StyleProp<TextStyle>,
        subtitleStyle?: StyleProp<TextStyle>,
        liveAmountStyle?: StyleProp<TextStyle>,
    },
    contentContainerStyle?: StyleProp<ViewStyle>,
}

export interface HoldingSummaryProps {
    data: StockHoldingInterface[],
}