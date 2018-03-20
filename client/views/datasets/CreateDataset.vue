<template>
    <div>

    <div class="tile is-ancestor">
        <div class="tile is-child box has-text-centered is-fullwidth">

            <div class="block">

                <div class="steps" id="steps">
                    <div class="step-item"
                         v-bind:class="{ 'is-active': activeStep<=1, 'is-completed': activeStep > 1 }">
                        <div class="step-marker">1</div>
                        <div class="step-details">
                            <p class="step-title">Import Table</p>
                        </div>
                    </div>

                    <div class="step-item"
                         v-bind:class="{ 'is-active': activeStep===2, 'is-completed': activeStep > 2  }">
                        <div class="step-marker">2</div>
                        <div class="step-details">
                            <p class="step-title">Change Types</p>
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


                            <div class="file is-boxed is-centered">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="file" ref="file" v-on:change="handleFileUpload()">
                                    <span class="file-cta">
                                      <span class="file-icon">
                                        <i class="fa fa-upload"></i>
                                      </span>
                                      <span class="file-label">
                                        Choose a file…
                                      </span>
                                    </span>
                                </label>
                            </div>

                            <button class="button is-primary" v-on:click="submitFile()">
                                Upload Photo
                            </button>


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

    </div>

    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        components: {},
        name: "create-dataset",
        data() {
            return {
                activeStep: 1,
                file: '',
            }
        },

        methods: {
            incrementStep: function(amount){
                this.activeStep += amount;
                if(this.activeStep <= 1) this.activeStep =1;
                if(this.activeStep >= 3) this.activeStep =3;
            },

            handleFileUpload: function(){
                this.file = this.$refs.file.files[0];


            },

            submitFile: function(){

                /*
                  Initialize the form data
                */
                let formData = new FormData();

                /*
                    Add the form data we need to submit
                */
                formData.append('file', this.file);

                /*
                  Make the request to the POST /single-file URL
                */
                this.$http.post('/single-file',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                })
                    .catch(function(){
                        console.log('FAILURE!!');
                    });


            }




        }
    }
</script>

<style scoped lang="scss">
    @import '~bulma';
    @import '~bulma-steps';

</style>


