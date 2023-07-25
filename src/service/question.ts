import type { QuestionSchema } from "@/schema/question";
import  { Server } from "../http/server";

const URL = 'questions'
export class QuestionService {
    private readonly server = new Server<QuestionSchema>(URL)
    async find() {
        return await this.server.find()
    }
    async findById(id: string) {
        return await this.server.findById(id)
    }
    async save(data: Partial<QuestionSchema>) {
        await this.server.save(data)
    }
}