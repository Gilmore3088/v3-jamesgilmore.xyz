"use client";

import { useState, type FormEvent } from "react";
import { Send, MapPin } from "lucide-react";

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

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "JLGilmore2@gmail.com",
    href: "mailto:JLGilmore2@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jlgilmore",
    href: "https://www.linkedin.com/in/jlgilmore",
  },
  {
    label: "GitHub",
    value: "github.com/jlgilmore",
    href: "https://github.com/jlgilmore",
  },
];

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
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
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
    <div className="noise-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Page Header */}
        <div className="animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Let&apos;s Connect
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Have a question or want to connect? Send me a message and I will
            get back to you.
          </p>
          <hr className="hr-gold opacity-30 mt-6" />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="mt-8 animate-fade-up rounded-lg border border-green-800/50 bg-green-900/10 p-5 text-sm text-green-400">
            Message sent successfully. I will get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 animate-fade-up rounded-lg border border-red-800/50 bg-red-900/10 p-5 text-sm text-red-400">
            Something went wrong. Please try again or email me directly.
          </div>
        )}

        {/* Split Layout: Form Left, Info Right */}
        <div className="mt-14 grid gap-16 lg:grid-cols-5">
          {/* Form - Left */}
          <div className="lg:col-span-3 animate-fade-up animation-delay-100">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full border-b border-border bg-transparent px-0 pb-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors duration-300 focus:border-gold"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-3 w-full border-b border-border bg-transparent px-0 pb-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors duration-300 focus:border-gold"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-3 w-full resize-none border-b border-border bg-transparent px-0 pb-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors duration-300 focus:border-gold"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2.5 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_30px_-5px_rgb(197_165_114/0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={15} />
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info - Right */}
          <div className="lg:col-span-2 animate-fade-up animation-delay-200">
            <div className="rounded-lg border border-border bg-surface p-8">
              <h2 className="font-display text-xl font-semibold text-text-primary">
                Get in Touch
              </h2>
              <hr className="hr-gold opacity-20 my-5" />

              {/* Location */}
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={15} className="text-gold flex-shrink-0" />
                <span className="text-sm text-text-secondary">
                  Seattle, WA
                </span>
              </div>

              {/* Links */}
              <div className="space-y-5">
                {CONTACT_LINKS.map((link) => (
                  <div key={link.label}>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                      {link.label}
                    </p>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-text-secondary transition-colors duration-300 hover:text-gold"
                    >
                      {link.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
