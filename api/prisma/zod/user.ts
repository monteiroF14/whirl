import * as z from "zod"
import { UserRole } from "@prisma/client"
import { CompleteQuiz, RelatedQuizModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  role: z.nativeEnum(UserRole),
  image_url: z.string(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  own_quizzes: CompleteQuiz[]
  followed_quizzes: CompleteQuiz[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  own_quizzes: RelatedQuizModel.array(),
  followed_quizzes: RelatedQuizModel.array(),
}))
