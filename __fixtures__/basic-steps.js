const steps = [
  {
    id: 'welcome',
    messages: [
      'Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат',
    ],
    buttons: [
      { text: 'Начать разговор', nextStepId: 'start', type: 'button' },
    ],
  },
  {
    id: 'start',
    messages: [
      'Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса — подскажу, что лучше подойдёт.',
    ],
    buttons: [
      { text: 'Сменить профессию или трудоустроиться', nextStepId: 'change', type: 'button' },
      { text: 'Попробовать себя в IT', nextStepId: 'try', type: 'button' },
      { text: 'Я разработчик, хочу углубить знания', nextStepId: 'dev', type: 'button' },
    ],
  },
  {
    id: 'change',
    messages: [
      'Отлично! Рекомендую рассмотреть интенсивы трудоустройства. Они ориентированы на быстрый вход в IT.',
    ],
    buttons: [
      { text: 'Назад', nextStepId: 'start', type: 'button' },
      { text: 'Завершить', nextStepId: 'end', type: 'button' },
    ],
  },
  {
    id: 'try',
    messages: [
      'У нас есть подготовительные курсы на 2 недели. За это время вы познакомитесь с основами программирования.',
    ],
    buttons: [
      { text: 'Назад', nextStepId: 'start', type: 'button' },
      { text: 'Завершить', nextStepId: 'end', type: 'button' },
    ],
  },
  {
    id: 'dev',
    messages: [
      'Для разработчиков подойдут продвинутые курсы и менторинг. Можем подобрать программу под ваш стек.',
    ],
    buttons: [
      { text: 'Назад', nextStepId: 'start', type: 'button' },
      { text: 'Завершить', nextStepId: 'end', type: 'button' },
    ],
  },
  {
    id: 'end',
    messages: [
      'Спасибо! Если захотите вернуться — нажмите кнопку внизу справа и начните заново.',
    ],
    buttons: [],
  },
]

export default steps
 
