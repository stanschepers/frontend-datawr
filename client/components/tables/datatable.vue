<template>
    <table class="table table-responsive is-bordered is-narrow">
        <thead>
        <tr>
            <th v-for="key in columns"
                @click="sortBy(key)"
                :class="{ active: sortKey === key }">
                {{ key | capitalize }}
                <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"> </span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData">
            <td v-for="key in columns">
                {{entry[key]}}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    /* eslint-disable indent */

    export default {
        name: 'datatable',
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function () {
            let sortOrders = {}
            this.columns.forEach(function (key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredData: function () {
                const sortKey = this.sortKey
                const filterKey = this.filterKey && this.filterKey.toLowerCase()
                const order = this.sortOrders[sortKey] || 1
                let data = this.data
                if (filterKey) {
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    data = data.slice().sort(function (a, b) {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return data
            }
        },
        filters: {
            capitalize: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            sortBy: function (key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../node_modules/bulma/sass/utilities/variables';

    .table-responsive {
        display: block;
        width: 100%;
        min-height: .01%;
        overflow-x: auto;
    }

    th.active {
        color: $primary;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid $primary;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid $primary;
    }
</style>
