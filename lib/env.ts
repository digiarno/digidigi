function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export const publicEnv = {
  siteUrl: optional("NEXT_PUBLIC_SITE_URL") ?? "https://lukkan.fi",
  cookieYesId: optional("NEXT_PUBLIC_COOKIEYES_ID"),
  gtmId: optional("NEXT_PUBLIC_GTM_ID"),
  ga4Id: optional("NEXT_PUBLIC_GA4_ID"),
  metaPixelId: optional("NEXT_PUBLIC_META_PIXEL_ID"),
  chatWidgetUrl: optional("NEXT_PUBLIC_CHAT_WIDGET_URL"),
  googleMapsKey: optional("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"),
  heroVideoUrl: optional("NEXT_PUBLIC_HERO_VIDEO_URL"),
  contactReceiver: optional("NEXT_PUBLIC_CONTACT_RECEIVER"),
};

export const serverEnv = {
  resendApiKey: optional("RESEND_API_KEY"),
  resendFrom: optional("RESEND_FROM_EMAIL") ?? "Lukkan <noreply@lukkan.fi>",
  replicateToken: optional("REPLICATE_API_TOKEN"),
  replicateModel: optional("REPLICATE_MODEL_VERSION"),
};
