<script setup lang="ts"></script>

<template>
  <header>
    <h1>Distributed Minds</h1>
    <p>
      Some writing about programming, system architecture, agile development.
      There are also some widgets that help with forecasting, analytics, and
      other use cases.
    </p>
    <nav>
      <a href="/" class="current">Home</a>
      <a href="#test">Docs</a>
      <a href="#test">Demo</a>
      <a href="#test">News</a>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <p>Styled with <a href="https://simplecss.org/">Simple.css</a></p>
  </footer>
</template>

<style scoped></style>
