import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashpass = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashpass,
      role: "user",
    });

    return Response.json(
      { message: "user created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
