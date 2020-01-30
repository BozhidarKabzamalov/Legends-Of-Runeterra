<template>
    <div class="cards">
        <div class="cards-list">
            <div class="card" v-for='card in filteredCards' @click='specificCard(card.cardCode)'>
                <div class="card-image">
                    <img class='responsive-image' :src='"../assets/cards/" + card.cardCode + ".png"' alt="">
                </div>
            </div>
        </div>
        <div class="filters">
            <input v-model="search" type="text" placeholder="Search...">
        </div>
    </div>

</template>

<script>
    import cards from '../assets/cards/set1-en_us.json'
    import router from '../router'

    export default {
        data() {
            return {
                cards: cards,
                search: '',
                regions: null,
            }
        },
        methods: {
            specificCard(cardCode){
                router.push({ name: 'specificCard', params: { cardCode: cardCode } })
            }
        },
        computed: {
            filteredCards(){
                return this.cards.filter((card) => {
                    return card.name.match(this.search)
                })
            }
        },
        mounted() {
            console.log(this.filteredCards)
        }
    }
</script>

<style scoped>
    .cards {
        display: flex;
    }
    .cards-list {
        padding-top: 20px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
    }
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }
    .card:hover {
        transform: scale(1.05);
    }
    .card-image {
        width: 240px;
        height: auto;
    }
    .filters {
        width: 300px;
        background-color: #0c1c25;
        padding-top: 20px;
    }
</style>
