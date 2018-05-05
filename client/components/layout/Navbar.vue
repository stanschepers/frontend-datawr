<template>
    <nav class="level is-white navbar app-navbar is-mobile animated" role="navigation" aria-label="main navigation"
         :class="{ slideInDown: show, slideOutDown: !show }">
        <div class="level-item">
                        <router-link to="/data/create" class="has-text-centered">
            <i class="fa fa-plus-circle fa-lg  has-text-grey-dark"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Add Dataset </span>
                        </router-link>
        </div>
        <div class="level-item">
            <router-link :to="{name: 'Datasets'}" class="has-text-centered">
            <i class="fa fa-database has-text-link"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Datasets</span>
            </router-link>
        </div>
        <div class="level-item">
                        <span class="has-text-centered">
            <router-link to="/" class="has-text-grey is-hidden-touch subtitle">DataWr</router-link> &nbsp;
            <router-link to="/"><i class="fa fa-home fa-2x has-text-primary"></i> </router-link> &nbsp;
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
                        <a target="_blank" href="https://api.datawr.ml/admin/" class="has-text-centered">
            <i class="fa fa-cogs fa-lg has-text-grey-light"></i> &nbsp;
            <span class="has-text-dark is-hidden-touch">Admin</span>
                        </a>
        </div>
    </nav>
</template>

<script>
    /* eslint-disable indent */

    export default {
        props: {
            show: Boolean
        },
        data() {
            return {
                left: [
                    {
                        name: 'Favorites',
                        icon: 'heart',
                        color: 'danger',
                        link: '/'
                    },
                    {
                        name: 'Datasets',
                        icon: 'database',
                        color: 'link',
                        link: '/'
                    }
                ],
                right: [
                    {
                        name: 'Profile',
                        icon: 'profile',
                        color: 'info',
                        link: '/profile'
                    },
                    {
                        name: 'Settings',
                        icon: 'gear',
                        color: 'grey',
                        link: '/'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .app-navbar {
        position: fixed;
        min-width: 100%;
        z-index: 1024;
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    }
</style>
