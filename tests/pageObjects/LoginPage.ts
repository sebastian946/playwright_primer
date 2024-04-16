import { Locator, Page } from "playwright";

export class LoginPage{
  private readonly usernamebox: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page){
    this.usernamebox = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "LOGIN" });
  }

  async fillUsername(username:string){
    await this.usernamebox.fill(username);
  }

  async fillPassword(password:string){
    await this.password.fill(password);
  }

  async clickButtonLogin(){
    await this.loginButton.click();
  }

  async loginWithCredentials(username:string,password:string){
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickButtonLogin();
  }
}