<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <!--DataWrangler made by Mats Present, Mathias Ooms, Laurens Van Damme, Luckas Declerck, Stan Schepers.-->
                <span v-if="backend === 0" class="has-text-warning">Not Tested Yet</span>
                <span v-if="backend === 1" class="has-text-success"><span class="icon has-text-warning"><i class="fa fa-beer fa-lg"></i>&nbsp;</span>Backend is working</span>
                <span v-if="backend === 2" class="has-text-danger">Backend is not working!</span>
            </div>
        </div>
    </footer>
</template>

<script>
    const api = '/'

    export default {

        data () {
            return {
                backend: 0
            }
        },
        beforeMount () {
            this.$http.head(api).then( (response) => {
                this.backend = 1
            }).catch( (error) => {
                this.backend = 2
            })
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
