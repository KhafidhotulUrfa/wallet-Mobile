import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import ModalComp from './Modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api, loginUser, registerUser} from '../api'
import { useAuth } from '../context/AuthContext';
import { handlerError } from '../utils/handlerError';


export default function Form({ state = 'login', fullnameState = useState(''), emailState = useState(''), passwordState = useState(''), avatarUrlState = useState(''), navigation}) {
    const [fullname, setFullname] = fullnameState
    const [email, setEmail] = emailState
    const [password, setPassword] = passwordState
    const [avatarUrl, setAvatarUrl] = avatarUrlState
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errors, setErrors] = useState({})
    const [agree, setAgree] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const {login} = useAuth()
    
    const registerHandler = async () => {
        let payload = {
            full_name: fullname,
            email: email,
            password: password,
        }
        if(phoneNumber != '') payload.phone_number = phoneNumber
        if(avatarUrl != '') payload.avatar_url = avatarUrl
        
        try {
            const result = await registerUser(payload)
            console.log(result.data)
            navigation.navigate('Login')
        } catch (error) {
            handlerError(error)
        }
    }

    const loginHandler = async () => {
        try {
            const token = await loginUser(email, password)
            await login(token)
            // navigation.navigate('Home')
        } catch (error) {
            handlerError(error)
        }
    }

    const modalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus ipsum nec magna venenatis dapibus. Proin eu ultrices nunc. Etiam ex magna, faucibus nec suscipit eget, feugiat ac mauris. In pellentesque arcu est, ut tempus sem sollicitudin quis. Maecenas ultricies a ante sit amet malesuada. Fusce gravida quam ut semper feugiat. Etiam quis dui sit amet eros mollis gravida eu non ante. Phasellus id elementum mi. In interdum ante non malesuada porttitor.\n\n   Nullam vitae lectus sed libero sagittis aliquet non vel arcu. Maecenas nisl elit, placerat sit amet eros sed, posuere rhoncus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam volutpat dui sed vulputate blandit.\n\n   Duis laoreet risus est, quis commodo massa viverra sit amet. Proin at enim vel urna malesuada efficitur. Nullam velit lacus, blandit ac tellus a, auctor suscipit lacus.\n\n   Sed dignissim eros felis. Duis sed diam libero. Vestibulum nisi erat, tempor a lorem sed, vehicula tempus augue.\n\n   In hac habitasse platea dictumst. Morbi eget urna eget eros fringilla scelerisque. Mauris vehicula erat urna, nec consequat libero pulvinar a. Donec lobortis mauris at mi venenatis volutpat. Praesent dignissim mattis pellentesque. Etiam convallis mauris tellus, eu ultrices lorem eleifend venenatis. Nam vehicula nunc urna, sed facilisis est aliquet sed.\n\n   Nullam et nunc at ligula facilisis commodo id non mauris. Duis eget enim at eros porta vulputate. Donec at risus id nisl laoreet efficitur. Mauris ligula turpis, consequat vel consequat quis, congue in est. Cras ac quam nunc. Integer facilisis turpis at commodo varius.\n\n   Suspendisse eget lorem lorem. Fusce porta, leo et eleifend laoreet, metus arcu pulvinar est, quis rhoncus erat turpis sit amet magna. Vivamus pharetra augue quis purus sollicitudin vehicula. Phasellus varius, est in fermentum aliquam, lorem velit ultrices ipsum, nec rutrum felis sapien quis nunc. Quisque et sem eget tortor varius maximus a in dolor.\n\n   Mauris quis ultricies mauris. Maecenas nibh neque, finibus ut faucibus venenatis, ornare eget ligula. Donec tristique eros ut mauris laoreet vestibulum. Donec laoreet, turpis nec luctus semper, mi urna facilisis ligula, nec maximus urna tortor vel lacus. Nam vel ligula auctor, aliquam felis sit amet, efficitur neque. Pellentesque vehicula iaculis pulvinar. Mauris facilisis nulla sed purus congue viverra.\n\n   Aenean blandit dapibus mi, vitae luctus odio tempor et. Sed id elementum orci. Mauris hendrerit pharetra mauris eget sagittis. Nullam mattis at nunc quis faucibus. Aenean feugiat, felis eget malesuada sollicitudin, dolor est condimentum libero, at pretium lorem ex id lectus. Quisque lectus lorem, semper id faucibus eu, semper sit amet erat. Cras consectetur nisl a tincidunt pharetra. Aenean dignissim faucibus velit eget eleifend.\n\n   Nulla facilisi. Mauris viverra leo at massa ornare, vel consectetur nunc gravida. Vivamus dui velit, ullamcorper id gravida non, ornare at odio. Aenean vel sem et velit egestas mollis. Praesent mi orci, pretium a tortor ornare, facilisis fringilla risus. Phasellus accumsan maximus lorem, vitae faucibus erat finibus ac. Donec eu neque aliquet, viverra dolor sed, fermentum orci. Aenean suscipit pellentesque nibh non luctus."


    const validateEmail = (email) => {
        const validEmail = /^[^\s@]+@[^\@]+\.[^\@]+$/.test(email)
        if(!validEmail) {
            setErrors({
                ...errors,
                email: "Email tidak valid"
            })
            return false
        }
        setErrors({
            ...errors,
            email: null
        })
        return validEmail
    }
    
    const validatePassword = (password) => {
        const validPassword = password.length > 7 ? true : false
        if(!validPassword) {
            setErrors({
                ...errors,
                password: 'Panjang password kurang dari 8'
            })
            return false
        }
        setErrors({
            ...errors,
            password: null
        })
        return validPassword
        
    }

    return (
        <View style={{width: '100%'}}>
            <KeyboardAvoidingView on>
                {state === 'register' &&
                <TextInput
                style={styles.input}
                value={fullname}
                onChangeText={setFullname}
                placeholder='Fullname'
                autoCorrect={false}
                />
                }
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {setEmail(text); validateEmail(text)}}
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    />
                {errors.email && <Text style={{marginHorizontal: 20, color: 'red', marginBottom: 10}}>{errors.email}</Text>}
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => {setPassword(text); validatePassword(text)}}
                    placeholder='Password'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    />
                {errors.password && <Text style={{marginHorizontal: 20, color: 'red', marginBottom: 10}}>{errors.password}</Text>}
                {state === 'register' &&
                <TextInput
                style={styles.input}
                value={avatarUrl}
                onChangeText={setAvatarUrl}
                placeholder='Avatar Url'
                autoCapitalize='none'
                autoCorrect={false}
                />
            }
            </KeyboardAvoidingView>
            {state === 'login' ? 
            <>
            <View style={{width: '100%'}}>
                <TouchableOpacity style={styles.btnLogin} onPress={() => loginHandler()}>
                    <Text style={{textAlign: 'center', color: 'white'}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{marginTop: 20, marginHorizontal: 10}}>
                <Text>
                    Don't have account?{' '}
                </Text>
                <Text style={{color: 'blue'}} onPress={() => navigation.navigate('Register')}>
                    Register here
                </Text>
            </Text>
            </>
            :
            <>
            <View style={{marginHorizontal: 10, padding: 10, flex: 1, marginVertical: 10, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center'}}>
                <TouchableOpacity style={{width: 20, height: 20, backgroundColor: !agree ? 'transparent' : '#19918F', borderRadius: 3}}>
                    <Ionicons name={agree ? 'checkmark' : 'square-outline'} size={20} onPress={() => setAgree(!agree)} style={{color: (agree ? 'white' : 'black')}}/>
                </TouchableOpacity>
                <Text style={{marginLeft: 10, height: 50, flexShrink: 1}} onPress={() => setAgree(!agree)}>
                    I have read and agree to the{' '}
                <Text style={{color: 'blue'}} onPress={() => setModalVisible(true)}>
                    Terms and Condition
                    <ModalComp modalText={modalText} modalState={[modalVisible, setModalVisible]} />
                </Text>
                </Text>
            </View>
            <View style={{width: '100%'}}>
                <TouchableOpacity style={agree ? styles.btnLogin : styles.disabledBtn} disabled={!agree} onPress={() => registerHandler()}>
                    <Text style={{textAlign: 'center', color: 'white'}}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{marginTop: 20, marginHorizontal: 10}}>
                Have an account?{' '}
                    <Text style={{color: 'blue'}} onPress={() => navigation.navigate('Login')}>
                        Login here
                    </Text>
            </Text>
            </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 15,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    btnLogin: {
        backgroundColor: '#19918F',
        marginHorizontal: 10,
        marginTop: 50,
        padding: 15,
        borderRadius: 10
    },
    disabledBtn: {
        backgroundColor: '#99A19F',
        marginHorizontal: 10,
        marginTop: 50,
        padding: 15,
        borderRadius: 10
    }
})