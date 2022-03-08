export const validateEmail = (email) => {
  let err = ''
  if (!email || !email.replace(/^\s+|\s+$/gm, '')) {
    err = 'The email field is required.'
  }
  return err
}
export const validatePass = (pass) => {
  let err = ''
  if (!pass || !pass.replace(/^\s+|\s+$/gm, '')) {
    err = 'The password field is required.'
  }

  return err
}
