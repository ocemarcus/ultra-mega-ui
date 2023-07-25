import { notify } from "@kyvg/vue3-notification";


export class Notify {
    static notify(text: string, type: string) {
        notify({ text, type, })
    }
    static async success(text: string) {
        Notify.notify(text, 'success')
    }
    static async error(text: string) {
        Notify.notify(text, 'error')
    }
}