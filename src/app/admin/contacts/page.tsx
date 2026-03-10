import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { markAsRead, deleteContact, deleteAllRead } from "./actions";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminContactsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }

  const messages: Contact[] = contacts ?? [];
  const unreadCount = messages.filter((c) => !c.read).length;
  const readCount = messages.filter((c) => c.read).length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {messages.length} total
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {readCount > 0 && (
            <form action={deleteAllRead}>
              <button
                type="submit"
                className="rounded-md border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                Delete All Read ({readCount})
              </button>
            </form>
          )}
          <Link
            href="/admin"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-gold/50 hover:text-gold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-text-secondary">No messages yet.</p>
          <p className="mt-1 text-sm text-text-muted">
            Messages from your contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((contact) => (
            <div
              key={contact.id}
              className={`rounded-lg border bg-surface transition-colors ${
                contact.read
                  ? "border-border"
                  : "border-l-4 border-gold/60 border-t-border border-r-border border-b-border"
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="truncate text-lg font-semibold text-text-primary">
                        {contact.name}
                      </h2>
                      {!contact.read && (
                        <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 block text-sm text-gold-dark transition-colors hover:text-gold"
                    >
                      {contact.email}
                    </a>
                    <p className="mt-1 text-xs text-text-muted">
                      {formatDate(contact.created_at)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {!contact.read && (
                      <form action={markAsRead}>
                        <input type="hidden" name="id" value={contact.id} />
                        <button
                          type="submit"
                          className="rounded-md border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
                        >
                          Mark as Read
                        </button>
                      </form>
                    )}
                    <form action={deleteContact}>
                      <input type="hidden" name="id" value={contact.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-red-500/30 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-4 rounded-md bg-surface-light p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                    {contact.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
