<template>
  <main>
    <div :class="containerClass" @click="onWrapperClick">
        <Topbar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <Footer />
        </div>
        <!--AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" @click='showSupportDialog'/-->
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
    </div>
  </main>
</template>
<script async setup lang="ts">
//import axios from 'axios'
import { ref, reactive, onMounted, onBeforeUpdate, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookie } from 'vue-cookie-next'
import { useToast } from 'primevue/usetoast'
import { useMenuStore } from '~/stores/menu'

const route = useRoute()
const router = useRouter()
const { getCookie, setCookie, removeCookie } = useCookie()
const toast = useToast()
const page = ref<any>({})
const menustate = useMenuStore()
const urls = {
  send: 'localhost'
}
const states = reactive({
  stateuser: getCookie('userState'),
})

const isAuth = ref(false)
const stateuser = ref(null) //
//stateuser.value = getCookie('userState')
//console.log('menu-state',stateuser.value)
if(!states.stateuser?.token) router.push('/auth/login')

const layoutMode = ref('static')
const staticMenuInactive = ref(false)
const overlayMenuActive = ref(false)
const mobileMenuActive = ref(false)
const menuActive = ref(false)
const menuClick = ref(false)

const menuData = [
                {
                    label: 'Меню',
                    items: [
                        {
                            label: 'Главная страница',
                            icon: 'pi pi-fw pi-home',
                            to: '/',
                        },
						{   label: 'Статус проектов', 
						    icon: 'pi pi-fw pi-sitemap', 
							to: '/projects' 
						},

					
                    ],
                },

                {
                    label: 'Сканирования',
                    icon: 'pi pi-fw pi-search',
                    items: [

                        {
                            label: 'Безымянный проект',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [

                            ],
                        },

                    ],
                },
                {
                    label: 'Поддержка',
                    items: [
                        {
                            label: 'Информация о лицензии',
                            icon: 'pi pi-fw pi-book',
                            to: '/help' 
                        },
                        {
                            label: 'Техническая поддержка',
                            icon: 'pi pi-fw pi-cog',
                            command: () => {
                                //window.location = 'https://github.com/primefaces/sakai-vue';
								  console.log('action cmd')
                            },
                        },
                    ],
                },
]

const menu = ref(menuData)
const state = reactive({
  id: null,
})


onMounted(() => {
    //fetchPage()
	
if('menustate' in menustate) console.log('Шаблон запуск',menustate)	
else console.log('Шаблон запуск - проект пуст!')
	
//router.addMenu = (items) => {
//  console.log('Добавлялка',items)
//  menu.value[1].items = items
//} 	
})

onBeforeUpdate(() => {
   if (mobileMenuActive.value) addClass(document.body, 'body-overflow-hidden')
   else removeClass(document.body, 'body-overflow-hidden')
})

const containerClass = reactive([
    'layout-wrapper',
    {
      'layout-overlay': layoutMode.value === 'overlay',
      'layout-static': layoutMode.value === 'static',
      'layout-static-sidebar-inactive': staticMenuInactive.value && layoutMode.value === 'static',
      'layout-overlay-sidebar-active': overlayMenuActive.value && layoutMode.value === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive.value,
      'p-input-filled': 'filled',//this.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': false, //this.$primevue.config.ripple === false,
      'layout-theme-light': true, //this.$appState.theme.startsWith('saga'),
    },  
])

watch(() => {
  router.params = route.params
  menuActive.value = false
  toast.removeAllGroups()  
 
})

const onWrapperClick = () => {
  if (!menuClick.value) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
  menuClick.value = false
}
const onMenuToggle = (event) => {
  menuClick.value = true
  if (isDesktop()) {
    if (layoutMode.value === 'overlay') {
      if (this.mobileMenuActive === true) {
        overlayMenuActive.value = true
      }
      overlayMenuActive.value = !overlayMenuActive.value
      mobileMenuActive.value = false
    } else if (layoutMode.value === 'static') {
      staticMenuInactive.value = !staticMenuInactive.value
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value
  }
  event.preventDefault()
}
const onSidebarClick = () => {
  menuClick.value = true
}
const onMenuItemClick = (event) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
	//supportDialog.value = true
  }
}
const onLayoutChange = (layoutMode) => {
  layoutMode.value = layoutMode
}
const addClass = (element, className) => {
  if (element.classList) element.classList.add(className)
  else element.className += ' ' + className
}
const removeClass = (element, className) => {
  if (element.classList) element.classList.remove(className)
  else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}
const isDesktop = () => {
  return true //window.innerWidth >= 992;
}
const isSidebarVisible = () => {
  if (isDesktop()) {
    if (layoutMode.value === 'static') return !staticMenuInactive.value
    else if (layoutMode.value === 'overlay') return overlayMenuActive.value
  }
  return true
}
</script>
<style lang="scss">
/*@import './App.scss';*/
</style>
