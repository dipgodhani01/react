const yup = require('yup')

// mobile validation
// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const phoneRegExp = /^[6-9]\d{9}$/;

// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z]).{8,}$/;


// phone number validation

exports.userSchema = yup.object({
    dob:yup.string().required(),
    gender:yup.string().required(),
    dialCode:yup.string().required(),
    password:yup.string().matches(passwordRules, { message: "Please create a stronger password" })
    .required(),
    mobile:yup.string().required().matches(phoneRegExp, "Invalid Mobile Number!"),
    email:yup.string().email().required(),
    name:yup.string().required(),
})

exports.signInSchema = yup.object({
    password:yup.string().required(),
    email:yup.string().email().required()
})
exports.adminSignInSchema = yup.object({
    username:yup.string().required(),
    password:yup.string().required(),
})

exports.forgotPasswordSchema = yup.object({
    email:yup.string().email().required(),
})


exports.updateUserSchema = yup.object({
    email:yup.string().email().required(),
    username:yup.string().required(),
    name:yup.string().required(),
})



