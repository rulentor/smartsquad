<script setup lang="ts">
import { reactive, ref } from 'vue';
import dialogueData from '../dialogue.json';

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

const Progress = reactive({})

const LastStep: any = ref(null)

interface Dialogue {
  [dialogue_id: string]: {
    title: string;
    image: string;
    text: string;
    buttons?: {
      text: string;
      step_id: string;
    }[];
    progress_value: number;
    progress_label: string;
  };
}

const dialogue: Dialogue = dialogueData;

const loadDialogueStep = (dialogue_id: string, options?: string) => {
  if (options === "back") { LastStep.value = "" } else {
    LastStep.value = Render.id
  }
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
};

loadDialogueStep("start")
</script>

<template>
  <main>
    <button class="back-button" v-if="LastStep !== ''" @click="loadDialogueStep(LastStep, 'back')"><img src="/images/icons/back.svg"></button>
    <p class="progress-tag">{{ Render.progress_tag }}</p>
    <div class="progress-visuals-container">
      <div class="filled" v-for="n in Render.progress_value"></div>
      <div class="empty" v-for="n in OverallProgress - Render.progress_value"></div>
    </div>
    <h1 class="title">{{ Render.title }}</h1>
    <img v-if="Render.image" :src="`/images/dialogue/${Render.image}`" class="primary-image">
    <p class="primary-text" v-html="`${Render.text}`"></p>
    <div class="button-container">
      <button v-for="button in Render.buttons" @click="loadDialogueStep(button.step_id)">{{ button.text }}</button>
    </div>
  </main>
</template>

<style scoped>
main {
  --primary-blue: #0450F2;
  --aditional-blue: #1F66FF;
  --darker-blue: #0041CB;
  --primary-light: #FFFFFF;
  --aditional-light: #E6E6E6;
  --primary-black: #000000;
  /**/
  padding: 1rem 15%;
}

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