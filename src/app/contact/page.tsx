"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import SectionHeading from "@/components/section-heading";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (!response.ok) {
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
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading
        title="Contact"
        subtitle="Have a question or want to connect? Send me a message."
      />

      {/* Email */}
      <div className="mb-10 flex items-center justify-center gap-2 text-text-secondary">
        <Mail size={16} className="text-gold" />
        <a
          href="mailto:JLGilmore2@gmail.com"
          className="text-sm hover:text-gold transition-colors"
        >
          JLGilmore2@gmail.com
        </a>
      </div>

      {/* Success Message */}
      {status === "success" && (
        <div className="mb-8 rounded-lg border border-green-800 bg-green-900/20 p-4 text-center text-sm text-green-400">
          Message sent successfully. I will get back to you soon.
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div className="mb-8 rounded-lg border border-red-800 bg-red-900/20 p-4 text-center text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-text-primary"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold"
            placeholder="Your message..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-400">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send size={16} />
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
