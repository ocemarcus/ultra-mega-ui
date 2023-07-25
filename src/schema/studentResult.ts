import type { QuestionSchema } from "./question"
import type { SchoolTestSchema } from "./schoolTest"


export type StudentResultSchema = {
    _id: string
    average: string
    student_name: string
    student_email: string
    points_scored: string
    question_success: number
    question_quantity: number
    schoolTest: SchoolTestSchema
    question_total_amount: number
    questions?: StudentResultQuestionsSchema[]
}

export type StudentResultQuestionsSchema = {
    questionId: string
    question_name: string
    question_amount: number
    question_selected: string
    question_correct: string
    question: QuestionSchema,
    questions: {question: string, question_name: string, question_selected: string}[]
}