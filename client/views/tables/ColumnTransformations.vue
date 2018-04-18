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
                   <general :columntypes="columntypes" :setid="setid">

                   </general>
                </div>

                <div class="block" title="Numerical transformations" v-bind:class="{'is-hidden' : selected !== 'numerical'}">
                    <collapse accordion>
                        <collapse-item title="Normalise">
                            <div class="block">
                                Normalise numerical columns between 0 and 1.

                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">Column</label>
                                    </div>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select>
                                                <option>registration_id</option>
                                                <option>client_id</option>
                                                <option>checkin_time</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">Mean</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input" type="number" placeholder="mean">
                                        </p>
                                    </div>
                                </div>

                                <div class="control is-horizontal">
                                    <div class="control-label">
                                        <label class="label">Standard deviation</label>
                                    </div>
                                    <div class="control is-grouped">
                                        <p class="control is-expanded">
                                        <p></p>
                                        <input class="input" type="number" placeholder="standard deviation">
                                        </p>
                                    </div>
                                </div>


                                <div class="control is-grouped">
                                    <div class="control-label">
                                        <label class="label"></label>
                                    </div>
                                    <div class="control">
                                        <button class="button is-primary">Normalise</button>
                                    </div>
                                </div>
                            </div>




                        </collapse-item>
                        <collapse-item title="Discretise">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                        </collapse-item>
                        <collapse-item title="Remove outliers">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                        </collapse-item>
                    </collapse>
                </div>

                <div class="block" title="Date | time parsing" v-bind:class="{'is-hidden' : selected !== 'datetime'}">
                    <collapse accordion>
                        <collapse-item title="Parse date/time values">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                        </collapse-item>
                        <collapse-item title="....">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                        </collapse-item>
                    </collapse>
                </div>

                <div class="block" title="One-hot-encoding" v-bind:class="{'is-hidden' : selected !== 'categorical'}">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                </div>

                <div class="block" title="Find-and-replace" v-bind:class="{'is-hidden' : selected !== 'text'}">
                    <div class="field">
                        <p class="control">
                            <input class="input" type="text" placeholder="Find">
                        </p>
                    </div>

                    <div class="field">
                        <p class="control">
                            <input class="input" type="text" placeholder="Replace by">
                        </p>
                    </div>

                    <div class="field">
                        <p class="control">

                        <div class="field is-grouped">
                            <div class="b-checkbox is-default is-inline">
                                <input id="matchcase" class="styled" checked type="checkbox">
                                <label for="matchcase">
                                    Match case
                                </label>
                            </div>
                            <div class="b-checkbox is-default is-inline">
                                <input id="word" class="styled" checked type="checkbox">
                                <label for="word">
                                    Word
                                </label>
                            </div>
                            <div class="b-checkbox is-default is-inline">
                                <input id="regex" class="styled" checked type="checkbox">
                                <label for="regex">
                                    Regex
                                </label>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="block">
                                <button class="button is-primary">Find</button>
                                <button class="button is-primary is-outlined">Find & Replace</button>
                                <button class="button is-primary is-outlined">Replace All</button>
                            </div>
                        </div>
                        </p>
                    </div>

                </div>

        </div>
    </div>


</template>

<script>

    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
    import general  from '../transformations/General'

    export default {
        components: {CollapseItem, Collapse, general},
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


        },

        created() {

        }

    }

</script>

<style scoped lang="scss">
    @import '~bulma';
    @import '~bulma-steps';

</style>
