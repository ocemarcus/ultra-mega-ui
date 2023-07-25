<template>
    <div class="row justify-content-center">
    <div class="col-md-10">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"  aria-current="page">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/question">Avaliações</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/question">Form</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="">Avaliação</label> <br>
                            <select class="form-control form-select-lg" v-model="data.schoolTest">
                                <option selected value="">Selecione</option>
                                <option  v-for="(item, key) of schoolTests" :key="key" :value="item">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                                <label  class="form-label">Valor da pergunta </label>
                                <input type="text" v-model="data.question_amount" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                         <div class="col-md-6">
                            <label  class="form-label">Pergunta</label>
                                <input type="text" v-model="data.question_name" class="form-control">
                         </div>
                    </div>
                    <div class="row" v-for="(item, key) of questions" :key="key">
                         <div class="col-md-6">
                                <label  class="form-label">Questão {{ item }}</label>
                                <input type="text" :name="data.questions[item]" v-model="data.questions[item]" class="form-control">
                         </div>
                    </div>
                    <div class="row mt-2">
                          <div class="col-md-6">
                            <label for="">Questão correta</label> <br>
                            <select class="form-control form-select-lg" v-model="data.question_correct">
                                <option selected value="">Selecione</option>
                                <option  v-for="(item, key) of questions" :key="key" :value="item">Pergunta {{ item }}</option>
                            </select>
                          </div>
                    </div>
                    <div class="mt-3">
                        <button type="button" @click="save" class="btn btn-success">Salvar</button>
                        <RouterLink to="/question" class="btn btn-outline-info ml-3">Voltar</RouterLink>
                    </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { RouterLink, useRoute, useRouter  } from 'vue-router'
import { ref } from 'vue'
import type { SchoolTestSchema } from '@/schema/schoolTest';
import type { QuestionSchema } from '@/schema/question';
import { QuestionService } from '@/service/question';
import { SchoolTestService } from '@/service/schoolTest';
import { Notify } from '@/share/notify';



const router = useRouter()

const questions = ref(['A','B','C','D','E'])
const schoolTests = ref<SchoolTestSchema[]>()

const data = ref<QuestionSchema>({
    questions: {},
    schoolTest: "",
    question_correct: "",
} as any)

const questionService = new QuestionService()



async function save() {

    try {
        const save = Object.assign({}, {
            ...data.value,
            schoolTestId: data.value.schoolTest._id,
            questions: Object.assign({}, data.value?.questions),
            question_amount: data.value.question_amount.toString()
        })
        const validate = validateQuestion(save)
        if (validate) return alert(validate)

        await questionService.save(save)
        await Notify.success('Salvo com sucesso')

        router.push('/question')
    } catch (error) {
        await Notify.error('Error para salvar')
    }

}

const validateQuestion = (data: Partial<QuestionSchema>) => {
    let validate = ''
    if (Object.getOwnPropertyNames(data.questions).length === 0) {
        validate += "* Uma pergunta deve ser obrigatório\n"
    }
    if (data.question_name === "") {
        validate += "* Pergunta deve ser obrigatório\n"
    }
    return validate
}

async function main() {

     const router = useRoute()
     const id = router.params.id as string

     const schoolTestItems = new SchoolTestService()
     schoolTests.value = await schoolTestItems.find()

    if (id !== 'novo') {
        data.value = await questionService.findById(id)
     }

}
main()


</script>