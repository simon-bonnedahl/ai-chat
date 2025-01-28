"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/lib/settings-store"

export function Settings() {
  const { openaiKey, anthropicKey, googleKey, setOpenAIKey, setAnthropicKey, setGoogleKey } = useSettings()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="outline"
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2"
      >
        API Settings
      </Button>

      {isVisible && (
        <div className="bg-white p-4 rounded-lg shadow-lg border w-80">
          <h2 className="text-lg font-semibold mb-4">API Keys</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="sk-..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Anthropic API Key</label>
              <input
                type="password"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="sk-ant-..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Google API Key</label>
              <input
                type="password"
                value={googleKey}
                onChange={(e) => setGoogleKey(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="AIza..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}