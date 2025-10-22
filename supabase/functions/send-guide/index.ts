import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendGuideRequest {
  firstName: string;
  email: string;
  guideTitle: string;
  guideDownloadUrl: string;
}

// Input validation functions
const validateFirstName = (name: string): string | null => {
  if (!name || !name.trim()) return "First name is required";
  if (name.trim().length < 2) return "First name must be at least 2 characters";
  if (name.trim().length > 50) return "First name must be less than 50 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return "First name contains invalid characters";
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email || !email.trim()) return "Email address is required";
  if (email.length > 255) return "Email must be less than 255 characters";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const sanitizeHtml = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { firstName, email, guideTitle, guideDownloadUrl }: SendGuideRequest = await req.json();

    // Server-side validation
    const firstNameError = validateFirstName(firstName);
    if (firstNameError) {
      console.log(`Validation error - firstName: ${firstNameError}`);
      return new Response(
        JSON.stringify({ error: firstNameError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailError = validateEmail(email);
    if (emailError) {
      console.log(`Validation error - email: ${emailError}`);
      return new Response(
        JSON.stringify({ error: emailError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!guideTitle || !guideDownloadUrl) {
      console.log("Validation error - missing guide information");
      return new Response(
        JSON.stringify({ error: "Guide information is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs for HTML output
    const sanitizedFirstName = sanitizeHtml(firstName.trim());
    const sanitizedGuideTitle = sanitizeHtml(guideTitle.trim());
    const sanitizedEmail = email.trim().toLowerCase();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store submission in database
    const { data: dbData, error: dbError } = await supabase
      .from("email_subscriptions")
      .insert({
        first_name: firstName.trim(),
        email: sanitizedEmail,
        guide_title: guideTitle.trim(),
        guide_download_url: guideDownloadUrl,
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save subscription" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Database insert successful for email: ${sanitizedEmail}`);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Big Daddy's Big Tips <noreply@bigdaddysbigtips.com>",
      to: [sanitizedEmail],
      subject: `Your Free Guide: ${sanitizedGuideTitle}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: white; padding: 40px; border-radius: 10px;">
              <h1 style="color: #333;">Hi ${sanitizedFirstName}! 👋</h1>
              <p style="font-size: 16px; color: #666; line-height: 1.6;">
                Thank you for your interest in <strong>${sanitizedGuideTitle}</strong>!
              </p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="${guideDownloadUrl}" style="background-color: #000; color: white; padding: 16px 50px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Download Your Free Guide →
                </a>
              </div>
              <p style="color: #999; font-size: 12px;">
                If the button doesn't work, copy this link:<br>
                <a href="${guideDownloadUrl}" style="color: #666; word-break: break-all;">${guideDownloadUrl}</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      console.error("Email sending error:", emailResponse.error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Email sent successfully to ${sanitizedEmail}:`, emailResponse);

    // Update database to mark email as sent
    await supabase
      .from("email_subscriptions")
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq("id", dbData.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Guide sent successfully!" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Unexpected error in send-guide function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
