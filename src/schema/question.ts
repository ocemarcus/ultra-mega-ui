import type { SchoolTestSchema } from "./schoolTest"

export type QuestionSchema = {
    _id: string
    schoolTestId: string,
    question_name: string
    question_amount: string
    question_correct: string
    schoolTest: SchoolTestSchema
    questions: Record<string, string>
}