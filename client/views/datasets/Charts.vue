<template>
    <nav class="level is-mobile">
        <div class="level-item has-text-centered" v-for="(entry, index) in chartdata">

            <div>

                <p class="heading">{{columntypes[index].name}}</p>
                <peity :type="'bar'" :data="chartdata[index][0].toString()" :options="{ 'fill': ['#3273DC'], width: 80, height:25}"></peity>

            </div>

        </div>
    </nav>
</template>

<script>

    import Plotly from 'plotly.js'
    import Peity from 'vue-peity'

    export default {
        name: "charts",
        components: {Peity},
        props: {
            columntypes: Array,
            setid: Number,
        },

        data() {
            return {

                chartdata: [],

            }
        },

        methods: {

            updateHistogram() {
                // plots
                this.$http.get('data/charts/' + '?dataset_id=' + this.setid).then((response) => {
                    this.chartdata = response.data;
                })
            },

        },

        created() {

            this.updateHistogram()


        }
    }

</script>

<style scoped>

</style>