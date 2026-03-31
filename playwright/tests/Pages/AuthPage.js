class AuthPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = page.locator('#login-email');
    this.passwordInput = page.locator('#login-password');
    this.nameInput = page.locator('#login-name');
    this.loginBtn = page.locator('#login-submit-btn');
    this.signupBtn = page.locator("//button[text()='Sign Up']");
    this.logoutBtn = page.locator("//span[text()='Logout']");
  }

  async gotoHome() {
    await this.page.goto('http://localhost:5173');
  }

  async gotoLogin() {
    await this.page.goto('http://localhost:5173/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(String(password));
    await this.loginBtn.click();
  }

  async register(name, email, password) {
    await this.signupBtn.click();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }
}

module.exports = { AuthPage };