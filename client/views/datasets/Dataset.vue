<template>
    <div v-if="myDataset">
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <div class="tile is-child box">
                    <nav class="level is-mobile">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Tweets</p>
                                <p class="title">3,456</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Following</p>
                                <p class="title">123</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Followers</p>
                                <p class="title">456K</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Likes</p>
                                <p class="title">789</p>
                            </div>
                        </div>
                    </nav>
                    <nav class="level is-mobile">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Tweets</p>
                                <p class="title">3,456</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Following</p>
                                <p class="title">123</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Followers</p>
                                <p class="title">456K</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Likes</p>
                                <p class="title">789</p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item">
                                <span class="title level-item">{{ myDataset.name }}</span>
                            </div>
                            <div class="level-item">
                                <span class="subtitle level-item">{{ myDataset.owner.name}}</span>
                            </div>
                        </div>
                        <div class="level-right">
                            <router-link to=""><i class="fa fa-gear level-item"></i></router-link>
                        </div>
                    </div>
                    <div class="content">
                        <p>{{myDataset.description}}</p>
                    </div>
                </article>
            </div>
        </div>
            <div class="tile is-ancestor">
                <div class="tile is-parent is-8">
                    <article class="tile is-child box">
                        <h4 class="title">Table Responsive</h4>
                        <div class="table-responsive">
                            <table class="table is-bordered is-striped is-narrow">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Open source projects</th>
                                    <th>Year started</th>
                                    <th colspan="3">Links</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Open source projects</th>
                                    <th>Year started</th>
                                    <th colspan="3">Links</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                <tr>
                                    <td class="is-icon">
                                        <i class="fa fa-android"></i>
                                    </td>
                                    <td>
                                        <a href="#">Android</a>
                                    </td>
                                    <td>
                                        2003
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-github"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-globe"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="is-icon">
                                        <i class="fa fa-firefox"></i>
                                    </td>
                                    <td>
                                        <a href="#">Firefox</a>
                                    </td>
                                    <td>
                                        2003
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-github"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-globe"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="is-icon">
                                        <i class="fa fa-linux"></i>
                                    </td>
                                    <td>
                                        <a href="#">Linux</a>
                                    </td>
                                    <td>
                                        2003
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-github"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-globe"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="is-icon">
                                        <i class="fa fa-wordpress"></i>
                                    </td>
                                    <td>
                                        <a href="#">WordPress</a>
                                    </td>
                                    <td>
                                        2003
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-github"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </td>
                                    <td class="is-icon">
                                        <a href="#">
                                            <i class="fa fa-globe"></i>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <h4 class="title">PIE</h4>
                        <chart :type="'pie'" :data="pieData" :options="options"></chart>
                    </article>
                </div>
        </div>
    </div>
    <div v-else>
        <p class="has-text-danger">
            There went something wrong getting your dataset.
        </p>
    </div>

</template>

<script>
    import DataCard from '../../components/data/dataCard'
    import Chart from 'vue-bulma-chartjs'


    const api = '/API/datasets/'

    export default {
        name: 'dataset',
        components: {DataCard, Chart},
        data () {
            return {
                myDataset: null,
                id: this.$route.params.id,
                labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
                data: [3, 22, 70, 5],

                options: {
                    segmentShowStroke: true
                },
                backgroundColor: [
                    '#1fc8db',
                    '#fce473',
                    '#42afe3',
                    '#ed6c63',
                    '#97cd76'
                ],

                labels_2: ['April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'],
                data_2: [1, 9, 3, 4, 5, 6, 7, 8, 2].map(e => (Math.sin(e) * 25) + 25),

                labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
                data_3: [
                    [65, 59, 90, 81, 56, 55, 40],
                    [28, 48, 40, 19, 88, 27, 45]
                ],
                options_3: {
                    tooltips: {
                        mode: 'label'
                    }
                },
                backgroundColor_3: [
                    'rgba(31, 200, 219, 1)',
                    'rgba(151, 205, 118, 1)'
                ],
                series: ['Product A', 'Product B']
            }
        },

        computed: {
            pieData () {
                return {
                    labels: this.labels,
                    datasets: [{
                        data: this.data,
                        backgroundColor: this.backgroundColor
                    }]
                }
            },

            waveData () {
                return {
                    labels: this.labels_2,
                    datasets: [{
                        label: 'My Radar',
                        data: this.data_2,
                        backgroundColor: this.backgroundColor[0]
                    }]
                }
            },

            seriesData () {
                let data = {
                    labels: this.labels_3
                }
                data.datasets = this.series.map((e, i) => {
                    return {
                        data: this.data_3[i],
                        label: this.series[i],
                        borderColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
                        pointBackgroundColor: this.backgroundColor_3[i],
                        backgroundColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)')
                    }
                })
                return data
            }
        },
        created () {
            this.isloading = true
            this.$http.get( api + this.id + '/?format=json').then((response) => {
                this.myDataset = response.data
            }).catch((error) => {
                // openMessage({
                //     message: 'Something went wrong in getting the dataset',
                //     type: 'danger'
                // })
                window.alert('Lap')
            })
        }
    }
</script>

<style scoped>

</style>