type SiteEnvironment = {
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_CONTACT_EMAIL?: string;
};

export type SiteConfig = {
  url: string;
  contactEmail: string;
};

const defaultConfig: SiteConfig = {
  url: "https://skills.weiandata.com",
  contactEmail: "contact@weiandata.com",
};

export function resolveSiteConfig(env: SiteEnvironment): SiteConfig {
  const rawUrl = env.NEXT_PUBLIC_SITE_URL?.trim() || defaultConfig.url;
  const rawEmail =
    env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || defaultConfig.contactEmail;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL");
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTP or HTTPS");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
    throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address");
  }

  return {
    url: url.origin,
    contactEmail: rawEmail,
  };
}

export const siteConfig = resolveSiteConfig({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
});

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}
