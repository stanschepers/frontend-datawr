<template>
    <div>
        <h1 class="title">History</h1>

        <div class=" is-very-responsive">

            <table class="table is-striped is-hoverable">
                <thead>
                <tr>
                    <th>Event</th>
                </tr>
                </thead>

                <tfoot>
                </tfoot>
                <tbody>
                <tr style="white-space:nowrap;" v-for="event in history">
                    {{event.transformation}}
                </tr>
                </tbody>
            </table>

        </div>


    </div>
</template>

<script>
    export default {
        props: {
            setid: Number,
        },
        name: "history",

        data() {
            return {
                history: null,

            }
        },

        methods: {

            update() {
                this.$http.get('data/history/' + '?dataset_id=' + this.setid).then((response) => {
                    this.history = response.data;

                }).catch((error) => {
                    window.alert("Something went wrong with getting the history")
                });
            },



        },

        created() {

            this.$http.get('data/history/' + '?dataset_id=' + this.setid).then((response) => {
                this.history = response.data;

            }).catch((error) => {
                window.alert("Something went wrong with getting the history")
            });


        }
    }
</script>

<style scoped lang="scss">

    .is-very-responsive {
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100%;


    }



</style>