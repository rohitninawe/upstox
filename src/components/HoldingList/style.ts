import { StyleSheet } from "react-native";
import { Palette } from "../../resources/theme/palette";

export const Style = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: Palette.grey
    },
    contentContainerStyle: {
        paddingLeft: 20,
        backgroundColor: Palette.white
    },
    listContainerStyle: {
        flex: 1,
        backgroundColor: Palette.white,
        paddingRight: 20,
        // flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Palette.lightGrey,
        paddingVertical: 8
    },
    stockTitleStyle: {
        fontSize: 16,
        color: Palette.black,
        fontWeight: "bold"
    },
    stockQuantityStyle: {
        fontSize: 16,
        color: Palette.black,
    },
    subtitleStyle: {
        fontSize: 16,
        color: Palette.black,
    },
    liveAmountStyle: {
        fontSize: 16,
        color: Palette.black,
        fontWeight: "500"
    },
    flexRow: {
        flexDirection: "row",
        alignSelf: "flex-end",
    },
})