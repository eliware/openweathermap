import { redactText, safeSerialize } from "@eliware/log";

export function redactSecretText(value, apiKey) {
  const secrets = apiKey ? [String(apiKey)] : [];
  if (apiKey) secrets.push(new URLSearchParams({ appid: String(apiKey) }).toString().slice(6));
  return redactText(value, { secrets });
}

export function safeUrl(url, apiKey) {
  if (typeof url !== "string") return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("appid");
    return parsed.toString();
  } catch {
    const safeText = redactSecretText(url, apiKey);
    return safeText.replace(/([?&]appid=)[^&\s"'<>)]*/gi, "$1[REDACTED]");
  }
}

export function safeCause(cause, apiKey) {
  if (cause === undefined) return undefined;
  let message;
  try {
    message = cause?.message ?? String(cause);
  } catch {
    message = "OpenWeatherMap request failed";
  }
  const safeDetails = safeSerialize({ message: redactSecretText(message, apiKey) });
  return new Error(safeDetails.message);
}
