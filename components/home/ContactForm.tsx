"use client";

import { useState, type FormEvent } from "react";
import { buttonPrimary } from "@/components/ui/button";
import { site } from "@/content/site";

type FormCopy = {
  name: string;
  email: string;
  message: string;
  placeholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

const field =
  "mt-2 w-full rounded border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal";

export function ContactForm({ form }: { form: FormCopy }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(site.formAction, {
        method: "POST",
        body: new FormData(el),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("failed");
      el.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "sending" ? form.sending : status === "success" ? form.success : status === "error" ? form.error : "";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-ink">{form.name}</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-ink">{form.email}</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" spellCheck={false} className={field} />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">{form.message}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder={form.placeholder}
          className={`${field} resize-y`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className={`${buttonPrimary} disabled:opacity-60`}>
          {status === "sending" ? form.sending : form.submit}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {message}
        </p>
      </div>
    </form>
  );
}
