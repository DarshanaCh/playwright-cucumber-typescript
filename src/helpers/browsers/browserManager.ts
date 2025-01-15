import { chromium, firefox, LaunchOptions } from "playwright";

const options : LaunchOptions = {

headless: true ,

}
export const invokeBrowser = async()  => {
const browserType = process.env.BROWSER || "chrome"
    switch(browserType){
        case "chrome":
           return chromium.launch(options);
        case "firefox":
           return firefox.launch(options);
         default:
            throw new Error("Please set the proper browser!") 
    }
}
