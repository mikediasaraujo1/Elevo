-- Allow brokers to read view logs for their own proposals
create policy "Users can view own proposal views"
  on public.proposal_views for select
  using (
    exists (
      select 1 from public.proposals
      where proposals.id = proposal_views.proposal_id
        and proposals.user_id = auth.uid()
    )
  );
