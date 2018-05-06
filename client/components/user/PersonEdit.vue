<template>
    <form @change="save">
        <div class="block">
            <div class="level is-mobile">
                <div class="level-left">
                    <h3 class="subtitle level-item">Edit your profile </h3>
                </div>
                <div class="level-right">
                    <a class="delete is-small level-item" @click="close"></a>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input disabled class="input" maxlength="63" v-model="person.username" type="text" name="name"
                           placeholder="First Name"/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input  class="input" maxlength="63" v-model="person.old_password" type="password" name="old_password"
                           placeholder="Old Password"/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input  class="input" maxlength="63" v-model="person.new_password" type="password" name="new_password"
                            placeholder="New Password"/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input  class="input" maxlength="63" v-model="person.new_password2" type="password" name="new_password2"
                           placeholder="New Password (Repeat)"/>
                </div>
            </div>
            <p class="help is-danger" v-if="passwordMatch">Passwords don't match</p>
            <div class="field">
                <div class="control">
                    <input class="input" maxlength="63" v-model="person.first_name" type="text" name="name"
                           placeholder="First Name"/>
                </div>
                <p class="help is-danger" v-if="firstNameIsEmpty">First Name can not be empty</p>
            </div>
            <div class="field">
                <div class="control">
                    <input class="input" maxlength="63" v-model="person.last_name" type="text" name="name"
                           placeholder="Last Name"/>
                </div>
                <p class="help is-danger" v-if="lastNameIsEmpty">Last Name can not be empty</p>
            </div>
            <div class="field">
                <div class="control">
                    <input class="input" maxlength="63" v-model="person.email" type="email" name="email"
                           placeholder="Email"/>
                </div>
                <p class="help is-danger" v-if="emailIsEmpty">Email can not be empty</p>

            </div>
            <div class="field">
                <div class="control">
                    <textarea v-bind:maxlength="MAX_LENGTH_ABOUT + 1" class="textarea" v-model="person.about"
                              placeholder="About me"></textarea>
                </div>
                <p class="help" :class="[aboutIsOutOfRange ? 'is-danger': 'is-info']">{{ MAX_LENGTH_ABOUT -
                    aboutRemaingChars}} / {{ MAX_LENGTH_ABOUT}} </p>

            </div>
        </div>
    </form>
</template>

<script>
    /* eslint-disable indent */
    /* eslint-disable brace-style */
    import * as qs from 'qs'


    export default {
        name: 'person-edit',
        props: {
            person: Object,
        },
        data() {
            return {
                unsaved_changed: false,
                MAX_LENGTH_ABOUT: 140,
                deleted: ''
            }
        },
        methods: {

            close: function () {

                this.$emit('close')

            },
            save() {
                if (!this.formIsNotValid) {
                    this.$http.put('/core/profile/', qs.stringify(this.person)).then(
                        (response) => {
                            console.log('yeeey')
                        }
                    ).catch((err) => {
                        console.log('ooooh')
                    })
                }
            }
            // deleteAccount () {
            //     this.$http.delete(api1)
            //     this.$router.back()
            // }

        },
        computed: {
            firstNameIsEmpty: function () {
                return this.person.first_name.length === 0
            },
            lastNameIsEmpty: function () {
                return this.person.last_name.length === 0
            },
            userNameIsEmpty: function () {
                return this.person.username.length === 0
            },
            emailIsEmpty: function () {
                return this.person.email.length === 0
            },
            aboutIsEmpty: function () {
                return this.person.about.length === 0
            },
            aboutRemaingChars: function () {
                return this.MAX_LENGTH_ABOUT - this.person.about.length
            },
            aboutIsOutOfRange: function () {
                return this.aboutIsEmpty || this.MAX_LENGTH_ABOUT < this.person.about.length
            },
            passwordMatch: function () {
                if(this.person.old_password !== 'undefined' || this.person.old_password !== null || this.person.old_password.length !== 0){
                    return this.person.new_password !== this.person.new_password2
                } return false
            },
            formIsNotValid: function () {
                return this.aboutIsOutOfRange || this.emailIsEmpty || this.firstNameIsEmpty || this.lastNameIsEmpty || this.passwordMatch || this.lastNameIsEmpty
            }
        }
    }
</script>

<style scoped>

</style>
