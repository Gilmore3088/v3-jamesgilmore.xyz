"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(
  name: string,
  email: string,
  message: string
): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

const INPUT_CLASS =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted outline-none transition-shadow focus:shadow-[4px_4px_0_var(--color-mustard)] aria-[invalid=true]:border-coral";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { errors?: string[] }
          | null;
        setServerError(data?.errors?.[0] ?? null);
        throw new Error("Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Status region: always in the DOM so screen readers announce changes */}
      <div aria-live="polite" role="status" className="mb-8 empty:hidden">
        {status === "success" && (
          <div className="animate-fade-up rounded-lg border border-mint/50 bg-mint/10 p-4 text-sm text-mint">
            Message sent successfully. I will get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div className="animate-fade-up rounded-lg border border-coral/50 bg-coral/10 p-4 text-sm text-coral">
            {serverError ??
              "Something went wrong. Please try again or email me directly."}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="eyebrow block"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={INPUT_CLASS}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-coral">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="eyebrow block"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={INPUT_CLASS}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-coral">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="eyebrow block"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${INPUT_CLASS} resize-none`}
            placeholder="Your message..."
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm text-coral">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from humans, bots tend to fill it in */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={15} />
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
}
