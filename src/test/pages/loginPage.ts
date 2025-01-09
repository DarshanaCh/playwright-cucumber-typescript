import { expect, Page } from "@playwright/test";
import { pageFixure } from "../../hooks/pageFixture";


export class loginPage{
  
    readonly page: Page;

    constructor(page:Page){
        this.page=pageFixure.page
    }

    private Elements = {
        userInput: "Username",
        passwordInput: "Password",
        loginBtn: "button[color='primary']",
        errorMessage: "alert",
        accountCirle: "account_circlearrow_drop_down",
        loginMsg: "Username or Password is",
        loginlnk:"button', { name: 'Login' }",
        loginerror:"mat-mdc-error-0"
        
    }

    async navigateToLoginPage() {
        const baseUrl: string = process.env.BASEURL as string;
        await pageFixure.page.goto(baseUrl);

        //await this.base.goto("/login");
   
        await expect(pageFixure.page).toHaveTitle("BookCart");
    }
    async enterUserName(user: string) {
        await pageFixure.page.getByPlaceholder(this.Elements.userInput).fill(user);
        }
    async enterPassword(Password: string) {
        await pageFixure.page.getByLabel(this.Elements.passwordInput).fill(Password);
    }

    async clickLoginButton() {
        await pageFixure.page.click(this.Elements.loginBtn);
    }

    getErrorMessage() {
        return pageFixure.page.getByRole("alert");
    }

    async loginUser(user: string, password: string) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
    async verifySuccessLogin(){

        await pageFixure.page.getByText(this.Elements.accountCirle).isVisible();
        
        const login=await pageFixure.page.getByText(this.Elements.loginMsg);
        await expect(login).toBeHidden();
        await pageFixure.logger.info("user logged in to application");
    }

    async verifyFailLogin(){
        const login=await pageFixure.page.getByText(this.Elements.loginerror);
        //await expect(login).toBeVisible()
        await pageFixure.page.getByText('Username or Password is').isVisible();
    }
    async clickLoginlnk(){
        //const loginlink=await pageFixure.page.getByRole(this.Elements.loginlnk);
        await pageFixure.page.getByRole('button', { name: 'Login' }).click();

    }

        
}