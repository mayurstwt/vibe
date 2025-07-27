"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

const Page = () => {
   const [value, setValue] = useState("")
  const trpc = useTRPC()
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job invoked")
    },
    onError: () => {
      toast.error("Failed to invoke background job")
    }
  }))
  return (
        <div className="flex flex-col items-center justify-center h-screen max-w-md mx-auto gap-y-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ value: value })}>
        Invoke Background job
      </Button>
    </div>
  )
}

export default Page