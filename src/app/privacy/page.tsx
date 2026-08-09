import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-24 lg:px-12 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      
      <h1 className="font-heading text-4xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Last updated: August 2026
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p>
          VaultX operates on a strict zero-knowledge architecture. We do not have access to your master password or any of the encrypted data you store in your vault. 
          The only information we collect is your email address for account creation and communication purposes.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          Your email is strictly used to authenticate your account, send security alerts, and communicate important updates regarding the VaultX service. 
          We do not sell, rent, or share your personal information with third parties.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Data Security</h2>
        <p>
          All your sensitive information is encrypted locally on your device using AES-256 bit encryption before being transmitted to our servers. 
          We employ industry-standard security measures to protect the integrity of our infrastructure.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact Farhan Haris at: <a href="mailto:farhanharis100@gmail.com" className="text-primary hover:underline">farhanharis100@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}
