"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const Page = () => {
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
    <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: "Mayur" })}>
      Invoke Background job
    </Button>
  )
}

export default Page