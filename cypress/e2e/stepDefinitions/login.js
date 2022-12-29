import { Before, Given, When, Then, Step, After } from "@badeball/cypress-cucumber-preprocessor";
import { Login } from "../tasks/login";

import { Auth } from "../../env/Auth";

const login = new Login()
const auth = new Auth()

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
});

Before(() => {
  cy.exec('npm cache clear --force')
}
)



Given('Se tiene el usuario con un correo verificado', () => {
  login.validateUserEmailVerificate([auth.ENV_MEMBER_USER()])
})

Given('I navegate into member module', () => {
  login.navegateToSite(auth.ENV_MEMBER_URL())

})
When('The user {string} is active', (username) => {
  login.validateUserIsActive(username)

})

When('I sign in with user {string}', (username) => {
  login.setFieldUser(username)
})
When('I use password {string}', (password) => {
  login.setFielPassword(password)
})


When('do not remember password',() => {
  login.clickBtnForgotPassword()
})

When('I navegate into Reset Password module with user {string}', (username) => {
  login.navegateToPasswordReset(auth.RECOVERY_URL(), auth.RECOVERY_PATH(), auth.RECOVERY_REDIRECT(),username)
})

When('I use password {string} in reset password module',(password) => {
  login.setFieldResetPassword(password)
})

When('I use confirm password {string} in reset password module',(confirmPassword)=>{
  login.setFieldResetConfirmPassword(confirmPassword)
})

When('click button the reset password',()=>{
  login.clickBtnResetPassword()
})
Then('I see error message {string} password incorrect', (message) => {
   login.validatepasswordIncorrect(message)
})

Then('I try to recover my password succesfull {string}',(message)=>{
  login.validateScreenPasswordRecovery(message)
})
