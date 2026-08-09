"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import * as Accordion from "@radix-ui/react-accordion"
import { HelpCircle, ChevronDown, Bug, Lock, Settings } from "lucide-react"

const faqs = [
  {
    id: "item-1",
    question: "How do I add a new password?",
    answer: "You can click the 'Add New Password' button located in the sidebar navigation or from the Dashboard. This will open a secure form where you can enter the title, username, and password.",
    icon: Lock
  },
  {
    id: "item-2",
    question: "What should I do if an error occurs?",
    answer: "If you encounter an unexpected error (like 'Network Error' or a page failing to load):\n\n1. Check your internet connection.\n2. Refresh the page (F5 or Cmd+R).\n3. If the issue persists, go to the Settings page and sign out, then sign back in.\n4. Ensure you are not running any aggressive ad-blockers that might be blocking the database connection.",
    icon: Bug
  },
  {
    id: "item-3",
    question: "How do I update my profile?",
    answer: "Click on your avatar in the top right corner and select 'Profile'. There you can update your Name, Age, Gender, and generate a new secure Avatar.",
    icon: Settings
  }
]

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight">
            Help Center
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground">
            Frequently asked questions and troubleshooting guides.
          </p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" /> FAQ
          </CardTitle>
          <CardDescription>Find answers to common questions about using VaultX.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.id} value={faq.id} className="border border-border/50 rounded-lg overflow-hidden bg-background/50">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-4 text-left font-medium transition-all hover:bg-accent/50 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3">
                      <faq.icon className="w-4 h-4 text-primary" />
                      {faq.question}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-4 pb-4 pt-0 text-sm text-muted-foreground whitespace-pre-wrap animate-in slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1">
                  <div className="pl-7 pt-2 border-t border-border/50">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </CardContent>
      </Card>
      
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border/50 rounded-xl bg-card/30">
        <Bug className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-heading text-lg font-semibold">Still need help?</h3>
        <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
          If you are still experiencing issues, please contact our support team securely.
        </p>
        <button className="mt-4 px-4 py-2 bg-primary/10 text-primary font-medium text-sm rounded-lg hover:bg-primary/20 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  )
}
