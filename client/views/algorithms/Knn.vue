<template>
    <div>
        <div class="columns is-centered">

            <div class="column">

                <hr/>

                <div class="steps" id="steps">
                    <div class="step-item"
                         v-bind:class="{ 'is-active': activeStep<=0, 'is-completed': activeStep > 0 }">
                        <div class="step-marker">0</div>
                        <div class="step-details"></div>
                    </div>

                    <div class="step-item"
                         v-bind:class="{ 'is-active': activeStep===1, 'is-completed': activeStep > 1 }">
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
                         v-bind:class="{ 'is-active': activeStep===4 , 'is-completed': activeStep > 4 }">
                        <div class="step-marker">4</div>
                        <div class="step-details"></div>
                    </div>

                    <div class="step-item"
                         v-bind:class="{ 'is-active': activeStep>=5 }">
                        <div class="step-marker">5</div>
                        <div class="step-details"></div>
                    </div>

                    <div class="steps-content" :class="showHidden(0)" v-if="showHiddenBool(0)">
                        <div class="content has-text-centered">
                            <h3 class="title">Welcome to KNN</h3>
                            <p>
                                Stap 1: Kies een target column <br/>
                                Stap 2: Toon alle rows met die column leeg & kies een een target row <br/>
                                Stap 3: Kies andere trainings columns & kies K & kies distance fx <br/>
                                Stap 4: Zie het resultaat van KNN met de distance & Laat goed keuren <br/>
                                Stap 5: Waarde in de database <br/>
                            </p>
                        </div>
                    </div>

                    <div class="steps-content" :class="showHidden(1)" v-if="showHiddenBool(1)">
                        <div class="content has-text-centered">
                            <h5 class="subtitle">Select a <b>target column </b></h5>
                            <div class="field">
                                <p class="control">
                                <div class="select">
                                    <select v-model="send.target_column">
                                        <option v-for="c of get.column_empty_value" :key="c" :value="c" selected> {{ c
                                            }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="steps-content" :class="showHidden(2)" v-if="showHiddenBool(2)">
                        <div class="content has-text-centered">
                            <h5 class="subtitle">Select a <b>target row </b></h5>

                            <table class="table is-striped is-narrow is-hoverable">
                                <thead>
                                <tr>
                                    <th> Target Row</th>
                                    <th v-for="c of get.rows.columns" :key="c"> {{ c }}</th>
                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="r of get.rows.data" :key="r[0]">
                                    <td>
                                        <div class="control">
                                            <input type="radio" name="answer" v-model="send.target_row_index"
                                                   :value="r[0]">
                                        </div>
                                    </td>
                                    <td v-for="rc of r"> {{ rc }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="steps-content" :class="showHidden(3)" v-if="showHiddenBool(3)">
                        <div class="content">
                            <h5 class="subtitle">Select <b>trainings columns </b></h5>
                            <div class="field">
                                <p class="control">
                                <div class="select is-multiple">
                                    <select v-model="send.train_columns" multiple>
                                        <option v-for="c in get.target_columns_not_empty" :key="c" :value="c" selected>
                                            {{ c }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">K</label>
                                <div class="control">
                                    <input class="input" type="number" v-model="send.k">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Distance Function</label>
                                <div class="control">
                                    <div class="select">
                                        <select v-model="send.dist_fx">
                                            <option v-for="c in dist_fxs" :key="c" :value="c" selected>
                                                {{ c }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="steps-content" :class="showHidden(4)" v-if="showHiddenBool(4)">
                        <div class="content has-text-centered">
                            <h3 class="title">The predicted value is {{ get.prediction }}</h3>
                        </div>
                    </div>

                    <div class="steps-content" :class="showHidden(5)" v-if="showHiddenBool(5)">
                        <div v-if="success" class="content has-text-centered">
                            <h3 class="title"> Succesfull updated! </h3>
                        </div>
                    </div>

                    <div class="steps-actions">

                        <div class="steps-action" @click="reset">
                            <a class="button is-outlined is-grey">Reset</a>
                        </div>
                        <div class="steps-action" :class="nextButton">
                            <button @click="nextStep" :disabled="nextDisabled" class="button is-primary"
                                    :class="stepLoading ? 'is-loading' : ''">Next
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {openMessage} from "../../utils";

    /*
   KNN:
        Stap 1: Kies een target column
        Stap 2: Toon alle rows met die column leeg & kies een een target row
        Stap 3: Kies andere trainings columns & kies K & kies distance fx
        Stap 4: Zie het resultaat van KNN met de distance & Laat goed keuren
        Stap 5: Waarde in de database
     */
    export default {
        name: "knn",
        props: {
            myDataset: Object,
            columnTypes: Array,
            id: Number,
        },
        data() {
            return {
                success: false,
                get: {
                    column_empty_value: ['test', 'test2'],
                    rows: null,
                    target_columns_not_empty: [],
                    prediction: ''
                },
                send: {
                    target_column: '',
                    target_row_index: 0,
                    train_columns: [],
                    dist_fx: 'euclidean',
                    k: 1,
                },
                dist_fxs: [
                    'euclidean',
                    'cityblock',
                    'cosine',
                ],
                activeStep: 0,
                stepValid: true,
                stepLoading: false,
                sel: ''
            }
        },
        methods: {
            appendTrainColumns(c) {
                this.get.target_columns_not_empty = this.get.target_columns_not_empty.filter(e => e !== c);

                this.send.train_columns.push(c);
            },
            deleteTrainColumns(name) {
                this.send.train_columns = this.send.train_columns.filter(e => e !== name);
                this.get.target_columns_not_empty.push(name);
            },
            reset() {
                console.log('reset');
                this.activeStep = 0
            },
            openError(msg) {
                openMessage(
                    {
                        message: 'Something went wrong with KNN' + msg.toString(),
                        type: 'danger'
                    }
                )
            },
            step1() {
                this.$http.get('/data/knn/1/?dataset_id=' + this.id).then(
                    (res) => {
                        this.get.column_empty_value = res.data.data;
                        this.stepLoading = false;

                    }
                ).catch(
                    (err) => {
                        this.openError(err)
                        this.stepLoading = false;

                    }
                )

            },
            step2() {
                this.$http.get('/data/knn/2/?dataset_id=' + this.id + '&target_column=' + this.send.target_column + '&orient=split').then(
                    (res) => {
                        this.get.rows = res.data;
                        this.stepLoading = false;

                    }
                ).catch(
                    (err) => {
                        this.openError(err)
                        this.stepLoading = false;

                    }
                )
            },
            step3() {
                this.$http.get('/data/knn/3/?dataset_id=' + this.id + '&target_row_index=' + this.send.target_row_index).then(
                    (res) => {
                        this.get.target_columns_not_empty = res.data.data;
                        this.stepLoading = false;

                    }
                ).catch(
                    (err) => {
                        this.openError(err)
                        this.stepLoading = false;

                    }
                )
            },
            step4() {
                let url = '/data/knn/4/?dataset_id=' + this.id + '&target_row_index=' + this.send.target_row_index + '&target_column=' + this.send.target_column;
                for (const train_column of this.send.train_columns) {
                    url = url + '&train_columns=' + train_column.toString()
                }
                url = url + '&k=' + this.send.k;
                url = url + '&dist_fx=' + this.send.dist_fx;
                this.$http.get(url).then(
                    (res) => {
                        this.get.prediction = res.data.prediction;
                        this.stepLoading = false;

                    }
                ).catch(
                    (err) => {
                        this.openError(err)
                        this.stepLoading = false;

                    }
                )
            },
            step5() {

                this.$http.get('/data/knn/5/?dataset_id=' + this.id + '&target_row_index=' + this.send.target_row_index + '&target_column=' + this.send.target_column + '&prediction=' + this.get.prediction).then(
                    (res) => {
                        this.success = res.data.success;
                        this.$emit('update');
                        this.stepLoading = false;

                    }
                ).catch(
                    (err) => {
                        this.openError(err)
                        this.stepLoading = false;

                    }
                )
            },
            nextStep() {
                if (this.stepValid) {
                    if (this.activeStep === 0) {
                        this.step1();
                        this.stepValid = true;
                    }
                    if (this.activeStep === 1) {
                        this.step2();
                        this.stepValid = true;
                    }
                    else if (this.activeStep === 2) {
                        this.step3();
                        this.stepValid = true;
                    }
                    else if (this.activeStep === 3) {
                        this.step4();
                        this.stepValid = true;
                    }
                    else if (this.activeStep === 4) {
                        this.step5();
                        this.stepValid = true;
                    }

                    this.activeStep = this.activeStep + 1;
                }


            },
            showHidden(stepNumber) {
                if (this.activeStep === stepNumber) {
                    return 'is-active'
                }
                return 'is-hidden'
            },
            showHiddenBool(stepNumber) {
                return this.activeStep === stepNumber;

            }
        },
        computed: {
            nextButton() {
                if (this.activeStep === 5) {
                    return 'is-hidden'
                } else return ''
            },
            get_column_empty_value() {
                return this.column_empty_value | ['a', 'v']
            },
            nextDisabled() {
                return !this.stepValid
            }

        }
    }
</script>

<style scoped lang="scss">
    @import '~bulma';
    @import '~bulma-steps';

</style>