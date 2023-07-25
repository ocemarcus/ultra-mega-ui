<template>
    <div class="row justify-content-center">
    <div class="col-md-10">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"  aria-current="page">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/">Avaliações</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
                <h2>{{ title }}</h2>
                <div class="row mt-3">
                        <div class="col-md-4">
                                <label  class="form-label">Nome do Aluno</label>
                                <input type="text" v-model="studentInfo.student_name" class="form-control">
                        </div>
                        <div class="col-md-4">
                                <label  class="form-label">E-mail do Aluno</label>
                                <input type="email" v-model="studentInfo.student_email" class="form-control">
                        </div>
                    </div>
                <h3 class="mt-3">Questões</h3>
                <div v-for="item of questions" :key="item._id" class="row" >
                 <div class="col-md-12">
                 <h5>{{ item.question_name }}</h5>
                 <div v-for="(q, key) of item.questions" :key="key">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" :name="`question-${item._id}`" :value="q.question" v-model="item.question_selected"   :id="`${item._id}-${key}`" >
                        <label class="form-check-label" :for="`${item._id}-${key}`">
                            ({{ q.question }})  {{ q.question_name }}
                        </label>
                    </div>
                 </div>
                 </div>
             </div>
             <button type="button" class="btn btn-success mt-2" @click="save()">Enviar</button>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { StudentService } from '@/service/student';
import type { StudentSchema, StudentInfoSchema } from '@/schema/student';
import { Notify } from '@/share/notify';

const router = useRouter()
const studentService = new StudentService()

const title = ref()
const studentInfo = ref<StudentInfoSchema>({
    student_name: "",
    student_email: "",
})
const questions = ref<StudentSchema[]>()

async function save() {
    try {

        const validate =  validateQuestions()
        if (validate) {
            alert('Questão não selecionada!')
            return
        }

        if(!confirm('Deseja enviar?')) return
        const save = Object.assign([], questions.value)
        const info = Object.assign({}, studentInfo.value)
        await studentService.save(save, info)

        await Notify.success('Enviado com sucesso')
        setTimeout(() => router.go(0), 1000)

    } catch (error) {
        await Notify.error('Error para salvar')
    }
}

const validateQuestions = () => {
    const notSelected = questions.value?.filter( item => item.question_selected === "")
    if (notSelected && notSelected.length > 0)  return true

    return false
}

async function main() {

    try {

        const route = useRoute()
        const schoolTestId = route.params.schoolTestId as string
        questions.value = await studentService.findQuestion(schoolTestId)

        const [question] = questions.value
        title.value = question.schoolTest.name


    } catch (error) {
        await Notify.error('Error para listar')
    }
}
main()

</script>