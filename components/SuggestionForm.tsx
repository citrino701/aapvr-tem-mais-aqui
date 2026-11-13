"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type SuggestionCopy = {
  button: string;
  title: string;
  prompt: string;
  label: string;
  placeholder: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  whatsappHint: string;
  whatsappInvalid: string;
  privacy: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
};

export default function SuggestionForm({ copy }: { copy: SuggestionCopy }) {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappError, setWhatsappError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    if (!isValidWhatsapp(whatsapp)) {
      setWhatsappError(true);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestion,
          whatsapp,
          page: window.location.pathname,
        }),
      });
      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        throw new Error("Suggestion submission failed");
      }

      setSuggestion("");
      setWhatsapp("");
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
          <label htmlFor="site-suggestion-whatsapp">{copy.whatsappLabel}</label>
          <input
            id="site-suggestion-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={whatsapp}
            onChange={(event) => {
              setWhatsapp(event.target.value);
              if (whatsappError) setWhatsappError(false);
              if (status === "error") setStatus("idle");
            }}
            placeholder={copy.whatsappPlaceholder}
            maxLength={25}
            aria-describedby="site-suggestion-whatsapp-hint"
            aria-invalid={whatsappError}
            required
          />
          <small id="site-suggestion-whatsapp-hint" className="footer-suggestion-hint">{copy.whatsappHint}</small>
          {whatsappError && <p className="footer-suggestion-status is-error" role="alert">{copy.whatsappInvalid}</p>}
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

/** Aceita números brasileiros com DDD (10 ou 11 dígitos), com ou sem o código 55. */
function isValidWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "");
  return digits.length === 10 || digits.length === 11;
}
