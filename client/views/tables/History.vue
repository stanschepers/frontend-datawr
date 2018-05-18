<template>
    <div>
        <h1 class="title">History</h1>

        <div class=" is-very-responsive">

            <v-server-table ref="historytable" :url="api_url" :columns="columnnames" :options="options">

                <div slot="child_row">
                    The link to yolo
                </div>

            </v-server-table>

        </div>


    </div>
</template>

<script>

    import Vue from 'vue';
    import {ServerTable} from 'vue-tables-2';
    import test from './test'

    Vue.use(ServerTable, {}, false, 'bulma', 'default');

    window.axios = require('axios');


    export default {
        components: {test},

        props: {
            setid: Number,
        },
        name: "history",

        data() {
            return {
                history: null,

                columnnames: ['trans_type', 'trans_extra', 'editor'],

                options: {
                    clientMultiSorting: false,
                    perPageValues: [5, 10, 25, 50],
                    perPage: 5,
                    filterable: false,
                    sortable: [],
                    uniqueKey: "execution_date",
                    childRow: 'test',

                    sortIcon: { up:'fa fa-sort-up', down:'fa fa-sort-down', is:'fa fa-sort' }

                },


            }
        },

        methods: {

            update() {
                this.$refs.historytable.refresh();
            },

        },

        computed: {

            api_url() {

                return '/data/history/' + '?dataset_id=' + this.setid;
            },



        },

        created() {

            this.$http.get('data/history/' + '?dataset_id=' + this.setid).then((response) => {
                this.history = response.data;
                console.log(response.data)

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