<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <div v-if="person" class="tile is-child box person-view">
                <person-view :person="person" :me="true" :showEdit="showEdit" v-on:toggleShowEdit="toggleShowEdit"/>
            </div>
            <div v-if="showEdit" class="tile is-child box animated"
                 :class="{ slideInLeft: showEdit, slideOutLeft: !showEdit && !firstTime }">
                <person-edit :person="person" v-on:close="toggleShowEdit" v-on:save="savedEdit"/>
            </div>
        </div>
        <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
                <p>
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget
                    metus.
                </p>
                <br/>
                <div class="level is-mobile">
                    <div class="level-left">
                    </div>
                    <div class="level-right">
                        <router-link :to="{name: 'Logout'}" class="level-item button is-outlined is-dark">Logout</router-link>
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
    import Vue from 'vue'
    import Message from 'vue-bulma-message'

    const MessageComponent = Vue.extend(Message)

    const api1 = '/profiles/1/?format=json'
    const api2 = 'profiles/?format=json'

    const openMessage = (propsData = {
        title: '',
        message: '',
        type: '',
        direction: 'right',
        duration: 1500,
        container: '.messages'
    }) => {
        return new MessageComponent({
            el: document.createElement('div'),
            propsData
        })
    }

    export default {
        components: {PersonEdit, PersonView},
        name: 'profile',
        data() {
            return {
                person: null,
                persons: null,
                showEdit: false,
                firstTime: true,
                isloading: false,
            }
        },
        beforeMount() {
            this.isloading = true
            this.$http.get(api1).then((response) => {
                this.person = response.data;
            }).catch((error) => {
                this.isloading = false
                openMessage({
                    message: 'Something went wrong in getting the profile',
                    type: 'danger'
                })
            })
        },
        methods: {
            toggleShowEdit: function () {
                this.showEdit = !this.showEdit
                this.firstTime = false
            },
            savedEdit: function () {
                this.isloading = true
                this.$http({url: api1, method: 'put', data: this.person}).then((response) => {
                    openMessage({
                        title: 'Saved',
                        type: 'success'
                    })
                }).catch((error) => {
                    openMessage({
                        message: 'Something went wrong in saving your profile',
                        type: 'danger'
                    })
                })
            },
            me: function (person2) {
                return this.person.email === person2.email
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .person-view {
        max-height: 5rem;
    }

</style>
