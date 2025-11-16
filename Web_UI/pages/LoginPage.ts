const { I } = inject();


type UserRole = 'standard_user' | 'problem_user' | 'locked_out_user';

const USERS: Record<UserRole, { username: string; password: string }> = {
  standard_user: { username: 'standard_user', password: 'secret_sauce' },
  problem_user: { username: 'problem_user', password: 'secret_sauce' },
  locked_out_user: { username: 'locked_out_user', password: 'secret_sauce' }
};

class LoginPage {
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';

  async open() {
    // @ts-ignore - amOnPage comes from Playwright helper
    I.amOnPage('/');
  }

  async loginAs(role: UserRole) {
    const creds = USERS[role];
    await this.open();
    // @ts-ignore - fillField comes from Playwright helper
    I.fillField(this.usernameInput, creds.username);
    // @ts-ignore - fillField comes from Playwright helper
    I.fillField(this.passwordInput, creds.password);
    // @ts-ignore - click comes from Playwright helper
    I.click(this.loginButton);
  }

  async seeError(messagePart: string) {
    // @ts-ignore - see comes from Playwright helper
    I.see(messagePart, this.errorMessage);
  }
}

export = new LoginPage();
