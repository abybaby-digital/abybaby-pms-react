import { LoginForm } from "@/components/login-form"
import pmsLogInBg from "../../assets/images/loginbg.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import kvadminloginbanner from "../../assets/images/admin-login-banner.jpg"


export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 " style={{ background: `linear-gradient(#141414e6, #ffffffb7),url(${pmsLogInBg}) no-repeat top/cover` }}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}