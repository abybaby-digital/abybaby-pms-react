import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import pmsLogo from "../../src/assets/images/PMS.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { makeLogin } from "../services/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ButtonLoader from "./common/ButtonLoader";
import CryptoJS from "crypto-js";
import { loginSuccess, setUsers } from "../redux/features/Auth/AuthSlice";
import { useState } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";

export function LoginForm({ className, ...props }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SECRET_KEY = "login-secret-key"; // Replace with a secure key

  const loginMutation = useMutation({
    mutationFn: ({ username, password }) => makeLogin(username, password),

    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("You are successfully logged in!");

        console.log("Login response", response.response.user);
        dispatch(setUsers(response?.response.user));

        // Encrypt the access token using AES
        const encryptedToken = CryptoJS.AES.encrypt(
          response.response.access_token,
          SECRET_KEY
        ).toString();

        // Store encrypted token and authentication state
        sessionStorage.setItem('token', encryptedToken);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('user', JSON.stringify(response.response.user));

        // Dispatch Redux action with user data and token
        dispatch(loginSuccess());

        // Navigate to the dashboard or last visited page
        const lastVisitedPath = sessionStorage.getItem("lastPath") || "/";
        navigate(lastVisitedPath, { replace: true });
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  });

  const submitData = (data) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            <img src={pmsLogo} alt="PMS Logo" className="w-[80%] mx-auto" />
            <p className="mt-5">Login</p>
          </CardTitle>
          <CardDescription className="text-center">
            Enter your username and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="flex flex-col gap-x-6 gap-y-3">

              {/* Username Input */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username should be at least 4 characters long",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    className="pe-3 -mb-[75px] relative z-5"
                  >{showPassword ? <RiEyeCloseFill className="text-gray-300" /> : <BsFillEyeFill className="text-gray-300"/>}</button>
                </div>
                <Input
                  id="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                />
                <div className="text-end">

                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-lightdark"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? <ButtonLoader /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
