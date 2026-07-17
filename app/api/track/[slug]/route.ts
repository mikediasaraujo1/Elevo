import { createPublicClient } from "@/lib/proposals/public";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResendClient } from "@/lib/resend";
import {
  getProposalViewedSubject,
  ProposalViewedEmail,
} from "@/lib/emails/proposal-viewed";
import { getSiteUrl } from "@/lib/site-url";
import { formatDateTime } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

async function notifyBrokerByEmail(slug: string): Promise<void> {
  const supabase = createPublicClient();

  const { data: proposal } = await supabase
    .from("proposals")
    .select("user_id, titulo, endereco, cidade")
    .eq("slug", slug)
    .maybeSingle();

  if (!proposal) return;

  const admin = createAdminClient();
  const { data: userData } = await admin.auth.admin.getUserById(
    proposal.user_id
  );

  const brokerEmail = userData.user?.email;
  if (!brokerEmail) return;

  const resend = getResendClient();
  if (!resend) return;

  const viewedAt = formatDateTime(new Date().toISOString());
  const dashboardUrl = `${getSiteUrl()}/dashboard`;

  await resend.emails.send({
    from: "ELEVO <onboarding@resend.dev>",
    to: brokerEmail,
    subject: getProposalViewedSubject(proposal.titulo),
    react: ProposalViewedEmail({
      titulo: proposal.titulo,
      endereco: proposal.endereco,
      cidade: proposal.cidade,
      viewedAt,
      dashboardUrl,
    }),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "";

  const supabase = createPublicClient();

  const { error } = await supabase.rpc("track_proposal_view", {
    p_slug: slug,
    p_ip: ip,
    p_user_agent: userAgent,
  });

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    await notifyBrokerByEmail(slug);
  } catch (err) {
    console.error("[ELEVO] Email notification failed:", err);
  }

  return NextResponse.json({ ok: true });
}
