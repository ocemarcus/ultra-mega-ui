import type { StudentInfoSchema, StudentSchema } from "@/schema/student";
import  { Server } from "../http/server";

const URL = 'students'
export class StudentService {
    private readonly server = new Server<StudentSchema>(URL)
    async findQuestion(schoolTestId: string): Promise<StudentSchema[]> {
        const server = Server.instance()
        const url = `questions/question/${schoolTestId}`
        const {data} = await  server.get<StudentSchema[]>(url)

        return data.map(item => {
            item.questions = Object.entries(item.questions).map(item => {
                  const [question, question_name] = item
                return {
                    question,
                    question_name,
                  } as any
            })
            item.question_selected = ""
            return item
        })
    }
    async findById(id: string) {
        return await this.server.findById(id)
    }
    async save(data: StudentSchema[], studentInfo: StudentInfoSchema) {
        const questions = data.map(item => {
             const questions: Record<string, string> = {}
             item.questions.map( item => questions[item.question] = item.question_name )
            return {
                questions,
                questionId: item._id,
                question_selected: item.question_selected,
            }
        })
        const [question] = data

        const save = {
            questions,
            ...studentInfo,
            schoolTestId: question.schoolTest._id,
        } as any
        await this.server.save(save)
    }
}