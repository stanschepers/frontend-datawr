<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img class="profile_pic"
                     src=""/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong >{{ person.first_name }} {{ person.last_name }}</strong>
                    <small > {{ person.username }}</small>

                    <a href="https://api.datawr.ml/admin/"><small class="tag" v-if="person.is_superuser">Admin</small> </a>
                    <br/>
                    {{ person.about }}
                    <br/>
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a v-if="me" class="level-item" @click="toggleShowEdit">
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
