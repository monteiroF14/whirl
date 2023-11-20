import * as z from "zod"
import { Visibility, QuizGenre } from "@prisma/client"
import { CompleteQuestion, RelatedQuestionModel, CompleteUser, RelatedUserModel } from "./index"

export const QuizModel = z.object({
  id: z.number().int(),
  name: z.string(),
  url: z.string(),
  image_url: z.string(),
  created_at: z.date(),
  visibility: z.nativeEnum(Visibility),
  genre: z.nativeEnum(QuizGenre).array(),
  views: z.number().int(),
  rating: z.number(),
})

export interface CompleteQuiz extends z.infer<typeof QuizModel> {
  questions: CompleteQuestion[]
  created_by: CompleteUser
  followed_by: CompleteUser[]
}

/**
 * RelatedQuizModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizModel: z.ZodSchema<CompleteQuiz> = z.lazy(() => QuizModel.extend({
  questions: RelatedQuestionModel.array(),
  created_by: RelatedUserModel,
  followed_by: RelatedUserModel.array(),
}))
