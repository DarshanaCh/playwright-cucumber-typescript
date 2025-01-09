import { Page } from "@playwright/test";
import { Logger } from "winston";

export const pageFixure = {
    // @ts-ignore
    page: undefined as Page,
    logger :undefined as unknown as Logger // Explicitly cast 'undefined' to 'Logger'
}