import { StyleSheet } from "react-native";
import { Palette } from "../../resources/theme/palette";

export const Style = StyleSheet.create({
    header: {
        width: "100%",
        height: 50,
        backgroundColor: Palette.purple,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerFont: {
        color: Palette.white,
        fontSize: 18,
        fontWeight: '500',
    },
});