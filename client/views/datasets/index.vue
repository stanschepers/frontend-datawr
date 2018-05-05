<template>
    <div>
        <div class="level is-mobile box">
            <div class="level-left">
                <div class="level-item">
                    <a @click="view.showFavo = !view.showFavo" class="icon is-medium "><i class="fa fa-lg fa-heart" v-bind:class="[view.showFavo? 'has-text-danger': 'has-text-grey']"></i> </a>
                </div>
                <div class="level-item">
                </div>
            </div>
            <div class="level-right">

                <router-link :to="{name: 'Create Dataset'}" class="has-text-centered">
                    <button class="button is-primary">
                        <span class="icon">
                            <i class="fa fa-plus"></i>
                        </span>
                        <span>
                            Create new Dataset
                        </span>
                    </button>
                </router-link>

            </div>
        </div>
        <div class="columns is-multiline is-mobile">
            <div class="column is-full-mobile is-one-third-tablet is-one-third-desktop" v-for="item in shownItems"
                 v-if="item.name">
                <data-card :item="item"/>
            </div>
        </div>
    </div>
</template>

<script>
    import DataCard from '../../components/data/dataCard'
    import vbSwitch from 'vue-bulma-switch'
    import Vue from 'vue';



    const api = 'data/';


    export default {
        components: {DataCard, vbSwitch},
        data() {
            return {
                items: null,
                switchOn: false,
                view: {
                    showFavo: false
                },
                cardModal: null,

            }
        },
        computed: {
            shownItems(){
                if(this.view.showFavo){
                    return this.items.filter(function(obj) {
                        return obj.favored
                    })
                } return this.items
            }
        },
        methods: {

        },
        created() {
            this.$http.get(api).then((response) => {
                this.items = response.data
            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            })
        }
    }
</script>
