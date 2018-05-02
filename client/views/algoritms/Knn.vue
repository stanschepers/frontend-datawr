<template>
    <p> {{ chosenColumns }} </p>
</template>

<script>
    export default {
        name: "knn",
        props: {
            myDataset: Object,
            columnTypes: Array,
            id: Number,
        },
        data() {
            return {
                chosenColumns: [ [...this.columnTypes.name]]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>