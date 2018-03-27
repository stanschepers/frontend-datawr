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

                <router-link :to="{name: 'Create Dataset'}" class="has-text-centered">
                    <button class="button is-primary is-fullwidth"><i class="fa fa-plus"></i> Add new dataset </button>
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
    import CardModal from '../components/modals/CardModal'
    import Vue from 'vue';


    const CardModalComponent = Vue.extend(CardModal)

    const api = 'datasets/?format=json'

    const openCardModal = (propsData = {
        visible: true
    }) => {
        return new CardModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    export default {
        components: {DataCard, vbSwitch},
        data() {
            return {
                items: null,
                switchOn: false,
                view: {
                    ordeningList: false
                },
                cardModal: null,

            }
        },
        methods: {
            changeOrdening() {
                this.view.ordeningList = !this.view.ordeningList
            },
            openModalCard () {
                const cardModal = this.cardModal || (this.cardModal = openCardModal({
                    title: 'Modal title',
                    url: this.$store.state.pkg.homepage
                }))
                cardModal.$children[0].active()
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
