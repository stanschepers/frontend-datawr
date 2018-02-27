<template>
    <div class="columns is-multiline is-mobile">

        <div class="column is-full-mobile is-one-third-tablet is-one-third-desktop" v-for="item in items"
             v-if="item.name">
            <data-card :item="item"/>
        </div>

    </div>
</template>

<script>
    import DataCard from '../../components/data/dataCard'

    const api = '/API/datasets/?format=json'

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
