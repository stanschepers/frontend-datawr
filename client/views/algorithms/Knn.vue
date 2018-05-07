<template>
    <div>
        <p></p>
        <div class="field">

            <div class="control">
                <span class="label">
                Choose the fields:
                </span>
                <span class="select">
                        <select v-model="selectedColumn">
                            <option disabled>Select...</option>
                            <option v-for="heading in numberColumnTypes"
                                    v-bind:value="heading.name">{{heading.name}}</option>
                        </select>
                        </span>
            <span>
                <a class="button is-primary is-rounded" v-on:click="chosenColumns.push(selectedColumn)">
                    <span class="icon">
                                <i class="fa fa-heading fa-plus"></i>
                            </span>
                </a>
            </span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <span class="tags">
                    <span class="tag is-medium" v-for="(c, index) in chosenColumns"> {{ c }} &nbsp; <button
                            @click="chosenColumns.splice(index, 1)" class="delete"></button></span>
                    <span v-if="chosenColumns.length !== 0">
                    <span class="tag is-medium is-danger"> Delete All &nbsp; <button @click="chosenColumns = []"
                                                                                     class="delete"></button> </span>
                </span>
                </span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <span class="label"> Choose a field to predict: </span>

                <span class="select">
                        <select v-model="prediction">
                            <option selected disabled>Select...</option>
                            <option v-for="heading in columnTypes"
                                    v-bind:value="heading.name">{{heading.name}}</option>
                        </select>
                        </span>

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
        <div class="field">
            <div class="control">
                {{ answer }}
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