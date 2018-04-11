<template>

    <div class="block">
        <div class="table-responsive" >

            <nav class="pagination" role="navigation" aria-label="pagination">
                <a class="pagination-previous" v-on:click="goToPage(currentPage - 1)">Previous</a>
                <a class="pagination-next" v-on:click="goToPage(currentPage + 1)">Next page</a>
                <ul class="pagination-list">
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(1)" aria-label="Goto page 1">1</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(currentPage - 1)" aria-label="Goto previous page">{{this.currentPage - 1}}</a>
                    </li>
                    <li>
                        <a class="pagination-link is-current" aria-label="Page" aria-current="page">{{this.currentPage}}</a>
                    </li>
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(currentPage + 1)" aria-label="Goto next page ">{{this.currentPage + 1}}</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(amountOfPages)" aria-label="Goto last page">{{this.amountOfPages}}</a>
                    </li>
                </ul>

                <div class="field is-centered">
                    <div class="control">
                        <div class="select">
                            <select v-model="amount" @change="changeAmount()">
                                <option :value="5">5</option>
                                <option :value="10">10</option>
                                <option :value="25">25</option>
                                <option :value="50">50</option>
                            </select>
                        </div>
                    </div>
                </div>

            </nav>

            <table class="table is-striped is-fullwidth is-hoverable">
                <thead>
                <tr>
                    <th v-for="heading in columntypes">
                        <div class="is-size-6-mobile" id="hist"></div>
                    </th>
                </tr>
                </thead>
                <thead>
                <tr>
                    <th v-for="heading in columntypes">{{heading.name}}</th>
                </tr>
                </thead>

                <tfoot>
                </tfoot>
                <tbody>
                <tr v-for="entry in entries">
                    <td v-for="heading in columntypes">
                        {{entry[heading.name]}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

            <nav class="pagination" role="navigation" aria-label="pagination">
                <a class="pagination-previous" v-on:click="goToPage(currentPage - 1)">Previous</a>
                <a class="pagination-next" v-on:click="goToPage(currentPage + 1)">Next page</a>
                <ul class="pagination-list">
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(1)" aria-label="Goto page 1">1</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(currentPage - 1)" aria-label="Goto previous page">{{this.currentPage - 1}}</a>
                    </li>
                    <li>
                        <a class="pagination-link is-current" aria-label="Page" aria-current="page">{{this.currentPage}}</a>
                    </li>
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(currentPage + 1)" aria-label="Goto next page ">{{this.currentPage + 1}}</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" v-on:click="goToPage(amountOfPages)" aria-label="Goto last page">{{this.amountOfPages}}</a>
                    </li>
                </ul>

                <div class="field is-centered">
                    <div class="control">
                        <div class="select">
                            <select v-model="amount" @change="changeAmount()">
                                <option :value="5">5</option>
                                <option :value="10">10</option>
                                <option :value="25">25</option>
                                <option :value="50">50</option>
                            </select>
                        </div>
                    </div>
                </div>

            </nav>

        </div>
</template>

<script>

    import Vue from 'vue';
    import Plotly from 'plotly.js'


    export default {

        components: {  },

        name: "best-table",
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

                histdata: [],


            }
        },

        methods: {

            onClickFn: function(column, index){
                this.columnClicked = column;
            },

            sortFn: function(x, y, col) {
                this.columnClicked = x;
                return (x < y ? -1 : (x > y ? 1 : 0));

            },

            goToPage: function(index) {
                if(index < 1){
                    this.currentPage = 1;
                    return;
                }
                else if (index > this.amountOfPages) {
                    this.currentPage = this.amountOfPages;
                    return;
                }
                this.currentPage = index;

                this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + ((this.currentPage * this.amount) - this.amount) + '&amount=' + this.amount
                ).then((response) => {
                    this.entries = response.data;
                    console.log(response.data)

                }).catch((error) => {
                    window.alert("Something went wrong with getting the dataset")
                });
            },

            changeAmount: function() {

                this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + ((this.currentPage * this.amount) - this.amount) + '&amount=' + this.amount
                ).then((response) => {
                    this.entries = response.data;
                    console.log(response.data)

                }).catch((error) => {
                    window.alert("Something went wrong with getting the dataset")
                });
            }



        },

        computed: {

            amountOfPages: function () {
                return Math.ceil(this.amountOfEntries / this.amount);

            },



        },



        created() {


            this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + this.offset + '&amount=' + this.amount).then((response) => {
                this.entries = response.data;
                console.log(response.data)

            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            });

            this.isloading = true
            this.$http.get( 'data/entries/' + '?dataset_id=' + this.setid).then((response) => {
                this.amountOfEntries = response.data
                console.log(response.data)

            }).catch((error) => {
                this.error = true
            });

            this.$http.get( 'data/hist/' + '?dataset_id=' + 161 + '&column_name=percentage').then((response) => {
                this.histdata.push(response.data);
                let layout = {
                    autosize: false,
                    width: 200,
                    height: 100,
                    margin: {
                        l: 10,
                        r: 10,
                        b: 10,
                        t: 10,
                        pad: 4
                    }
                };
                Plotly.newPlot('hist', response.data, layout);

            }).catch((error) => {
                this.error = true
            });



        },

        mounted() {




        }

    }
</script>

<style scoped lang="scss">
    .table-responsive {
        display: block;
        width: 100%;
        min-height: .01%;
        overflow-x: auto;
    }
</style>