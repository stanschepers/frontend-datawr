<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
                <person-view :person="person" :me="true" :showEdit="showEdit" v-on:toggleShowEdit="toggleShowEdit" />
            </div>
            <div v-if="showEdit" class="tile is-child box animated"
                 :class="{ slideInLeft: showEdit, slideOutLeft: !showEdit && !firstTime }">
                <person-edit :person="person" v-on:close="toggleShowEdit" v-on:save="saved"/>
            </div>
        </div>
        <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
                <p>
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget
                    metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
                    elit. Donec sed odio dui.
                </p>
            </div>
            <div v-if="showEdit" class="tile is-child">

            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable indent */
    import PersonView from '../../components/user/Person'
    import PersonEdit from '../../components/user/PersonEdit'
    import Vue from 'vue'
    import Message from 'vue-bulma-message'

    const MessageComponent = Vue.extend(Message)

    let person = {
        name: 'Stanneman',
        email: 'stan@winak.be',
        title: 'Admin',
        about: 'Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.'

    }

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
        data () {
            return {
                person: person,
                showEdit: false,
                firstTime: true
            }
        },
        methods: {
            toggleShowEdit: function () {
                this.showEdit = !this.showEdit
                this.firstTime = false
            },
            saved: function () {
                openMessage({
                    message: 'Changes saved!',
                    type: 'success'
                })
            }
        }
    }
</script>

<style scoped>

</style>
