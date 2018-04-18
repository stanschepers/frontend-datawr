<template>
    <collapse accordion>
        <collapse-item title="Change Attribute">


            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select column to change</label>
                        <span class="select">
                        <select v-model="changeAttribute">
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
                        <select v-model="typeSelected" v-on:change="changedValue">
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
                        <select>
                            <option>registration_id</option>
                            <option>client_id</option>
                            <option>checkin_time</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="block">
                    <button class="button is-danger">Delete Attribute</button>
                </div>
            </div>
        </collapse-item>
        <collapse-item title="Join operations">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
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

                // Change Attribute
                changeAttribute: {name: null, type: null},
                typeSelected: null,
                possibleTypes: ['bigint', 'double precision', 'text', 'date'],

                // Remove Attribute
                removeAttribute: {name: null, type: null},
                columntypescopy: this.columntypes,


            }
        },

        computed: {

            integerColumns() {

                let list = [];

                for(const column of this.columntypes) {
                    if(column.type === 'bigint' || column.type === 'double precision'){
                        list.push(column)
                        this.numericalList.push(column);

                    }
                }
                return list;
            },
            changedValue() {
                this.typeSelected = this.changeAttribute.type;

            },
        },

        methods: {


            updateAttribute() {





            },

        },





    }
</script>

<style scoped lang="scss">






</style>