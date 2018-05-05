<template>
    <p> {{ numberColumnTypes }} </p>
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

        },
        computed: {
            numberColumnTypes(){
                return this.columnTypes.prototype.filter(function (obj) {
                    return obj.type === 'bigint' || obj.type === 'double precision'
                })
            }
        }
    }
</script>

<style scoped>

</style>