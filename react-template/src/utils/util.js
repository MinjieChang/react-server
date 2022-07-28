import findKey from 'lodash/findKey'

export const getNamespace = type => /[A-Z]+/.exec(type)?.[0].toLocaleLowerCase()

export const getLabelByValue = (obj, value) => {
  return obj[findKey(obj, ['value', value])]?.label
}
