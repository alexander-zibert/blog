<script setup lang="ts"></script>

<template>
  <header>
    <h1>Statistic Widgets</h1>
    <p>
      Some Widgets that help with forecasting, analytics, and other use cases.
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
