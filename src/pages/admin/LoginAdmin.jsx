import { LoginForm } from "@/components/login-form"
import kvadminloginbanner from "../../assets/images/admin-login-banner.jpg"


export default function LoginAdmin() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 " style={{background: `linear-gradient(#868686b5, #ffffff9b),url(${kvadminloginbanner}) no-repeat center/cover`}}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}