"use client";

import { useState } from "react";
import { companyProfile, interestOptions } from "@/content/site";
import { submitNewsletterForm } from "@/lib/api";
import { ApiError } from "@/lib/api/errors";
import type { NewsletterSubmission } from "@/lib/api/types";
import { cn } from "@/lib/cn";

interface FormErrors {
  name?: string;
  email?: string;
  interest?: string;
}

const initialValues: NewsletterSubmission = {
  name: "",
  email: "",
  company: "",
  interest: "",
  notes: "",
};

function validate(values: NewsletterSubmission) {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter the name of the person joining the bulletin.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter an email address for premiere updates.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter an email address in a valid format.";
  }

  if (!values.interest.trim()) {
    errors.interest = "Select the part of the launch you are exploring.";
  }

  return errors;
}

function getFieldError(
  field: keyof FormErrors,
  values: NewsletterSubmission,
): string | undefined {
  return validate(values)[field];
}

export function ContactScreen() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const helperIds = {
    name: "contact-name-help",
    email: "contact-email-help",
    interest: "contact-interest-help",
    notes: "contact-notes-help",
  } as const;

  function updateField<K extends keyof NewsletterSubmission>(
    field: K,
    value: NewsletterSubmission[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  }

  function handleBlur(field: keyof FormErrors) {
    const nextError = getFieldError(field, values);

    setErrors((current) => {
      const next = { ...current };

      if (nextError) {
        next[field] = nextError;
      } else {
        delete next[field];
      }

      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError("");
    setSubmitMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const receipt = await submitNewsletterForm(values);
      setSubmitMessage(receipt.message);
      setValues(initialValues);
    } catch (error: unknown) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "The bulletin request could not be sent.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 rounded-3xl border border-line bg-surface/70 p-8 shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <p className="text-sm text-accent">Contact and newsletter</p>
            <h1 className="[font-family:var(--font-display)] text-5xl text-balance">
              Step into the bulletin before the teaser drops.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted text-pretty">
              Use the working frontend form below to join premiere updates or
              begin a launch conversation. The submission is mocked locally now
              and can later move behind a live Laravel endpoint without changing
              the UI contract.
            </p>
            <div className="space-y-3 rounded-3xl border border-line bg-black/20 p-5 text-sm text-muted">
              <p>{companyProfile.contactEmail}</p>
              <p>{companyProfile.contactPhone}</p>
              <p>{companyProfile.locations.join(" / ")}</p>
            </div>
          </div>

          <form
            noValidate
            aria-busy={isSubmitting}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-line bg-black/20 p-6 shadow-lg"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                error={errors.name}
                fieldId="contact-name"
                label="Your name"
              >
                <input
                  id="contact-name"
                  name="name"
                  value={values.name}
                  onBlur={() => handleBlur("name")}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-describedby={cn(helperIds.name, errors.name && "contact-name-error")}
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-foreground placeholder:text-muted"
                  placeholder="Achieng Otieno"
                />
                <p id={helperIds.name} className="text-sm text-muted">
                  We use this to address the bulletin and any follow-up notes.
                </p>
              </Field>

              <Field
                error={errors.email}
                fieldId="contact-email"
                label="Email address"
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onBlur={() => handleBlur("email")}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-describedby={cn(
                    helperIds.email,
                    errors.email && "contact-email-error",
                  )}
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-foreground placeholder:text-muted"
                  placeholder="achieng@ukwelipictures.co.ke"
                />
                <p id={helperIds.email} className="text-sm text-muted">
                  Teaser drops, premiere dates, and opening-week updates land here.
                </p>
              </Field>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field fieldId="contact-company" label="Company or publication">
                <input
                  id="contact-company"
                  name="company"
                  value={values.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-foreground placeholder:text-muted"
                  placeholder="Ukweli Pictures"
                />
              </Field>

              <Field
                error={errors.interest}
                fieldId="contact-interest"
                label="Area of interest"
              >
                <select
                  id="contact-interest"
                  name="interest"
                  value={values.interest}
                  onBlur={() => handleBlur("interest")}
                  onChange={(event) => updateField("interest", event.target.value)}
                  aria-describedby={cn(
                    helperIds.interest,
                    errors.interest && "contact-interest-error",
                  )}
                  aria-invalid={Boolean(errors.interest)}
                  className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-foreground"
                >
                  <option value="">Select a launch focus</option>
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p id={helperIds.interest} className="text-sm text-muted">
                  Pick the part of the launch you want the bulletin to emphasize.
                </p>
              </Field>
            </div>

            <Field
              fieldId="contact-notes"
              label="What are you launching?"
              className="mt-5"
            >
              <textarea
                id="contact-notes"
                name="notes"
                rows={5}
                value={values.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                aria-describedby={helperIds.notes}
                className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-foreground placeholder:text-muted"
                placeholder="A prestige thriller opening in autumn, with teaser timing and premiere-night strategy in scope."
              />
              <p id={helperIds.notes} className="text-sm text-muted">
                Optional context for the launch team. Paste is fully supported.
              </p>
            </Field>

            <div aria-live="polite" className="mt-5 space-y-3">
              {submitError ? (
                <p
                  role="alert"
                  className="rounded-2xl border border-red-900 bg-red-950/60 px-4 py-3 text-sm text-pretty"
                >
                  {submitError}
                </p>
              ) : null}
              {submitMessage ? (
                <p className="rounded-2xl border border-green-900 bg-green-950/60 px-4 py-3 text-sm text-pretty">
                  {submitMessage}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted text-pretty">
                Demo mode is active. The API boundary is clean and ready for a
                future POST request.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-full bg-accent px-6 py-3 text-sm text-panel-ink disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Reserving your place..." : "Join the bulletin"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({
  children,
  className,
  error,
  fieldId,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  error?: string;
  fieldId: string;
  label: string;
}) {
  const errorId = `${fieldId}-error`;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={fieldId} className="text-sm text-accent">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-sm text-red-100">
          {error}
        </p>
      ) : null}
    </div>
  );
}
