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
  return secureInstance.get('/questions/fetch', {
    params: { categories: categories },
  })
}
