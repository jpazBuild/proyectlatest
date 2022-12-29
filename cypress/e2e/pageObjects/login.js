import { Input, Button, A, CheckBox, Span, tagList } from '../../utils/genericElements/generics'

const fielLoginUserInp = Input({
  attributes: { 'data-testid': 'usernameInput' }
})

const loginContinueBtn = Button({
  attributes: { 'data-testid': 'btn-sign-in-username' }
})

const fieldLoginPasswordInp = Input({
  attributes: { 'data-testid': 'passwordInput' }
})


const loginpasswoordBtn = Button({
  attributes: { 'data-testid': 'btn-sign-in-password' }
})

const menuHomeA = A({
  attributes: { id: 'item-sidenav-0' }

})

const rememberByDeviceChecbox = CheckBox({
  attributes: { 'data-testid': 'check-remember-my-device' }
})

const resetPassword = Button({
  attributes: { 'data-testid': 'btn-sign-in-password' }
})

const recoveryPassword = Input({
  attributes: { id: 'password' }
})

const confrecoveryPassword = Input({
  attributes: { id: 'rePassword' }
})

const rePassword = Button({
  attributes: { 'data-testid': 'btn-recover-password' }
})

const messageRecoveryPassword = '[class="text-2xl font-bold text-center mb-2"]';


const goToSignin = Button({
  attributes: { 'data-testid': 'go-to-signin' }
})

const forgotPass = Span({
  // attributes: { class: 'text-sm font-normal text-green-600 text-sm' }
  text: 'Forgot password?'
})

const sentLinkResetPass = Button({
  attributes: { id: 'btn-zoomOut-button-sign-in-password' }
})

const menuMagicGeneric = tagList({
  attributes: { 'data-testid': 'liId' }
})

const showPassword = Button({
  attributes: { 'data-testid': 'btn-Eye' }
})

const showPasswordConfirm = Button({
  attributes: { 'data-testid': 'btn-Eye-confirm' }
})

const validatepasswordIncorrect = '[class="text-sm font-semibold text-red-700"]';

export default {
  fielLoginUserInp,
  fieldLoginPasswordInp,
  loginContinueBtn,
  loginpasswoordBtn,
  menuHomeA,
  rememberByDeviceChecbox,
  resetPassword,
  rePassword,
  recoveryPassword,
  confrecoveryPassword,
  goToSignin,
  forgotPass,
  sentLinkResetPass,
  menuMagicGeneric,
  showPassword,
  showPasswordConfirm,
  validatepasswordIncorrect,
  messageRecoveryPassword

}
