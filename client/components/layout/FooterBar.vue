<template>
    <footer class="footer">
        <div class="container">
            <p class="content has-text-centered">
                <!--DataWrangler made by Mats Present, Mathias Ooms, Laurens Van Damme, Luckas Declerck, Stan Schepers.-->
                <!--<a href="http://localhost:8000" target="_blank"> Status:-->
                <!--<span v-if="backend === 0" class="has-text-warning">Not Tested</span>-->
                <!--<span v-if="backend === 1" class="has-text-success">Online</span>-->
                <!--<span v-if="backend === 2" class="has-text-danger">Offline</span>-->
                <!--</a>-->
            </p>
            <p class="content has-text-centered">
                <span v-if="this.$store.state.auth.loggedIn"> <router-link :to="{name: 'Logout'}">Logout</router-link>
  </span> <span v-else><router-link to="/login">Login page</router-link> </span>  <span
                    v-if="this.$store.state.auth.loggedIn"> • Welcome {{ $store.state.auth.user.username }} </span>
                • <a href="http://localhost:8000" target="_blank">
                <span v-if="backend === 0" class="has-text-warning">Status</span>
                <span v-if="backend === 1" class="has-text-success">Status</span>
                <span v-if="backend === 2" class="has-text-danger">Status</span>
            </a>
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
        computed: {}

    }
</script>

<style lang="scss">
 /*   @import '~bulma/sass/utilities/variables';
    @import '~bulma/sass/utilities/mixins';

    .footer {
        !*margin-left: 180px;*!

        @include mobile() {
            margin-left: 0;
        }

        .social a {
            border-bottom: none !important;
        }

        .fa.fa-heart {
            color: red;
        }*/

        /*.footer {*/
            /*position: absolute;*/
            /*bottom: 10px;*/
        /*}*/
</style>
