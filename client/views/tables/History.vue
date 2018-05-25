<template>
    <div>

        <div class="level is-mobile">
            <div class="level-left">
                <h1 class="title level-item">History</h1>
            </div>
            <div class="level-right">
                <a @click="toggle" class="button is-primary is-small">toggle</a>
            </div>
        </div>

        <div class=" is-very-responsive has-text-centered">

            <v-server-table ref="historytable" :url="api_url" :columns="columnnames" :options="options">


            </v-server-table>

            <a class="button is-danger is-small is-centered" v-on:click="undo">
                <span class="icon is-small">
                  <i class="fa fa-undo"></i>
                </span>
                <span>Undo last transformation</span>
            </a>

        </div>


    </div>
</template>

<script>

    import Vue from 'vue';
    import {ServerTable} from 'vue-tables-2';
    import {openMessage} from "../../utils";


    Vue.use(ServerTable, {}, false, 'bulma', 'default');

    window.axios = require('axios');


    export default {
        components: {},

        props: {
            setid: Number,
            min: Boolean,
        },
        name: "history",

        data() {
            return {
                history: null,

                options: {
                    clientMultiSorting: false,
                    perPageValues: [5, 10, 25, 50],
                    perPage: 5,
                    filterable: false,
                    sortable: [],
                    uniqueKey: "execution_date",

                    sortIcon: { up:'fa fa-sort-up', down:'fa fa-sort-down', is:'fa fa-sort' }

                },


            }
        },

        methods: {

            toggle() {

                this.$emit('toggle');

            },

            update() {
                this.$refs.historytable.refresh();
            },

            undo() {

                let formData = new FormData();
                formData.append('dataset_id', this.setid);

                this.$http.post('/data/undo/',
                    formData,
                ).then(response => {

                    if(response.data.success) {
                        openMessage({
                            message: response.data.msg,
                            type: 'success'
                        });
                    }
                    else {
                        openMessage({
                            message: response.data.msg,
                            type: 'danger'
                        });
                    }
                    this.$emit('update');
                    this.update()

                })
                    .catch(function (error) {
                        openMessage({
                            message: 'The last transformation could not be reverted',
                            type: 'danger'
                        });                    });
            }

        },

        computed: {

            api_url() {

                return '/data/history/' + '?dataset_id=' + this.setid;
            },

            minimized() {

                return this.min
            },

            columnnames() {

                if (this.minimized) return ['trans_type', 'trans_extra']
                else return ['trans_type', 'trans_extra', 'execution_date', 'editor', 'trans_query']

            }



        },

        created() {

            this.$http.get('data/history/' + '?dataset_id=' + this.setid).then((response) => {
                this.history = response.data;

            }).catch((error) => {
                window.alert("Something went wrong with getting the history")
            });
        }

    }
</script>

<style scoped lang="scss">

    .VueTables__child-row-toggler {
        width: 16px;
        height: 16px;
        line-height: 16px;
        display: block;
        margin: auto;
        text-align: center;
    }

    .VueTables__child-row-toggler--closed::before {
        content: "+";
    }

    .VueTables__child-row-toggler--open::before {
        content: "-";
    }


</style>