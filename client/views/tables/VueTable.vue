<template>
        <v-server-table ref="table" :url="api_url" :columns="columnnames" :options="options">

        </v-server-table>

</template>

<script>

    import Vue from 'vue';
    import {ServerTable} from 'vue-tables-2';

    Vue.use(ServerTable, {}, false, 'bulma', 'default');

    window.axios = require('axios');

    export default {

        components: {ServerTable},
        name: "vue-table-2",
        props: {
            columntypes: Array,
            setid: Number,
        },
        data(){
            return {
                columnClicked: null,
                entries: [],

                amountOfEntries: 0,
                offset: 0,
                amount: 5,

                currentPage: 1,

                booleanlist: [],

                options: {
                    clientMultiSorting: false,
                    perPageValues: [5, 10, 25, 50],
                    perPage: 5,

                    sortIcon: { up:'fa fa-sort-up', down:'fa fa-sort-down', is:'fa fa-sort' }

                },


            }
        },

        methods: {

            update() {
                console.log("Yes, ik wordt geupdate! ");
                this.$refs.table.refresh();
            }


        },

        computed: {

            amountOfPages: function () {
                return Math.ceil(this.amountOfEntries / this.amount);

            },

            columnnames() {

                return this.columntypes.map(a => a.name);

            },

            api_url() {

                let url = '/data/view/' + '?dataset_id=' + this.setid + '&offset=' + this.offset + '&amount=' + this.amount;

                return url;
            },



        },



        created() {


        },

        mounted() {
        },

    }
</script>

<style scoped type="text/css" lang="scss">




    .table-responsive {
            overflow-x: auto;
            overflow-y: hidden;
            max-width: 100%;


    }








</style>