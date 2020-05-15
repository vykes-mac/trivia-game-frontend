import { secureInstance } from '../axios_instance'

export function addQuestion(question, answer, options, categories) {
  return secureInstance.post('/questions/insert', {
    question: question,
    answer: answer,
    choices: options,
    categories: categories,
  })
}

export function getQuestions(categories) {
  if (categories.length == 0) {
    return secureInstance.get('/questions/fetch?categories[]')
  }
  return secureInstance.get('/questions/fetch', {
    params: { categories: categories },
  })
}

export function answerQuestion(id, answer) {
  return secureInstance.get('/questions/answer', {
    params: { id: id, answer: answer },
  })
}

export function getCategories() {
  return secureInstance.get('/questions/categories')
}
