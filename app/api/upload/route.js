import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file found" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      ).end(buffer);
    });

    return Response.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
