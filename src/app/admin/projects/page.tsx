import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "./actions";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
        Failed to load projects: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-gold-light"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-text-secondary">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="mt-2 inline-block text-sm text-gold hover:text-gold-light"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Technologies
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                  Order
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="transition-colors hover:bg-surface-light"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-text-primary">
                      {project.title}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-text-secondary">
                      {project.category ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(project.technologies ?? []).map((tech: string) => (
                        <span
                          key={tech}
                          className="inline-block rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted">
                    {project.display_order}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-md border border-border px-3 py-1 text-xs text-text-secondary transition-colors hover:border-gold/50 hover:text-gold"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProject(project.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-md border border-border px-3 py-1 text-xs text-text-secondary transition-colors hover:border-red-500/30 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
