<template>
    <div>
        <h1 class="title">History</h1>

        <div class=" is-very-responsive">

            <v-server-table ref="historytable" :url="api_url" :columns="columnnames" :options="options">

            </v-server-table>

        </div>


    </div>
</template>

<script>

    import Vue from 'vue';
    import {ServerTable} from 'vue-tables-2';

    Vue.use(ServerTable, {}, false, 'bulma', 'default');

    window.axios = require('axios');


    export default {
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

    .is-very-responsive {
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100%;


    }



</style>