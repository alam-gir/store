import { NextResponse } from "next/server";
import { verifyUser } from "./lib/jwt/jwtVerify";
const middleware = async (req, res) => {

  //get token from cookies
  const adminJWT = req.cookies.get("adminJWT")?.value;
  //get origin
  const origin = req.nextUrl.origin;
  //get pathname
  const pathname = req.nextUrl.pathname;
  if (adminJWT) {
    // verify admin
    const admin = await verifyUser(adminJWT);
    if (admin) {
      // admin verified ===========
      // set cookies with user data 
      // console.log('setting cookies.........')
      //  response.cookies.set('admin', 'admin', {
      //   path: '/'
      // })
      // console.log('set cookies.........')

      // if try to go to the login page send to the home page
      if (pathname.startsWith("/auth/dashboard")) {
        return NextResponse.redirect(origin);
      }
    } else {
      // wrong admin ==============
      // if something wrong with admin verifications redirect admin signin page initially
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(`${origin}/auth/dashboard/signin`);
      }
    }
  } else {
    // admin not availbale ============

    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(`${origin}/auth/dashboard/signin`);
    }
  }
};

export default middleware;
