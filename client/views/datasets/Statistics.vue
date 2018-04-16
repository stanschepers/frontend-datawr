<template>
    <nav class="level ">
        <div class="level-item has-text-left">
            <div class="select">
                <label>
                <select v-on:change="updateStats()" v-model="column1">
                    <option v-for="heading in columntypes">{{heading.name}}</option>
                </select>
                </label>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Min</p>
                <p class="title">{{min}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Max</p>
                <p class="title">{{max}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Median</p>
                <p class="title">{{median}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Mean</p>
                <p class="title">{{mean}}</p>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "statistics",
        props: {
            columntypes: Array,
            setid: Number,
        },
        data () {
            return {
                column1: {name: null, type: null},

                max: null,
                min: null,
                mean: null,
                median: null,



            }
        },

        methods: {

            updateStats() {
                console.log(this.column1.type)
                this.$http.get( 'data/stats/' + '?dataset_id=' + this.setid+ '&type=' + 'all' + '&column=' + this.column1).then((response) => {
                    console.log(response.data);
                    this.max = response.data['max']
                    this.min = response.data['min']
                    this.mean = response.data['mean']
                    this.median = response.data['median']



                }).catch((error) => {
                    this.error = true
                });
            }



        }
    }
</script>

<style scoped>

</style>