import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ 
      authenticated: false,
      message: "You are not authenticated" 
    }, { status: 401 });
  }
  
  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.user?.id,
      email: session.user?.email,
      name: session.user?.name,
    }
  });
} 