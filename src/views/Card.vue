<template>
    <div v-if='card' class="card card-wrapper">

        <div class="card-header">
            <p class='card-name'>{{ activeCard.name }}</p>
            <div class='region-rarity-type-container'>
                <div class='region'>
                    <div class="region-image">
                        <img class='responsive-image' :src='"../assets/regions/" + activeCard.regionRef + ".webp"' :alt="activeCard.region">
                    </div>
                    <p class='card-region' :class='activeCard.regionRef'>{{ activeCard.region }}</p>
                </div>
                <div class='type'>
                    <div class='type-image'>
                        <img class='responsive-image' :src='"../assets/types/" + activeCard.type + ".webp"' :alt="activeCard.type">
                    </div>
                    <p class='card-type'>{{ activeCard.type }}</p>
                </div>
                <div class='rarity' v-if='activeCard.rarity != "None"'>
                    <div class="rarity-image">
                        <img class='responsive-image' :src='"../assets/rarity/" + activeCard.rarity + ".webp"' :alt="activeCard.rarity">
                    </div>
                    <p class='card-rarity' :class='activeCard.rarity'>{{ activeCard.rarity }}</p>
                </div>
                <div class="collectible" v-else>
                    <p class='card-collectible'>Not Collectible</p>
                </div>
            </div>
        </div>

        <div class="card-body">

            <div class="associated-cards">
                <div class="card-images">
                    <div class='card-image-container' v-for='(card, index) in associatedCards' :style="{ zIndex: zIndex(index)}" :class='{ active: index == activeCardIndex }'>
                        <div class="card-image" :style="{ transform: translateX(index), visibility: hidden(index)}" @click='makeCardActive(index)'>
                            <img class='responsive-image' :src='"../assets/cards/webp/" + card.cardCode + ".webp"' :alt="card.name">
                        </div>
                    </div>
                </div>
                <div class="dots-container">
                    <div class="dot" :class='{ activeDot: index == activeCardIndex }' v-for='(card, index) in associatedCards' @click='makeCardActive(index)'></div>
                </div>
            </div>

            <div class="card-information">
                <div class="description-container" v-if='activeCard.descriptionRaw'>
                    <div class="separator">
                        <p class='separator-title'>Description</p>
                        <div class='separator-line'></div>
                    </div>
                    <p>{{ activeCard.descriptionRaw }}</p>
                </div>
                <div class="level-up-container" v-if='activeCard.levelupDescriptionRaw > 0'>
                    <div class="separator">
                        <p class='separator-title'>Level Up</p>
                        <div class='separator-line'></div>
                    </div>
                    <p>{{ activeCard.levelupDescriptionRaw }}</p>
                </div>
                <div class="flavor-text-container">
                    <div class="separator">
                        <p class='separator-title'>Flavor Text</p>
                        <div class='separator-line'></div>
                    </div>
                    <p><i>{{ activeCard.flavorText }}</i></p>
                </div>
                <div class="keywords-container" v-if='activeCard.keywords.length > 0'>
                    <div class="separator">
                        <p class='separator-title'>Keywords</p>
                        <div class='separator-line'></div>
                    </div>
                    <div class="keywords-list">
                        <p class='keyword' v-for='keywords in activeCard.keywords'>{{ keywords }}</p>
                    </div>
                </div>
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
                associatedCards: null,
                activeCardIndex: 0
            }
        },
        methods: {
            makeCardActive(index){
                this.activeCardIndex = index
            },
            translateX(index) {
                let scale
                let pixels = 120 * index - this.activeCardIndex*120

                if (index === this.activeCardIndex) {
                    scale = 1
                } else {
                    scale = 0.75
                }

                return "translateX(" + pixels + "px) scale(" + scale + ")"
            },
            zIndex(index){
                if (index == this.activeCardIndex) {
                    return '3'
                } else if (index > this.activeCardIndex + 1 || index < this.activeCardIndex - 1) {
                    return '1'
                } else {
                    return '2'
                }
            },
            hidden(index) {
                if (index > this.activeCardIndex + 1 || index < this.activeCardIndex - 1) {
                    return 'hidden'
                } else {
                    return 'visible'
                }
            }
        },
        computed: {
            activeCard(){
                return this.associatedCards[this.activeCardIndex]
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

            console.log(this.associatedCards)
        }
    }
</script>

<style scoped>
    .card {
        padding-top: 20px;
    }
    .card-wrapper {
        width: 50%;
        margin: 0 auto;
    }
    .card-header {
        border-bottom: 3px solid #1b2d33;
        padding-bottom: 30px;
        margin-bottom: 30px;
    }
    .card-body {
        display: flex;
    }
    .card-information {
        padding-left: 20px;
    }
    .card-information, .associated-cards {
        flex: 1;
    }
    .card-information {
        padding-top: 9px;
    }
    .card-name {
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 5px;
    }
    .card-images {
        display: flex;
        min-height: 361px;
        position: relative;
        justify-content: center;
    }
    .card-image-container {
        position: absolute;
        cursor: pointer;
        opacity: 0.75;
        transition: all .3s linear;
    }
    .card-image {
        width: 240px;
        transition: all .3s linear;
    }
    .active {
        opacity: 1;
    }
    .region, .rarity, .type, .collectible {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
    }
    .region-image, .rarity-image, .type-image {
        display: flex;
        margin-right: 10px;
        width: 30px;
        height: auto;
    }
    .region-rarity-type-container {
        display: flex;
    }
    .description-container, .level-up-container, .flavor-text-container, .keywords-container {
        margin-bottom: 30px;
    }
    .keyword {
        margin-bottom: 10px;
    }
    .separator {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .separator-title {
        font-weight: 700;
        font-size: 20px;
        flex: 0 0 100px;
    }
    .separator-line {
        flex-grow: 1;
        margin-left: 10px;
        height: 3px;
        width: 100%;
        background-color: #1b2d33;
    }
    .card-region, .card-rarity, .card-type, .card-collectible {
        font-weight: 700;
    }
    .dots-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
    }
    .dot {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background-color: #d3d3d3;
        margin-right: 10px;
        cursor: pointer;
    }
    .dot:last-child {
        margin-right: 0px;
    }
    .activeDot {
        background-color: #5bacd1;
    }
</style>
