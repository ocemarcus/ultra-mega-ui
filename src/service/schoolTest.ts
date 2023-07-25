import type { SchoolTestSchema } from "@/schema/schoolTest";
import  { Server } from "../http/server";

const URL = 'school-test'
export class SchoolTestService {
    private readonly server = new Server<SchoolTestSchema>(URL)
    async find() {
        return await this.server.find()
    }
    async findById(id: string) {
        return await this.server.findById(id)
    }
    async save(data: Partial<SchoolTestSchema>) {
        await this.server.save(data)
    }
}