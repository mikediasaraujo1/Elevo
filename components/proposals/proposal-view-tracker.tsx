"use client";

import { useEffect, useRef } from "react";

interface ProposalViewTrackerProps {
  slug: string;
}

export function ProposalViewTracker({ slug }: ProposalViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch(`/api/track/${slug}`, { method: "POST" }).catch(() => {
      // Silent fail — tracking should not affect UX
    });
  }, [slug]);

  return null;
}
