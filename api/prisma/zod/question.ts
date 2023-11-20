import * as z from "zod"
import { QuizOption } from "@prisma/client"
import { CompleteQuiz, RelatedQuizModel } from "./index"

export const QuestionModel = z.object({
  id: z.number().int(),
  options: z.nativeEnum(QuizOption).array(),
  correct_option: z.number().int(),
})

export interface CompleteQuestion extends z.infer<typeof QuestionModel> {
  quizId: CompleteQuiz
}

/**
 * RelatedQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuestionModel: z.ZodSchema<CompleteQuestion> = z.lazy(() => QuestionModel.extend({
  quizId: RelatedQuizModel,
}))
