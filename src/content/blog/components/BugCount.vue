<script setup lang="ts">
import { computed, ref } from "vue";

function calculateBugsInSystem(n1: number, n2: number, k: number) {
  return ((n1 + 1) * (n2 + 1)) / (k + 1) - 1;
}

const n1 = ref<number>(13);
const n2 = ref<number>(17);
const k = ref<number>(10);

const result = computed(() => {
  const errors = [];
  if (
    !(
      Number.isInteger(n1.value) &&
      Number.isInteger(n2.value) &&
      Number.isInteger(k.value)
    )
  ) {
    errors.push("All inputs have to be filled with integer values!");
    return { errors };
  }

  if (n1.value < 0 || n2.value < 0 || k.value < 0) {
    errors.push("The values for the bug counts cannot be negative!");
  }

  if (k.value > n1.value || k.value > n2.value) {
    errors.push(
      `The overlap between both teams (${k.value}) cannot be greater than the individual values of the first team (${n1.value}) and the second team (${n2.value})!`
    );
  }

  if (errors.length > 0) {
    return { errors };
  }

  const numBugs = Math.ceil(calculateBugsInSystem(n1.value, n2.value, k.value));

  return {
    errors,
    result: numBugs,
  };
});
</script>
<template>
  <h2 id="configuration">Configuration</h2>
  <form>
    <fieldset>
      <legend>Bug Counts</legend>
      <p>
        <label for="n1"
          >Number of bugs found by the <strong>first</strong> team</label
        >
        <input v-model="n1" type="number" min="0" step="1" id="n1" />
      </p>
      <p>
        <label for="n2"
          >Number of bugs found by the <strong>second</strong> team</label
        >
        <input v-model="n2" type="number" min="0" step="1" id="n2" />
      </p>
      <p>
        <label for="k"
          >Number of bugs found by <strong>both</strong> teams</label
        >
        <input v-model="k" type="number" min="0" step="1" id="k" />
      </p>
    </fieldset>
  </form>
  <p></p>

  <h2 id="result">Result</h2>
  <div v-if="result.errors.length > 0" class="notice">
    <h4>Cannot calculate result due to errors in the inputs</h4>
    <ul>
      <li v-for="error in result.errors" :key="error">{{ error }}</li>
    </ul>
  </div>
  <p v-if="result.result">
    You already found {{ n1 + n2 - k }} unique bugs. The most likely value of
    the total bugs in the system is {{ result.result }}. That means
    approximately
    <strong>{{ result.result - (n1 + n2 - k) }} bugs are still not found</strong
    >.
  </p>
</template>
