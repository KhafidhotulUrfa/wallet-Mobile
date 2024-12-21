import React, {createContext, useState, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api} from '../api'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [myData, setMyData] = useState({})

    const refreshData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const result = await api.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            setMyData(result.data.data)
            console.log(myData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value={{myData, refreshData}}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => {
    const {myData, refreshData} = useContext(UserContext)
    return {myData, refreshData}
}