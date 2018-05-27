<template>
    <div>
    <div v-if="this.$store.state.auth.loggedIn">
        You are logged in.
    </div>
    <div v-else class="content has-text-centered">
        <h1 class="is-title is-bold">Login</h1>

        <div class="columns is-vcentered">
            <div class="column is-6 is-offset-3">
                <div class="box">
                    <div v-show="error" style="color:red; word-wrap:break-word;">Check username/password</div>
                    <form v-on:submit.prevent="login">
                        <div class="field">
                            <label class="label">Username</label>
                            <p class="control">
                                <input v-model="username" class="input" type="text"
                                       placeholder="Your Username">
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <p class="control">
                                <input v-model="password" class="input" type="password"
                                       placeholder="Your Password">
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="rememberMe">
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
    </div>
</template>

<script>
    import * as qs from "qs";
    import * as types from "../../store/mutation-types";

    const loginURL = 'obtain_token/'

    export default {
        data() {
            return {
                username: null,
                password: null,
                rememberMe: true,
                error: false
            }
        },
        mounted() {
          if(this.$store.state.auth.loggedIn){
              this.$router.push('/profile')
          }
        },
        methods: {
            login() {
                let new_axios = this.$http.create({ headers: {'Authorization': ''}})
                new_axios.post(loginURL, qs.stringify({username: this.username, password: this.password})).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit(types.LOGIN, {user: response.data.user, token: response.data.token})
                        if(this.rememberMe){
                            localStorage.setItem('token', response.data.token);
                        }
                        this.$http.defaults.headers.authorization = 'Token ' + response.data.token;
                        this.$router.push('/data/all')
                    }
                ).catch(
                    (error) => {
                        this.error = error
                    }
                )
            }
        }
    }
</script>

<style lang="scss" scoped>
    .is-title {
        text-transform: capitalize;
    }
</style>
