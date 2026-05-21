import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginUser = () => {

    if(email === "admin@gmail.com" && password === "admin123"){
      navigate("/dashboard");
    }
    else{
      alert("Invalid Login");
    }

  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-3xl shadow-lg shadow-red-500/40 w-[400px]">

        <h1 className="text-4xl text-red-500 font-bold mb-10 text-center">
          Rajgandharv Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-black text-white mb-5 outline-none"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-black text-white mb-5 outline-none"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="w-full bg-red-600 p-4 rounded-xl hover:bg-red-700 duration-300"
        >
          Login
        </button>

      </div>

    </div>
  );
}