<template>
    <div>

        <div class="columns is-centered">

            <div class="column box is-two-thirds">

                <div class="tile is-parent ">
                    <div class="tile is-child ">


                    <div class="steps" id="steps">
                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep<=1, 'is-completed': activeStep > 1 }">
                    <div class="step-marker">1</div>
                    <div class="step-details"></div>
                </div>

                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep===2, 'is-completed': activeStep > 2  }">
                    <div class="step-marker">2</div>
                    <div class="step-details"></div>
                </div>

                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep>=3 }">
                    <div class="step-marker">3</div>
                    <div class="step-details"></div>
                </div>


                <div class="steps-content">

                    <div class="step-content"
                         v-bind:class="{ 'is-active': activeStep===1, 'is-hidden': activeStep !== 1 }">

                        <article class="tile is-child is-fullwidth">
                            <div class="block">
                                    <label class="label is-centered">Dataset Name</label>
                                    <p class="control">
                                        <input class="input" v-model="dataset.name"  type="text" placeholder="e.g. My Dataset">
                                    </p>
                                    <label class="label">Dataset description</label>
                                    <p class="control">
                                        <textarea class="textarea" v-model="dataset.description" placeholder="e.g. This dataset contains information about the correlation between the sales of eggs and the amount of toothbrushes sold each month"></textarea>
                                    </p>

                                </div>
                        </article>


                    </div>

                    <div class="step-content has-text-centered"
                         v-bind:class="{ 'is-active': activeStep===2, 'is-hidden': activeStep !== 2  }">

                        <article class="tile is-child">

                            <div class="columns">
                                <div class="column">
                                    <div class="block">
                                    <h3 class="title">Import existing table</h3>

                                    <div class="file has-name is-boxed is-centered">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="file" accept="text/csv" ref="file" v-on:change="handleFileUpload($event)">
                                            <span class="file-cta">
                                              <span class="file-icon">
                                                <i class="fa fa-upload"></i>
                                              </span>
                                              <span class="file-label">
                                                Select a .csv file…
                                              </span>
                                            </span>
                                            <span class="file-name">
                                              {{filename}}
                                            </span>
                                        </label>
                                    </div>

                                    <p class="control is-centered">

                                        <button class="button is-primary is-centered" v-on:click="submitFile()">Upload file</button>
                                        <button class="button is-link is-centered"v-on:click="this.file = null">Cancel</button>


                                    </p>

                                </div>
                                </div>

                                <div class="is-divider-vertical" data-content="OR"></div>
                                <div class="column">
                                    <h3 class="title">Start with an empty one</h3>
                                </div>
                            </div>
                        </article>

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
                filename: 'No file selected yet',
                dataset: {
                    description: '',
                    name: '',
                }
            }
        },

        methods: {
            incrementStep: function(amount){
                this.activeStep += amount;
                if(this.activeStep <= 1) this.activeStep =1;
                if(this.activeStep >= 3) this.activeStep =3;
            },

            handleFileUpload: function(event){
                this.file = event.target.files[0];
                this.filename = this.file.name;


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
                formData.append('name', this.dataset.name);
                formData.append('description', this.dataset.description);


                /*
                  Make the request to the POST /single-file URL
                */
                this.$http.post('/data/create/',
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
    @import '~bulma-divider';

    .button {
        margin: 5px 0 0;
    }

</style>


