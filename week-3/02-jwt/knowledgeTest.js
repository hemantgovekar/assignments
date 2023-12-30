const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require("zod")


const userSchema = z.string().email();
const pwdSchema = z.string().length(16)
const tokenSchema = z.string();

const testKnowledge = (userInput) => {
    const userParsed = userSchema.safeParse(userInput);
    const pwdParsed = pwdSchema.safeParse(userInput);
    return (userParsed && pwdParsed);
}

console.log("testknowlege", testKnowledge("hemant@gmail.com"))

let token = "";
const secret = "govekar"

const checkjwttoken = (username, password) => {
    token = jwt.sign({ "username": username, "password": password }, secret);
    console.log(token);


    token = tokenSchema.safeParse(token);

    const decodedJwt = jwt.decode(token.data, { complete: true });
    console.log(decodedJwt);
}

console.log(checkjwttoken("hemantgovekar@gmail.com", "hemant123"));


const verifyToken = (token, secret) => {
    const verify = jwt.verify(token, secret);
    console.log("verify", verify);

}
console.log("token", token)
console.log(verifyToken(token.data, secret))
