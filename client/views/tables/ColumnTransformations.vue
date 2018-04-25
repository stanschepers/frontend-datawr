<template>

    <div>
        <div class="block">

            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        <span class="title level-item">Transformations</span>
                    </div>
                </div>
            </div>

            <div class="tabs is-centered">
                <ul>
                    <li v-bind:class="{'is-active' : selected === 'general'}" v-on:click="selected = 'general'" ><a>General</a></li>
                    <li v-bind:class="{'is-active' : selected === 'numerical'}" v-on:click="selected = 'numerical'"><a>Numerical</a></li>
                    <li v-bind:class="{'is-active' : selected === 'datetime'}" v-on:click="selected = 'datetime'"><a>Date/Time </a></li>
                    <li v-bind:class="{'is-active' : selected === 'categorical'}" v-on:click="selected = 'categorical'"><a>Categorical</a></li>
                    <li v-bind:class="{'is-active' : selected === 'text'}" v-on:click="selected = 'text'"><a>Text</a></li>
                </ul>
            </div>

                <div class="block" title="Table changes" v-bind:class="{'is-hidden' : selected !== 'general'}">
                   <general :columntypes="columntypes" :setid="setid" v-on:update="updateParent">
                   </general>
                </div>

                <div class="block" title="Numerical transformations" v-bind:class="{'is-hidden' : selected !== 'numerical'}">
                    <numerical :columntypes="columntypes" :setid="setid" v-on:update="updateParent">
                    </numerical>
                </div>

                <div class="block" title="Date | time parsing" v-bind:class="{'is-hidden' : selected !== 'datetime'}">
                    <datetime :columntypes="columntypes" :setid="setid" v-on:update="updateParent">
                    </datetime>
                </div>

                <div class="block" title="One-hot-encoding" v-bind:class="{'is-hidden' : selected !== 'categorical'}">
                    <categorical :columntypes="columntypes" :setid="setid" v-on:update="updateParent">
                    </categorical>
                </div>

                <div class="block" title="Find-and-replace" v-bind:class="{'is-hidden' : selected !== 'text'}">
                    <findreplace :columntypes="columntypes" :setid="setid" v-on:update="updateParent">
                    </findreplace>
                </div>

        </div>
    </div>


</template>

<script>

    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
    import general  from '../transformations/General'
    import numerical  from '../transformations/Numerical'
    import findreplace from '../transformations/FindReplace'
    import categorical from '../transformations/Categorical'
    import datetime from '../transformations/DateTime'


    export default {
        components: {
            CollapseItem, Collapse, general, numerical, findreplace, categorical, datetime},
        props: {
            columntypes: Array,
            setid: Number,
        },
        name: "column-transformations",
        data() {
            return {
                activeStep: 1,
                columnTypes: [],
                selected: 'general',
            }
        },
        methods: {
            incrementStep: function(amount){
                this.activeStep += amount;
                if(this.activeStep <= 1) this.activeStep =1;
                if(this.activeStep >= 3) this.activeStep =3;
            },

            updateParent() {

                this.$emit('update');

            }


        },

        created() {

        }

    }

</script>

<style scoped lang="scss">
    @import '~bulma';
    @import '~bulma-steps';

</style>
