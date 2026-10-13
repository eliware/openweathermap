import { redactText as redactSensitiveText } from "@eliware/redact";
import { OpenWeatherMapError } from "./errors.mjs";

function redactText(value, apiKey) {
  const secrets = apiKey ? [String(apiKey)] : [];
  if (apiKey) secrets.push(new URLSearchParams({ appid: String(apiKey) }).toString().slice(6));
  return redactSensitiveText(value, { secrets, marker: "[redacted]" });
}

function safeUrl(url, apiKey) {
  if (typeof url !== "string") return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("appid");
    return parsed.toString();
  } catch {
    return redactText(url, apiKey);
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
  return new Error(redactText(message, apiKey));
}

export function requestFailure(error, throwOnError, url, apiKey) {
  if (!throwOnError) return null;
  if (error instanceof OpenWeatherMapError) {
    throw new OpenWeatherMapError(redactText(error.message, apiKey), {
      status: error.status,
      statusText: error.statusText === undefined ? undefined : redactText(error.statusText, apiKey),
      cause: safeCause(error.cause, apiKey),
      url: safeUrl(error.url ?? url, apiKey),
    });
  }
  let message;
  try {
    message = error?.message ?? "OpenWeatherMap request failed";
  } catch {
    message = "OpenWeatherMap request failed";
  }
  throw new OpenWeatherMapError(redactText(message, apiKey), {
    cause: safeCause(error, apiKey),
    url: safeUrl(url, apiKey),
  });
}

export function shouldRetry(error) {
  if (!(error instanceof OpenWeatherMapError)) return true;
  return error.status === 408 || error.status === 429 || error.status >= 500;
}
