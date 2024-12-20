create table "public"."todos" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "completed" boolean not null default false,
    "memo" text,
    "priority" smallint not null,
    "due_date" date not null
);


alter table "public"."todos" enable row level security;

CREATE UNIQUE INDEX todos_pkey ON public.todos USING btree (id);

alter table "public"."todos" add constraint "todos_pkey" PRIMARY KEY using index "todos_pkey";

alter table "public"."todos" add constraint "public_todos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."todos" validate constraint "public_todos_user_id_fkey";

grant delete on table "public"."todos" to "anon";

grant insert on table "public"."todos" to "anon";

grant references on table "public"."todos" to "anon";

grant select on table "public"."todos" to "anon";

grant trigger on table "public"."todos" to "anon";

grant truncate on table "public"."todos" to "anon";

grant update on table "public"."todos" to "anon";

grant delete on table "public"."todos" to "authenticated";

grant insert on table "public"."todos" to "authenticated";

grant references on table "public"."todos" to "authenticated";

grant select on table "public"."todos" to "authenticated";

grant trigger on table "public"."todos" to "authenticated";

grant truncate on table "public"."todos" to "authenticated";

grant update on table "public"."todos" to "authenticated";

grant delete on table "public"."todos" to "service_role";

grant insert on table "public"."todos" to "service_role";

grant references on table "public"."todos" to "service_role";

grant select on table "public"."todos" to "service_role";

grant trigger on table "public"."todos" to "service_role";

grant truncate on table "public"."todos" to "service_role";

grant update on table "public"."todos" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."todos"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."todos"
as permissive
for select
to public
using (true);


create policy "update"
on "public"."todos"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



