<template>
    <collapse accordion>

        <collapse-item title="Parse date/time">

        </collapse-item>

        <collapse-item title="Extract">

        </collapse-item>

    </collapse>
</template>

<script>
    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

    export default {
        components: {CollapseItem, Collapse},
        props: {
            columntypes: Array,
            setid: Number,
        },
        name: "date-time",

        data() {
            return {



            }
        },

        methods: {



        },
    }
</script>

<style scoped>

</style>