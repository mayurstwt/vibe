import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.mayur.queryOptions({ text: "Mayur" }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client/>
    </HydrationBoundary>
  )
}

export default Page