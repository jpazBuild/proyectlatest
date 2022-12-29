'use strict'
function unvalidFunction () {
  throw new Error('This function is not defined')
}

function type (text) {
  if (!this.getElement) throw new Error('Function getElement not defined')
  this.getElement().type(text)
}

function getFirst () {
  return this.getElement().first()
}

function getElementByAttributes () {
  const selector = createBaseStringSelector(this)
  return cy.get(selector)
}

function getElementByXpath () {
  return cy.xpath(this.xpath)
}
const createBaseStringSelector = (context) => {
  if (!context) throw new Error('This is not defined')
  const { attributes, tag } = context
  if (!tag) throw new Error('No tag defined')
  let selector = tag
  for (const key in attributes) {
    selector += `[${key}='${attributes[key]}']` // input[type='text'][data-testid="sadasas"]
  }
  if (selector === tag) throw new Error('No selectors defined')
  return selector
}
function getElementByAttributesAndText (text) {
  let selector = createBaseStringSelector(this)
  selector += `:contains('${this.text}')`
  return cy.get(selector)
}

function getElementByAttributesAndTextbyParameter (data) {
  let selector = createBaseStringSelector(this)
  selector += `:contains('${data}')`
  return cy.get(selector)
}

function getElementValidateText (text) {
  const selector = createBaseStringSelector(this)
  return cy.get(selector).should('have.text', text)
}

function getElementcontainsText (text) {
  const selector = createBaseStringSelector(this)
  return cy.get(selector).contains(text)
}


function notFoundElementValidateText (text) {
  const selector = createBaseStringSelector(this)
  return cy.get(selector).should('not.have.text', text)
}
/**
 * @returns {Cypress.Chainable} - returns a cypress chainable
 */
function getElement () {
  const haveAttributes = Object.keys(this?.attributes ?? {}).length
  if (this.text && haveAttributes) return this.getElementByAttributesAndText()
  if (this.text) return this.getElementByText()
  if (haveAttributes) return this.getElementByAttributes()
  if (this.xpath) return this.getElementByXpath()
  throw new Error('Element can\'t be found')
}

function click () { this.getElement().click({ force: true }) }

function forceClick () {
  this.getElement().click({ force: true })
}

function multipleClick () {
  this.getElement().click({ multiple: true })
}

function verifyElementPresent () {
  this.getElement().should('be.visible')
}

function verifyElementNotFound () {
  this.getElement().should('not.exist')
}

function verifyElementExist () {
  this.getElement().should('exist')
}

function clear () {
  this.getElement().clear()
}

function getElementByText () {
  return cy.contains(this.tag, this.text)
}

function verifyElementDisabled () {
  this.getElement().should('be.disabled')
}

function verifyElementNotVisible () {
  this.getElement().should('not.be.visible')
}

function triggerEvent (event) {
  if (!event) throw new Error('Event is not defined')
  this.getElement().trigger(event)
}

function triggerMouseover () {
  this.triggerEvent('mouseover')
}
function verifyCheckBoxStatus (status) {
  if (this.tag !== 'input' || this.attributes.type !== 'checkbox') throw new Error('Element is not a Checkbox')
  this.getElement().should(status)
}
function verifyChecked () {
  this.verifyCheckBoxStatus('be.checked')
}
function verifyUnchecked () {
  this.verifyCheckBoxStatus('not.be.checked')
}
const genericElement = {
  getElement,
  getFirst,
  getElementByAttributesAndText,
  getElementByAttributes,
  getElementByXpath,
  getElementByText,
  verifyElementPresent,
  verifyElementNotFound,
  verifyElementDisabled,
  verifyElementNotVisible,
  triggerEvent,
  triggerMouseover,
  click,
  forceClick,
  multipleClick,
  getElementByAttributesAndTextbyParameter,
  getElementValidateText,
  notFoundElementValidateText,
  verifyElementExist,
  getElementcontainsText,
  attributes: {},
  tag: '',
  classNames: []
}

/**
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */

const Input = (properties) => {
  return {
    ...genericElement,
    tag: 'input',
    type,
    clear,
    ...properties
  }
}

/**
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */

const Button = (properties) => {
  return {
    ...genericElement,
    tag: 'button',
    type,
    ...properties
  }
}

/**
 *
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */

const Div = (properties) => {
  return {
    ...genericElement,
    tag: 'div',
    ...properties
  }
}

/**
 *
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element

 */

const P = (properties) => {
  return {
    ...genericElement,
    tag: 'p',
    ...properties
  }
}

/**
 *
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */
const Span = (properties) => {
  return {
    ...genericElement,
    tag: 'span',
    ...properties
  }
}

/**
 *
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */
const TextArea = (properties) => {
  return {
    ...genericElement,
    tag: 'textarea',
    clear,
    type,
    ...properties
  }
}

/**
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */
const A = (properties) => {
  return {
    ...genericElement,
    tag: 'a',
    ...properties
  }
}

/**
 *
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 */
const Svg = (properties) => {
  return {
    ...genericElement,
    tag: 'svg',
    ...properties
  }
}

/**
 * @param {number} hNumber - the number of the header
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */
const H = (hNumber, properties) => {
  if ([1, 2, 3, 4, 5, 6].indexOf(hNumber) === -1) throw new Error('H number must be between 1 and 6')
  return {
    ...genericElement,
    tag: `h${hNumber}`,
    ...properties
  }
}

function selectOption (option = '+57') {
  this.getElement().select(option)
}

/**
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */

const Select = (properties) => {
  return {
    ...genericElement,
    tag: 'select',
    selectOption,
    click: unvalidFunction,
    ...properties
  }
}

/**
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */
const Label = (properties) => {
  return {
    ...genericElement,
    tag: 'label',
    ...properties
  }
}

/**
 * @param {object} properties - pass and object with the following properties
 * @param {object} properties.attributes - the attributes of the element
 * @param {string} properties.text - the text of the element
 */

const CheckBox = (properties) => {
  return {
    ...genericElement,
    tag: 'input',
    verifyCheckBoxStatus,
    verifyChecked,
    verifyUnchecked,
    ...properties,
    attributes: { // override attributes adding type
      ...properties.attributes,
      type: 'checkbox'
    }
  }
}

const tagList = (properties) => {
  return {
    ...genericElement,
    tag: 'li',
    ...properties
  }
}

export {
  Input,
  Button,
  Div,
  P,
  Span,
  A,
  Svg,
  H,
  TextArea,
  Select,
  Label,
  CheckBox,
  tagList
}
