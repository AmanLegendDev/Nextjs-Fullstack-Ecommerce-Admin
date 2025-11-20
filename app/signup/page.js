"use client"
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage(){
    const router = useRouter()
    const [form,setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
async function Handlesubmit(e){
    e.preventDefault()
    try{
        const res = await fetch("/api/signup",{
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(form)
        });
        const data = await res.json()
        if(!res.ok){
alert(data.error)
return;
        }
         alert("Signup Successful!");
      router.push("/login");
        
    }catch(err){
alert("Something went wrong");
    }
}
return(
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>Signup</h1>

      <form onSubmit={Handlesubmit} style={{ marginTop: 20 }}>
        <input
          placeholder="Name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

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
          Signup
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* ⭐ GOOGLE LOGIN */}
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
        Continue with Google
      </button>

      {/* ⭐ GITHUB LOGIN */}
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
        Continue with GitHub
      </button>

      <p style={{ marginTop: 15 }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "blue" }}>
          Login
        </a>
      </p>
    </div>
  );

}