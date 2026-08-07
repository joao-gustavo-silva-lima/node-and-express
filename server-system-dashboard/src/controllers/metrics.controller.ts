import { getSystemMetrics } from "../metrics/system.metrics.js";

export function fetchMetricsAPI(): [
  number,
  { "content-type": "application/json" },
  string,
] {
  try {
    const metrics = getSystemMetrics();

    return [
      200,
      { "content-type": "application/json" },
      JSON.stringify(metrics),
    ];
  } catch (error) {
    return [
      500,
      { "content-type": "application/json" },
      JSON.stringify({ error: error }),
    ];
  }
}
