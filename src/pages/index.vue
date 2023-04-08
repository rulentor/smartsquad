<template>
<div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
	<!--EditProfile v-if='showEdit' :isShowEdit='showEdit'/-->
    <MiniHeader />
    <InteractionCore />
</div>
</template>
<script async setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
//import { useCookie } from 'vue-cookie-next'
import { useRoute, useRouter } from 'vue-router'

//import MiniHeader from './components/MiniHeader.vue';
//import InteractionCore from './components/InteractionCore.vue'
//import fetch from 'cross-fetch'

const router = useRouter()
const toast = useToast()
//const { getCookie, setCookie, removeCookie } = useCookie()
//const stateuser = ref(useCookie('stateUser'))
//const stateuser = ref()
//const stateuser = getCookie('userState')// || {last_name: false}

const urls = {
  update: 'http://158.160.12.110/api/user/profile'
}

const states = reactive({
  stateuser: null, //getCookie('userState') || null,
  showEdit: false//props.isShowEdit
})

const initState = async () => {
//if(!states.stateuser?.token) 
console.log('states',states.stateuser)
return true
}

const init = async () => {
/*
  //state.id = true
  states.stateuser.last_name = state.last_name
*/
   try {
    const res = await fetch(`http://158.160.12.110/api/videos`,{
	  //method: 'post',
	  headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+states.stateuser?.token
	  },
	})
    
    if (res.status >= 400) {
      throw new Error("Неавторизован")
	  return
    }
    
    const json = await res.json()
    console.log('video-data',state,json)
	state.countVideos = json.length
	//countAnomalies.value = 0
	json.map(item => state.countAnomalies += parseInt(item.founded_anomaly))
  } catch (err) {
    console.error(err)
  }
}
//const state = reactive({})
const state = reactive({
  id: null,
  last_name: states.stateuser?.last_name || null,
  first_name: states.stateuser?.first_name || null,
  patronymic: states.stateuser?.patronymic || null,
  job_name: states.stateuser?.job_name || null,
  about: states.stateuser?.about || null,  
  email: states.stateuser?.email || null,
  phone: states.stateuser?.phone || null,
  token: null,
  countVideos: 0,
  countAnomalies: 0    
})

  onMounted(
    async () => { 
	  if(initState()) init()
	}
  )

const showEdit = ref(false)

const actionShowEdit = () => {
  showEdit.value = true
}

const updateProfile = async () => {
  showEdit.value = false
  const request = {
	headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+states.stateuser.token
	},
	method: 'post',
    body: JSON.stringify(state)	
  }
  const update = await fetch(urls.update,request)
    .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json()
  })
  .then(d => {
    console.log('пришло',d)
	//d.token = states.stateuser.token
	setCookie('userState', d)
	showEdit.value = false
  })
  .catch(err => {
    console.error('ошибка',err)
  })
}	  
</script>
<route lang="yaml">
meta:
  layout: single
</route>
