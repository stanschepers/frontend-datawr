<template>
    <div class="content has-text-centered">
        <h1 class="is-title is-bold">Login</h1>

        <div class="columns is-vcentered">
            <div class="column is-6 is-offset-3">
                <div class="box">
                    <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
                    <form v-on:submit.prevent="login">
                        <div class="field">
                            <label class="label">Username</label>
                            <p class="control">
                                <input v-model="data.body.username" class="input" type="text"
                                       placeholder="Your Username">
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <p class="control">
                                <input v-model="data.body.password" class="input" type="password"
                                       placeholder="Your Password">
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="data.rememberMe">
                                    Remember me
                                </label>
                            </p>
                        </div>
                        <hr>
                        <p class="control is-fullwidth">
                            <button type="submit" class="button is-primary is-fullwidth">Login</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    body: {
                        username: null,
                        password: null
                    },
                    rememberMe: false
                },
                error: null
            }
        },
        mounted() {
            if (this.$auth.redirect()) {
                console.log('Redirect from: ' + this.$auth.redirect().from.name)
            }
        },
        methods: {
            login() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .is-title {
        text-transform: capitalize;
    }
</style>
