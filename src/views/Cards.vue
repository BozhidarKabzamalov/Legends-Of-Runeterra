<template>
    <div class="cards">
        <div class="cards-list">
            <div class="card" v-for='card in filteredByAll' @click='specificCard(card.cardCode)'>
                <div class="card-image">
                    <img class='responsive-image' :src='"../assets/cards/" + card.cardCode + ".png"' alt="">
                </div>
            </div>
        </div>
        <div class="filters">
            <input v-model="search" type="text" placeholder="Search...">
            <div class='regions'>
                <input type="checkbox" value="Noxus" v-model="regions">
                <label>Noxus</label>
                <input type="checkbox" value="Demacia" v-model="regions">
                <label>Demacia</label>
                <input type="checkbox" value="Shadow Isles" v-model="regions">
                <label>Shadow Isles</label>
                <input type="checkbox" value="Freljord" v-model="regions">
                <label>Freljord</label>
                <input type="checkbox" value="Ionia" v-model="regions">
                <label>Ionia</label>
                <input type="checkbox" value="Piltover & Zaun" v-model="regions">
                <label>Piltover And Zaun</label>
            </div>
            <div class='rarity'>
                <input type="checkbox" value="Common" v-model="rarity">
                <label>Common</label>
                <input type="checkbox" value="Rare" v-model="rarity">
                <label>Rare</label>
                <input type="checkbox" value="Epic" v-model="rarity">
                <label>Epic</label>
                <input type="checkbox" value="Champion" v-model="rarity">
                <label>Champion</label>
            </div>
            <div>
                <input type="checkbox" value="0" v-model="cost">
                <label>0</label>
                <input type="checkbox" value="1" v-model="cost">
                <label>1</label>
                <input type="checkbox" value="2" v-model="cost">
                <label>2</label>
                <input type="checkbox" value="3" v-model="cost">
                <label>3</label>
                <input type="checkbox" value="4" v-model="cost">
                <label>4</label>
                <input type="checkbox" value="5" v-model="cost">
                <label>5</label>
                <input type="checkbox" value="6" v-model="cost">
                <label>6</label>
                <input type="checkbox" value="7" v-model="cost">
                <label>7</label>
            </div>
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
                regions: ['Noxus', 'Demacia', 'Shadow Isles', 'Freljord', 'Ionia', 'Piltover & Zaun'],
                cost: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                attack: null,
                health: null,
                rarity: ['Common', 'Rare', 'Epic', 'Champion'],
                type: ['Spells', 'Units']
            }
        },
        methods: {
            specificCard(cardCode){
                router.push({ name: 'specificCard', params: { cardCode: cardCode } })
            },
            filteredByName(cards){
                return cards.filter((card) => {
                    return card.name.match(this.search)
                })
            },
            filteredByRegion(cards){
                if (!this.regions) return cards
                return cards.filter((card) => {
                    return this.regions.includes(card.region)
                })
            },
            filteredByCost(cards){
                if (!this.cost) return cards
                return cards.filter((card) => {
                    return this.cost.includes(card.cost)
                })
            },
            filteredByRarity(cards){
                if (!this.rarity) return cards
                return cards.filter((card) => {
                    return this.rarity.includes(card.rarity)
                })
            },
            filteredByAttack(cards){
                if (!this.attack) return cards
                return cards.filter((card) => {
                    return this.attack.includes(card.attack)
                })
            },
            filteredByHealth(cards){
                if (!this.health) return cards
                return cards.filter((card) => {
                    return this.health.includes(card.health)
                })
            }
        },
        computed: {
            filteredByAll(){
                return this.filteredByName(this.filteredByCost(this.filteredByRegion(this.filteredByRarity(this.filteredByAttack(this.filteredByHealth(this.cards))))))
            }
        },
        mounted() {
            console.log(this.cards)
            console.log(this.filteredByAll)
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
    .regions, .rarity {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
