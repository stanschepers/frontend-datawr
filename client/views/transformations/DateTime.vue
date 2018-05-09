<template>
    <collapse accordion>

        <collapse-item title="Extract">
            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select column to extract</label>
                        <span class="select">
                        <select v-model="column">
                            <option disabled>select...</option>
                            <option v-for="heading in columnsOfType()" v-bind:value="heading">{{heading.name}}</option>
                        </select>
                        </span>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">Select timepart</label>
                        <span class="select">
                        <select v-model="typeSelected">
                            <option v-for="type in possibleTypes" v-bind:value="type">{{type}}</option>
                        </select>
                        </span>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button" v-on:click="extract">Extract</button>
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
        name: "date-time",

        data() {
            return {

                column: {name: null, type: null},

                typeSelected: null,
                possibleTypes: ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'microsecond']



            }
        },

        methods: {

            columnsOfType() {
                let list = []
                for(const column2 of this.columntypes) {

                    if(column2.type === 'timestamp' || column2.type === 'date'){
                        list.push(column2)
                    }
                }
                return list;

            },

            extract() {
                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'date_extract');
                formData.append('column', this.column.name);
                formData.append('extract_type', this.typeSelected);

                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    openMessage({
                        message: 'Transformation succesful: ' + this.typeSelected + ' has been extracted.',
                        type: 'success'
                    });
                    this.$emit('update');
                })
                .catch(function(){
                    openMessage({
                        message: 'Transformation failed: ' + this.typeSelected + ' could not be extracted.',
                        type: 'danger'
                    });
                });
            },






        },
    }
</script>

<style scoped>

</style>