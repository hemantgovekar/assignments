const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require("zod")


const userSchema = z.string().email();
const pwdSchema = z.string().length(16)

const testKnowledge = (userInput) => {
    const userParsed = userSchema.safeParse(userInput);
    const pwdParsed = pwdSchema.safeParse(userInput);
    console.log(userParsed && pwdParsed);
}

console.log(testKnowledge("hemant@gmail.com"))

let token = "";
const secret = "govekar"
const checkjwttoken = (username, password) => {
    token = jwt.sign({ "username": username, "password": password }, secret);
    console.log(token);
}

console.log(checkjwttoken("hemantgovekar@gmail.com", "hemant123"));

const verifyToken = () => {
    const verify = jwt.verify(token, secret);
    console.log(verify);
}

console.log(verifyToken())

