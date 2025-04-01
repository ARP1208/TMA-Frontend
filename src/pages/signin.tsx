import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-indigo-900 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl p-6">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          TMA Library
        </h1>

        <div className="flex w-full max-w-4xl h-[600px] rounded-2xl overflow-hidden shadow-xl bg-white">
          <div className="w-1/2 p-6 flex flex-col justify-center items-center text-white bg-blue-900">
            <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-center text-lg">Sign in to continue</p>
          </div>

          <div className="w-px bg-gray-300" />

          <div className="w-1/2 p-6 bg-white overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-1">Sign in</h2>
            <p className="text-sm mb-4">
              New user?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Create an account
              </span>
            </p>

            <Input placeholder="Email address" className="mb-4" type="email" />
            <Button className="w-full mb-4">Continue</Button>

            <div className="flex items-center mb-4">
              <Separator className="flex-grow" />
              <span className="mx-2 text-sm text-gray-500">Or</span>
              <Separator className="flex-grow" />
            </div>

            <div className="flex flex-col items-center space-y-3">
              <Button
                variant="outline"
                className="w-4/5 flex items-center justify-center gap-2 rounded-full"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-4/5 flex items-center justify-center gap-2 rounded-full"
              >
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Continue with Facebook
              </Button>
              <Button
                variant="outline"
                className="w-4/5 flex items-center justify-center gap-2 rounded-full"
              >
                <img
                  src="https://www.svgrepo.com/show/511330/apple-173.svg"
                  alt="Apple"
                  className="w-5 h-5"
                />
                Continue with Apple
              </Button>
            </div>

            <p className="text-sm text-blue-600 mt-6 text-center hover:underline cursor-pointer">
              Get help signing in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
