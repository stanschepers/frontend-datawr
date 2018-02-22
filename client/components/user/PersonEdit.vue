<template>
    <form @input="has_changed" v-on:submit.prevent="send_changes" :method="'post'">
    <div class="block">
        <div class="level">
            <div class="level-left">
                <h3 class="subtitle level-item">Edit your profile </h3>
            </div>
            <div class="level-right">
                <a class="delete is-small level-item" @click="close"></a>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input"  v-model="person.name" type="text" name="name"/>
            </div>
            <p class="help is-danger" v-if="nameIsEmpty">Name can not be empty</p>
        </div>
        <div class="field">

            <div class="control">
                <input class="input" v-model="person.email" type="email" name="email"/>
            </div>
            <p class="help is-danger" v-if="emailIsEmpty">Email can not be empty</p>

        </div>
        <div class="field">
            <div class="control">
                <textarea v-bind:maxlength="MAX_LENGTH_ABOUT + 1"  class="textarea" v-model="person.about"></textarea>
            </div>
            <p class="help" :class="[aboutIsOutOfRange ? 'is-danger': 'is-info']">{{ MAX_LENGTH_ABOUT - aboutRemaingChars}} / {{ MAX_LENGTH_ABOUT}} </p>

        </div>
        <div class="field">
            <div class=" control level is-mobile">
                <div class="level-left">
                    <div class="control level-item">
                        <button type="submit" class="button is-primary" :disabled="formIsNotValid">
                            Change
                        </button>
                    </div>
                    <div class="control level-item">
                        <button type="reset" class="button is-light" v-if="unsaved_changed">
                            Back &nbsp;
                            <span class="icon is-small"><i class="fa fa-undo"></i></span>
                        </button>
                    </div>
                </div>
                <div class="level-right is-hidden-touch">
                    <div class="control level-item">
                        <button class="button is-danger">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-hidden-desktop">
            <div class="control">
                <a class="button is-danger">
                    Delete Account
                    <!--<span class="icon is-small"><i class="fa fa-times-circle"></i></span>-->
                </a>
            </div>
        </div>
    </div>
    </form>
</template>

<script>
    /* eslint-disable indent */
    /* eslint-disable brace-style */

    import Person from './Person'

    export default {
        name: 'person-edit',
        props: {
            person: Person,
            oldPerson: Person
        },
        data () {
            return {
                unsaved_changed: false,
                MAX_LENGTH_ABOUT: 140,
                deleted: ''
            }
        },
        methods: {
            has_changed: function () {
                this.unsaved_changed = true
            },
            cancel: function () {
                this.person.name = this.oldPerson.name
                this.person.email = this.oldPerson.email
                this.person.about = this.oldPerson.about
            },
            send_changes: function () {
                this.$emit('save')
                this.unsaved_changed = false
                this.close()
            },
            close: function () {
                if (this.unsaved_changed) {
                    window.alert('There are unsaved fields')
                }
                else {
                    this.$emit('close')
                }
            }
        },
        computed: {
            nameIsEmpty: function () {
                return this.person.name.length === 0
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
            formIsNotValid: function () {
                return this.nameIsEmpty || this.aboutIsOutOfRange || this.emailIsEmpty || !this.unsaved_changed
            }
        }
    }
</script>

<style scoped>

</style>
