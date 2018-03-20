<template>

    <div>
        <div class="block">

            <div class="steps" id="steps">
                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep<=1, 'is-completed': activeStep > 1 }">
                    <div class="step-marker">1</div>
                    <div class="step-details">
                        <p class="step-title">Select Column</p>
                    </div>
                </div>

                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep===2, 'is-completed': activeStep > 2  }">
                    <div class="step-marker">2</div>
                    <div class="step-details">
                        <p class="step-title">Select Transformation</p>
                    </div>
                </div>

                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep>=3 }">
                    <div class="step-marker">3</div>
                    <div class="step-details">
                        <p class="step-title">Results</p>
                    </div>
                </div>


            <div class="steps-content">

                <div class="step-content has-text-centered"
                     v-bind:class="{ 'is-active': activeStep===1, 'is-hidden': activeStep !== 1 }">

                    <div class="field">
                        <div class="control is-grouped has-text-centered">
                            <div class="control-label">
                                <label class="label">Select column to change</label>
                                <div class="select">
                                    <select>
                                        <option v-for="heading in columntypes">{{heading.name}}</option>

                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="step-content has-text-centered"
                     v-bind:class="{ 'is-active': activeStep===2, 'is-hidden': activeStep !== 2  }">

                    <h1 class="title is-4">Second Step !</h1>
                </div>

                <div class="step-content has-text-centered"
                     v-bind:class="{ 'is-active': activeStep===3, 'is-hidden': activeStep !== 3  }">

                    <h1 class="title is-4">Final Step !</h1>
                </div>

            </div>

            <div class="steps-actions">

                <div class="steps-action" v-on:click="incrementStep(-1)">
                    <a class="button" v-bind:class="{'is-disabled': activeStep===1}" >Previous</a>
                </div>
                <div class="steps-action" v-on:click="incrementStep(1)">
                    <a class="button" v-bind:class="{'is-disabled': activeStep===3}" >Next</a>
                </div>

            </div>


            </div>
        </div>

    </div>


</template>

<script>


    export default {
        components: {},
        props: {
            columntypes: Array,
        },
        name: "column-transformations",
        data() {
            return {
                activeStep: 1,
                columnTypes: [],
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
