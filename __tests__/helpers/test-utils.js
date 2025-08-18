// Общие утилиты для тестов
export const deepClone = value => JSON.parse(JSON.stringify(value))

export const escapeForRegExp = text =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const assertArray = (value, label = 'value') => {
  if (!Array.isArray(value)) {
    throw new Error(
      `${label} is not an array (got ${typeof value}).
      * Проверь импорт '../__fixtures__/basic-steps.js'
      * и что экспортируется default [...] (массив шагов)`,
    )
  }
}

export const iRe = text => new RegExp(escapeForRegExp(text), 'i')
