import { secureInstance } from '../axios_instance'

export function addQuestion(question, answer, options, categories) {
  return secureInstance.post('/questions/insert', {
    question: question,
    answer: answer,
    choices: options,
    categories: categories,
  })
}
