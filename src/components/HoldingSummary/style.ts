import { StyleSheet } from "react-native";
import { Palette } from "../../resources/theme/palette";

export const Style = StyleSheet.create({
    title: {
        fontSize: 18,
        color: Palette.black,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 18,
        color: Palette.black,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5
    },
    expander: {
        position: 'absolute',
        alignSelf: 'center',
        top: -5,
        fontSize: 25,
        color: Palette.lightPurple,
    },
    footer: {
        backgroundColor: Palette.white,
        padding: 20,
    },
})