<template>
    <div>
        <div class="level is-mobile box">
            <div class="level-left">
                <div class="level-item">
                    <a @click="changeOrdening" class="icon is-medium has-text-primary"><i class="fa fa-lg" v-bind:class="[view.ordeningList? 'fa-list': 'fa-th']"></i> </a>
                </div>
                <div class="level-item">
                </div>
            </div>
            <div class="level-right">
                <router-link to="/" class="button is-primary is-fullwidth"><i class="fa fa-plus"></i> &nbsp; Add new
                    dataset
                </router-link>
            </div>
        </div>
        <div class="columns is-multiline is-mobile">
            <div class="column is-full-mobile is-one-third-tablet is-one-third-desktop" v-for="item in items"
                 v-if="item.name">
                <data-card :item="item"/>
            </div>
        </div>
    </div>
</template>

<script>
    import DataCard from '../../components/data/dataCard'
    import vbSwitch from 'vue-bulma-switch'

    const api = 'datasets/?format=json'

    export default {
        components: {DataCard, vbSwitch},
        data() {
            return {
                items: null,
                switchOn: false,
                view: {
                    ordeningList: false
                }
            }
        },
        methods: {
            changeOrdening() {
                this.view.ordeningList = !this.view.ordeningList
            }
        },
        created() {
            this.$http.get(api).then((response) => {
                this.items = response.data
            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            })
        }
    }


    function getItems() {

    }
</script>
