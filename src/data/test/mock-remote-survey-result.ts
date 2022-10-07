import { faker } from '@faker-js/faker'
import { RemoteLoadSurveyResult } from '@/data/usecases'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => (
  {
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100)
      },
      {
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100)
      }
    ]
  }
)
