<template>
    <div class="row justify-content-center">
    <div class="col-md-10">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"  aria-current="page">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/school-test">Avaliações</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
            <RouterLink to="/school-test/form/novo" class="btn btn-outline-info">Cadastrar avaliação</RouterLink>
            <div class="table-responsive">
                <table class="table mt-2">
                      <thead>
                         <th>Avaliação</th>
                         <th></th>
                         <th></th>
                      </thead>
                      <tbody>
                         <tr v-for="item of items" :key="item._id">
                            <td>{{ item.name }}</td>
                            <td>
                                <RouterLink :to="`/student/${item._id}`" class="btn btn-outline-secondary">Link para Aluno</RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/school-test/form/${item._id}`" class="btn btn-outline-info">editar</RouterLink>
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
import { SchoolTestService } from '@/service/schoolTest';
import type { SchoolTestSchema } from "@/schema/schoolTest";

import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Notify } from '@/share/notify';

const items = ref<SchoolTestSchema[]>()

async function  main() {
    try {
        const schoolTest = new SchoolTestService()
        items.value = await schoolTest.find()
    } catch (error) {
        await Notify.error('Error para listar')
    }
}
main()


</script>