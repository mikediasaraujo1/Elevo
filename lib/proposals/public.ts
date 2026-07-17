import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getProposalBySlug(slug: string) {
  const supabase = createPublicClient();

  const { data: proposal, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !proposal) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, whatsapp")
    .eq("id", proposal.user_id)
    .maybeSingle();

  return { proposal, profile };
}

export { getProposalBySlug };
