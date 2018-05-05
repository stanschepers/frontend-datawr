<template>

    <div>
        <div class="block">

            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        <span class="title level-item">Algorithms</span>
                    </div>
                </div>
            </div>

            <div class="tabs ">
                <ul>
                    <li v-bind:class="{'is-active' : selected === 'knn'}" v-on:click="selected = 'knn'" ><a>KNN</a></li>
                    <li v-bind:class="{'is-active' : selected === 'other'}" v-on:click="selected = 'other'"><a>Other</a></li>
                </ul>
            </div>

            <div class="block" title="KNN" v-bind:class="{'is-hidden' : selected !== 'knn'}">
                <knn :my-dataset="myDataset" :columnTypes="columnTypes" :id="id"/>
                ID: {{ id }}
            </div>

            <div class="block" title="Other" v-bind:class="{'is-hidden' : selected !== 'other'}">
                <p> Work in progress </p>
            </div>
        </div>
    </div>


</template>

<script>
    import Knn from '../algoritms/Knn'
    export default {
        name: "column-algorithms",
        props: {
            myDataset: Object,
            columnTypes: Array,
            id: Number,
        },
        components: {
            Knn
        },
        data() {
            return {
                selected: 'knn'
            }
        },
        methods: {

        },
        computed: {

        }
    }
</script>

<style scoped>

</style>