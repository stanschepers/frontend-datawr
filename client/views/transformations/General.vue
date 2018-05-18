<template>
    <collapse accordion>

        <collapse-item title="Remove rows">


            <div class="field is-horizontal is-grouped is-mobile">
                <div class="field-body">
                    <div class="field">
                        <p class="select is-narrow">
                        <select v-model="expression.column">
                            <option disabled>select...</option>
                            <option v-for="heading in columntypes" v-bind:value="heading">{{heading.name}}</option>
                        </select>
                        </p>
                    </div>

                    <div class="field">
                        <p class="select is-narrow">
                        <select v-model="expression.operator">
                            <option disabled>select...</option>
                            <option v-for="heading2 in operators" v-bind:value="heading2">{{heading2.value}}</option>
                        </select>
                        </p>
                    </div>

                    <div class="field">
                        <input class="input" v-model="expression.value" placeholder="values to find">
                    </div>

                    <div class="field">
                        <a class="button is-primary is-rounded" v-on:click="addExpression">
                            <span>add </span>
                            <span class="icon">
                                <i class="fa fa-heading fa-plus"></i>
                            </span>
                        </a>
                     </div>

                </div>


            </div>

            <div class="content">

                <h3>Expression:</h3>

                <span v-for="(expr, index) in expressions">
                    {{expr.column.name}} <b>{{expr.operator.value}}</b> {{expr.value}}
                    <span v-if="index < expressions.length - 1">
                        <select class="select is-small" v-model="expr.finalop">
                            <option  v-bind:value="'AND'">AND</option>
                            <option v-bind:value="'OR'">OR</option>
                        </select>
                    </span>

                </span>

            </div>

            <div class="field">
                <div class="block">
                    <button class="button is-danger" v-on:click="executeExpression" v-if="expressions.length > 0">Delete rows</button>
                </div>
            </div>



        </collapse-item>


        <collapse-item title="Change column type">

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

        <collapse-item title="Remove column">

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
            Joins can (currently) only be applied when uploading zip-files containing multiple datasets.
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
        name: "general",

        data() {
            return {
                numericalList: [],
                textList: [],

                // remove row
            operators: [
                {
                    key: 'EQ',
                    value: '='
                },
                {
                    key: 'NE',
                    value: '<>'
                },
                {
                    key: 'GT',
                    value: '>'
                },
                {
                    key: 'GE',
                    value: '>='
                },
                {
                    key: 'LT',
                    value: '<'
                },
                {
                    key: 'LE',
                    value: '<='
                }],


                expression: {column: null, operator: null, value: null, finalop: 'AND'},
                expressions: [],

                column: {name: null, type: null},

                // Change Attribute
                typeSelected: null,
                possibleTypes: ['bigint', 'double precision', 'text', 'timestamp', 'date', 'boolean'],

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

            addExpression() {

              if (this.expression.column != null
              && this.expression.operator != null
              && this.expression.value != null) {

                  let newexpr = JSON.parse( JSON.stringify( this.expression ));

                  this.expressions.push(newexpr);

                  this.expression.column = null;
                  this.expression.operator = null;
                  this.expression.value = null;

              }

            },

            executeExpression() {

                let final = [];

                for (let i = 0; i < this.expressions.length; i++) {
                    final.push([this.expressions[i].column.name, this.expressions[i].operator.key, this.expressions[i].value])
                    final.push(this.expressions[i].finalop)
                }

                final.pop();


                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'delete_row');
                formData.append('column', this.column.name);
                formData.append('expression', JSON.stringify(final));


                this.$http.post('/data/transform/', formData, {headers: { 'Content-Type': 'text/plain' }}

                ).then(response => {
                    openMessage({
                        message: 'Transformation succesful: XXX rows have been deleted',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function(){
                        openMessage({
                            message: 'The expression could not be executed',
                            type: 'danger'
                        });
                    });

                return final;



            },

            updateAttribute() {
                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('type', 'cast');
                formData.append('column', this.column.name);
                formData.append('casttype', this.typeSelected);

                this.$http.post('/data/transform/',
                    formData,

                ).then(response => {
                    openMessage({
                        message: 'Attribute change succesful',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function(){
                        openMessage({
                            message: 'The attribute could not be changed',
                            type: 'danger'
                        })
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
                    openMessage({
                        message: 'Transformation succesful: the column ' + this.column.name + 'has been deleted',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function(){
                        openMessage({
                            message: 'Transformation failed: the column ' + this.column.name + 'could not be deleted',
                            type: 'danger'
                        });
                    });
            },



        },





    }
</script>

<style scoped lang="scss">






</style>