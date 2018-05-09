<template>
    <collapse accordion>
        <collapse-item title="Normalise">
            <div class="block">
                Normalise numerical columns between 0 and 1.

                <div class="field">
                    <div class="control is-grouped">
                        <div class="control-label">
                            <label class="label">Select column to change</label>
                            <span class="select">
                                <select v-model="column">
                                    <option v-for="heading in columnsOfType()" v-bind:value="heading">{{heading.name}}</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button" v-on:click="normalise">Normalise</button>
                    </div>
                </div>

              <!--  <div class="control is-horizontal">
                    <div class="control-label">
                        <label class="label">Standard deviation</label>
                    </div>
                    <div class="control is-grouped">
                        <p class="control is-expanded">
                            <input class="input" type="number" placeholder="standard deviation">
                        </p>
                    </div>
                </div>

-->
            </div>
        </collapse-item>

        <collapse-item title="Discretise">
            There's a histogram at the bottom of the page, have a look!
        </collapse-item>

        <collapse-item title="Remove outliers">
            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select column to change</label>
                        <span class="select">
                                <select v-model="column">
                                    <option v-for="heading in columnsOfType()" v-bind:value="heading">{{heading.name}}</option>
                                </select>
                            </span>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal is-grouped">
                <div class="control">
                    <label class="label">Select lower bound</label>
                    <input class="input" v-model="lowerbound" v-on:change="checkIfFilledInOutlier" type="number" placeholder="lower bound..">
                </div>
                <div class="control">
                    <label class="label">Select upper bound</label>
                    <input class="input" v-model="upperbound" v-on:change="checkIfFilledInOutlier" type="number" placeholder="upper bound..">
                </div>

            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-danger" :disabled="this.nextIsVisible === false" v-on:click="removeOutliers">Remove outliers</button>
                </div>
            </div>

        </collapse-item>

        <collapse-item title="Fill">
            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select column to fill</label>
                        <span class="select">
                                <select v-model="column">
                                    <option v-for="heading in columnsOfType()" v-bind:value="heading">{{heading.name}}</option>
                                </select>
                            </span>
                    </div>
                </div>
            </div>

            <div class="field has-addons">
                <p class="control">
                    <a class="button" v-on:click="type = 'min'" v-bind:class="{'is-primary' : type === 'min'}">
                        <span>Min</span>
                    </a>
                </p>

                <p class="control">
                    <a class="button" v-on:click="type = 'max'" v-bind:class="{'is-primary' : type === 'max'}">
                        <span>Max</span>
                    </a>
                </p>

                <p class="control">
                    <a class="button" v-on:click="type = 'median'" v-bind:class="{'is-primary' : type === 'median'}">
                        <span>Median</span>
                    </a>
                </p>

                <p class="control">
                    <a class="button" v-on:click="type = 'mean'" v-bind:class="{'is-primary' : type === 'mean'}">
                        <span>Mean</span>
                    </a>
                </p>
            </div>

            <div class="field">

            </div>

            <div class="field">
                <div class="control">
                    <button class="button" v-on:click="fill">Fill</button>
                </div>
            </div>

        </collapse-item>
    </collapse>
</template>

<script>

    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
    import {openMessage} from "../../utils";


    export default {
        components: {CollapseItem, Collapse},
        props: {
            columntypes: Array,
            setid: Number,
        },
        name: "numerical",

        data() {
            return {
                numericalList: [],
                textList: [],

                column: {name: null, type: null},

                //Remove Outliers
                nextIsVisible: false,
                lowerbound: null,
                upperbound: null,

                //Fill
                type: null,
                replace: null,


            }
        },

        methods: {

            columnsOfType() {
                let list = []
                for(const column2 of this.columntypes) {

                    if(column2.type === 'bigint' || column2.type === 'double precision'){
                        list.push(column2)
                    }
                }
                return list;
            },

            normalise() {
                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'normalize');
                formData.append('column', this.column.name);

                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    openMessage({
                        message: 'Transformation succesful: the column ' + this.column.name + 'has been normalized',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function(){
                        openMessage({
                            message: 'Transformation failed: the column ' + this.column.name + 'could not be normalized',
                            type: 'danger'
                        });
                    });
            },

            removeOutliers() {
                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'cull');
                formData.append('column', this.column.name);
                formData.append('lower', this.lowerbound);
                formData.append('upper', this.upperbound);


                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    openMessage({
                        message: 'Transformation succesful: XXX outliers have been removed',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function(){
                        openMessage({
                            message: 'Transformation failed: there went something wrong parsing the values',
                            type: 'danger'
                        });
                    });
            },

            checkIfFilledInOutlier() {
                if(this.lowerbound !== null && this.upperbound !== null && this.column !== null) this.nextIsVisible = true;

            },


            fill() {
                // Calculate stats
                this.$http.get( 'data/stats/' + '?dataset_id=' + this.setid+ '&type=' + this.type + '&column=' + this.column.name).then((response) => {
                    this.replace = response.data


                }).catch((error) => {
                    this.error = true
                });


                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'fill');
                formData.append('column', this.column.name);
                formData.append('replace', this.replace);


                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    openMessage({
                        message: 'Transformation succesful: XXX values in column' + this.column.name + 'have been filled',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function(){
                        openMessage({
                            message: 'Transformation failed: the empty values of column' + this.column.name + 'could not be filled',
                            type: 'success'
                        });
                    });




            },




        }
    }
</script>

<style scoped>

</style>