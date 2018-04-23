<template>
    <div class="block">

        <div class="field">
            <div class="control is-grouped">
                <div class="control-label">
                    <label class="label">Select column to encode</label>
                    <span class="select">
                                <select v-model="column">
                                    <option v-for="heading in columntypes" v-bind:value="heading">{{heading.name}}</option>
                                </select>
                            </span>
                </div>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button class="button" v-on:click="oneHotEncode">One Hot Encode</button>
            </div>
        </div>

    </div>
</template>

<script>

    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

    export default {
        components: {CollapseItem, Collapse},
        props: {
            columntypes: Array,
            setid: Number,
        },
        name: "categorical",

        data() {
            return {
                numericalList: [],
                textList: [],

                column: {name: null, type: null},

            }
        },

        methods: {

            oneHotEncode() {

                if (!this.column === null) return;

                let formData = new FormData();
                formData.append('dataset_id', this.setid);
                formData.append('column', this.column.name);
                formData.append('type', 'one_hot');

                this.$http.post('/data/transform/',
                    formData,
                ).then(response => {
                    console.log('find replace succesvol')
                })
                    .catch(function () {
                        console.log('find replace FAILURE!!');
                    });



            }


        },


    }
</script>

<style scoped lang="scss">

    @import "~cool-checkboxes-for-bulma.io";


</style>