function successObj({ message = "", result = {} } = {}) {
    return {
        success: true,
        message, result
    }
}

function errorObj({ message = "", error = {} } = {}) {
    return {
        success: false,
        message, error
    }
}

function authentication({ }) {

}

export default { successObj, errorObj, authentication };