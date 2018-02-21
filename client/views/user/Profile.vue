<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
                <person-view :person="person" :me="true" :showEdit="showEdit" v-on:toggleShowEdit="[showEdit = !showEdit]"/>
            </div>
            <div class="tile is-child box">
                <p>
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui.
                </p>
            </div>
        </div>
        <div v-if="showEdit" class="tile is-parent">
            <div class="tile is-child box">
                <person-edit :person="person"/>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable indent */
    import PersonView from '../../components/user/Person'
    import PersonEdit from '../../components/user/PersonEdit'

    let person = {
        name: 'Stanneman',
        email: 'stan@winak.be',
        title: 'Admin',
        about: 'Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.'

    }

    export default {
        components: {PersonEdit, PersonView},
        name: 'profile',
        data () {
            return {
                person: person,
                showEdit: false
            }
        },
        methods: {
            toggleShowEdit: function () {
            }
        }
    }

</script>

<style scoped>

</style>
