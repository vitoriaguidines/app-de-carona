import { TextInput, TextInputProps } from "react-native";
import { defaultStyles } from '@/constants/Style'; 
import { View } from "./Themed";
import { MaterialIcons } from "@expo/vector-icons";

export function InputField({iconName, ...props}: InputFieldProps, ref: React.Ref<TextInput>) {
    return(
        <>
        <View style={defaultStyles.inputView}>
            <MaterialIcons name={iconName} size={40} style={defaultStyles.inputFieldIcon}></MaterialIcons>
            <TextInput {...props} ref={ref} 
                style= {defaultStyles.inputField}/>
        </View>
        </>
    )
}

export default interface InputFieldProps extends TextInputProps {
    iconName: any;
} 