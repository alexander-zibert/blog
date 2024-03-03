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
  <h2>Widget: Should I continue testing?</h2>
  <section>
    <h3>Introduction</h3>

    <p>
      In software testing, deciding whether to continue testing after
      encountering a certain number of bugs can be challenging. However, a
      method originating from ecology, known as
      <a href="https://en.wikipedia.org/wiki/Mark_and_recapture"
        >Mark and recapture</a
      >, can provide a more informed decision-making process.
    </p>
    <p>
      This method involves employing two independent testing teams (or
      individuals), each operating without communication. Both teams record the
      bugs they find, and after a given time frame (e.g. two hours), they
      compare the number of bugs they have in common. The assumption is that if
      both teams have a significant overlap in the bugs they found, there may
      not be many more bugs to discover. Conversely, if both teams found many
      unique bugs, there is a higher probability that there are still many more
      to be discovered.
    </p>
  </section>
  <section>
    <h3>Considerations</h3>
    <ul>
      <li>
        Ensure that both testing teams work independently in the same part of
        the system and refrain from making alterations to the system between
        tests.
      </li>
      <li>
        The resulting bug count from this widget is highly context-dependent. In
        some systems, having 100 remaining bugs may still be acceptable, while
        in others, aiming for under 3 is advisable.
      </li>
      <li>
        You can also choose to test only a part of the system (e.g., the
        purchase flow). By doing so, you will obtain an estimate of the
        remaining bugs specific to that particular part of the system.
      </li>
    </ul>
  </section>
  <section>
    <h3>Configuration</h3>
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
  </section>
  <section>
    <h3>Result</h3>
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
      <strong
        >{{ result.result - (n1 + n2 - k) }} bugs are still not found</strong
      >.
    </p>
  </section>
  <section>
    <h3>Further Reading</h3>
    <ul>
      <li>
        Initially I found this on the
        <a
          href="https://observablehq.com/@troymagennis/latent-defect-estimation?collection=@troymagennis/agile-software-development"
          >interactive blog</a
        >
        of Troy Megennis
      </li>
      <li>
        John D. Cook's
        <a href="https://www.johndcook.com/blog/2010/07/13/lincoln-index/"
          >explanation</a
        >
        of the method is much clearer than mine
      </li>
      <li>
        This widget uses the
        <a
          href="https://en.wikipedia.org/wiki/Mark_and_recapture#Chapman_estimator"
          >Chapman estimator</a
        >
      </li>
    </ul>
  </section>
</template>
