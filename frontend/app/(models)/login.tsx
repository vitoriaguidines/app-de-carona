import React, { useState } from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { loginUsuario } from '@/services/UserServices';
import { useUserContext } from '@/contexts/UserContext';


export default function LoginScreen() {

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    
    const userContext = useUserContext();

    function login(){
        loginUsuario(email!, password!).then((userId) => {
            if (userId === null){
                alert("Falha ao realizar login");
                return;
            }
            userContext.setIsLoggedIn(true);
            userContext.setUserId(userId);
        })
    }

  return (
    <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
        <ImageBackground source={uffBackground} style={defaultStyles.uff} blurRadius={8}>
            <Image source={uffLogo} style={defaultStyles.logo} />
        </ImageBackground>
        <View style={{...defaultStyles.rectangle, backgroundColor: "rgba(38, 42, 43, 0.6)"}}>
            <InputField placeholder='Email' iconName={"email"} value={email} onChangeText={setEmail}/>
            <InputField placeholder='Senha' iconName={"key"} value={password} secureTextEntry={true} onChangeText={setPassword}/>
            <Button style={{margin: 20, marginBottom: 15}} 
                    text={'Login'} 
                    color={'#0F62AC'} 
                    textColor={'white'} 
                    onClick={login} 
                    disabled={email == undefined || password == undefined}
            />;
        </View>
    </View>
  );
}
