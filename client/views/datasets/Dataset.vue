<template>
    <div>
        <div v-if="myDataset">
            <div class="tile is-ancestor">
                <div class="tile is-parent is-4">
                    <article class="tile is-child box">
                        <div class="level is-mobile">
                            <div class="level-left">
                                <div class="level-item">
                                    <span class="title level-item">{{ myDataset.name }}</span>
                                </div>
                                <div class="level-item">
                                    <span class="subtitle level-item">{{ myDataset.owner }}</span>
                                </div>
                            </div>
                        </div>
                        <p>{{myDataset.description}}</p>
                        <hr/>
                        <div class="level is-mobile is-fixed-bottom">
                            <div class="level-left">
                                <div class="level-item">
                                    <a><i class="fa fa-heart"></i></a>
                                </div>
                                <div class="level-item">
                                    <a @click="showEdit = !showEdit"><i class="fa fa-gear"></i></a>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <!--<div class="select is-small">-->
                                        <!--<select v-model="quote">-->
                                            <!--<option value="'"> ' </option>-->
                                            <!--<option value='"'> " </option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                    <small> Delimiter: </small>
                                </div>
                                <div class="level-item">
                                    <div class="select is-small">
                                        <select v-model="delimiter">
                                            <option value=","> , </option>
                                            <option value="%3B"> ; </option>
                                            <option value="|"> | </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="level-item">
                                    <a :href="'https://api.datawr.ml/data/export/?dataset_id=' + id + '&sep=' + delimiter"><i class="fa fa-download"></i></a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-child box">

                    <statistics :columntypes="columnTypes" :setid="myDataset.id">

                    </statistics>

                </div>
            </div>
        </div>
        <div class="tile is-ancestor" v-if="showEdit">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <edit-table :dataset="myDataset" v-on:close="showEdit=false"> </edit-table>
                    </article>
                </div>
            </div>
            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <article class="tile is-child box animate slideInLeft">

                    <!--<best-table :columntypes="columnTypes" :setid="myDataset.id">

                    </best-table>-->

                    <vue-tables2 ref="vuetables2" :columntypes="columnTypes" :setid="myDataset.id" >


                    </vue-tables2>


                </article>
            </div>
        </div>


        <div class="tile is-ancestor">
            <div class="tile is-parent is-two-thirds">
                <article class="tile is-child box">

                    <column-transformations :columntypes="columnTypes" :setid="myDataset.id" v-on:update="updateParent">

                    </column-transformations>

                </article>
            </div>


            <div class="tile is-parent is-5 is-tablet">
                <article class="tile is-child box">

                    <history ref="historyref" :setid="myDataset.id">

                    </history>


                </article>
            </div>

        </div>


        <div class="tile is-ancestor">


            <div class="tile is-parent is-5">
            <article class="tile is-child box">
                <h4 class="title">Histogram</h4>
                <div class="field">
                    <div class="control">
                        <label class="label">Select column</label>
                        <div class="select">
                            <select v-on:change="updateHistogram()" v-model="histColumn">
                                <option v-for="heading in columnTypes" v-bind:value="heading">{{heading.name}}</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="is-size-6-mobile" id="hist"></div>

            </article>
            </div>

            <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">Heatmap</h4>

                <div class="field">
                    <div class="control">
                        <label class="label">Select label</label>
                        <div class="select">
                            <select v-on:change="checkIfFilledIn()" v-model="column_label">
                                <option v-for="heading in columnTypes" v-bind:value="heading">{{heading.name}}</option>
                            </select>

                        </div>
                    </div>
                </div>

                <div class="field is-horizontal is-grouped">

                    <div class="control">
                        <label class="label">Select longitude</label>
                        <div class="select">
                            <select v-on:change="checkIfFilledIn()" v-model="column_long">
                                <option v-for="heading in columnTypes" v-bind:value="heading">{{heading.name}}</option>
                            </select>

                        </div>
                    </div>
                    <div class="control">
                        <label class="label">Select latitude</label>
                        <div class="select">
                            <select v-on:change="checkIfFilledIn()" v-model="column_lat">
                                <option v-for="heading in columnTypes" v-bind:value="heading">{{heading.name}}</option>
                            </select>

                        </div>
                    </div>

                </div>
                <div class="is-size-6-mobile" id="heat"></div>

            </article>
            </div>
        </div>
    </div>
    <div v-if="error">
        <p class="has-text-danger">
            There went something wrong getting your dataset.
        </p>
    </div>
</div>

</template>

<script>
    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
    import ColumnTransformations  from '../tables/ColumnTransformations'
    import Statistics from './Statistics'
    import History from '../tables/History'
    import Plotly from 'plotly.js'

    import VueTables2 from '../tables/VueTable'
    import editTable from '../../components/tables/editTable'

    const api = 'data/'

    export default {
        name: 'dataset',
        components: {
            History,
            ColumnTransformations, Collapse, CollapseItem, Statistics, VueTables2, editTable},
        data () {
            return {

                showEdit: false,
                myDataset: null,
                max: null,
                columnTypes: [],
                id: this.$route.params.id,

                error: false,

                //histogram
                histColumn: null,
                histdata: [],

                //heatmap
                column_long: null,
                column_lat: null,
                column_label: null,
                heatdata: [],
                heatlayout: [],

                //download
                quote: '"',
                delimiter: ','

            }
        },

        computed: {

        },

        methods: {
            updateHistogram() {
                // plots
                this.$http.get('data/histogram/' + '?dataset_id=' + this.id + '&column=' + this.histColumn.name).then((response) => {
                    this.histdata.push(response.data);
                    let layout = {
                        autosize: true,
                        //width: 500,
                        //height: 500,
                        margin: {
                            l: 20,
                            r: 10,
                            b: 100,
                            t: 50,
                            pad: 5
                        },

                    };
                    Plotly.newPlot('hist', response.data, layout, {staticPlot: false});
                })

            },

            updateHeatmap() {

                this.$http.get('data/heatmap/' + '?dataset_id=' + this.id + '&column_long=' + this.column_long.name + '&column_lat=' + this.column_lat.name + '&column_label=' + this.column_label.name).then((response) => {
                    this.heatdata.push(response.data[0]);
                    this.heatlayout.push(response.data[1]);
                    let layout = {
                        autosize: true,
                        //width: 500,
                        //height: 500
                        // ,
                        margin: {
                            l: 20,
                            r: 10,
                            b: 100,
                            t: 50,
                            pad: 5
                        },
                    };

                    Plotly.newPlot('heat', response.data[0], response.data[1], {staticPlot: false});

                })
            },

            checkIfFilledIn() {

                if (this.column_long !== null && this.column_lat != null && this.column_label !== null) this.updateHeatmap();

            },

            updateParent() {

                this.$http.get('data/types/' + '?dataset_id=' + this.id).then((response) => {
                    this.columnTypes = response.data;

                }).catch((error) => {
                    window.alert("Something went wrong with getting the datasets")
                });

                this.$refs['vuetables2'].update()
                this.$refs['historyref'].update()

            }


        },


        created() {
            this.isloading = true
            this.$http.get(api + '?dataset_id=' + this.id).then((response) => {
                this.myDataset = response.data;
            }).catch((error) => {
                this.error = true
            });

            this.$http.get('data/types/' + '?dataset_id=' + this.id).then((response) => {
                this.columnTypes = response.data;

            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            });

        }

    }

</script>

<style scoped lang="scss">
    @import "~cool-checkboxes-for-bulma.io";

    .tile {
        overflow-x: scroll;

    }

</style>
