<template>
    <div class="tile is-ancestor">

        <div class="tile is-parent is-8-tablet">
            <article class="tile is-child box">
                <h4 class="title">hey</h4>
                <datatable
                        :data="gridData"
                        :columns="gridColumns"
                        :filter-key="searchQuery">
                </datatable>
            </article>
        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <form class="control" id="search">
                    <label> Search
                        <input class="input" name="query" v-model="searchQuery">
                    </label>
                </form>
            </article>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent */

    import Datatable from '../../components/tables/datatable'

    export default {
        components: {Datatable},
        data () {
            return {
                searchQuery: '',
                gridColumns: ['code', 'name',],
                gridData: getData()
            }
        }
    }

    function getData() {
        return [{
            code: "ZW",
            name: "Zimbabwe",
            created_at: "2015-04-24T01:46:50.459583",
            updated_at: "2015-04-24T01:46:50.459593",
            uri: "http://api.lobbyfacts.eu/api/1/country/245",
            id: 245
        }, {
            code: "ZM",
            name: "Zambia",
            created_at: "2015-04-24T01:46:50.457459",
            updated_at: "2015-04-24T01:46:50.457468",
            uri: "http://api.lobbyfacts.eu/api/1/country/244",
            id: 244
        }, {
            code: "YE",
            name: "Yemen",
            created_at: "2015-04-24T01:46:50.454731",
            updated_at: "2015-04-24T01:46:50.454741",
            uri: "http://api.lobbyfacts.eu/api/1/country/243",
            id: 243
        }, {
            code: "EH",
            name: "Western Sahara",
            created_at: "2015-04-24T01:46:50.452002",
            updated_at: "2015-04-24T01:46:50.452011",
            uri: "http://api.lobbyfacts.eu/api/1/country/242",
            id: 242
        }, {
            code: "WF",
            name: "Wallis & Futuna",
            created_at: "2015-04-24T01:46:50.449346",
            updated_at: "2015-04-24T01:46:50.449355",
            uri: "http://api.lobbyfacts.eu/api/1/country/241",
            id: 241
        }, {
            code: "VN",
            name: "Vietnam",
            created_at: "2015-04-24T01:46:50.446644",
            updated_at: "2015-04-24T01:46:50.446652",
            uri: "http://api.lobbyfacts.eu/api/1/country/240",
            id: 240
        }, {
            code: "VE",
            name: "Venezuela",
            created_at: "2015-04-24T01:46:50.444031",
            updated_at: "2015-04-24T01:46:50.444040",
            uri: "http://api.lobbyfacts.eu/api/1/country/239",
            id: 239
        }, {
            code: "VU",
            name: "Vanuatu",
            created_at: "2015-04-24T01:46:50.441423",
            updated_at: "2015-04-24T01:46:50.441433",
            uri: "http://api.lobbyfacts.eu/api/1/country/238",
            id: 238
        }]
    }
</script>

<style scoped>

</style>
