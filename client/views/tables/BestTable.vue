<template>

    <div class="block">
        <div class="table-responsive" >

            <table class="table is-striped is-fullwidth">
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
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    <li>
                        <a class="pagination-link" aria-label="Goto page 1">1</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 45">45</a>
                    </li>
                    <li>
                        <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
                    </li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 47">47</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 86">86</a>
                    </li>
                </ul>
            </nav>

        </div>
</template>

<script>

    import Vue from 'vue';


    export default {

        components: {  },

        name: "best-table",
        props: {
            columntypes: Array,
            setid: Number,
        },
        data(){
            return {
                data: null,
                columnClicked: null,
                entries: [],
                offset: 1,
                amount: 5,

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

            onPerPageChange: function (evt) {
                // { currentPage: 1, currentPerPage: 10, total: 5 }
                this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + ((evt.currentPage * evt.currentPerPage) - evt.currentPerPage) + '&amount=' + evt.currentPerPage
                ).then((response) => {
                    this.entries = response.data;
                    console.log(response.data)

                }).catch((error) => {
                    window.alert("Something went wrong with getting the datasets")
                });
                console.log(evt);
            },

            onPageChange: function (evt) {
                // { currentPage: 1, currentPerPage: 10, total: 5 }
                this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + ((evt.currentPage * evt.currentPerPage) - evt.currentPerPage) + '&amount=' + evt.currentPerPage
                ).then((response) => {
                    this.entries = response.data;
                    console.log(response.data)

                }).catch((error) => {
                    window.alert("Something went wrong with getting the datasets")
                });
                console.log(evt);
            },

            calculateColumns: function() {

                let finalColumns = [];

                for (let i = 0; i < this.columntypes.length; i++) {

                    let name = this.columntypes[i].name;
                    let type = this.columntypes[i].type;

                    let newcol = {
                        label: name,
                        field: name,
                        type: type,
                        filterable: false,
                        sortable: false,
                    };

                    finalColumns.push(newcol);
                }

                return finalColumns;
            },
        },

        computed: {

            giveId: function () {
                return 2
            },

        },



        created() {


            this.$http.get('data/view/' + '?dataset_id=' + this.setid + '&offset=' + this.offset + '&amount=' + this.amount).then((response) => {
                this.entries = response.data;
                console.log(response.data)

            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            });

        },

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