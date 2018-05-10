<template>
    <div>
        <p></p>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Choose the fields: </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                <span class="select">
                        <select v-model="selectedColumn">
                            <option disabled>Select...</option>
                            <option v-for="heading in numberColumnTypes"
                                    v-bind:value="heading.name">{{heading.name}}</option>
                        </select>
                        </span>
                    </p>
                    <a class="button is-primary" v-on:click="chosenColumns.push(selectedColumn)">
                    <span class="icon">
                                <i class="fa fa-heading fa-plus"></i>
                            </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <span class="tags">
                    <span class="tag is-medium" v-for="(c, index) in chosenColumns"> {{ c }} &nbsp; <button
                            @click="chosenColumns.splice(index, 1)" class="delete"></button></span>
                    <span v-if="chosenColumns.length !== 0">
                    <span class="tag is-medium is-danger is-outlined"> Delete All &nbsp; <button
                            @click="chosenColumns = []"
                            class="delete"></button> </span>
                </span>
                </span>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Column to predict: </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                <span class="select">
                        <select v-model="prediction">
                            <option selected disabled>Select...</option>
                            <option v-for="heading in columnTypes"
                                    v-bind:value="heading.name">{{heading.name}}</option>
                        </select>
                        </span>
                    </p>
                </div>

            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Start K Value</label>
            </div>
            <div class="field-body">
                <input class="input" type="number" value="1">
                <div v-if="" class="help-text is-danger"> The start K Value must be larger than 1 and smaller than the End K
                    value
                </div>
            </div>

        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label id="max" class="label">End K Value</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input min="2" class="input" type="number" value="20"/>
                    <div class="help-text is-danger"> The End K Value must be larger than 2 and larger than the
                        Start K value
                    </div>
                    </p>
                </div>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <div class="level">
                    <div class="level-right level-item">
                        <button class="button is-primary" @click="calculate"> Calculate</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="field" v-if="answer">
            <div class="control">
                <table class="table is-fullwidth is-bordered">
                    <tr>
                        <th> K Values with Max Error Rate</th>
                        <th> K Values with Min Error Rate</th>
                    </tr>
                    <tr>
                        <td> {{ answer.max }}</td>
                        <td> {{ answer.min }}</td>
                    </tr>

                    <tr>
                        <th> K Value</th>
                        <th> Error Rate</th>
                    </tr>

                    <tr v-for="(value, key, index) of answer" :key="index">
                        <template v-if="[key !== 'max' || key !== 'min]"
                        <th> {{ key }}</th>
                        <td> {{ value }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "knn",
        props: {
            myDataset: Object,
            columnTypes: Array,
            id: Number,
        },
        data() {
            return {
                selectedColumn: null,
                chosenColumns: [],
                prediction: null,
                answer: null
            }
        },
        methods: {
            deleteItem(index) {
                console.log(index);
                console.log(this.chosenColumns)
            },
            calculate() {
                let url = '/data/knn/?dataset_id=' + this.myDataset.id + '&prediction=' + this.prediction
                for (const c of this.chosenColumns) {
                    url += '&columns=';
                    url += c
                }
                this.$http.get(url).then(
                    (res) => {
                        this.answer = res.data
                    }
                )

            }

        },
        computed: {
            numberColumnTypes() {
                return this.columnTypes.filter(function (obj) {
                    return obj.type === 'bigint' || obj.type === 'double precision'
                })
            }
        }
    }
</script>

<style scoped>

</style>