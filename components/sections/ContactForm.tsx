"use client";

import { useState } from "react";
import { formContent, homeContent } from "@/config/site-content";
import { Button } from "@/components/ui/Button";
import { FormField, fieldControlClass } from "@/components/ui/FormField";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { contactSchema } from "@/lib/validation";

type FieldErrors = Partial<Record<"name" | "phone" | "postalCode" | "interest" | "message", string>>;

export function ContactForm({ nested = false }: { nested?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      interest: String(form.get("interest") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "phone") next.phone = formContent.invalidPhone;
        else if (key === "postalCode") next.postalCode = formContent.invalidPostal;
        else if (typeof key === "string") next[key as keyof FieldErrors] = formContent.required;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("fail");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const form = (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <FormField id="name" label={formContent.name.label} error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder={formContent.name.placeholder}
          className={fieldControlClass}
          aria-invalid={Boolean(errors.name)}
        />
      </FormField>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="phone" label={formContent.phone.label} error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder={formContent.phone.placeholder}
            className={fieldControlClass}
            aria-invalid={Boolean(errors.phone)}
          />
        </FormField>
        <FormField id="postalCode" label={formContent.postalCode.label} error={errors.postalCode}>
          <input
            id="postalCode"
            name="postalCode"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            placeholder={formContent.postalCode.placeholder}
            className={fieldControlClass}
            aria-invalid={Boolean(errors.postalCode)}
          />
        </FormField>
      </div>
      <FormField id="interest" label={formContent.interest.label} error={errors.interest}>
        <select id="interest" name="interest" required className={fieldControlClass} defaultValue="">
          <option value="" disabled>
            Valitse
          </option>
          {formContent.interests.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="message" label={formContent.message.label} error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={formContent.message.placeholder}
          className={fieldControlClass}
        />
      </FormField>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? formContent.sending : formContent.submit}
      </Button>
      {status === "success" ? <p role="status">{formContent.success}</p> : null}
      {status === "error" ? (
        <p role="alert" className="text-red-700">
          {formContent.error}
        </p>
      ) : null}
    </form>
  );

  if (nested) return form;

  return (
    <SectionContainer
      id="tarjouspyynto"
      eyebrow={homeContent.contact.eyebrow}
      title={homeContent.contact.h2}
      lead={homeContent.contact.lead}
      className="bg-white"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6 md:p-8">{form}</div>
        <aside className="rounded-3xl bg-navy p-8 text-white">
          <h3 className="font-display text-3xl">Aluroll Oy</h3>
          <p className="mt-4 leading-relaxed text-white/80">
            Metallikatu 1
            <br />
            15160 Lahti
            <br />
            0291 230 221
          </p>
        </aside>
      </div>
    </SectionContainer>
  );
}
