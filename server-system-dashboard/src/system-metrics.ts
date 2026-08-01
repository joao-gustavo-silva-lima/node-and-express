import {
  arch,
  cpus,
  uptime,
  version,
  machine,
  freemem,
  totalmem,
  hostname,
  platform,
} from "os";

const getMemory = () => {
  let fmem = freemem();
  let tmem = totalmem();
  let umem = tmem - fmem;

  return {
    freeMemory: (fmem / 1024 ** 3).toFixed(2),
    usedMemory: (umem / 1024 ** 3).toFixed(2),
    totalMemory: (tmem / 1024 ** 3).toFixed(2),
  };
};

export function getSystemMetrics() {
  try {
    return {
      host: hostname(),
      machine: machine(),
      version: version(),
      architecture: arch(),
      platform: platform(),
      activityTime: uptime(),

      ...getMemory(),
      cpus: cpus(),

      reportTime: new Date().toISOString(),
    };
  } catch (error) {
    console.log(
      `Error encountered while trying to fetch system metrics: ${error}`,
    );
  }
}
