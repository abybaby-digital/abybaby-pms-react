import { LoginForm } from "@/components/login-form"
import pmsLogInBg from "../../assets/images/loginbg.png"
// import kvadminloginbanner from "../../assets/images/admin-login-banner.jpg"


export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 " style={{ background: `linear-gradient(#141414e6, #ffffffb7),url(${pmsLogInBg}) no-repeat top/cover`}}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}