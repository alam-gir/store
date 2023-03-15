import { jwtVerify } from "jose";
const encoder = new TextEncoder();
const secret = encoder.encode(process.env.SECRET_JWT);
const verifyUser = async (jwt) => {
    try {
        return await jwtVerify(jwt, secret);
    } catch (error) {
        console.log(error.message)        
    }
};

export { verifyUser };
