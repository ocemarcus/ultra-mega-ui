
<template>
  <header>
      <nav class="navbar navbar-expand-lg menu-content">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/school-test" class="nav-link">Avaliações</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/question" class="nav-link">Perguntas</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/student-result" class="nav-link">Resultado do aluno</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
  </header>
  <div class="row justify-content-center">
    <notifications />
    <div class="col-md-10 mt-2">
        <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
