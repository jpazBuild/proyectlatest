export class Auth {
    // ENVIROMENT TESTING MEMEBER CREDENTIALS
    ENV_MEMBER_URL () {
      return Cypress.env('member_enviroment').member_url
    }
  
    ENV_MEMBER_USER () {
      return Cypress.env('member_enviroment').member_user
    }
  
    ENV_MEMBER_PASSWORD () {
      return Cypress.env('member_enviroment').member_password
    }
  
    ENV_MEMBER_USER_BLOCKED () {
      return Cypress.env('member_enviroment').member_BLOCKED_BY_ACCOUNT
    }
  
    ENV_MEMBER_PASSWORD_ENCRIPT () {
      return Cypress.env('member_enviroment').passwordDatabase
    }

    // ENVIROMENT ADMIN CREDENTIALS
    ENV_ADMIN_URL () {
      return Cypress.env('admin_enviroment').admin_url
    }
  
    ENV_ADMIN_USER () {
      return Cypress.env('admin_enviroment').admin_user
    }
  
    ENV_ADMIN_PASSWORD () {
      return Cypress.env('admin_enviroment').admin_password
    }
  
    // REDIRECT RECOVERY PASSWORD
    RECOVERY_URL () {
      return Cypress.env('recovery_password').recovery_url
    }
  
    RECOVERY_PATH () {
      return Cypress.env('recovery_password').recovery_path
    }
  
    RECOVERY_REDIRECT () {
      return Cypress.env('recovery_password').recovery_redirect
    }
  }
  