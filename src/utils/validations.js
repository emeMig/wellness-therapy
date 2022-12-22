import { i18n } from '@/plugins/i18n'

// For more info see -> https://vuetifyjs.com/en/components/forms

/**
 * Email W3C regex
 * @type {RegExp}
 */
// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/**
 * Alphanumeric regex
 * @type {RegExp}
 */
const alphanumericRegex = /^[a-zA-Z0-9]*$/
/**
 * Alphanumeric regex allowing hyphens, underscores and blank spaces
 * @type {RegExp}
 */
const alphanumericPlusRegex = /^[a-zA-Z0-9\-_ ]*$/
/**
 * Numeric regex
 * @type {RegExp}
 */
const numericRegex = /^[0-9]*$/
/**
 * Extension regex
 * @type {RegExp}
 */
const extensionRegex = /^\.\w+/
/**
 * Organism regex
 * @type {RegExp}
 */
const onlyLetters = /^[a-zA-Z]*$/

const validations = {
  alphanumeric: value => alphanumericRegex.test(value) || i18n.t('Global.Validations.alphanumeric'),
  alphanumericPlus: value => alphanumericPlusRegex.test(value) || i18n.t('Global.Validations.alphanumericPlus'),
  arrayIsEmpty: value => (!!value && value.length !== 0) || i18n.t('Global.Validations.required'),
  email: value => !value || emailRegex.test(value) || i18n.t('Global.Validations.email'),
  extension: value => extensionRegex.test(value) || i18n.t('Global.Validations.extension'),
  fileSize: file => (file && file.size < 1048576) || i18n.t('Global.Validations.fileSize'),
  numeric: value => numericRegex.test(value) || i18n.t('Global.Validations.numeric'),
  numericMaxValue: (value, max) => (numericRegex.test(value) && value <= max) || i18n.t('Global.Validations.numericMaxValue') + max,
  numericNoNegativeValues: value => (numericRegex.test(value) && value >= 0) || i18n.t('Global.Validations.numericNoNegativeValues'),
  maxLength: (value, length) => (value && value.trim().length <= length) || i18n.t('Global.Validations.maxLengthDefault') + length,
  onlyLetters: value => onlyLetters.test(value) || i18n.t('Global.Validations.onlyLetters'),
  required: value => (!!value) || i18n.t('Global.Validations.required'),
  requiredUser: value => (!!value) || 'Requerido',
  requiredPass: value => (!!value) || i18n.t('Global.Validations.requiredPass'),
  requiredAutocomplete: value => !value || value.length !== 0 || i18n.t('Global.validations.requiredAutocomplete'),
  dateIsAfterTomorrow: value => value === '' || new Date(value) > new Date() || i18n.t('validations.dateIsBeforeTomorrow'),
  //longitud de campos
  minLength6: value => !value || value.toString().length >= 6 || "La contraseña debe tener un mínimo de 6 caracteres",
  maxLength20: value => !value || value.toString().length <= 20 || i18n.t('Global.Validations.maxLengthDefault') + 20,
  maxLength45: value => !value || value.toString().length <= 45 || i18n.t('Global.Validations.maxLengthDefault') + 45,
  maxLength50: value => !value || value.toString().length <= 50 || i18n.t('Global.Validations.maxLengthDefault') + 50,
  maxLength100: value => !value || value.toString().length <= 100 || i18n.t('Global.Validations.maxLengthDefault') + 100,
  maxLength120: value => !value || value.toString().length <= 120 || i18n.t('Global.Validations.maxLengthDefault') + 120,
  maxLength145: value => !value || value.toString().length <= 145 || i18n.t('Global.Validations.maxLengthDefault') + 145,
  maxLength200: value => !value || value.toString().length <= 200 || i18n.t('Global.Validations.maxLengthDefault') + 200,
  maxLength700: value => !value || value.toString().length <= 700 || i18n.t('Global.Validations.maxLengthDefault') + 700,

}

export default validations
