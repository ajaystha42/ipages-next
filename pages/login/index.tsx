import axios from "axios";
import { useEffect, useState } from "react";
import { jwt, useLoggedIn } from "../../services/login";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const API_URL = "http://localhost:8000/api/user/";
const Login = () => {
  const loggedIn = useLoggedIn();

  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userObj = JSON.parse(userInfo);
      jwt.next(userObj.token);
      router.push("/");
      // navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLogin(true);
    } else setIsLogin(false);
  }, [loggedIn]);

  const [userData, setUserData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  const clickHandler = async () => {
    const url = API_URL + `${isLogin ? "login" : "signup"}`;
    const response = await axios.post(url, userData);
    const { data } = response;
    if (isLogin) {
      if (data) {
        jwt.next(data.token);
        localStorage.setItem("user", JSON.stringify(data));
        // navigate("/");
      }
    } else {
      const { user } = data;
      if (user) setIsLogin(true);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-md rounded-xl border px-4 py-10 text-gray-700 shadow-lg sm:px-8">
      <div className="mb-16 flex justify-between">
        <span className="font-bold">
          <span className="inline-block h-3 w-3 bg-blue-600"></span>{" "}
          Fusemachines
        </span>
        {!isLogin ? (
          <span className="">
            Have account?{" "}
            <a
              onClick={() => setIsLogin(true)}
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </a>
          </span>
        ) : (
          <span className="">
            No account?{" "}
            <a
              onClick={() => setIsLogin(false)}
              className="font-medium text-blue-600 hover:underline"
            >
              Signup
            </a>
          </span>
        )}
      </div>
      <p className="mb-5 text-3xl font-medium">
        Manage your produce business us!
      </p>
      <p className="mb-6 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa
        corrupti praesentium?
      </p>
      <div className="mb-6">
        <div className="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
          <input
            type="email"
            id="email"
            className="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Email"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div className="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
          <input
            type="password"
            id="password"
            className="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Password"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </div>
      </div>
      <button
        className={`mb-6 rounded-xl px-8 py-3 font-medium text-white ${
          loggedIn ? "bg-red-600" : "hover:bg-blue-700 bg-blue-600"
        }`}
        onClick={clickHandler}
        disabled={!!loggedIn}
      >
        {isLogin ? "Login" : "Get Started"}
      </button>
      <p className="">
        By signing up you are agreeing to our{" "}
        <a
          href="#"
          className="whitespace-nowrap font-medium text-gray-900 hover:underline"
        >
          Terms and Conditions
        </a>
      </p>
    </div>
  );
};

export default Login;
