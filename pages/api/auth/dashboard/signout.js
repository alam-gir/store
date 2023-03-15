import { serialize } from "cookie"

const signout = async (req,res) => {
    const token = req.cookies.adminJWT
    if(token){
        //cookies serialized
        const serialized = serialize('adminJWT',null, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: -1, // -1 for expires age and it should be remove the token from cookies
            path: '/'
          })

          res.setHeader('Set-Cookie', serialized)
        res.status(200).json({success: true, message: 'signed out'})
    }

    res.status(500).json({success: false, message: 'Internal server error'})
}

export default signout