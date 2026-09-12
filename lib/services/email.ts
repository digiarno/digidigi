import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { serverEnv, publicEnv } from "@/lib/env";
import type { ContactPayload } from "@/lib/validation";

const interestLabels: Record<ContactPayload["interest"], string> = {
  terrace: "Terassi / lasiterassi",
  balcony: "Parveke",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Professional HTML table for the sales team. Swap Resend for HubSpot/Mailchimp here. */
export function renderContactEmail(payload: ContactPayload): string {
  const rows: [string, string][] = [
    ["Nimi", payload.name],
    ["Puhelin", payload.phone],
    ["Postinumero", payload.postalCode],
    ["Kiinnostus", interestLabels[payload.interest]],
    ["Viesti", payload.message],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;font-weight:600;width:180px;color:#003568;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f4f5f2;font-family:Inter,Arial,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#003568;color:#ffffff;padding:20px 24px;">
                <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;opacity:0.8;">Lukkan · tarjouspyyntö</div>
                <div style="font-size:22px;margin-top:6px;">${escapeHtml(siteConfig.legalName)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 10px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type EmailResult =
  | { ok: true; mode: "resend" | "stub"; id?: string }
  | { ok: false; error: string };

/**
 * Isolated mail adapter.
 * Replace Resend with Mailchimp Transactional, HubSpot or Salesforce in this file only.
 *
 * GDPR submission log placeholder:
 * - Google Sheets: append a row via a service account (no marketing copy in the sheet).
 * - Supabase: insert into `contact_submissions` with retention policy + encryption at rest.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<EmailResult> {
  const to = publicEnv.contactReceiver;
  if (!to) {
    return { ok: false, error: "NEXT_PUBLIC_CONTACT_RECEIVER is not configured" };
  }

  const html = renderContactEmail(payload);
  const subject = `Tarjouspyyntö · ${interestLabels[payload.interest]} · ${payload.postalCode}`;

  if (!serverEnv.resendApiKey) {
    console.info("[email:stub]", { to, subject, payload });
    return { ok: true, mode: "stub" };
  }

  const resend = new Resend(serverEnv.resendApiKey);
  const { data, error } = await resend.emails.send({
    from: serverEnv.resendFrom,
    to,
    subject,
    html,
    replyTo: undefined,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, mode: "resend", id: data?.id };
}
