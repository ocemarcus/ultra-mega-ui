import  { Server } from "../http/server";
import type { StudentResultSchema } from "@/schema/studentResult";

const URL = 'students/result'
export class StudentResultService {
    private readonly server = new Server<StudentResultSchema>(URL)
    async find(): Promise<StudentResultSchema[]> {
     return await this.server.find()
    }
    async findResult(id: string): Promise<StudentResultSchema> {
     const response = await this.server.findById(id)

        response.questions = response.questions?.map(item => {
            const questionSelected = item.question_selected
            item.questions = Object.entries(item.questions).map(q => {
                 const [question, question_name] = q
                 let question_selected = ""
                 if (question === questionSelected) {
                    if (questionSelected === item.question_correct) {
                       question_selected = 'question_selected question_selected-success'
                    } else {
                       question_selected = 'question_selected question_selected-error'
                   }
                 }
                return {
                    question,
                    question_name,
                    question_selected,
                 } as any
         })
         return item
     })
     return response
    }
}