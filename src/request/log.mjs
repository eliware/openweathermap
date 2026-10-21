import { defaultPolicy, redactText, safeSerialize } from "@eliware/log";

export function writeRequestLog(logger, level, message, details, apiKey) {
  if (!logger) return;
  const write = logger[level];
  if (typeof write !== "function") return;
  const secrets = apiKey
    ? [String(apiKey), new URLSearchParams({ appid: String(apiKey) }).toString().slice(6)]
    : [];
  const metadata = Object.fromEntries(
    Object.entries(details).map(([key, value]) => [
      key,
      typeof value === "string" ? redactText(value, { secrets }) : value,
    ]),
  );
  const keys = [...defaultPolicy.keys, "appid"];
  const definedMetadata = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined),
  );
  write.call(logger, message, safeSerialize(definedMetadata, { keys }));
}
