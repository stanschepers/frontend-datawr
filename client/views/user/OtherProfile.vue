<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <div v-if="person" class="tile is-child box person-view">
                <person-view :person="person"/>
            </div>
        </div>
        <div class="tile is-parent is-vertical">
            <div class="tile is-child box person-view">
                <p>
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget
                    metus.
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable indent */
    import PersonView from 'components/user/Person'
    import {openMessage} from "../../utils";


    const api2 = '/core/profiles/'



    export default {
        components: {PersonView},
        name: 'other-profile',
        data() {
            return {
                person: null,
            }
        },
        created() {
            this.$http.get(api2 + $route.params.id + '?format=json').then((response) => {
                this.person = response.data;
            }).catch((error) => {
                openMessage({
                    message: 'Something went wrong in getting the profile',
                    type: 'danger'
                })
            })
        }
    }
</script>

<style scoped>
    .person-view{
        max-height: 2em;
    }

</style>
