import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-24 lg:px-12 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      
      <h1 className="font-heading text-4xl font-bold mb-6">Terms of Service</h1>
      
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Last updated: August 2026
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the VaultX application, you accept and agree to be bound by the terms and provision of this agreement. 
          If you do not agree to abide by these terms, please do not use this service.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Description of Service</h2>
        <p>
          VaultX is a zero-knowledge, end-to-end encrypted password manager and secure vault. 
          We provide tools to generate, store, and manage cryptographic keys, passwords, and secure notes.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. User Responsibilities</h2>
        <p>
          You are entirely responsible for maintaining the confidentiality of your Master Password. 
          Because of our zero-knowledge architecture, VaultX cannot recover your Master Password or data if it is lost.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
        <p>
          VaultX shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, 
          whether incurred directly or indirectly, or any loss of data resulting from the use of our services.
        </p>
      </div>
    </div>
  )
}
