// Общие утилиты для тестов
export const deepClone = (value) => JSON.parse(JSON.stringify(value))

const escapeForRegExp = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const assertArray = (value, label = 'value') => {
  if (!Array.isArray(value)) {
    throw new Error(
      `\`${label}\` is not an array (got ${typeof value}).\n`
      + '* Проверь импорт \'../__fixtures__/basic-steps.js\'\n'
      + '* и что экспортируется default [...] (массив шагов)\n',
    )
  }
}

export const toRegex = (text) => new RegExp(escapeForRegExp(text), 'i')

