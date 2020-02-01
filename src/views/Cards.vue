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

            <div class="regions-container">
                <div class='region' v-for='region in regions' @click='toggle(region)'>
                    <div class="region-image">
                        <img class='responsive-image' :class='{ inactive: !region.active }' :src='"../assets/regions/" + region.icon + ".png"' alt="">
                    </div>
                    <p>{{ region.name }}</p>
                </div>
            </div>

            <div class="rarity-container">
                <div class='rarity' v-for='rare in rarity' @click='toggle(rare)'>
                    <div :class='[{ inactive: !rare.active }, rare.name]'></div>
                    <p>{{ rare.name }}</p>
                </div>
            </div>

            <div class='types-container'>
                <div class="type" v-for='type in types' @click='toggle(type)'>
                    <svg v-if='type.name == "Unit"' height="24" width="24" viewBox="0 0 24 24" class="card-type-imagestyles__Image-xzyzdp-0 EzAkp card-type-selectorstyles__CardTypeImageStyled-hf9r3e-2 dDHzPQ"><path d="M19.218 3.429L12.167 2 5.115 3.429S6.878 10.07 3 17.07L10.051 22l.635-10s-4.02 2.286-3.455-4.286l4.936-1.428 4.936 1.428c.564 6.5-3.456 4.286-3.456 4.286l.635 10 7.051-4.929c-3.807-7-2.115-13.642-2.115-13.642z" fill="#a5a0bb" fill-rule="nonzero"></path></svg>
                    <svg v-else height="24" width="24" viewBox="0 0 24 24" class="card-type-imagestyles__Image-xzyzdp-0 EzAkp card-type-selectorstyles__CardTypeImageStyled-hf9r3e-2 dDHzPQ"><path d="M4.52 15.714s-.637-4.072 5.171-9.071c.284.357.638.714.992.928.991-.571 1.629-1.643 1.629-2.785 0-1.215-.638-2.215-1.63-2.786 2.126 0 5.596 3.143 5.596 8.142v.643c-.495-.357-1.204-.571-1.841-.571-1.558 0-2.975.857-3.683 2.143.779 1.285 2.125 2.142 3.683 2.142 1.558 0 3.116-1.071 3.754-2.5a5.85 5.85 0 011.204 2.5s.992 4.429-3.117 6.5c-4.108 2.071-8.074.286-8.074.286s3.895.071 4.958-3c0-.072-4.746.643-8.641-2.571z" fill="#a5a0bb" fill-rule="nonzero"></path></svg>
                    <p>{{ type.name }}</p>
                </div>
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
                collectibleCards: null,
                search: '',
                regions: [
                    { name: "Noxus", active: true, icon: 'noxus' },
                    { name: "Demacia", active: true, icon: 'demacia' },
                    { name: "Shadow Isles", active: true, icon: 'shadowisles' },
                    { name: "Freljord", active: true, icon: 'freljord' },
                    { name: "Ionia", active: true, icon: 'ionia' },
                    { name: "Piltover & Zaun", active: true, icon: 'piltoverzaun' },
                ],
                cost: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                attack: null,
                health: null,
                rarity: [
                    { name: 'Common', active: true },
                    { name: 'Rare', active: true },
                    { name: 'Epic', active: true },
                    { name: 'Champion', active: true },
                ],
                types: [
                    { name: 'Unit', active: true },
                    { name: 'Spell', active: true }
                ]
            }
        },
        methods: {
            specificCard(cardCode){
                router.push({ name: 'specificCard', params: { cardCode: cardCode } })
            },
            toggle(object){
                object.active = !object.active
            },
            sortedByCost(cards){
                return cards.sort((a, b) => a.cost - b.cost)
            },
            filteredByCollectible(cards){
                return cards.filter((card) => {
                    return card.collectible === true
                })
            },
            filteredByName(cards){
                return cards.filter((card) => {
                    let cardName = card.name.toLowerCase()
                    let search = this.search.toLowerCase()

                    return cardName.match(search)
                })
            },
            filteredByRegion(cards){
                if (!this.regions) return cards

                let activeRegions = this.regions.filter((region) => {
                    return region.active === true
                })

                let activeRegionsStrings = activeRegions.map((activeRegion) => {
                    return activeRegion.name
                })

                return cards.filter((card) => {
                    return activeRegionsStrings.includes(card.region)
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

                let activeRarity = this.rarity.filter((rarity) => {
                    return rarity.active === true
                })

                let activeRarityStrings = activeRarity.map((activeRarity) => {
                    return activeRarity.name
                })

                return cards.filter((card) => {
                    return activeRarityStrings.includes(card.rarity)
                })
            },
            filteredByType(cards){
                if (!this.types) return cards

                let activeTypes = this.types.filter((type) => {
                    return type.active === true
                })

                let activeTypesStrings = activeTypes.map((activeType) => {
                    return activeType.name
                })

                return cards.filter((card) => {
                    return activeTypesStrings.includes(card.type)
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
                return this.sortedByCost(this.filteredByCollectible(this.filteredByName(this.filteredByCost(this.filteredByRegion(this.filteredByRarity(this.filteredByType(this.filteredByAttack(this.filteredByHealth(this.cards)))))))))
            }
        },
        mounted() {
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
    .regions-container, .rarity-container, .types-container {
        margin-bottom: 40px;
    }
    .region, .rarity, .type {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
    }
    .region-image {
        margin-right: 10px;
        width: 30px;
        height: auto;
    }
    .inactive {
        filter: grayscale(100%);
    }
    .Champion, .Epic, .Rare, .Common {
        height: 20px;
        width: 20px;
        margin-right: 10px;
    }
    .Champion {
        background-color: #f7d74c;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }
    .Epic {
        background-color: #ef81ff;
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    }
    .Rare {
        background-color: #b2ffff;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
    .Common {
        background-color: #b2ff6c;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
</style>
