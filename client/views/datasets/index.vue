<template>
    <div>

    <div class="level is-mobile">
        <div class="level-left">
           <h5 All your datasets
        </div>
        <div class="level-right">
            <router-link to="/" class="button is-primary is-fullwidth"> <i class="fa fa-plus"></i> &nbsp; Add new dataset</router-link>
        </div>
    </div>
    <div class="columns is-multiline is-mobile">
        <div class="column is-full-mobile is-one-third-tablet is-one-third-desktop" v-for="item in items"
             v-if="item.name">
            <data-card :item="item"/>
        </div>
    </div>
    </div>
</template>

<script>
    import DataCard from '../../components/data/dataCard'

    const api = 'datasets/?format=json'

    export default {
        components: {DataCard},
        data() {
            return {
                items: null
            }
        },
        created() {
            this.$http.get(api).then((response) => {
                this.items = response.data
            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            })
        }
    }

    function getItems() {

    }
</script>
