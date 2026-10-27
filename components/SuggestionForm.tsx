"use client";

import { FormEvent, useState } from "react";

type SuggestionCopy = {
  button: string;
  title: string;
  prompt: string;
  label: string;
  placeholder: string;
  privacy: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
};

export default function SuggestionForm({ copy }: { copy: SuggestionCopy }) {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestion,
          page: window.location.pathname,
        }),
      });
      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        throw new Error("Suggestion submission failed");
      }

      setSuggestion("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="footer-suggestion">
      <button
        type="button"
        className="footer-suggestion-trigger"
        aria-expanded={open}
        aria-controls="site-suggestion-form"
        onClick={() => setOpen((value) => !value)}
      >
        {copy.button}
      </button>
      {open && (
        <form id="site-suggestion-form" className="footer-suggestion-form" onSubmit={submit}>
          <h2>{copy.title}</h2>
          <p>{copy.prompt}</p>
          <label htmlFor="site-suggestion">{copy.label}</label>
          <textarea
            id="site-suggestion"
            name="suggestion"
            value={suggestion}
            onChange={(event) => {
              setSuggestion(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder={copy.placeholder}
            minLength={5}
            maxLength={2000}
            rows={4}
            required
          />
          <p className="footer-suggestion-privacy">{copy.privacy}</p>
          <button type="submit" className="button" disabled={status === "sending" || status === "success"}>
            {status === "sending" ? copy.submitting : copy.submit}
          </button>
          {status === "success" && <p className="footer-suggestion-status" role="status">{copy.success}</p>}
          {status === "error" && <p className="footer-suggestion-status is-error" role="alert">{copy.error}</p>}
        </form>
      )}
    </div>
  );
}
