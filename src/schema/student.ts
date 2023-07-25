import type { SchoolTestSchema } from "./schoolTest"


export type StudentInfoSchema = {
    student_name: string,
    student_email: string,
}

export type StudentSchema = {
    _id?: string
    question_name:string,
    question_selected?: string
    schoolTest: SchoolTestSchema,
    questions:  StudentQuestionSchema[],
}
export type StudentQuestionSchema = {
    question: string
    question_name: string
}