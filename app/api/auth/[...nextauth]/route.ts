import { handlers } from "@/auth";

// Keep these as concrete route handler functions for Next.js' route loader.
export async function GET(request: Request) {
  return handlers.GET(request);
}

export async function POST(request: Request) {
  return handlers.POST(request);
}
