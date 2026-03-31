class ProductPage {
  constructor(page) {
    this.page = page;

    // 🔐 Login (reuse here OR you can import AuthPage later)
    this.emailInput = page.locator('#login-email');
    this.passwordInput = page.locator('#login-password');
    this.loginBtn = page.locator('#login-submit-btn');

    // 📦 Product actions
    this.filterInput = page.locator("//input[@placeholder='Filter inventory...']");
    this.addProductBtn = page.locator("//button[contains(text(),'Add Product')]");

    this.productNameInput = page.locator("//input[@placeholder='e.g. Cisco C9200L Router']");
    this.categoryDropdown = page.locator("//select[@name]");
    this.priceInput = page.locator("//input[@name='price']");
    this.createBtn = page.locator("//button[contains(text(),'Create')]");

    this.saveChangesBtn = page.locator("//button[text()='Save Changes']");
    this.deleteConfirmBtn = page.locator("#confirm-modal-delete-btn");
  }

  async gotoHome() {
    await this.page.goto('http://localhost:5173/');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async filterProduct(text) {
    await this.filterInput.fill(text);
  }

  async openAddProduct() {
    await this.addProductBtn.click();
  }

  async createProduct(name, category, price) {
    await this.productNameInput.fill(name);
    await this.categoryDropdown.selectOption(category);
    await this.priceInput.fill(price);
    await this.createBtn.click();
  }

  async updateProduct(index = 9) {
    await this.page.click(`(//button)[${index}]`);
    await this.saveChangesBtn.click();
  }

  async deleteProduct(index = 10) {
    await this.page.click(`(//button)[${index}]`);
    await this.deleteConfirmBtn.click();
  }
}

module.exports = { ProductPage };