"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CreditCard, FileText, Loader2 } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddPasswordModal({ isOpen, onClose, onSuccess }: AddPasswordModalProps) {
  const [type, setType] = useState<"login" | "card" | "note">("login");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    try {
      const payload: any = {
        type,
        title,
        isFavorite: false,
        isTrash: false,
        createdAt: Date.now(),
      };

      if (type === "login") {
        payload.username = username;
        payload.password = password;
      } else if (type === "card") {
        payload.cardholder = username; // repurpose username state for cardholder
        payload.cardNumber = cardNumber;
        payload.exp = cardExp;
      } else if (type === "note") {
        payload.content = content;
      }

      await addDoc(collection(db, "vaultItems"), payload);
      
      if (onSuccess) onSuccess();
      
      // Reset form
      setTitle("");
      setUsername("");
      setPassword("");
      setContent("");
      setCardNumber("");
      setCardExp("");
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save item. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-6"
          >
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold tracking-tight">Add New Item</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full text-muted-foreground">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex space-x-2 mb-6 p-1 bg-accent/50 rounded-lg">
                {[
                  { id: "login", label: "Login", icon: Lock },
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "note", label: "Note", icon: FileText },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium rounded-md transition-all ${
                      type === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <t.icon className="h-4 w-4" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Title</label>
                  <Input 
                    required 
                    placeholder="e.g. GitHub, Chase Bank" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="bg-background"
                    autoComplete="off"
                  />
                </div>

                {type === "login" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Username / Email</label>
                      <Input 
                        placeholder="user@example.com" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-background" 
                        autoComplete="off"
                        data-lpignore="true"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Password</label>
                      <Input 
                        type="text" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="bg-background"
                        style={{ WebkitTextSecurity: "disc" } as React.CSSProperties}
                        autoComplete="off"
                        data-lpignore="true"
                        spellCheck={false}
                      />
                    </div>
                  </>
                )}

                {type === "card" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Cardholder Name</label>
                      <Input 
                        placeholder="John Doe" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="bg-background"
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Card Number</label>
                      <Input 
                        placeholder="•••• •••• •••• 4242" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                        className="bg-background font-mono"
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Expiration (MM/YY)</label>
                      <Input 
                        placeholder="12/26" 
                        value={cardExp} 
                        onChange={(e) => setCardExp(e.target.value)} 
                        className="bg-background w-1/2"
                        autoComplete="off"
                      />
                    </div>
                  </>
                )}

                {type === "note" && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Secure Note Content</label>
                    <textarea 
                      required
                      placeholder="Enter your private note..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      autoComplete="off"
                    />
                  </div>
                )}

                <div className="pt-4 flex justify-end space-x-2 border-t border-border/50 mt-6">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSubmit} disabled={loading || !title} className="bg-primary text-primary-foreground">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save to Vault"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
