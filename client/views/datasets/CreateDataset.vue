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

                                <div class="content has-text-centered has-addons-centered">
                                    <h1>Dataset metadata</h1>
                                    <p></p>
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

                            </div>
                        </article>


                    </div>

                    <div class="step-content has-text-centered"
                         v-bind:class="{ 'is-active': activeStep===2, 'is-hidden': activeStep !== 2  }">

                        <article class="tile is-child">

                                    <div class="content has-text-centered">
                                    <h1 class="title">Import existing table</h1>
                                        <p class="is-italic">Select a csv file or a zip file containing multiple csv's. Each file needs to
                                            be formatted with the same separator, which you can select below. Once you've
                                            uploaded a zip file, you will be redirected to the 'Join' step.
                                        </p>

                                    <div class="file has-name is-boxed is-centered">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="file" accept="text/csv, application/zip, application/vnd.ms-excel, application/sql, " ref="file" v-on:change="handleFileUpload($event)">
                                            <span class="file-cta">
                                              <span class="file-icon">
                                                <i class="fa fa-upload"></i>
                                              </span>
                                              <span class="file-label">
                                                Select a csv, sql or zip file…
                                              </span>
                                            </span>
                                            <span class="file-name">
                                              {{filename}}
                                            </span>
                                        </label>
                                    </div>

                                    <div class="field has-name is-boxed has-text-centered">
                                        <p class="label">select separator</p>
                                        <p class="control has-icons-left has-addons-centered has-text-centered">
                                            <span class="select">
                                              <select class="is-centered" v-model="dataset.separator">
                                                <option selected>,</option>
                                                <option>;</option>
                                                <option>|</option>
                                              </select>
                                                <span class="icon is-small is-left">
                                              <i class="fa fa-columns"></i>
                                            </span>
                                            </span>

                                        </p>
                                    </div>

                                        <button class="button is-primary" v-on:click="manageCsvOrZip()">Upload file</button>
                                        <button class="button is-link" v-on:click="this.file = null">Cancel</button>



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
                            <h3>1. Select two tables to join: </h3>
                            <p>
                                <button class="button" v-for="table in joinData" v-on:click="selectTable(table.name)">

                                    <span class="icon is-small"> <i class="fa fa-table"></i></span>
                                    <span>{{table.name}}</span>
                                </button>
                            </p>

                        </div>

                        <div class="content" v-bind:class="{'is-hidden' : selection1 == null || selection2 == null}">
                            <h3>2. Select where you want to join on: </h3>

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
                                    <button class="button is-primary" v-on:click="join()" v-bind:class="{'is-hidden' : joinOn1 == null || joinOn2 == null}">Join</button>
                                </p>

                                <h3>3. Select which table(s) you want to keep: </h3>

                                <p>
                                    <button class="button" v-on:click="incrementStep(1)">Keep all tables...</button>
                                    <button class="button" v-on:click="modalActive = true">Keep only one table...</button>
                                </p>

                            </div>


                            <div class="modal"
                                    v-bind:class="{'is-active' : modalActive===true}">
                                <div class="modal-background"></div>
                                <div class="modal-content">

                                    <p>
                                        Select which table you want to keep (the others will be deleted)
                                    </p>

                                    <div class="select">
                                        <select v-model="tableToKeep">
                                            <option v-for="table in joinData" > {{table.name}}</option>
                                        </select>
                                    </div>

                                    <p>
                                        <button class="button" v-on:click="selectFinalTable()">Save this table</button>
                                    </p>




                                </div>
                                <button class="modal-close is-large" aria-label="close"></button>
                            </div>

                        </div>



                    </div>

                    <div class="step-content has-text-centered"
                         v-bind:class="{ 'is-active': activeStep===4, 'is-hidden': activeStep !== 4  }">

                        <div class="content">
                            <h1>Import complete</h1>
                            <p>
                                Congratulations! Your dataset(s) have been imported. Errors will be displayed soon.
                            </p>
                            <p>
                                <router-link :to="{name: 'Datasets'}" class="has-text-centered">
                                    <button class="button is-primary">
                                        <span class="icon">
                                            <i class="fa fa-table"></i>
                                        </span>
                                        <span>
                                            My Datasets
                                        </span>
                                    </button>
                                </router-link>

                            </p>
                        </div>


                    </div>

                </div>


                <div class="steps-actions">

                    <div class="steps-action" v-on:click="incrementStep(-1)">
                        <a class="button" v-bind:class="{'is-disabled': activeStep===1 || activeStep === 4}" >Previous</a>
                    </div>
                    <div class="steps-action" v-on:click="incrementStep(1)">
                        <a class="button" v-bind:class="{'is-disabled': activeStep===4,  'is-hidden': activeStep > 1 }">Next</a>
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
                    filetype: 'csv',
                },

                // used by Join
                joinData: null,
                selection1: null,
                selection2: null,
                joinOn1: null,
                joinOn2: null,

                modalActive: false,
                tableToKeep: null,


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

                console.log(this.file.type);

                if (this.file.type === 'text/csv' || this.file.type === 'application/vnd.ms-excel') {

                    this.dataset.filetype = 'csv';
                    this.submitFile();
                    this.activeStep = 4;
                }

                else if (this.file.type === 'application/zip' || this.file.type === 'application/x-zip-compressed'){

                    this.dataset.filetype = 'zip';
                    this.submitFile();
                    this.activeStep = 3;

                }

                else if (this.file.type === 'application/sql' || this.file.type === ''){

                    this.dataset.filetype = 'sql';
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
                formData.append('file_type', this.dataset.filetype);

                /*
                  Make the request to the POST /single-file URL axios post request
                */
                this.$http.post('/data/',
                    formData

                ).then(response => {

                    if (response.data['success']){

                        console.log('SUCCESS, euy!');
                    }
                    else {
                        console.log('Not good, boo!');
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

            selectFinalTable: function () {

                for (const table of this.joinData){


                    if(table.name !== this.tableToKeep) {

                        let formData = new FormData();

                        formData.append('dataset_id', table.id);

                        this.$http.delete('/data/',
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
                        })
                            .catch(function(){
                                console.log('FAILURE!!');
                            });

                    }

                }

                this.modalActive = false;
                this.activeStep = 4;

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
                        this.joinData.push(response.data);

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


