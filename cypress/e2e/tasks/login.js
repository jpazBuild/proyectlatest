import '../../support/commands'
const consultas = '/consultas/consultas.json'
const loginUi = require('../pageObjects/login').default

import { Auth } from "../../env/Auth";

const auth = new Auth()


export class Login {

    navegateToSite(url) {
        cy.visit(url, { timeout: 30000 })
    }

    setFieldUser(user) {
        loginUi.fielLoginUserInp.type(user, { force: true })
        loginUi.loginContinueBtn.forceClick()
    }

    setFielPassword(password) {
        loginUi.fieldLoginPasswordInp.type(password, { force: true })
        loginUi.showPassword.forceClick()
        loginUi.loginpasswoordBtn.forceClick()
    }

    setFieldResetPassword(password) {
        loginUi.recoveryPassword.type(password, { force: true })
        loginUi.showPassword.forceClick()
    }

    setFieldResetConfirmPassword(password) {
        loginUi.confrecoveryPassword.type(password, { force: true })
        loginUi.showPasswordConfirm.forceClick()
    }

    validatepasswordIncorrect(message) {
        cy.TextValidation(loginUi.validatepasswordIncorrect, message)
    }

    clickBtnForgotPassword() {
        loginUi.forgotPass.forceClick()
    }

    clickBtnResetPassword() {
        loginUi.rePassword.forceClick()
    }

    validateScreenPasswordRecovery(message) {
        cy.TextValidation(loginUi.messageRecoveryPassword,message)
        loginUi.goToSignin.forceClick()
    }

    validateUserEmailVerificate(userToUse) {
        cy.fixture(consultas).then(consultas => {
            cy.task('queryDbValues',
                { query: consultas.consultasBlossomUserEmail.getBlossomUserEmail, values: [userToUse] })
                .then(response => {
                    if (response[0] != null) {
                        cy.log(`The user ${userToUse} exists.`)
                    } else {
                        throw new Error(`The user ${userToUse} not exists`)
                    }
                })
        })
    }

    validateUserIsActive(userToUse) {
        this.reusableStatusUser(userToUse, 0, 'ACTIVE')

    }

    setPassword(userToUse) {
        cy.fixture(consultas).then(consultas => {
            cy.task('queryDbValues', { query: consultas.consultasBlossomUser.updatePassword, values: [auth.ENV_MEMBER_PASSWORD_ENCRIPT(), userToUse] }).then(res => cy.log(JSON.stringify(res)))
            cy.log(`change password sucessfull to user ${userToUse}`)
        })
    }


    navegateToPasswordReset(url, path, redirect, userToUse) {
        loginUi.resetPassword.click()
        cy.wait(3000)

        cy.fixture(consultas).then(consultas => {
            cy.task('queryDbValues', { query: consultas.passwordRecoveries.selectpwdRecoveries, values: [userToUse] }
            ).then(queryPasswordRecovery => {
                cy.log(JSON.stringify(queryPasswordRecovery))
                const urlRecoveryPassword = url + path + `?hash=${queryPasswordRecovery.result[0].hash}` + `&idBlossomUser=${queryPasswordRecovery.result[0].idBlossomUser}` + '&' + redirect
                cy.log(urlRecoveryPassword)

                this.navegateToSite(urlRecoveryPassword)
            })
        })
    }


    reusableStatusUser(userToUse, attempts, statusUser) {
        cy.fixture(consultas).then(consultas => {
            cy.task('queryDbValues',
                { query: consultas.consultasBlossomUserEmail.getBlossomUserEmail, values: [userToUse] })
                .then(queryPasswordRecovery => {
                    if (queryPasswordRecovery.result[0] != null) {
                        cy.task('queryDbValues',
                            { query: consultas.consultasBlossomUser.deleteBlossomUserHistory, values: [String(userToUse)] }).then(res => cy.log(JSON.stringify(res)))
                        cy.task('queryDbValues', { query: consultas.consultasBlossomUser.updateUserStatus, values: [statusUser, userToUse] }).then(res => cy.log(JSON.stringify(res)))
                        cy.task('queryDbValues', { query: consultas.consultasBlossomUser.updateBlossomUser, values: [attempts, statusUser, userToUse] }).then(res => cy.log(JSON.stringify(res)))
                    }
                })

        })

    }




}