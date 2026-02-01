import { SITE_URL, tweetTemplate } from "./constants";

export function twitterIntentUrl(llcName: string): string {
  const text = tweetTemplate(llcName);
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
}

export function linkedinShareUrl(llcName: string): string {
  const url = SITE_URL;
  const title = `Just registered "${llcName}" as an LLC`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export async function webShare(llcName: string): Promise<boolean> {
  if (!("share" in navigator)) return false;
  try {
    await navigator.share({
      title: `${llcName} — Registered Agent`,
      text: tweetTemplate(llcName),
      url: SITE_URL,
    });
    return true;
  } catch {
    return false;
  }
}
