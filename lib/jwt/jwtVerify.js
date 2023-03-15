import { jwtVerify } from "jose";
import { textEncode } from "../textEncoder/encodeText";
const secret =  textEncode(process.env.SECRET_JWT);
const verifyUser = async (jwt) => {
    try {
        return await jwtVerify(jwt, secret);
    } catch (error) {
        console.log(error.message)        
    }
};

export { verifyUser };
