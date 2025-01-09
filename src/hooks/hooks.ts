import{BeforeAll,AfterAll, Before, After,Status} from "@cucumber/cucumber"
import { chromium, Page, Browser, BrowserContext } from "playwright/test";
import { pageFixure } from "../hooks/pageFixture";
import { invokeBrowser } from "../helpers/browsers/browserManager";
import { getEnv } from "../helpers/env/env";
import { createLogger, loggers } from "winston";
import { options } from "../helpers/util/logger";

let browser: Browser;
let page: Page;
let context: BrowserContext;
BeforeAll(async () => {
  //browser = await chromium.launch({ headless: false }); //browser will launce before all the actions
    getEnv();
    browser = await  invokeBrowser(); 
});
Before(async ({pickle}) => {
  const scenarioName = pickle.name + pickle.id
  context = await browser.newContext({
        recordVideo: {
          dir: "test-results/videos",
        },
  }); //context like tab of the browser
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true, snapshots: true
});
  page = await context.newPage();
  pageFixure.page = page;
  pageFixure.logger= createLogger(options(scenarioName))
});
///After step will be used for all steps screen shot
// After(async function ({ pickle, result }) {
//   //pickle is scenario name
//   // attached screen shot -- only for failed test cases - if we like for all the steps screen shot then remove if statement
//   if (result?.status == Status.FAILED) {
//     const img = await pageFixure.page.screenshot({
//       path: `./test-results/screenshots/${pickle.name}.png`,
//       type: "png",
//     });
//     await this.attach(img, "image/png");
//   }// this is for only failed scenario attachment if statemenet

//   await pageFixure.page.close();
//   await context.close();
// });

// After(async function ({ pickle, result }) {
//   let videoPath: string;
//   let img: Buffer;
//   const path = `./test-results/trace/${pickle.id}.zip`;
//   if (result?.status == Status.PASSED) {
//       img = await pageFixure.page.screenshot(
//           { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
//       videoPath = await pageFixure.page.video().path();
//   } 
//   await context.tracing.stop({ path: path });
//   await pageFixure.page.close();
//   await context.close();
//   if (result?.status == Status.PASSED) {
//       await this.attach(
//           img, "image/png"
//       );
//       await this.attach(
//           fs.readFileSync(videoPath),
//           'video/webm'
//       );
//       const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
//       await this.attach(`Trace file: ${traceFileLink}`, 'text/html');

//   }

// });

////////////////////

import * as fs from 'fs';
import * as path from 'path';

After(async function ({ pickle, result }) {
  let videoPath: string | undefined;
  let img: Buffer | undefined;
  const tracePath = path.resolve(`./test-results/trace/${pickle.id}.zip`);
  
  try {
    if (result?.status === Status.PASSED) {
      // Capture screenshot
      img = await pageFixure.page.screenshot({
        path: `./test-results/screenshots/${pickle.name}.png`,
        type: "png"
      });

      // Get video path
      videoPath = await pageFixure.page.video()?.path();
    }

    // Stop tracing
    await context.tracing.stop({ path: tracePath });
  } catch (error) {
    console.error("Error during test cleanup:", error);
  } finally {
    // Cleanup resources
     await pageFixure.page.close();
     await context.close();
  }

  // Attachments for reporting
  try {
    if (result?.status === Status.PASSED) {
      if (img) {
        await this.attach(img, "image/png");
      }
      if (videoPath && fs.existsSync(videoPath)) {
        await this.attach(fs.readFileSync(videoPath), 'video/webm');
      }

      const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`;
      await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
  } catch (error) {
    console.error("Error during report attachments:", error);
  }
});

///////////////////








AfterAll(async () => {
  await browser.close();
 // await pageFixure.logger.close();
});
