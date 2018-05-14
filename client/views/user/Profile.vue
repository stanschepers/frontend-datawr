<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <div v-if="person" class="tile is-child box person-view">
                <person-view :person="person" :me="true" :showEdit="showEdit"
                             v-on:toggleShowEdit="showEdit = !showEdit"/>
            </div>
            <div v-if="showEdit" class="tile is-child box animated">
                <person-edit :person="person" v-on:close="showEdit = !showEdit" v-on:save="savedEdit"/>
            </div>
            <div v-if="showEdit" class="tile is-child box animated">
                <password-edit v-on:close="showEdit = false"/>
            </div>
        </div>
        <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
                <p> Debug Settings </p>
                <div class="field">
                    <div class="control">
                        <input class="input" v-model="settings.apiUrl" type="text"
                               placeholder="API URL"/>
                        <!--<p class="help is-danger" v-if="">Fill in your old password</p>-->
                    </div>
                </div>
                <!--<div class="field">-->
                <!--<div class="control">-->
                <!--<input class="input" maxlength="63" v-model="pw.new_password" type="password"-->
                <!--name="new_password" @change="checkMatch"-->
                <!--placeholder="New Password"/>-->
                <!--</div>-->
                <!--</div>-->
                <br/>
                <div class="level is-fixed-bottom">
                    <div class="level-left">

                    </div>

                    <div class="level-right">
                        <a class="level-item button is-outlined is-dark" @click="saveSettings">Change Settings &
                            Logout</a>
                        <router-link :to="{name: 'Logout'}" class="level-item button  is-dark">Logout</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable indent */
    import PersonView from 'components/user/Person'
    import PersonEdit from '../../components/user/PersonEdit'
    import {openMessage} from "../../utils";
    import * as qs from 'qs';
    import PasswordEdit from "../../components/user/passwordEdit";


    const api1 = '/core/profile/'


    export default {
        components: {
            PasswordEdit,
            PersonEdit, PersonView
        },
        name: 'profile',
        data() {
            return {
                person: null,
                showEdit: false,
                settings: {
                    apiUrl: localStorage.getItem('apiURL')
                },
                // settingsChoices: {
                //     apiUrl: ['https://api.datawr.ml/', 'localhost:8000', '127.0.0.1:8000']
                // }
            }
        },
        beforeMount() {
            this.$http.get(api1).then((response) => {
                this.person = response.data;
            }).catch((error) => {
                openMessage({
                    message: 'Something went wrong in getting the profile',
                    type: 'danger'
                })
            })
        },
        methods: {
            saveSettings() {
                localStorage.setItem('apiURL', this.settings.apiUrl)
                this.$http.defaults.baseURL = this.settings.apiUrl
                this.$router.push('/logout')
            }

        },
        computed: {}
    }
</script>

<style scoped>
    .person-view {
        max-height: 10rem;
    }

</style>
