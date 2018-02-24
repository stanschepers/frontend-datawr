<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img class="profile_pic" src="https://images.unsplash.com/photo-1504455583697-3a9b04be6397?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=84156decc9820febd8d1910d77658cf6&auto=format&fit=crop&h=256&w=256&q=70"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ person.name }}</strong>
                    <small>{{ person.title }}</small>
                    <small v-if="me">(me)</small>
                    <br>
                    {{ person.about }}
                    <br>
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item" @click="toggleShowEdit">
                        <span class="icon is-small has-text-gray"><i class="fa fa-gear"></i></span>
                    </a>
                    <a class="level-item" :href="'mailto:' + person.email">
                        <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                    </a>
                    <a class="level-item" :href="'mailto:' + person.email">
                        <small class="has-text-grey">{{ person.email }}</small>
                    </a>
                </div>
            </nav>
        </div>
        <!--<div v-if="!showEdit" class="media-right">-->
            <!--&lt;!&ndash;<a @click="toggleShowEdit"> <span class="icon is-small has-text-success"><i class="fa fa-user-plus"></i></span> </a>&ndash;&gt;-->
        <!--</div>-->
    </article>
</template>

<script>
    /* eslint-disable indent */
    import person from './PersonEdit'

    export default {
        name: 'person-view',
        props: {
            person: person,
            me: Boolean,
            showEdit: Boolean
        },
        methods: {
            toggleShowEdit: function () {
                this.$emit('toggleShowEdit')
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~bulma/sass/utilities/variables";
    .profile_pic {
        border-radius: 50%;
    }
</style>
