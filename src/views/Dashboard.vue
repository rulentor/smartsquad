<script setup lang="ts">
// Setup
import { reactive, ref, watch } from "vue"
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const section = route.params.section
const currentRoute = ref(section)

// Object declaration
const sections = [
    {
        text: "Статистика",
        section: "stats"
    },
    {
        text: "Общая информация",
        section: "info"
    },
    {
        text: "Личные данные",
        section: "personal-info"
    },
    {
        text: "Электронная подпись",
        section: "digital-signature"
    },
    {
        text: "Промокоды",
        section: "promocodes"
    },
    {
        text: "Архив",
        section: "archive"
    },
]
//

const userData = reactive({
    avatar: "/images/TestAvatar.png",
    name: "Константинопольский Константин Константинович",
    role: "Покупатель. Имущественные торги.",
    medal: "gold",
    points: 126,
    league: {
        quote: "Не сдавайте позиции!",
        icon: "gold",
        name: "Золотая лига",
        lbPosition: 1
    },
    achievements: [
        {
            name: "Первые торги",
            id: "firsttorg"
        },
        {
            name: "Победитель",
            id: "winner"
        },
        {
            name: "Первая сделка",
            id: "firstsdel"
        }
    ],
    available: {
        roulette: 6,
        quiz: 3
    }
})

const leaderboard = reactive({
    places: [
        {
            name: "Константинопольский Константин Константинович",
            won: 10,
            lost: 3,
            avatar: "/images/TestAvatar.png",
        },
        {
            name: "Константинопольский Константин Константинович",
            won: 10,
            lost: 3,
            avatar: "/images/TestAvatar.png",
        },
        {
            name: "Константинопольский Константин Константинович",
            won: 10,
            lost: 3,
            avatar: "/images/TestAvatar.png",
        },
        {
            name: "Константинопольский Константин Константинович",
            won: 10,
            lost: 3,
            avatar: "/images/TestAvatar.png",
        },
        {
            name: "Константинопольский Константин Константинович",
            won: 10,
            lost: 3,
            avatar: "/images/TestAvatar.png",
        },
        {
            name: "Константинопольский Константин Константинович",
            won: 10,
            lost: 3,
            avatar: "/images/TestAvatar.png",
        },
    ]
})
</script>

<template>
    <div class="dashboard">
        <div class="sidebar">
            <h2>Разделы</h2>
            <router-link v-for="section in sections" :to="`${section.section}`">{{ section.text }}</router-link>
        </div>
        <main>
            <div class="user-data">
                <img v-if="userData.avatar" :src="`${userData.avatar}`">
                <div class="data">
                    <div class="name-container">
                        <h3>{{ userData.name }}</h3>
                        <img v-if="userData.medal" :src="`/images/medals/${userData.medal}.png`">
                    </div>
                    <h4>{{ userData.role }}</h4>
                </div>
            </div>
            <div class="stats">
                <div class="points">
                    <h3 class="title">Баллы</h3>
                    <div class="value">
                        <img src="/images/icons/points.png">
                        <h2>{{ userData.points }}</h2>
                    </div>
                    <button>Как получать баллы?</button>
                </div>
                <div class="daily">
                    <h3 class="title">Ежедневная награда</h3>
                    <div class="value">
                        <img src="/images/icons/points.png">
                        <h2>+ 5 баллов</h2>
                    </div>
                    <button>Забрать</button>
                </div>
                <div class="league">
                    <h3 class="title">Лига</h3>
                    <h4>Не сдавайте позиции!</h4>
                    <div class="data">
                        <img :src="`/images/leagues/${userData.league.icon}.png`">
                        <div class="text">
                            <h3>{{ userData.league.name }}</h3>
                            <h4>{{ userData.league.lbPosition }} место в топе</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="middle-container">
                <div class="achievements">
                    <h3>{{ userData.achievements.length }} достижения</h3>
                    <div class="container">
                        <div>
                            <img :src="`/images/achievements/${userData.achievements[0].id}.png`">
                            <h4>{{ userData.achievements[0].name }}</h4>
                        </div>
                        <div>
                            <img :src="`/images/achievements/${userData.achievements[1].id}.png`">
                            <h4>{{ userData.achievements[1].name }}</h4>
                        </div>
                        <div>
                            <img :src="`/images/achievements/${userData.achievements[2].id}.png`">
                            <h4>{{ userData.achievements[2].name }}</h4>
                        </div>
                    </div>
                    <button>Смотреть все</button>
                </div>
                <div class="activities">
                    <div class="roulette">
                        <h3>Рулетка</h3>
                        <h4>Доступно {{ userData.available.roulette }} купонов</h4>
                        <button>Крутить</button>
                    </div>
                    <div class="quiz">
                        <h3>Квизы</h3>
                        <h4>Доступно {{ userData.available.quiz }} квиза</h4>
                        <button>Пройти</button>
                    </div>
                </div>
            </div>
            <div class="leaderboard">
                <div class="static-decor">
                    <div class="leagues">
                        <img src="/images/leagues/bronze.png">
                        <img src="/images/leagues/silver.png">
                        <img class="large" src="/images/leagues/gold.png">
                        <img src="/images/leagues/green.png">
                        <img src="/images/leagues/blue.png">
                    </div>
                    <h3></h3>
                </div>
                <div class="leaders">
                    <div v-for="(data, index) in leaderboard.places">
                        <img v-if="index == 0" src="/images/medals/gold.png">
                        <img v-else-if="index == 1" src="/images/medals/silver.png">
                        <img v-else-if="index == 2" src="/images/medals/bronze.png">
                        <h5 v-else>{{ index + 1 }}</h5>
                        <img class="avatar" :src="`${data.avatar}`">
                        <h4>{{ data.name }}</h4>
                        <p>{{ data.won }} выиграно / {{ data.lost }} проиграно</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.dashboard {
    display: flex;
}

