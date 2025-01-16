import { chromium, firefox, LaunchOptions, Browser } from "playwright";
import { getEnv } from "../env/env";

getEnv();
// Convert process.env.HEAD to boolean for the headless variable
const headless: boolean | undefined =
  process.env.HEAD === "true"
    ? true
    : process.env.HEAD === "false"
    ? false
    : undefined;

// Common launch options
const options: LaunchOptions = {
  headless, // Use the converted headless value
};

// Browser Manager Module
export const invokeBrowser = async () => {
  const browserType = process.env.BROWSER || "chrome";
  switch (browserType) {
    case "chrome":
      return chromium.launch(options);
    case "firefox":
      return firefox.launch(options);
    default:
      throw new Error("Please set the proper browser!");
  }
};

