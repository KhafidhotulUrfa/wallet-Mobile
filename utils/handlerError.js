export const handlerError = (error) => {
    if(error.response == null) {
        console.log(error)
        alert(error)
        return
    }
    if(error.response.data == null) {
        console.log(error.response)
        alert(error.response)
        return
    }
    if(error.response.data.errors != null) {
        console.log(error.response.data.errors)
        alert(`Error:${error.response.data.errors.map((x) => ' ' + x.message)}`)
        return
    }

    console.log(error.response.data)
    alert(`Error: ${error.response.data.message}`)
    return
}