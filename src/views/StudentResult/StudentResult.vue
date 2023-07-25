<template>
    <div class="row justify-content-center">
    <div class="col-md-10">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"  aria-current="page">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/student-response">Resultado do aluno</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table mt-2">
                      <thead>
                         <th>Avaliação</th>
                         <th>Aluno</th>
                         <th>E-mail</th>
                         <th>Total Avaliação</th>
                         <th>Pontuação</th>
                         <th>Média</th>
                         <th>Q. Questão</th>
                         <th>Acertou</th>
                         <th></th>
                      </thead>
                      <tbody>
                         <tr v-for="item of items" :key="item._id">
                            <td>{{ item.schoolTest.name }}</td>
                            <td>{{ item.student_name }}</td>
                            <td>{{ item.student_email }}</td>
                            <td>{{ item.question_total_amount }}</td>
                            <td>{{ item.points_scored }}</td>
                            <td>{{ item.average }}</td>
                            <td>{{ item.question_quantity }}</td>
                            <td>{{ item.question_success }}</td>
                                <td>
                                <RouterLink :to="`/student-result/view/${item._id}`" class="btn btn-outline-info">visualizar</RouterLink>
                             </td>
                         </tr>
                      </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import type { StudentResultSchema } from "@/schema/studentResult";
import { StudentResultService } from '@/service/studentResult';

import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Notify } from "@/share/notify";

const items = ref<StudentResultSchema[]>()

async function  main() {
    try {
        const studentResult = new StudentResultService()
        items.value = await studentResult.find()
    } catch (error) {
        Notify.error('Error para listar')
    }
}
main()


</script>