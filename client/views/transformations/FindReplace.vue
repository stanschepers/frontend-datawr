<template>
    <div>
        <div class="content">
            <p class="is-italic">
                When entering regex strings, use the correct syntax (see https://www.debuggex.com/cheatsheet/regex/python)
            </p>
        </div>
        <div class="field">
            <div class="control is-grouped">
                <div class="control-label">
                    <label class="label">Select in which column you want to replace</label>
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
            <p class="control">
                <input class="input" type="text" v-model="to_find"  placeholder="Find">
            </p>
        </div>

        <div class="field">
            <p class="control">
                <input class="input" type="text" v-model="to_replace"  placeholder="Replace by">
            </p>
        </div>

        <div class="field">
            <div class="control">

                <div class="field is-grouped">
                    <div class="b-checkbox is-default is-inline">
                        <input id="regex" v-model="regex" class="styled" checked type="checkbox">
                        <label for="regex">
                            Regex
                        </label>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="block">
                        <button class="button is-info" v-on:click="findAndReplace">Replace</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
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
        name: "find-replace",

        data() {
            return {
                numericalList: [],
                textList: [],

                column: {name: null, type: null},

                // find replace
                regex: false,
                to_find: null,
                to_replace: null,

            }
        },

        methods: {

            findAndReplace() {

                if (! this.column === null) return;

                if (this.regex) {

                    let formData = new FormData();
                    formData.append('dataset_id', this.setid);
                    formData.append('column', this.column.name);
                    formData.append('type', 'regex_replace');
                    formData.append('regex', this.to_find);
                    formData.append('replace', this.to_replace);


                    this.$http.post('/data/transform/',
                        formData,
                    ).then(response => {
                        openMessage({
                            message: response.data.amount + ' items in column ' + this.column.name + ' have been replaced',
                            type: 'success'
                        });
                        this.$emit('update');

                    })
                        .catch(function () {
                            openMessage({
                                message: 'The items in column '+ this.column.name + 'could not be replaced, or the regex could not be parsed',
                                type: 'danger'
                            });
                        });

                }

                else {



                    console.log("find replace")
                    let formData = new FormData();
                    formData.append('dataset_id', this.setid);
                    formData.append('column', this.column.name);
                    formData.append('type', 'replace');
                    formData.append('find', this.to_find);
                    formData.append('replace', this.to_replace);


                    this.$http.post('/data/transform/',
                        formData,
                    ).then(response => {
                        openMessage({
                            message:  response.data.amount + ' items in column ' + this.column.name + ' have been replaced',
                            type: 'success'
                        });
                        this.$emit('update');

                    })
                        .catch(function () {
                            openMessage({
                                message: 'The items in column '+ this.column.name + 'could not be replaced',
                                type: 'danger'
                            });
                        });
                }



            },

            find() {



            }


        },


    }
</script>

<style scoped lang="scss">

    @import "~cool-checkboxes-for-bulma.io";


</style>