main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    margin: 60px 24px;
}

.shadow {
    box-shadow: 0 8px 24px #0041CB1A;
}

/* Section definitions */

.leaderboard {
    box-shadow: 0 8px 24px #0041CB1A;
    border: 0.7px solid #E6E6E6;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
    gap: 24px;
}

.leaderboard .static-decor {
    width: 100%;
}

.leaderboard .leagues {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.leaderboard .leagues img {
    width: 80px;
}

.leaderboard .leagues img.large {
    width: 110px;
}

.leaders .avatar {
    width: 48px;
}

.leaders h5 {
    color: #67C91F;
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    width: 36px;
    text-align: center;
}

.leaderboard div > h4 {
    font-weight: 400;
    margin: 0;
}
.leaderboard div > p {
    font-weight: 400;
    color: #8D93A1;
    margin: 0;
    margin-left: 15rem;
}

.leaders {
    display: flex;
    flex-direction: column;
}

.leaders > div {
    display: flex;
    align-items: center;
    padding: 10px 30px;
    gap: 20px;
}

.user-data {
    display: flex;
    align-items: center;
    gap: 20px;
}

.user-data .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8.25px;
}
.user-data h3 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
}
.user-data h4 {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
    color: #8D93A1;
}

@keyframes Spin {
    0% {
        transform: rotate(0deg);
    }
    10% {
        transform: rotate(360deg) scale(1.1);
    }
    100% {
        transform: rotate(2520deg);
    }
}

.user-data img {
    width: 78px;
    animation: Spin 10s forwards infinite ease-in-out;
}

.user-data .name-container {
    display: flex;
    gap: 10px;
}

.user-data .name-container > img {
    width: 28px;
}

.stats {
    display: flex;
    gap: 24px;
    width: 100%;
    justify-content: left;
}

.stats > div {
    width: fit-content;
    box-shadow: 0 8px 24px #0041CB1A;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 12px;
    width: calc(33% - 1rem);
    border-radius: 12px;
    border: 0.7px solid #E6E6E6;
}

.stats > div > h3 {
    font-weight: 400;
    font-size: 24px;
    margin: 0;
}

.stats > div > h4 {
    font-weight: 400;
    font-size: 18px;
    margin: 0;
}

.stats div .value {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stats .value h2 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
}

.points button, .achievements button, .activities > div > button {
    font-weight: 600;
    font-size: 16px;
    padding: 8px 16px;
    width: fit-content;
    color: var(--primary-blue);
    background-color: white;
    border: none;
    box-shadow: 0px 1px 4px 1px rgba(0, 65, 203, 0.2);
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;
}
.daily button {
    font-weight: 600;
    font-size: 16px;
    padding: 8px 16px;
    width: fit-content;
    color: white;
    background-color: var(--primary-blue);
    border: none;
    box-shadow: 0px 1px 4px 1px rgba(0, 65, 203, 0.2);
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;
}

.daily button:hover {
    background-color: #1F66FF;
}

.daily button:active {
    background-color: #0041CB;
}

.points button:hover, .achievements button:hover, .activities > div > button:hover {
    box-shadow: 0px 4px 16px 1px rgba(0, 65, 203, 0.1);
}

.points button:active, .achievements button:active, .activities > div > button:active {
    background-color: #CDDDFF;
}
.league img {
    width: 60px;
}

.league .data {
    display: flex;
    align-items: center;
    gap: 10px;
}

.league h3 {
    font-weight: 600;
    font-size: 24px;
    margin: 0;
}

.league h4 {
    font-weight: 400;
    font-size: 18px;
    margin: 0;
}

.middle-container {
    display: flex;
    gap: 24px;
    width: 100%;
}

.achievements {
    width: calc(60% - 52px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 8px 24px #0041CB1A;
    border-radius: 12px;
    border: 0.7px solid #E6E6E6;
}

.achievements > h3 {
    font-weight: 400;
    font-size: 24px;
    margin: 0;
}

.activities {
    width: calc(40% - 52px);
    display: flex;
    flex-direction: column;
    gap: 24px;
}


.achievements > .container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
}

.achievements > .container > div {
    background-color: #F1F8FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 30px;
    gap: 12px;
    border: 1px solid #DBE7FF;
    border-radius: 8px;
}


.achievements > .container > div h4 {
    font-weight: 400;
}

.activities > div {
    box-shadow: 0 8px 24px #0041CB1A;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    border: 0.7px solid #E6E6E6;
}

.activities > div > h3 {
    margin: 0;
}

.activities > div > h4 {
    margin: 0;
}

/* Sidebar */
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 24px;
    width: 282px;
}
.sidebar > h2 {
    font-weight: 600;
    font-size: 2rem;
    margin-top: 60px;
    margin-bottom: 40px;
}
.sidebar > a {
    font-weight: 400;
    font-size: 1rem;
    text-decoration: none;
}
.sidebar > .router-link-exact-active {
    color: var(--primary-blue);
}
</style>