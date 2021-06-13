const emailRegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/);
const usernameRegExp = new RegExp(/^(?=.{4,20}$)[a-zA-Z0-9]*$/);
const postTextRegExp = new RegExp(/^.{10,255}$/);

const validateEmail = (email) => {
    return emailRegExp.test(email);
}
const validatePassword = (password) => {
    return passRegExp.test(password);
}

const validateUsername = (username) => {
    return usernameRegExp.test(username);
}

const validatePostText = (postText) => {
    return postTextRegExp.test(postText);
}

module.exports = {
    validateEmail,
    validatePassword,
    validateUsername,
    validatePostText
}