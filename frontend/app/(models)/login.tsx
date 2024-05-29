import React, { useState } from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { defaultStyles } from '@/constants/Style';
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import { Button } from '@/components/Button';
import { useUserContext } from '@/contexts/UserContext';
import { Entypo } from '@expo/vector-icons';
import { loginUsuario } from '@/services/UserServices';

export default function LoginScreen() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const userContext = useUserContext();

    function login() {
        if (!validaLogin()) {
            return;
        }
         loginUsuario(email, password).then((userId) => {
             if (!userId) {
                 Alert.alert('Error', 'Falha no login. Verifique seus dados');
                 return;
             }
             userContext.setIsLoggedIn(true);
             userContext.setUserId(userId);
         }).catch((error) => {
             console.error('Erro no login:', error);
             Alert.alert('Erro', 'Um erro inesperado aconteceu');
         });
    }

    function validaLogin() {
        if (!email.trim()) {
            Alert.alert('Por favor, insira seu email');
            return false;
        }
        if (!emailValido(email)) {
            Alert.alert('Por favor, insira um email valido');
            return false;
        }
        if (!password.trim()) {
            Alert.alert('Por favor, insira a sua senha');
            return false;
        }
        return true;
    }

    function emailValido(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
            <ImageBackground source={uffBackground} style={defaultStyles.uff} blurRadius={8}>
                <Image source={uffLogo} style={defaultStyles.logo} />

                <View style={{ ...defaultStyles.rectangle, ...defaultStyles.centeredRectangle, backgroundColor: "rgba(38, 42, 43, 0.6)" }}>
                    <View style={[defaultStyles.container, { flex: 0, flexDirection: 'row' }]}>
                        <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={defaultStyles.inputField} placeholderTextColor={"grey"} />
                        <Entypo name="email" size={40} color='#0F62AC' style={{ marginTop: 12.5 }} />
                    </View>
                    <View style={[defaultStyles.container, { flex: 0, flexDirection: 'row' }]}>
                        <TextInput placeholder='Senha' value={password} onChangeText={setPassword} style={defaultStyles.inputField} secureTextEntry={true} placeholderTextColor={"grey"} />
                        <Entypo name="key" size={40} color='#0F62AC' style={{ marginTop: 12.5, }} />
                    </View>
                    <Button style={{ margin: 20, marginBottom: 15 }}
                        text={'Login'}
                        color={email === "" || password === "" ? '#808080' : '#0F62AC'}
                        textColor={'white'}
                        onClick={login}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}
