<template>
    <div>
        <h1>Card Search</h1>
        <div class="search-area">
            <div class="left-pill"><i class="fas fa-search"></i></div>
            <input type="text" placeholder="Search Card" v-model="search" @input="getCards(search)">
            <!-- <div class="right-pill"></div> -->
        </div>
        <div class="list">
            <ul>
                <li v-for="(card, index) in cardResults" :key="index" @mouseover="getCard(card._id)">
                    {{card.name}}
                </li>
            </ul>
        </div>
        <template v-if="viewingCard">
            <div class="cardview" style="background-size:401px;" :style="{'background': `url(${viewingCard.core_fallbackLinks[0]})`}">

            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
        }
    },
    methods: {
        getCards(filter) {
            this.$store.dispatch('getCards', filter);
        },
        getCard(id) {
            this.$store.dispatch('getCard', id);
        }
    },
    mounted() {
        this.getCards('');
    },
    computed: {
        cardResults() {
            console.log('Change!', this.$store.getters.cardResults);
            
            return this.$store.getters.cardResults;
        },
        viewingCard() {
            return this.$store.getters.viewingCard;
        }
    },
}
</script>

<style scoped>
    h1 {
        text-align: center;
        margin-top: 150px;
        font-weight: lighter;
        color: #ccc;
    }

    .search-area {
        width: 400px;
        margin: auto;
        background-color: aquamarine;
        display: flex;
        height: 60px;
        border-radius: 35px;
        border: 2px solid #dedede;
    }
    .left-pill{
        display: inline-block;
        background-color: white;
        width: 50px;
        text-align: center;
        height: 60px;
        line-height: 60px; 
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
        color: dodgerblue;
    }
    .search-area input{
        display: inline-block;
        flex: 1;
        background-color: white;
        border: none;
        outline: none;
        border-top-right-radius: 35px;
        border-bottom-right-radius: 35px;
    }

    .search-area input::placeholder{
        color: #dedede;
    }
    .list {
        margin-top: 50px;
    }
    .list ul{
        overflow-y: auto;
        height: 500px;
        width: 500px;
        margin: auto;
    }

    .list li{
        list-style-type: none;
        height: 60px;
        line-height: 60px;
        background-color: white;
        padding-left: 40px;
        margin-top: 10px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .cardview {
        background-color: black;
        position: fixed;
        right: 10px;
        top:10px;
        height: 558px;
        width: 400px;
        background-repeat: no-repeat;
        background-size: 401px auto !important;
        background-size: contain;
    }
    
</style>