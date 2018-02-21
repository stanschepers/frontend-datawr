<template>
    <nav class="level is-white navbar app-navbar is-mobile animated" role="navigation" aria-label="main navigation"
         :class="{ slideInDown: show, slideOutDown: !show }">
        <div class="level-item has-text-left">
            <a class="is-hidden-tablet"  @click="toggleSidebar({opened: !sidebar.opened})">
                <i class="fa fa-bars" aria-hidden="true" v-show="!sidebar.hidden"></i>
            </a>
        </div>

        <div class="level-item is-centered">
            <a class="navbar-item" href="/">
                <img class="logo" src="~assets/logo.png" alt="Data Wrangler" >
            </a>
                <div class="is-hidden-mobile">
                    <a href="/"> <span class="has-text-primary">Data Wrangler</span> </a> <a> <tooltip :label="'About Us'" placement="right" type="dark" size="small" :no-animate="true" :always="false" :rounded="true">
                <span class="has-text-dark">• ADReM</span>
            </tooltip> </a>
                </div>
        </div>

        <div class="level-item">
            <!--<router-link v-if="!$auth.check()" to="/login" class="nav-item">Login</router-link>-->
            <!--<a v-if="$auth.check()" @click="logout" class="nav-item">Logout</a>-->
            <router-link class="nav-item" to="/profile">
                <span class="icon has-text-dark">
                    <i class="fa fa-user-circle fa-lg"></i>
                </span>
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
