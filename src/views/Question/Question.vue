<template>
    <div class="row justify-content-center">
    <div class="col-md-10">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"  aria-current="page">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/question">Pergunta</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
            <RouterLink to="/question/form/novo" class="btn btn-outline-info">Cadastrar pergunta</RouterLink>
            <div class="table-responsive">
                <table class="table mt-2">
                      <thead>
                         <th>Avaliação</th>
                         <th>Pergunta</th>
                         <th>Valor da pergunta</th>
                         <th></th>
                      </thead>
                      <tbody>
                         <tr v-for="item of items" :key="item._id">
                             <td>{{ item.schoolTest.name }}</td>
                             <td>{{ item.question_name }} </td>
                             <td>{{ item.question_amount }} </td>
                             <td>
                                <RouterLink :to="`/question/form/${item._id}`" class="btn btn-outline-info">editar</RouterLink>
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
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import type { QuestionSchema } from '@/schema/question';
import { QuestionService } from '@/service/question';
import { Notify } from '@/share/notify';

const items = ref<QuestionSchema[]>()

async function main() {
    try {
        const questions = new QuestionService()
        items.value = await questions.find()
    } catch (error) {
        await Notify.error('Error para listar')
    }
}
main()

</script>