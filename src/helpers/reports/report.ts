const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results/reports",
    reportPath: "./",
    reportName: "Playwright Automation Report",
    pageTitle: "Book Cart Test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "131",
        },
        device: "Darshana- PC",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Book cart" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});