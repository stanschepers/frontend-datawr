<template>
    <nav class="level is-white navbar app-navbar is-mobile animated" role="navigation" aria-label="main navigation"
         :class="{ slideInDown: show, slideOutDown: !show }">
        <div class="level-item">
                        <router-link to="/" class="has-text-centered">
            <i class="fa fa-heart  has-text-danger"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Favorites</span>
                        </router-link>
        </div>
        <div class="level-item">
            <router-link to="/" class="has-text-centered">
            <i class="fa fa-database has-text-link"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Datasets</span>
            </router-link>
        </div>
        <div class="level-item">
                        <span class="has-text-centered">
            <router-link to="/" class="has-text-grey is-hidden-touch subtitle">DataWr</router-link> &nbsp; &nbsp;
            <router-link to="/"><i class="fa fa-home fa-2x has-text-primary"></i> </router-link> &nbsp; &nbsp;
            <router-link to="/" class="has-text-grey-darker is-hidden-touch subtitle">ADReM</router-link>
                        </span>
        </div>
        <div class="level-item">
                        <router-link to="/profile" class="has-text-centered">

            <i class="fa fa-user fa-lg has-text-info"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Profile</span>
                        </router-link>
        </div>
        <div class="level-item">
                        <router-link to="/settings" class="has-text-centered">

            <i class="fa fa-gear fa-lg has-text-grey-light"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Settings</span>
                        </router-link>
        </div>
    </nav>
</template>

<script>
    /* eslint-disable indent */

    import Tooltip from 'vue-bulma-tooltip'
    import {mapGetters, mapActions} from 'vuex'

    export default {

        components: {
            Tooltip
        },

        props: {
            show: Boolean
        },

        computed: mapGetters({
            pkginfo: 'pkg',
            sidebar: 'sidebar'
        }),

        methods: {
            ...mapActions([
                'toggleSidebar'
            ]),
            logout () {
                this.$auth.logout({
                    redirect: 'Home',
                    makeRequest: false
                    // params: {},
                    // success: function () {},
                    // error: function () {},
                    // etc...
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '~bulma/sass/utilities/variables';

    .app-navbar {
        position: fixed;
        min-width: 100%;
        z-index: 1024;
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

        .container {
            margin: auto 10px;
        }

        .nav-right {
            align-items: stretch;
            flex: 1;
            justify-content: flex-end;
            overflow: hidden;
            overflow-x: auto;
            white-space: nowrap;
        }
    }

    .hero-brand {
        .vue {
            margin-left: 10px;
            color: #36AC70;
        }
        .admin {
            color: #28374B;
        }

        .logo {
            max-width: 250px;
            padding: 10px;
        }
    }
</style>
