Nextjs Fullstack Ecommerce Admin

> A premium, production-ready eCommerce admin system built with Next.js 14, NextAuth v5, MongoDB and Cloudinary.






---

🚀 Quick summary

This repository contains a full-stack eCommerce Admin Panel + User dashboard with secure role-based authentication (Admin / User), protected API routes, Cloudinary image uploads, and a modern responsive UI.

Demo video: /mnt/data/VN20251120_225418.mp4


---

⭐️ Highlights

✅ Next.js 14 (App Router)

✅ NextAuth v5 (Google / GitHub / Credentials)

✅ Role-based access control (admin & user)

✅ MongoDB (Mongoose) for persistence

✅ Cloudinary integration for image uploads

✅ Full CRUD for products (Admin)

✅ Admin dashboard (create / edit / delete / list)

✅ User dashboard (profile, orders stub)

✅ Clean, responsive UI (Tailwind-friendly structure)

✅ Production-ready environment & deployment guidance



---

📁 Repo structure (high-level)

/ app
  / admin        # Admin pages (layout, products, users)
  / api
    / auth       # next-auth route
    / products   # /api/products & /api/products/[id]
    / users      # /api/users
  / user         # user dashboard pages
/ lib            # db connection helpers
/ models         # Mongoose models
/ public         # static assets (default avatar, images)
/ README.md


---

🛠 Tech stack

Frontend / Backend: Next.js 14 (App Router)

Auth: NextAuth v5

DB: MongoDB (Mongoose)

Image storage: Cloudinary

Styling: Tailwind / CSS (project has utility classes ready)

Host: Vercel: https://ecommerce-admin-azure-three.vercel.app/



---

⚙️ Environment variables

Create a .env.local file (or add variables to your host) with the following keys:

MONGO_URI=<your-mongodb-connection-string>
NEXTAUTH_URL=https://<your-vercel-app>.vercel.app
NEXTAUTH_SECRET=<strong_random_secret>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

> Important: Add the same variables to Vercel under Project → Settings → Environment Variables (Production & Preview & Development). Do not commit .env.local to GitHub.




---

🧭 Local setup (quick)

1. Clone the repo



git clone https://github.com/AmanLegendDev/Nextjs-Fullstack-Ecommerce-Admin.git
cd Nextjs-Fullstack-Ecommerce-Admin

2. Install dependencies



npm install
# or
pnpm install

3. Add .env.local with variables from the section above.


4. Run locally



npm run dev

Open http://localhost:3000.


---

🔒 Important production notes

Vercel is the recommended host for Next.js App Router + NextAuth server actions. When deploying on Vercel, manually add environment variables in the Vercel dashboard. Redeploy without build cache after updating envs.

If you face DB connection errors during build (e.g. uri parameter undefined), ensure MONGO_URI is added correctly and API routes are set to dynamic rendering where necessary (see export const dynamic = "force-dynamic";).



---

🧩 API Endpoints (overview)

GET /api/products — list products

POST /api/products — create product (admin only)

GET /api/products/:id — get product by id

PUT /api/products/:id — update product (admin only)

DELETE /api/products/:id — delete product (admin only)

GET /api/users — list users (admin only)


Each route uses server-side Next.js route handlers and Mongoose models. Error handling returns clear JSON responses with appropriate HTTP status codes.


---

🖼️ Cloudinary image uploads

Uploads are handled client-side via a /api/upload endpoint which forwards the file to Cloudinary using server-side credentials.

Make sure Cloudinary env vars are added in production.



---

🧪 Testing & Debugging tips

If NextAuth session endpoints fail on dev: check NEXTAUTH_URL and NEXTAUTH_SECRET.

For DB errors during build: mark API route as dynamic to prevent prerendering.

Use browser devtools & server logs to inspect API responses.



---

🤝 Contributing

PRs welcome. Keep changes scoped, write clear commit messages, and raise issues for features or bugs.


---

📝 License

MIT © AmanLegendDev


---

