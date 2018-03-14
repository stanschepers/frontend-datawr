<template>
    <footer class="footer">
        <div class="container">
            <p class="content has-text-centered">
                <!--DataWrangler made by Mats Present, Mathias Ooms, Laurens Van Damme, Luckas Declerck, Stan Schepers.-->
                <a href="http://localhost:8000" target="_blank">
                    <span v-if="backend === 0" class="has-text-warning">Not Tested Yet</span>
                    <span v-if="backend === 1" class="has-text-success">Backend is working</span>
                    <span v-if="backend === 2" class="has-text-danger">Backend is not working!</span>
                </a>
            </p>
            <p class="content has-text-centered">
                <router-link to="/login">Login page</router-link> • You're logged <span v-if="this.$store.getters.getLoggedIn">In </span> <span v-else>Out</span>
            </p>
        </div>
    </footer>
</template>

<script>
    const api = '/test/'

    export default {

        data() {
            return {
                backend: 0,
                text: ''
            }
        },
        beforeMount() {
            this.$http.head(api).then((response) => {
                this.backend = 1
            }).catch((error) => {
                this.backend = 2
            })
        },
        computed: {

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
