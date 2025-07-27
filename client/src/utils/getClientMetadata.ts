import { UAParser } from "ua-parser-js";

export function getClientMetadata() {
  const parser = new UAParser();
  const uaResult = parser.getResult();

  return {
    deviceType: uaResult.device.type || "desktop",
    deviceName: uaResult.device.model || "unknown",
    osName: uaResult.os.name || "unknown",
    osVersion: uaResult.os.version || "unknown",
    browserName: uaResult.browser.name || "unknown",
    browserVersion: uaResult.browser.version || "unknown",
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
