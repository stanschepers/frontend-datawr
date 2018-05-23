<template>
    <div>
    <nav class="level is-mobile" v-bind:class="{'is-hidden' : columnsOfType().length === 0}">

        <div class="level-left">
            <div class="level-item has-text-left">
                <div class="field">
                    <label class="label">numerical stats</label>
                    <div class="control">
                        <div class="select">
                            <select v-on:change="updateNumericalStats()" v-model="column1">
                                <option v-for="heading in columnsOfType()" v-bind:selected="heading === columnsOfType()[0]">{{heading.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="level-item has-text-centered">
                <div>

                    <p class="heading">Min</p>
                    <tooltip :label="min" placement="top" size="medium">
                    <p class="title">{{min  | maxLengthStat(min)}}</p>
                    </tooltip>

                </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Max</p>
                <tooltip :label="max" placement="top" size="medium">
                <p class="title">{{max | maxLengthStat(max)}}</p>
                </tooltip>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Median</p>
                <tooltip :label="median" placement="top" size="medium">
                <p class="title">{{median | maxLengthStat(median)}}</p>
                </tooltip>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Mean</p>
                <tooltip :label="mean" placement="top" size="medium">
                <p class="title">{{mean | maxLengthStat(mean)}}</p>
                </tooltip>
            </div>
        </div>
    </nav>
    <nav class="level" v-bind:class="{'is-hidden' : columnsOfType().length !== 0}">
        <div class="content has-text-centered">
            <p><i> There are no numerical columns in this dataset.</i></p>
        </div>
    </nav>
    <nav class="level is-mobile" v-bind:class="{'is-hidden' : columntypes.length === 0}">
        <div class="level-left">
            <div class="level-item has-text-left">
                <div class="field">
                    <label class="label">other stats</label>
                    <div class="control">
                        <div class="select">
                            <select v-on:change="updateStats()" v-model="column2">
                                <option v-for="heading in columntypes">{{heading.name}}</option>
                            </select>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Mode</p>
                <tooltip :label="mode" placement="top" size="medium">
                <p class="title">{{mode | maxLengthStat(mode) }}</p>
                </tooltip>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Empty values</p>
                <tooltip :label="amount_empty" placement="top" size="medium">
                <p class="title">{{amount_empty | maxLengthStat(amount_empty) }}</p>
                </tooltip>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">Nonempty values</p>
                <tooltip :label="amount_nonempty" placement="top" size="medium">
                <p class="title">{{amount_nonempty | maxLengthStat(amount_nonempty) }}</p>
                </tooltip>
            </div>
        </div>
    </nav>


    </div>
</template>

<script>

    import Tooltip from 'vue-bulma-tooltip'

    export default {
        name: "statistics",
        components: {
            Tooltip
        },
        props: {
            columntypes: Array,
            setid: Number,
        },
        data () {
            return {
                column1: {name: null, type: null},
                column1Test: null,

                max: null,
                min: null,
                mean: null,
                median: null,

                column2: {name: null, type: null},
                mode: null,
                amount_empty: null,
                amount_nonempty: null,





            }
        },



        methods: {

            update() {
                console.log("Yes, ik wordt geupdate in de stats! ");
                if (this.max != null) this.updateNumericalStats();
                if (this.mode != null) this.updateStats();
            },

            updateNumericalStats() {
                this.$http.get( 'data/stats/' + '?dataset_id=' + this.setid+ '&type=' + 'all_numerical_stats' + '&column=' + this.column1).then((response) => {
                    this.max = response.data['max']
                    this.min = response.data['min']
                    this.mean = response.data['mean']
                    this.median = response.data['median']

                }).catch((error) => {
                    this.error = true
                });
            },
            updateStats() {
                this.$http.get( 'data/stats/' + '?dataset_id=' + this.setid+ '&type=' + 'all_stats' + '&column=' + this.column2).then((response) => {
                    this.mode = response.data['mode']
                    this.amount_empty = response.data['amount_empty']
                    this.amount_nonempty = response.data['amount_nonempty']

                }).catch((error) => {
                    this.error = true
                });
            },

            columnsOfType() {
                let list = []
                for(const column of this.columntypes) {

                    if(column.type === 'bigint' || column.type === 'double precision'){
                        list.push(column)
                    }
                }
                return list;
            },



        },
        filters: {
            maxLengthStat(value){

                if (value === null || value.length <= 5) { return value }
                let truncated = value.substring(0, 5);
                truncated += '..';

                return truncated;

            }
        }
    }
</script>

<style scoped lang="scss">

    .tooltip {
        display: inherit;
    }

</style>