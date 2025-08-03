"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Page = () => {
  const [value, setValue] = useState("")

  const trpc = useTRPC()
  const {data: messages} = useQuery(trpc.messages.getmany.queryOptions());
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message Created")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to invoke background job")
    }
  }))
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto gap-y-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-white"
        />
        <Button
          disabled={createMessage.isPending}
          onClick={() => createMessage.mutate({ value: value })}
        >
          Invoke Background job
        </Button>
        {JSON.stringify(messages, null, 2)}
      </div>
    </div>
  )
}

export default Page