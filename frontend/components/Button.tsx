import { defaultStyles } from "@/constants/Style";
import { TouchableOpacity, Text, ViewStyle, StyleProp } from "react-native";

export function Button(props: ButtonProps){
    return(
        <TouchableOpacity style={[defaultStyles.button, props.style, { backgroundColor: props.color }]} onPress={props.onClick} disabled={props.disabled}>
                <Text style={{fontSize: 20, color: `${props.textColor}`}}>{props.text}</Text>
        </TouchableOpacity >
    )
}
export interface ButtonProps {
    style?: StyleProp<ViewStyle>,
    text: string,
    color?: string,
    textColor?: string,
    disabled?: boolean,
    onClick: () => void,
}