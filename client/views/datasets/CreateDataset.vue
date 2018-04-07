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
                     v-bind:class="{ 'is-active': activeStep===3, 'is-completed': activeStep > 3 }">
                    <div class="step-marker">3</div>
                    <div class="step-details"></div>
                </div>

                <div class="step-item"
                     v-bind:class="{ 'is-active': activeStep>=4 }">
                    <div class="step-marker">4</div>
                    <div class="step-details"></div>
                </div>


                <div class="steps-content">

                    <div class="step-content"
                         v-bind:class="{ 'is-active': activeStep===1, 'is-hidden': activeStep !== 1 }">

                        <article class="tile is-child is-fullwidth">
                            <div class="block">
                                    <label class="label is-centered">Dataset Name</label>
                                    <p class="control">
                                        <input class="input" v-model="dataset.name"  type="text" placeholder="e.g. My Dataset"
                                               v-bind:class="{'is-danger': dataset.wrongInput}">
                                        <span v-if="dataset.wrongInput" class="help is-danger">This field is required</span>
                                        <span v-if="dataset.nameUnavaiable" class="help is-danger">This name is already occupied for this user</span>


                                    </p>
                                    <label class="label">Dataset description</label>
                                    <p class="control">
                                        <textarea class="textarea" v-model="dataset.description" placeholder="e.g. This dataset contains information about the correlation between the sales of eggs and the amount of toothbrushes sold each month"
                                                  v-bind:class="{'is-danger': dataset.wrongInput}">
                                        </textarea>
                                        <span v-if="dataset.wrongInput" class="help is-danger">This field is required</span>

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
                                            <input class="file-input" type="file" name="file" accept="text/csv, application/zip" ref="file" v-on:change="handleFileUpload($event)">
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

                                    <div class="field has-name is-boxed is-centered">
                                        <p class="label">select separator</p>
                                        <p class="control has-icons-left is-centered">
                                            <span class="select">
                                              <select class="is-centered" v-model="dataset.separator">
                                                <option selected>,</option>
                                                <option>;</option>
                                                <option>|</option>
                                              </select>
                                            </span>
                                               <span class="icon is-small is-left">
                                              <i class="fa fa-columns"></i>
                                            </span>
                                        </p>
                                    </div>

                                        <button class="button is-primary" v-on:click="manageCsvOrZip()">Upload file</button>
                                        <button class="button is-link" v-on:click="this.file = null">Cancel</button>



                                </div>
                                </div>

                                <div class="is-divider-vertical" data-content="OR"></div>
                                <div class="column">
                                    <h3 class="title">Start with an empty one</h3>

                                    <p class="control is-centered">
                                        <h1 class="title is-centered"></h1>
                                        <button class="button is-primary" v-on:click="">Generate Empty Dataset</button>
                                    </p>


                                </div>
                            </div>
                        </article>

                    </div>

                    <div class="step-content has-text-centered"
                         v-bind:class="{ 'is-active': activeStep===3, 'is-hidden': activeStep !== 3  }">


                        <div class="content">
                            <h1>Join</h1>
                            <p>
                                You've uploaded multiple tables, so you can join them together. Start by choosing two tables
                                which you want to join: this will generate a new joined table which you can use to join with
                                other tables.

                            </p>
                        </div>

                        <div class="content">
                            <h3>Select two tables to join: </h3>
                            <a class="button" v-for="table in joinData" v-on:click="selectTable(table.name)">

                                <span class="icon is-small"> <i class="fa fa-table"></i></span>
                                <span>{{table.name}}</span>
                            </a>
                        </div>

                        <div class="content">
                            <h3>Select where you want to join on: </h3>

                            <h5> <i>
                                <span>{{selection1}}.{{joinOn1}} ⋈ {{selection2}}.{{joinOn2}} </span>
                            </i></h5>


                            <div class="columns">
                                <div class="column">

                                    <span class="icon is-small"> <i class="fa fa-table"></i></span>
                                    <h5>{{selection1}}</h5>
                                    <div class="select">
                                        <select v-model="joinOn1">
                                        <option v-for="column in ActiveTable('left', 'col')" > {{column.name}}</option>
                                        </select>
                                    </div>

                                </div>

                                <div class="column">
                                    <span class="icon is-small"> <i class="fa fa-table"></i></span>
                                    <h5>{{selection2}}</h5>
                                    <div class="select">
                                        <select v-model="joinOn2">
                                            <option v-for="column in ActiveTable('right', 'col')" > {{column.name}}</option>
                                        </select>
                                    </div>


                                </div>

                            </div>

                            <div class="content">

                                <p>
                                    <button class="button is-primary" v-on:click="join()">Join</button>
                                </p>

                            </div>

                        </div>



                    </div>

                    <div class="step-content has-text-centered"
                         v-bind:class="{ 'is-active': activeStep===4, 'is-hidden': activeStep !== 4  }">

                        <h1 class="title is-4">Final Step !</h1>
                    </div>

                </div>


                <div class="steps-actions">

                    <div class="steps-action" v-on:click="incrementStep(-1)">
                        <a class="button" v-bind:class="{'is-disabled': activeStep===1}" >Previous</a>
                    </div>
                    <div class="steps-action" v-on:click="incrementStep(1)">
                        <a class="button" v-bind:class="{'is-disabled': activeStep===4,  'is-hidden': activeStep > 2 }">Next</a>
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
                    nameUnavaiable: false,
                    wrongInput: false,
                    description: '',
                    name: '',
                    separator: ',',
                    zip: false,
                },
                // used by Join

                joinData: null,
                selection1: null,
                selection2: null,
                joinOn1: null,
                joinOn2: null,
                joinedTables: [],


            }
        },

        methods: {
            incrementStep: function(amount){

                if (this.activeStep === 1 && amount === 1){
                    if (!this.validateFirstStep()) return;
                }

                this.activeStep += amount;

                if(this.activeStep <= 1) this.activeStep =1;
                if(this.activeStep >= 4) this.activeStep =4;

            },

            validateFirstStep: function () {

                if(this.dataset.name === '' || this.dataset.description === ''){
                    this.dataset.wrongInput = true;
                    return false;
                }

                this.dataset.wrongInput = false;
                return true;

            },

            handleFileUpload: function(event){
                this.file = event.target.files[0];
                this.filename = this.file.name;


            },

            manageCsvOrZip:function() {


                if (this.file.type === 'text/csv') {

                    this.dataset.zip = false;
                    this.submitFile();
                    this.activeStep = 4;
                }

                else if (this.file.type === 'application/zip') {

                    this.dataset.zip = true;
                    this.submitFile();
                    this.activeStep = 3;

                }

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
                formData.append('separator', this.dataset.separator);
                formData.append('zip', this.dataset.zip);

                /*
                  Make the request to the POST /single-file URL axios post request
                */
                this.$http.post('/data/create/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'

                        }
                    }
                ).then(response => {

                    if (response.data['success']){

                        console.log('SUCCESS, euy!');
                    }
                    else {
                        console.log('Not good, boo!');
                        console.log(response.data)
                        this.joinData = response.data;
                    }
                })
                    .catch(function(){
                        console.log('FAILURE!!');
                    });

            },

            selectTable: function (tablename) {

                if (this.selection1 === null && this.selection2 === null) {
                    this.selection1 = tablename;
                }
                else if (this.selection1 != null && this.selection2 === null) {
                    this.selection2 = tablename;
                }
                else {
                    this.selection1 = null;
                    this.selection2 = null;
                    this.joinOn1 = null;
                    this.joinOn2 = null;
                }
            },

            ActiveTable: function (side, type) {

                let selection = null;
                if(side === 'left') selection = this.selection1;
                else selection = this.selection2;

                if(selection === null) return null;
                console.log(selection);

                if(type === 'col'){
                    return this.joinData[this.joinData.findIndex(table => table.name === selection)].columns
                }
                else if(type === 'id') {
                    return this.joinData[this.joinData.findIndex(table => table.name === selection)].id
                }


            },

            join: function () {

                let formData = new FormData();

                formData.append('dataset_id_1', this.ActiveTable('left', 'id'));
                formData.append('dataset_id_2', this.ActiveTable('right', 'id'));
                formData.append('column_1', this.joinOn1);
                formData.append('column_2', this.joinOn2);


                this.$http.post('/data/join/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(response => {

                    if (response.data['success']){

                        console.log('SUCCESS, euy!');
                    }
                    else {
                        console.log('Not good, boo!');
                        console.log(response.data)
                        this.joinedTables = response.data;

                    }
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


