<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <!--DataWrangler made by Mats Present, Mathias Ooms, Laurens Van Damme, Luckas Declerck, Stan Schepers.-->
                <span v-if="backend === 0" class="has-text-warning">Not Tested Yet</span>
                <span v-if="backend === 1" class="has-text-success"><span class="icon has-text-warning"><i class="fa fa-beer fa-lg"></i>&nbsp;</span>Backend is working</span>
                <span v-if="backend === 2" class="has-text-danger">Backend is not working!</span>
            </div>
            <!--<div class="content has-text-centered">-->
                <!--<div class="field">-->
                    <!--<div class="control">-->
                        <!--<input class="input" maxlength="63" v-model="text" type="text" name="text" placeholder="Plaats hier je test"/>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="field">-->
                    <!--<div class="control">-->
                        <!--<button class="button is-primary" @click="send_test"> Submit </button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </footer>
</template>

<script>
    const api = '/'

    export default {

        data () {
            return {
                backend: 0,
                text: ''
            }
        },
        beforeMount () {
            this.$http.head(api).then( (response) => {
                this.backend = 1
            }).catch( (error) => {
                this.backend = 2
            })
        },
        methods: {
            send_test () {
                this.$http({url: 'test/', method: 'post', data: {'text': 'popopo'}}).then( (response) => {
                    // console.log(this.data)
                    this.text = response
                }).catch( (error) => {

                })
            }
        }

    }
</script>

<style lang="scss">
    @import '~bulma/sass/utilities/variables';
    @import '~bulma/sass/utilities/mixins';

    .footer {
        /*margin-left: 180px;*/

        @include mobile() {
            margin-left: 0;
        }

        .social a {
            border-bottom: none !important;
        }

        .fa.fa-heart {
            color: red;
        }
    }
</style>
