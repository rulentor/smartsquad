<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import dialogueData from '../dialogue.json';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const Render = reactive({
  title: "",
  image: "",
  text: "",
  buttons: [],
  id: "",
  progress_value: 0,
  progress_tag: ""
})

const OverallProgress = ref(5)

interface Dialogue {
  [dialogue_id: string]: {
    title: string;
    image: string;
    text: string;
    buttons?: {
      text: string;
      to: string;
    }[];
    progress_value: number;
    progress_label: string;
  };
}

const dialogue: Dialogue = dialogueData;

const Update = (dialogue_id: string) => {
  if (!dialogue_id) { dialogue_id = route.params.id as string }
  const stepData = dialogue[dialogue_id];
  Object.assign(Render, {
    title: stepData.title,
    image: stepData.image,
    text: stepData.text,
    buttons: stepData.buttons,
    id: dialogue_id,
    progress_value: stepData.progress_value,
    progress_tag: stepData.progress_label
  })
  console.log(stepData.buttons)
}

watch(route, (to) => {
  // do something when the route changes
});

onMounted(Update)

</script>

<template>
  <main>
    <p class="progress-tag">{{ Render.progress_tag }}</p>
    <div class="progress-visuals-container">
      <div class="filled" v-for="n in Render.progress_value"></div>
      <div class="empty" v-for="n in OverallProgress - Render.progress_value"></div>
    </div>
    <h1 class="title">{{ Render.title }}</h1>
    <img v-if="Render.image" :src="`/images/dialogue/${Render.image}`" class="primary-image">
    <p class="primary-text" v-html="`${Render.text}`"></p>
    <div class="button-container">
      <router-link v-for="button in Render.buttons" :to="`${button.to}`">
        <p>{{ button.to }}</p>
        <button>{{ button.text }}</button>
      </router-link>
    </div>
  </main>
</template>

<style scoped>
.title {
  margin: 0;
  margin-top: 40px;
}

.primary-image, .primary-text {
  margin-top: 24px;
  font-size: 1rem;
  font-weight: 400;
  max-width: 100%;
}

.primary-image {
  margin: -15% -15%;
}

.progress-tag {
  margin-top: 40px;
  margin-bottom: 12px;
}

.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 0;
}

button {
  color: var(--primary-light);
  background-color: var(--primary-blue);
  padding: 12px 95.5px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.1s;
}

button:hover {
  background-color: var(--aditional-blue);
}

button:active {
  background-color: var(--darker-blue);
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 2.5rem;
  border-radius: 5rem;
  aspect-ratio: 1;
  position: fixed;
  left: 1%;
  top: calc(2rem + 2%);
}

.progress-visuals-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.progress-visuals-container>div {
  width: 3rem;
  aspect-ratio: 8;
  border-radius: 1rem;
  background-color: var(--aditional-light);
}

.progress-visuals-container>.filled {
  background-color: var(--primary-blue);
}
</style>