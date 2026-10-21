import { writeRequestLog } from "../../src/request/log.mjs";

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
