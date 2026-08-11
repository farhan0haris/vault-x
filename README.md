<div align="center">
  <img src="https://raw.githubusercontent.com/farhan0haris/vault-x/main/public/logo.png" alt="VaultX Logo" width="100" height="100">
  <h3 align="center">VaultX Security</h3>
  <p align="center">
    A premium, modern cybersecurity dashboard and password manager built with Next.js & Firebase.
    <br />
    <a href="https://vault-x-ennz.vercel.app"><strong>View Live Demo »</strong></a>
  </p>
</div>

## 🛡️ About VaultX

VaultX is a highly polished, production-ready password management interface designed with a premium, hacker-inspired aesthetic. It features seamless Google Authentication, real-time cloud sync, buttery-smooth micro-interactions, responsive layouts, and a zero-knowledge security vibe.

### 🌟 Key Features
- **Firebase Authentication & Firestore:** Fully integrated Google Sign-In with real-time cloud data storage for user vaults.
- **Dynamic Vault Management:** Add, delete, favorite, and organize passwords, secure notes, and credit cards.
- **Premium UI/UX:** Built with Tailwind CSS and Framer Motion for glassy panels, 3D hover effects, and fluid animations.
- **Adaptive Theming:** Complete semantic color system balancing a deep dark mode and crisp neutral light mode, with cyberpunk emerald/indigo accents.
- **Functional Dashboard:** Live item counts, search filtering, one-click copy to clipboard with toast notifications.
- **Custom Profiles:** Auto-generated unique user avatars using the DiceBear API.
- **Next.js App Router:** Fast, optimized routing and structure using React Server Components.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Backend/Auth:** [Firebase](https://firebase.google.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

To run this project locally on your machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/farhan0haris/vault-x.git
   cd vault-x
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase Environment Variables**
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Designed & Built by [@farhan0haris](https://github.com/farhan0haris)*
