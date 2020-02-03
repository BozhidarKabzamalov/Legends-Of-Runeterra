<template>
    <div v-if='card' class="card wrapper">
        <p>{{ card.name }}</p>
        <p>{{ card.region }}</p>
        <p>{{ card.rarity }}</p>
        <p>{{ card.type }}</p>
        <p v-for='keywords in card.keywords'>{{ keywords }}</p>
        <p>Artist: {{ card.artistName }}</p>
        <p>{{ card.flavorText }}</p>
        <p>{{ card.cost }}</p>
        <p>{{ card.attack }}</p>
        <p>{{ card.health }}</p>
        
        <div class="rarity-image">
            <img class='responsive-image' :src='"../assets/rarity/" + card.rarity + ".png"' alt="">
        </div>

        <div class="card-images">
            <div v-for='card in associatedCards' class="card-image">
                <img class='responsive-image' :src='"../assets/cards/" + card.cardCode + ".png"' alt="">
            </div>
        </div>

    </div>
</template>

<script>
    import cards from '../assets/json/set1-en_us.json'

    export default {
        data(){
            return {
                cardCode: this.$route.params.cardCode,
                cards: cards,
                card: null,
                associatedCards: null
            }
        },
        mounted(){
            this.card = this.cards.find((card) => {
                return card.cardCode == this.cardCode
            })

            let associatedCards = this.cards.filter((card) => {
                return this.card.associatedCardRefs.includes(card.cardCode)
            })

            this.associatedCards = [{...this.card}, ...associatedCards]
        }
    }
</script>

<style scoped>
    .card-images {
        display: flex;
    }
    .card-image {
        width: 250px;
        height: auto;
    }
    .region-image, .rarity-image {
        margin-right: 10px;
        width: 30px;
        height: auto;
    }
</style>
