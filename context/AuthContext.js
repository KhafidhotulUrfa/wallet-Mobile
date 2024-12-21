import React, {createContext, useState, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = async (token) => {
        setUser({ token })
        await AsyncStorage.setItem('userToken', token)
        console.log('setToken', token)
    }

    const logout = async () => {
        setUser(null)
        console.log('ok', user)
        await AsyncStorage.removeItem('userToken')
    }

    const getToken = async () => {
        const token = await AsyncStorage.getItem('userToken')
        if(token != null &&  token != '') setUser(token)
    }

    return (
        <AuthContext.Provider value={{user, login, logout, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}