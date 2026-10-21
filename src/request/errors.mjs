import { redactText, safeSerialize } from "@eliware/log";
import { OpenWeatherMapError } from "../errors.mjs";

function redactSecretText(value, apiKey) {
  const secrets = apiKey ? [String(apiKey)] : [];
  if (apiKey) secrets.push(new URLSearchParams({ appid: String(apiKey) }).toString().slice(6));
  return redactText(value, { secrets });
}

function safeUrl(url, apiKey) {
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

function safeCause(cause, apiKey) {
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

export function requestFailure(error, throwOnError, url, apiKey) {
  if (!throwOnError) return null;
  if (error instanceof OpenWeatherMapError) {
    const cause = safeCause(error.cause, apiKey);
    const urlValue = safeUrl(error.url ?? url, apiKey);
    const statusText =
      error.statusText === undefined ? undefined : redactSecretText(error.statusText, apiKey);
    const details = safeSerialize({
      status: error.status,
      statusText,
      cause,
      url: urlValue,
    });
    throw new OpenWeatherMapError(redactSecretText(error.message, apiKey), {
      status: error.status,
      statusText: statusText === undefined ? undefined : details.statusText,
      cause,
      url: urlValue === undefined ? undefined : details.url,
    });
  }
  let message;
  try {
    message = error?.message ?? "OpenWeatherMap request failed";
  } catch {
    message = "OpenWeatherMap request failed";
  }
  const cause = safeCause(error, apiKey);
  const urlValue = safeUrl(url, apiKey);
  const details = safeSerialize({ cause, url: urlValue });
  throw new OpenWeatherMapError(redactSecretText(message, apiKey), {
    cause,
    url: urlValue === undefined ? undefined : details.url,
  });
}
