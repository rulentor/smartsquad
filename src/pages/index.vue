<template>
<div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
	<!--EditProfile v-if='showEdit' :isShowEdit='showEdit'/-->
<Dialog header='Профиль пользователя' v-model:visible="showEdit" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
<Card class="p-fluid">
  <!--template #title>Профиль пользователя</template-->
  <template #content>
	<div class="formgrid grid">
	  <div class="col">
		<div class="field">
		  <label for="last_name">Фамилия</label>
		  <InputText id="last_name" v-model="state.last_name" :value='state.last_name' type="text" class="p-input-sm mb-3" placeholder="Фамилия" style="padding:1rem;" />
		</div>	
		<div class="field">
		  <label for="first_name">Имя</label>
		  <InputText id="first_name" v-model="state.first_name" :value='state.first_name' type="text" class="p-input-sm mb-3" placeholder="Имя" style="padding:1rem;" />
		</div>
      </div>
	  <div class="col">		
		<div class="field">
		  <label for="patronymic">Отчество</label>
		  <InputText id="patronymic" v-model="state.patronymic" :value='state.patronymic' type="text" class="p-input-sm mb-3" placeholder="Отчество" style="padding:1rem;" />
		</div>			
		<div class="field">
		  <label for="email">Email</label>
		  <InputText id="email" v-model="state.email" :value='state.email' type="text" class="p-input-sm mb-3" placeholder="Email - введите рабочий" style="padding:1rem;" />
		</div>
	  </div>
    </div>
	<div class="formgrid grid">	
	<div class="col">	
		
		<div class="field">
		  <label for="job_name">Должность</label>
		  <InputText id="job_name" v-model="state.job_name" :value='state.job_name' type="text" class="p-input-sm mb-3" placeholder="Должность" style="padding:1rem;" />
		</div>		
        <div class="field">
          <Textarea v-model="state.about" :value='state.about' :autoResize="true" placeholder="О себе" rows="5" cols="30" />
		</div>
	  </div>	
  </div>
  </template>
<template #footer>
    <div class="formgrid grid text-center">
	  <div class="field col">
	    <Button label="Сохранить" @click="updateProfile" class="p-button-success" />
      </div>
      <div class="field col">					  
		<!--Button label="Отменить" @click="$emit('update:isShowEdit', false)" class="p-button-secondary" /-->
		<Button label="Отменить" @click="showEdit = false" class="p-button-secondary" />
      </div>
	</div>
</template>
</Card>
</Dialog>
    <div class="grid">

        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">

            </div>
        </div>
    </div>
</div>
</template>
<script async setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useCookie } from 'vue-cookie-next'
import { useRoute, useRouter } from 'vue-router'
//import fetch from 'cross-fetch'

const router = useRouter()
const toast = useToast()
const { getCookie, setCookie, removeCookie } = useCookie()
//const stateuser = ref(useCookie('stateUser'))
//const stateuser = ref()
//const stateuser = getCookie('userState')// || {last_name: false}

const urls = {
  update: 'localhost'
}

const states = reactive({
  stateuser: getCookie('userState') || null,
})

const init = async () => {

}
//const state = reactive({})
const state = reactive({
  id: null,
})

  onMounted(
    async () => { 
	  init()
	}
  )

	  
</script>
<route lang="yaml">
meta:
  layout: default
</route>
