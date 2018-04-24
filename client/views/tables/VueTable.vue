<template>
        <v-server-table :url="api_url" :columns="columnnames" :options="options">

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
                console.log(url);

                return url;
            }



        },



        created() {


            this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + this.offset + '&amount=' + this.amount).then((response) => {
                this.entries = response.data;

            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            });

            this.isloading = true
            this.$http.get( 'data/entries/' + '?dataset_id=' + this.setid).then((response) => {
                this.amountOfEntries = response.data

            }).catch((error) => {
                this.error = true
            });


        },

        mounted() {




        }

    }
</script>

<style scoped type="text/css" lang="scss">
    .table {
        width: 40px;
        min-height: .01%;
        overflow-x: scroll;
        text-align: right;
    }

    .container-content {

        width: 1170px;
        height: auto;
        overflow-x: scroll;
        overflow-y: visible;

        .table-header {
            width: inherit;
            overflow: hidden;
            div {
                width: 100%;
            }
        }
    }

    .VueTables__sortable {
        cursor: pointer;
    }

    .VueTables__search-field {
        display: flex;
    }








</style>