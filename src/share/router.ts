import { useRouter} from 'vue-router'

const router = useRouter()


export const routerPush = (url: string) => router.push(url)