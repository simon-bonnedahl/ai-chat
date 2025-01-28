"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type SettingsStore = {
  openaiKey: string
  anthropicKey: string
  googleKey: string
  setOpenAIKey: (key: string) => void
  setAnthropicKey: (key: string) => void
  setGoogleKey: (key: string) => void
}

export const useSettings = create<SettingsStore>(
  persist(
    (set) => ({
      openaiKey: "",
      anthropicKey: "",
      googleKey: "",
      setOpenAIKey: (key) => set({ openaiKey: key }),
      setAnthropicKey: (key) => set({ anthropicKey: key }),
      setGoogleKey: (key) => set({ googleKey: key }),
    }),
    {
      name: "api-keys",
    }
  )
)