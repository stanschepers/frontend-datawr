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
                    <input class="input" v-model="lowerbound" v-on:change="checkIfFilledInOutlier" type="number" placeholder="standard deviation">
                </div>
                <div class="control">
                    <label class="label">Select upper bound</label>
                    <input class="input" v-model="upperbound" v-on:change="checkIfFilledInOutlier" type="number" placeholder="standard deviation">
                </div>

            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-danger" :disabled="this.nextIsVisible === false" v-on:click="removeOutliers">Remove outliers</button>
                </div>
            </div>

        </collapse-item>
    </collapse>
</template>

<script>

    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

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
                    console.log('normalize succesvol')
                })
                    .catch(function(){
                        console.log('normalize FAILURE!!');
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
                    console.log('normalize succesvol')
                })
                    .catch(function(){
                        console.log('normalize FAILURE!!');
                    });
            },

            checkIfFilledInOutlier() {
                if(this.lowerbound !== null && this.upperbound !== null && this.column !== null) this.nextIsVisible = true;

            }




        }
    }
</script>

<style scoped>

</style>