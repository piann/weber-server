import jwt from "jsonwebtoken";


const decodeJWT = async(token: string): Promise<undefined> => {
    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN||"");
        console.log(decoded);
        return undefined;
    } catch(error) {
        return undefined;
    }
};

export default decodeJWT;