import { safeSerialize } from "@eliware/log";
import { OpenWeatherMapError } from "../errors.mjs";
import { redactSecretText, safeCause, safeUrl } from "./redaction.mjs";

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
