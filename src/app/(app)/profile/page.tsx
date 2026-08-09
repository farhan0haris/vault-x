"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { updateProfile } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, User, Camera } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [avatarSeed, setAvatarSeed] = useState("")

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      setName(user.displayName || "")
      setAvatarSeed(user.displayName || user.uid)
      
      try {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          setAge(data.age || "")
          setGender(data.gender || "")
          if (data.avatarSeed) setAvatarSeed(data.avatarSeed)
        }
      } catch (error) {
        console.error("Error loading profile", error)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      // Update Auth Profile
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name })
      }

      // Update Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        age,
        gender,
        avatarSeed,
        updatedAt: Date.now()
      }, { merge: true })

      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const generateNewAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7)
    setAvatarSeed(randomSeed)
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your personal information and avatar.</p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>This information is securely stored in your personal vault.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/50">
              <motion.div whileHover={{ scale: 1.05 }} className="relative group cursor-pointer" onClick={generateNewAvatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${avatarSeed}&backgroundColor=transparent`} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full border-4 border-background shadow-xl bg-accent"
                />
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <div>
                <h3 className="font-semibold text-lg">{name || "Vault User"}</h3>
                <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                <Button type="button" variant="outline" size="sm" onClick={generateNewAvatar}>
                  Generate Avatar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="pl-10" 
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input 
                    type="number" 
                    value={age} 
                    onChange={e => setAge(e.target.value)} 
                    placeholder="e.g. 28"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Gender</label>
                  <select 
                    value={gender} 
                    onChange={e => setGender(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={saving} className="shadow-lg shadow-primary/20">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
