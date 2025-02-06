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
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLogInState } from "../redux/features/Auth/AuthSlice";
import ButtonLoader from "./common/ButtonLoader";

export function LoginForm({
  className,
  ...props
}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const loginMutation = useMutation({

    mutationFn: ({ username, password }) => makeLogin(username, password),

    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("You are successfully logged in!");
      }
      else{
        console.log(response);
        
        toast.error(response.message);
      }
    },
  });

  const submitData = (data) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            <img
              src={pmsLogo}
              alt="PMS Logo"
              className="w-[80%] mx-auto"
            />
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
                  type="text" // Change to "text" if it's not an email
                  placeholder="user123"
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-lightdark"
                disabled={loginMutation.isPending} // Disable button while loading
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
