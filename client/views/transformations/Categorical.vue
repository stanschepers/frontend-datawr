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
                <button class="button is-info" v-on:click="oneHotEncode">One Hot Encode</button>
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
                    openMessage({
                        message: 'The column ' + this.column.name + ' has been one-hot-encoded',
                        type: 'success'
                    });
                    this.$emit('update');

                })
                    .catch(function () {
                        openMessage({
                            message: 'The one-hot-encode transformation could not be applied',
                            type: 'danger'
                        });                    });

            }


        },


    }
</script>

<style scoped lang="scss">

    @import "~cool-checkboxes-for-bulma.io";


</style>