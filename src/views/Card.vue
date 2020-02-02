<template>
    <div class="card-image">
        <img class='responsive-image' :src='"../assets/cards/" + cardCode + ".png"' alt="">
    </div>
</template>

<script>
    import cards from '../assets/json/set1-en_us.json'

    export default {
        data(){
            return {
                cards: cards,
                cardCode: this.$route.params.cardCode,
                card: null
            }
        },
        mounted(){
            let card = this.cards.find((card) => {
                return card.cardCode == this.cardCode
            })
            console.log(card)
        }
    }
</script>

<style scoped>
    .card-image {
        width: 240px;
        height: auto;
    }
</style>
