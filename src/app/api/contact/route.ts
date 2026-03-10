import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { createClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const RATE_LIMIT_SECONDS = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const supabase = await createClient();

    const cutoff = new Date(
      Date.now() - RATE_LIMIT_SECONDS * 1000
    ).toISOString();

    const { data: recentSubmissions } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", email)
      .gte("created_at", cutoff);

    if (recentSubmissions && recentSubmissions.length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors: [
            "You have already submitted a message recently. Please wait a minute before trying again.",
          ],
        },
        { status: 429 }
      );
    }

    const { error } = await supabase
      .from("contacts")
      .insert({ name, email, message });

    if (error) {
      return NextResponse.json(
        { success: false, errors: ["Failed to submit message. Please try again."] },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: ["An unexpected error occurred."] },
      { status: 500 }
    );
  }
}
