import { writeRequestLog } from "../../src/request/log.mjs";
import { request } from "../../src/request.mjs";
import { config, createRecordLogger } from "../../test-fixtures/request-helpers.mjs";

test("writeRequestLog redacts secret text and structured values", () => {
  const records = [];
  const logger = {
    info(message, metadata) {
      records.push({ message, metadata });
    },
  };
  const apiKey = "private key+value";

  writeRequestLog(
    logger,
    "info",
    "request complete",
    { statusText: `Denied ${apiKey}`, appid: apiKey, status: 401 },
    apiKey,
  );

  expect(records).toEqual([
    {
      message: "request complete",
      metadata: {
        statusText: "Denied [REDACTED]",
        appid: "[REDACTED]",
        status: 401,
      },
    },
  ]);
});

test("writeRequestLog skips absent loggers and unsupported levels", () => {
  expect(writeRequestLog(undefined, "info", "message", {}, "key")).toBeUndefined();
  expect(writeRequestLog({}, "info", "message", {}, "key")).toBeUndefined();
});

test("writeRequestLog accepts metadata without an API key", () => {
  let record;
  const logger = { debug: (_message, metadata) => (record = metadata) };

  writeRequestLog(logger, "debug", "request started", {
    operation: "weather",
    status: undefined,
  });

  expect(record).toEqual({ operation: "weather" });
});

test("request writes structured records through an injected logger", async () => {
  const apiKey = "private-log-key";
  const { logger, records } = createRecordLogger();
  const fetchImpl = async () => ({
    ok: true,
    status: 200,
    statusText: `OK ${apiKey}`,
    json: async () => ({ value: 1 }),
  });

  await expect(request("weather", 1, 2, config(fetchImpl, { apiKey, logger }))).resolves.toEqual({
    value: 1,
  });

  expect(records.map(({ level }) => level)).toEqual(["debug", "http", "info"]);
  expect(records[0].metadata).toMatchObject({ operation: "weather", attempt: 1, maxAttempts: 1 });
  expect(records[0].metadata).not.toHaveProperty("latitude");
  expect(records[0].metadata).not.toHaveProperty("longitude");
  expect(records[1].metadata.statusText).toBe("OK [REDACTED]");
  expect(JSON.stringify(records)).not.toContain(apiKey);
});

test("request logs retries and failures without API keys", async () => {
  const apiKey = "private-log-retry-key";
  const { logger, records } = createRecordLogger();
  let attempts = 0;
  const fetchImpl = async (url) => {
    attempts += 1;
    if (attempts === 1) throw new Error(`Temporary failure at ${url}`);
    return {
      ok: false,
      status: 401,
      statusText: `Denied ${apiKey}`,
      json: async () => ({}),
    };
  };

  await expect(
    request("weather", 1, 2, config(fetchImpl, { apiKey, retries: 1, throwOnError: true, logger })),
  ).rejects.toMatchObject({ status: 401 });

  expect(records.map(({ level }) => level)).toEqual(["debug", "warn", "debug", "http", "error"]);
  expect(records[1].metadata.errorMessage).toContain("[REDACTED]");
  expect(records.at(-1).metadata).toMatchObject({
    operation: "weather",
    errorName: "OpenWeatherMapError",
    errorMessage: "OpenWeatherMap API error: 401 Denied [REDACTED]",
    status: 401,
  });
  expect(JSON.stringify(records)).not.toContain(apiKey);
});
