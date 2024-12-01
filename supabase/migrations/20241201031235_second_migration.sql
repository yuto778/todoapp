create table "public"."Users" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "Email" character varying not null,
    "UserName" text not null
);


alter table "public"."Users" enable row level security;

CREATE UNIQUE INDEX "Users_Email_key" ON public."Users" USING btree ("Email");

CREATE UNIQUE INDEX "Users_pkey" ON public."Users" USING btree (id);

alter table "public"."Users" add constraint "Users_pkey" PRIMARY KEY using index "Users_pkey";

alter table "public"."Users" add constraint "Users_Email_key" UNIQUE using index "Users_Email_key";

alter table "public"."Users" add constraint "public_Users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Users" validate constraint "public_Users_id_fkey";

grant delete on table "public"."Users" to "anon";

grant insert on table "public"."Users" to "anon";

grant references on table "public"."Users" to "anon";

grant select on table "public"."Users" to "anon";

grant trigger on table "public"."Users" to "anon";

grant truncate on table "public"."Users" to "anon";

grant update on table "public"."Users" to "anon";

grant delete on table "public"."Users" to "authenticated";

grant insert on table "public"."Users" to "authenticated";

grant references on table "public"."Users" to "authenticated";

grant select on table "public"."Users" to "authenticated";

grant trigger on table "public"."Users" to "authenticated";

grant truncate on table "public"."Users" to "authenticated";

grant update on table "public"."Users" to "authenticated";

grant delete on table "public"."Users" to "service_role";

grant insert on table "public"."Users" to "service_role";

grant references on table "public"."Users" to "service_role";

grant select on table "public"."Users" to "service_role";

grant trigger on table "public"."Users" to "service_role";

grant truncate on table "public"."Users" to "service_role";

grant update on table "public"."Users" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."Users"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."Users"
as permissive
for select
to public
using (true);



