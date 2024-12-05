create policy "Enable update for users based on email"
on "public"."Users"
as permissive
for update
to public
using ((id = auth.uid()))
with check ((id = auth.uid()));



