"use client"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

 
export default function LoginPage(){
    const router = useRouter();
    const [form,setForm] = useState({
        email: "",
        password: ""
    })
async function Handlesubmit(e){
    e.preventDefault()

    const res = await signIn("credentials",{
        redirect: false,
        email: form.email,
        password: form.password
    });
    if(res.error){
        alert(res.error)
        return
    }
    router.push("dashboard")
}




    return(
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>Login</h1>

      <form onSubmit={Handlesubmit} style={{ marginTop: 20 }}>
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          style={{
            width: "100%",
            padding: 10,
            background: "#DB4437",
            color: "white",
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          Login with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          style={{
            width: "100%",
            padding: 10,
            background: "#24292E",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}