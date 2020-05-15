import { secureInstance } from '../axios_instance'

export function addScore(score, correctStreak, incorrectStreak, category) {
  return secureInstance.post('/scores/add', {
    score: score,
    correct_streak: correctStreak,
    incorrect_streak: incorrectStreak,
    best_category: category,
  })
}

export function getScores() {
  return secureInstance.get('/scores/highscores')
}

export function getUserScore() {
  return secureInstance.get('/scores/user')
}
