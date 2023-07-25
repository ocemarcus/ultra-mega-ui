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
                <li class="breadcrumb-item">
                    <RouterLink to="/school-test">Form</RouterLink>
                </li>
            </ol>
            </nav>
        <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                                <label  class="form-label">Título da avaliação</label>
                                <input type="text" v-model="data.name" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                        <div class="mt-3">
                            <button type="button" @click="save" class="btn btn-success">Salvar</button>
                            <RouterLink to="/school-test" class="btn btn-outline-info ml-3">Voltar</RouterLink>
                        </div>
                        </div>
                    </div>
    </div>
</div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { SchoolTestService } from '@/service/schoolTest';
import type { SchoolTestSchema } from '@/schema/schoolTest';
import { Notify } from '@/share/notify';

const router = useRouter()


const data = ref<SchoolTestSchema>({ name: '' })


const schoolTest = new SchoolTestService()

async function save() {

    try {

        const save = Object.assign({}, data.value)
        const validate = validateSchoolTest(save)
        if (validate) return alert(validate)

        await schoolTest.save(save)
        await Notify.success('Salvo com sucesso')

        router.push('/school-test')

    } catch (error) {
        await Notify.error('Error para salvar')
    }

}

const validateSchoolTest = (data: SchoolTestSchema) => {
    if (data.name === "") {
        return "* Título da avaliação deve ser obrigatório\n"
    }
    return ""
}

async function main() {
    try {

        const route = useRoute()
        const id = route.params.id as string

        if (id !== 'novo') {
            data.value = await schoolTest.findById(id)
        }

    } catch (error) {
        console.log(error)
    }
}
main()

</script>