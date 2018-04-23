<template>
    <collapse accordion>
        <collapse-item title="Change Attribute">


            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select column to change</label>
                        <span class="select">
                        <select v-model="column"  v-on:change="changedValue">
                            <option disabled>select...</option>
                            <option v-for="heading in columntypes" v-bind:value="heading">{{heading.name}}</option>
                        </select>
                        </span>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select attribute type</label>
                        <span class="select">
                        <select v-model="typeSelected">
                            <option v-for="type in possibleTypes" v-bind:value="type">{{type}}</option>
                        </select>
                        </span>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="block">
                    <button class="button is-info" v-on:click="updateAttribute">Update Attribute</button>
                </div>
            </div>



        </collapse-item>

        <collapse-item title="Remove attribute">

            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select column to delete</label>
                    </div>
                    <div class="select is-fullwidth">
                        <span class="select">
                        <select v-model="column">
                            <option disabled>select...</option>
                            <option v-for="heading in columntypes" v-bind:value="heading">{{heading.name}}</option>
                        </select>
                        </span>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="block">
                    <button class="button is-danger" v-on:click="deleteColumn">Delete Attribute</button>
                </div>
            </div>
        </collapse-item>
        <collapse-item title="Join operations">
            Joins can (at the moment) only be applied when uploading zip-files containing multiple datasets.
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
        name: "general",

        data() {
            return {
                numericalList: [],
                textList: [],

                column: {name: null, type: null},

                // Change Attribute
                typeSelected: null,
                possibleTypes: ['bigint', 'double precision', 'text', 'date', 'boolean'],

                // Remove Attribute


            }
        },

        computed: {

            integerColumns() {

                let list = [];

                for(const column2 of this.columntypes) {
                    if(column2.type === 'bigint' || column2.type === 'double precision'){
                        list.push(column2)
                        this.numericalList.push(column2);
                    }
                }
                return list;
            },
            changedValue() {
                this.typeSelected = this.column.type;

            },
        },

        methods: {


            updateAttribute() {
                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'cast');
                formData.append('column', this.column.name);
                formData.append('casttype', this.typeSelected);

                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    console.log('cast succesvol')
                })
                    .catch(function(){
                        console.log('cast FAILURE!!');
                    });
            },

            deleteColumn() {
                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'delete_column');
                formData.append('column', this.column.name);

                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    console.log('delete column succesvol')
                })
                    .catch(function(){
                        console.log('delete column FAILURE!!');
                    });
            },



        },





    }
</script>

<style scoped lang="scss">






</style>