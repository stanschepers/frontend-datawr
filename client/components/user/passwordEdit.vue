<template>
    <form @change="checkEmpty">
        <div class="field">
            <div class="control">
                <input class="input" maxlength="63" v-model="pw.old_password" type="password"
                       name="old_password"
                       placeholder="Old Password"/>
                <p class="help is-danger" v-if="empty">Fill in your old password</p>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input" maxlength="63" v-model="pw.new_password" type="password"
                       name="new_password" @change="checkMatch"
                       placeholder="New Password"/>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input" maxlength="63" v-model="pw.new_password2" type="password"
                       name="new_password2" @input="checkMatch"
                       placeholder="New Password (Repeat)"/>
                <p class="help is-danger" v-if="!match">Passwords don't match</p>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <a class="button is-danger" @click="savePW"> Change Password </a>
            </div>
        </div>
    </form>
    
</template>

<script>
    import * as qs from "qs";

    export default {
        name: "password-edit",
        data() {
            return {
                pw: {
                    new_password: '',
                    new_password2: '',
                    old_password: '',
                },
                match: true,
                empty: false
            }
        },
        methods: {
            checkMatch() {
                this.match = this.pw.new_password === this.pw.new_password2;
            },
            checkEmpty() {
                this.empty = this.pw.old_password === ''
            },
            savePW() {

                    this.$http.post('/core/profile/', qs.stringify({'new_password': this.pw.new_password, 'old_password': this.pw.old_password})).then(
                        (response) => {
                            console.log('yeeey pw')
                        }
                    ).catch((err) => {
                        console.log('ooooh pw')
                    })
                }
            },
    }
</script>

<style scoped>

</style>