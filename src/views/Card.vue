<template>
    <div v-if='card' class="card wrapper">

        <div class="associated-cards">
            <div class="card-images">
                <!--<div v-for='card in associatedCards' class="card-image">
                    <img class='responsive-image' :src='"../assets/cards/" + card.cardCode + ".png"' alt="">
                    <img class='responsive-image' :src='"../assets/cards/" + associatedCards[0].cardCode + ".png"' alt="">
                </div>-->
                <div class="card-image">
                    <img class='responsive-image' :src='"../assets/cards/" + associatedCards[0].cardCode + ".png"' alt="">
                    <p>Artist: {{ card.artistName }}</p>
                </div>
            </div>
        </div>

        <div class="card-information">
            <p class='card-name'>{{ card.name }}</p>
            <div class='region-rarity-type-container'>

                <div class='region'>
                    <div class="region-image">
                        <img class='responsive-image' :src='"../assets/regions/" + card.regionRef + ".png"' alt="">
                    </div>
                    <p>{{ card.region }}</p>
                </div>

                <div class='rarity'>
                    <div class="rarity-image">
                        <img class='responsive-image' :src='"../assets/rarity/" + card.rarity + ".png"' alt="">
                    </div>
                    <p>{{ card.rarity }}</p>
                </div>

                <div class='type'>
                    <div class='type-image'>
                        <img class='responsive-image' :src='"../assets/types/" + card.type + ".png"' alt="">
                    </div>
                    <p>{{ card.type }}</p>
                </div>

            </div>

            <div class="description-container">
                <div class="separator">
                    <p class='separator-title'>Description</p>
                    <div class='separator-line'></div>
                </div>
                <p>{{ card.descriptionRaw }}</p>
            </div>



            <div class="level-up-container">
                <div class="separator">
                    <p class='separator-title'>Level Up</p>
                    <div class='separator-line'></div>
                </div>
                <p>{{ card.levelupDescriptionRaw }}</p>
            </div>

            <div class="flavor-text-container">
                <div class="separator">
                    <p class='separator-title'>Flavor Text</p>
                    <div class='separator-line'></div>
                </div>
                <p>{{ card.flavorText }}</p>
            </div>

            <div class="keywords-container">
                <div class="separator">
                    <p class='separator-title'>Keywords</p>
                    <div class='separator-line'></div>
                </div>
                <p v-for='keywords in card.keywords'>{{ keywords }}</p>
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

            console.log(this.card)

            let associatedCards = this.cards.filter((card) => {
                return this.card.associatedCardRefs.includes(card.cardCode)
            })

            this.associatedCards = [{...this.card}, ...associatedCards]
        }
    }
</script>

<style scoped>
    .card {
        display: flex;
        padding-top: 20px;
    }
    .card-information {
        padding-left: 20px;
    }
    .card-information, .associated-cards {
        flex: 1;
    }
    .card-name {
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 5px;
    }
    .card-images {
        display: flex;
    }
    .card-image {
        width: 250px;
        height: auto;
    }
    .region, .rarity, .type {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
    }
    .region-image, .rarity-image, .type-image {
        display: flex;
        margin-right: 10px;
        width: 25px;
        height: auto;
    }
    .region-rarity-type-container {
        display: flex;
    }
    .region-rarity-type-container, .description-container, .level-up-container, .flavor-text-container, .keywords-container {
        margin-bottom: 30px;
    }
    .separator {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .separator-title {
        font-weight: 500;
        flex: 0 0 100px;
    }
    .separator-line {
        flex-grow: 1;
        margin-left: 10px;
        height: 3px;
        width: 100%;
        background-color: #1b2d33;
    }
</style>
