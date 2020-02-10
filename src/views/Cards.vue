<template>
    <div class="cards">

        <div class="filters">

            <div class="separator">
                <p class='separator-title'>Search</p>
                <div class='separator-line'></div>
            </div>

            <div class="search-container">
                <input class='search' v-model="search" type="text" placeholder="Search...">
            </div>

            <div class="separator">
                <p class='separator-title'>Regions</p>
                <div class='separator-line'></div>
            </div>

            <div class="regions-container">
                <div class='region' v-for='region in regions' @click='toggle(regions, region)'>
                    <div class="region-image">
                        <img class='responsive-image' :class='{ inactive: !region.active }' :src='"../assets/regions/" + region.icon + ".png"' alt="">
                    </div>
                    <p>{{ region.name }}</p>
                </div>
            </div>

            <div class="separator">
                <p class='separator-title'>Rarity</p>
                <div class='separator-line'></div>
            </div>

            <div class="rarity-container">
                <div class='rarity' v-for='rare in rarity' @click='toggle(rarity, rare)'>
                    <div class="region-image">
                        <img class='responsive-image' :class='{ inactive: !rare.active }' :src='"../assets/rarity/" + rare.name + ".png"' alt="">
                    </div>
                    <div :class='[{ inactive: !rare.active }, rare.name]'></div>
                    <p>{{ rare.name }}</p>
                </div>
            </div>

            <div class="separator">
                <p class='separator-title'>Type</p>
                <div class='separator-line'></div>
            </div>

            <div class='types-container'>
                <div class="type" v-for='type in types' @click='toggle(types, type)'>
                    <svg v-if='type.name == "Unit"' height="24" width="24" viewBox="0 0 24 24" class="svg card-type-imagestyles__Image-xzyzdp-0 EzAkp card-type-selectorstyles__CardTypeImageStyled-hf9r3e-2 dDHzPQ"><path d="M19.218 3.429L12.167 2 5.115 3.429S6.878 10.07 3 17.07L10.051 22l.635-10s-4.02 2.286-3.455-4.286l4.936-1.428 4.936 1.428c.564 6.5-3.456 4.286-3.456 4.286l.635 10 7.051-4.929c-3.807-7-2.115-13.642-2.115-13.642z" fill="#a5a0bb" fill-rule="nonzero"></path></svg>
                    <svg v-else height="24" width="24" viewBox="0 0 24 24" class="svg card-type-imagestyles__Image-xzyzdp-0 EzAkp card-type-selectorstyles__CardTypeImageStyled-hf9r3e-2 dDHzPQ"><path d="M4.52 15.714s-.637-4.072 5.171-9.071c.284.357.638.714.992.928.991-.571 1.629-1.643 1.629-2.785 0-1.215-.638-2.215-1.63-2.786 2.126 0 5.596 3.143 5.596 8.142v.643c-.495-.357-1.204-.571-1.841-.571-1.558 0-2.975.857-3.683 2.143.779 1.285 2.125 2.142 3.683 2.142 1.558 0 3.116-1.071 3.754-2.5a5.85 5.85 0 011.204 2.5s.992 4.429-3.117 6.5c-4.108 2.071-8.074.286-8.074.286s3.895.071 4.958-3c0-.072-4.746.643-8.641-2.571z" fill="#a5a0bb" fill-rule="nonzero"></path></svg>
                    <p>{{ type.name }}s</p>
                </div>
            </div>

            <div class="separator">
                <p class='separator-title'>Cost</p>
                <div class='separator-line'></div>
            </div>

            <div class="costs-container">
                <div v-for='cost in costs' @click='toggle(costs, cost)'>
                    <div :class="[{ inactiveCircle: !cost.active }, 'cost']">
                        <p v-if='cost.cost === 7'>{{ cost.cost }}+</p>
                        <p v-else>{{ cost.cost }}</p>
                    </div>
                </div>
            </div>

            <div class="separator">
                <p class='separator-title'>Attack</p>
                <div class='separator-line'></div>
            </div>

            <div class="costs-container">
                <div v-for='attack in attackValues' @click='toggle(attackValues, attack)'>
                    <div :class="[{ inactiveCircle: !attack.active }, 'cost']">
                        <p v-if='attack.attack === 7'>{{ attack.attack }}+</p>
                        <p v-else>{{ attack.attack }}</p>
                    </div>
                </div>
            </div>

            <div class="separator">
                <p class='separator-title'>Health</p>
                <div class='separator-line'></div>
            </div>

            <div class="costs-container">
                <div v-for='health in healthValues' @click='toggle(healthValues, health)'>
                    <div :class="[{ inactiveCircle: !health.active }, 'cost']">
                        <p v-if='health.health === 7'>{{ health.health }}+</p>
                        <p v-else>{{ health.health }}</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="cards-list">
            <div class="card" v-for='card in filteredByAll' @click='specificCard(card.cardCode)'>
                <div class="card-image">
                    <img class='responsive-image' :src='"../assets/cards/" + card.cardCode + ".png"' alt="">
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import cards from '../assets/json/set1-en_us.json'
    import router from '../router'

    export default {
        data() {
            return {
                cards: cards,
                collectibleCards: null,
                search: '',
                regions: [
                    { name: "Noxus", active: true, icon: 'Noxus' },
                    { name: "Demacia", active: true, icon: 'Demacia' },
                    { name: "Shadow Isles", active: true, icon: 'ShadowIsles' },
                    { name: "Freljord", active: true, icon: 'Freljord' },
                    { name: "Ionia", active: true, icon: 'Ionia' },
                    { name: "Piltover & Zaun", active: true, icon: 'PiltoverZaun' },
                ],
                costs: [
                    { cost: 0, active: true },
                    { cost: 1, active: true },
                    { cost: 2, active: true },
                    { cost: 3, active: true },
                    { cost: 4, active: true },
                    { cost: 5, active: true },
                    { cost: 6, active: true },
                    { cost: 7, active: true },
                ],
                attackValues: [
                    { attack: 0, active: true },
                    { attack: 1, active: true },
                    { attack: 2, active: true },
                    { attack: 3, active: true },
                    { attack: 4, active: true },
                    { attack: 5, active: true },
                    { attack: 6, active: true },
                    { attack: 7, active: true }
                ],
                healthValues: [
                    { health: 0, active: true },
                    { health: 1, active: true },
                    { health: 2, active: true },
                    { health: 3, active: true },
                    { health: 4, active: true },
                    { health: 5, active: true },
                    { health: 6, active: true },
                    { health: 7, active: true }
                ],
                rarity: [
                    { name: 'Champion', active: true },
                    { name: 'Epic', active: true },
                    { name: 'Rare', active: true },
                    { name: 'Common', active: true },
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
            toggle(filterType, object){
                let areAllFiltersActive = filterType.every(type => type.active)

                if (areAllFiltersActive) {
                    for (var i = 0; i < filterType.length; i++) {
                        filterType[i].active = false
                    }
                }

                object.active = !object.active
            },
            sortedByCost(cards){

                cards.sort((a, b) => {
                    if (a.cost > b.cost) return 1;
                    if (a.cost < b.cost) return -1;

                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                })

                return cards.sort((a, b) => {
                    return a.cost - b.cost
                })
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
                if (!this.costs) return cards

                let activeCosts = this.costs.filter((cost) => {
                    return cost.active === true
                })

                let activeCostsStrings = activeCosts.map((activeCost) => {
                    return activeCost.cost
                })

                let includesSevenCost = activeCostsStrings.includes(7)

                return cards.filter((card) => {
                    return activeCostsStrings.includes(card.cost) || (card.cost > 7 && includesSevenCost)
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
                if (!this.attackValues) return cards

                let activeAttacks = this.attackValues.filter((attack) => {
                    return attack.active === true
                })

                let activeAttacksStrings = activeAttacks.map((activeAttack) => {
                    return activeAttack.attack
                })

                let includesSevenAttack = activeAttacksStrings.includes(7)

                return cards.filter((card) => {
                    return activeAttacksStrings.includes(card.attack) || (card.attack > 7 && includesSevenAttack)
                })
            },
            filteredByHealth(cards){
                if (!this.healthValues) return cards

                let activeHealth = this.healthValues.filter((health) => {
                    return health.active === true
                })

                let activeHealthStrings = activeHealth.map((activeHealth) => {
                    return activeHealth.health
                })

                let includesSevenHealth = activeHealthStrings.includes(7)

                return cards.filter((card) => {
                    return activeHealthStrings.includes(card.health) || (card.health > 7 && includesSevenHealth)
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
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
        align-content: flex-start;
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
        flex: 0 0 300px;
        background-color: #0c1c25;
        padding: 20px 10px 20px 10px;
        border-right: 3px solid #1b2d33;
    }
    .search {
        border: 1px solid #ffffff;
        padding: 4px 15px;
        background-color: #ffffff;
        color: #606060;
        outline: none;
    }
    ::placeholder {
        color: #757575;
        opacity: 1;
    }
    .regions-container, .rarity-container, .types-container, .search-container, .costs-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }
    .region, .rarity, .type {
        font-weight: 500;
        font-size: 14px;
        width: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .cost {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: #0d202b;
        border: 3px solid #1b2d33;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .inactiveCircle {

    }
    .region:nth-last-child(-n+2), .rarity:nth-last-child(-n+2), .type:nth-last-child(-n+2) {
        margin-bottom: 0px;
    }
    .svg {
        margin-right: 10px;
    }
    .region-image {
        margin-right: 10px;
        width: 30px;
        height: auto;
    }
    .inactive {
        filter: grayscale(100%);
    }
    .separator {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .separator-title {
        font-weight: 500;
    }
    .separator-line {
        margin-left: 10px;
        height: 3px;
        width: 100%;
        background-color: #1b2d33;
    }
</style>
