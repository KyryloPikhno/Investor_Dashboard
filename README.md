# 🧠 Investor Dashboard

A modern dashboard for investors to track their portfolio, view total investments, returns, and upcoming distributions. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

---

## 📸 Screenshots

### 🔐 Login Page
<img width="1680" alt="Снимок экрана 2025-05-18 в 12 09 06 PM" src="https://github.com/user-attachments/assets/fb9e61c5-562d-48b3-bf5c-0523eb351ddc" />

### 📊 Dashboard
1 <img width="1680" alt="Снимок экрана 2025-05-18 в 12 09 23 PM" src="https://github.com/user-attachments/assets/e0cbb645-c16f-46cd-9969-2bb06e5c92bc" />
2 <img width="1680" alt="Снимок экрана 2025-05-18 в 12 09 30 PM" src="https://github.com/user-attachments/assets/1a0ba972-18ec-4de0-bab0-f6f417f304d1" />

### ⏳ Loading State
<img width="1680" alt="Снимок экрана 2025-05-18 в 12 11 24 PM" src="https://github.com/user-attachments/assets/6ced5322-b170-4ec9-99ce-6517b41f056b" />

### 💀 Error State
1 <img width="1680" alt="Снимок экрана 2025-05-18 в 12 14 32 PM" src="https://github.com/user-attachments/assets/0c08ab8c-c15f-4b2f-a84e-e0af41612eed" />
2 <img width="1680" alt="Снимок экрана 2025-05-18 в 12 35 27 PM" src="https://github.com/user-attachments/assets/e5d1eec5-dcd8-4abf-960e-dc39ebe8ca65" />

---

## 🚀 Tech Stack

| Technology     | Description                        |
|----------------|------------------------------------|
| **Next.js**    | Full-stack React framework         |
| **TypeScript** | Type-safe JavaScript               |
| **Tailwind CSS** | Utility-first CSS framework     |
| **Prisma**     | Modern ORM for database access     |
| **React Hook Form** | Form state management        |
| **Zod**        | Schema validation for TypeScript   |
| **Framer Motion** | Animation library              |
| **ESLint + Prettier** | Code quality tools         |

### 🧠 AI Tools Used

- **ChatGPT**
- **Cursor**

---

## 🚀 Getting Started
Follow these steps to set up and run the project locally:

1. Clone the Repository
```bash
git clone https://github.com/your-username/investor-dashboard.git
cd investor-dashboard
```

2. Create a .env File
Create an environment file for your local configuration:

```bash
cp .env.example .env
Then update it with your local database settings. Here's an example:

env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/investor_dashboard?schema=public"
Make sure your PostgreSQL instance is running and accessible.
```

3. Install Dependencies
Use Yarn to install project dependencies:

```bash
yarn install
```

4. Set Up the Database
Run the following command to generate Prisma client, apply schema migrations, and seed the database:

```bash
yarn db:setup
This runs:

yarn prisma:generate – Generates Prisma client

yarn prisma:migrate – Applies database migrations

yarn seed – Seeds the database with example data
```

5. Start the Development Server
```bash
yarn dev
Your app will be running at: http://localhost:3000
```

