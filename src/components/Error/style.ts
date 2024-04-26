import { StyleSheet } from "react-native";
import { Palette } from "../../resources/theme/palette";

export const Style = StyleSheet.create({
    errorWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {
        textAlign: 'center',
        fontSize: 18,
        color: Palette.red,
    },
})