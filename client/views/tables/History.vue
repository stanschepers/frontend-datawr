<template>
    <div class="container">
        <h1 class="title">History</h1>

        <table class="table is-striped is-fullwidth is-hoverable">
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

        created() {

            this.$http.get('data/history/' + '?dataset_id=' + this.setid).then((response) => {
                this.history = response.data;
                console.log(response.data)

            }).catch((error) => {
                window.alert("Something went wrong with getting the history")
            });


        }
    }
</script>

<style scoped lang="scss">

    .table-responsive {
        display: block;
        width: 50%;
        min-height: .01%;
        overflow-x: auto;
    }

</style>