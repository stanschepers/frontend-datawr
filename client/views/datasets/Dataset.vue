<template>
    <div v-if="myDataset">
        <p> {{ myDataset.name }}</p>
        <p> {{ myDataset.description }}</p>
        <p> {{ myDataset.owner }}</p>

    </div>

</template>

<script>
    import DataCard from '../../components/data/dataCard'

    const api = '/API/datasets/'

    export default {
        name: 'dataset',
        components: {DataCard},
        data() {
           return {
               myDataset: null,
               id: this.$route.params.id
           }
        },
        created () {
            this.isloading = true
            this.$http.get( api + this.id + '/?format=json').then((response) => {
                this.myDataset = response.data
            }).catch((error) => {
                // openMessage({
                //     message: 'Something went wrong in getting the dataset',
                //     type: 'danger'
                // })
            })
        }
    }
</script>

<style scoped>

</style>