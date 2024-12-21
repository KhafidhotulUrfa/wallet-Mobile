import axios from "axios";

const api = axios.create({
    baseURL: 'http://54.254.164.127/api/v1',
})

const apiCheck = async () => {
    try {
        const result = await api.get('/check')
        console.log(result.data)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const registerUser = async (payload) => {
    try {
        const result = await api.post('/auth/register', payload)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const loginUser = async (email, password) => {
    let payload = {
        email: email,
        password: password,
    }
    try {
        const result = await api.post('/auth/login', payload)
        const token = await result.data.data.token
        return token
    } catch (error) {
        throw error
    }
}

module.exports = {
    api,
    apiCheck,
    registerUser,
    loginUser
}