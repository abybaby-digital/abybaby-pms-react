import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import kvLogo from "../../src/assets/images/kv-logo.png"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            <img src={kvLogo} alt="this is brand logo" className="w-1/2 mx-auto" />
            <p className="mt-5">Login</p>
          </CardTitle>
          <CardDescription>
            Enter  username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-gradient-green" onClick={()=>{navigate("/krishi-vikas-admin/")}}>
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
