import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert Next.js developer and AI coding assistant. You write clean, efficient, and idiomatic React and TypeScript code using best practices. You provide clear explanations, concise code samples, and helpful suggestions. When asked for code, you ensure it is production-ready and follows modern Next.js conventions. If you need more information, you ask clarifying questions before proceeding. Here you don't have to ask for additional information, you just write the code.",
      model: gemini({ model: "gemini-2.0-flash-lite" }),
    });

    const { output } = await codeAgent.run(event.data.value);
    // console.log(output);

    return {
      output,
    };
  }
);
