<template>
    <div class="row justify-content-center">
    <div class="col-md-10">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"  aria-current="page">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/">Resultado do aluno</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
                <h2>{{ student?.schoolTest.name }}</h2>
                <div class="row mt-3">
                        <div class="col-md-4">
                                <label  class="form-label">Nome do Aluno</label>
                                <input type="text" v-model="student.student_name" class="form-control">
                        </div>
                        <div class="col-md-4">
                                <label  class="form-label">E-mail do Aluno</label>
                                <input type="email" v-model="student.student_email" class="form-control">
                        </div>
                    </div>
                <h3 class="mt-3">Questões</h3>
                <div v-for="item of student.questions" :key="item.questionId" class="row" >
                 <div class="col-md-12">
                 <h5>{{ item.question.question_name }}</h5>
                 <strong>Questão correta: {{ item.question.question_correct }}</strong>
                 <div v-for="(q, key) of item.questions" :key="key">
                        <label  :class="q.question_selected" :for="`${item.questionId}-${key}`">
                            ({{ q.question }})  {{ q.question_name }}
                        </label>
                 </div>
                 </div>
             </div>
             <div class="row mt-3">
                <RouterLink to="/student-result" class="btn btn-outline-info ml-3">Voltar</RouterLink>
             </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref } from 'vue'
import { Notify } from '@/share/notify';
import type { StudentResultSchema } from '@/schema/studentResult';
import { StudentResultService } from '@/service/studentResult';

const studentResult = new StudentResultService()

const student = ref<StudentResultSchema>({schoolTest: {}} as any)

async function main() {

    try {

        const route = useRoute()
        const id = route.params.id as string
        student.value = await studentResult.findResult(id)


    } catch (error) {
        await Notify.error('Error para listar')
    }
}
main()

</script>