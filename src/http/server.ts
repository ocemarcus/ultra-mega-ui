import axios from "axios"

const server = axios.create({
    baseURL: import.meta.env.API_URL ?? 'http://localhost:3000',
    timeout: 1000,
})

export class Server<T> {
    constructor(
        private readonly url: string
    ) {}
    async find(params?: any): Promise<T[]> {
        const {data} =  await server.get<T[]>(this.url, {params})
        return data
    }
    async findById(id: string): Promise<T> {
        const {data} = await server.get(`${this.url}/${id}`)
        return data
    }
    async save(data: Partial<T & {_id: string}>): Promise<void> {
        const headers = {
                    "Content-Type":"application/json"
        }
        if (data._id !== undefined) {
            const url = `${this.url}/${data._id}`
            await server.put(url, data, {
                headers,
            })
            return
        }
        await server.post(this.url, data, {
            headers,
        })
    }
    static instance() {
        return server
    }
}