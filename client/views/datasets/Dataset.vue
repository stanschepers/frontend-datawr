<template>
<div>
    <div v-if="myDataset">
        <div class="tile is-ancestor">
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item">
                                <span class="title level-item">{{ myDataset.name }}</span>
                            </div>
                            <div class="level-item">
                                <span class="subtitle level-item">{{ myDataset.owner.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <p>{{myDataset.description}}</p>
                    </div>
                    <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            <a><i class="fa fa-heart"></i></a>
                        </div>
                        <div class="level-item">
                            <router-link to=""><i class="fa fa-gear"></i></router-link>
                        </div>
                    </div>
            </div>
                </article>
            </div>
            <div class="tile is-parent">
            <div class="tile is-child box">
                <nav class="level ">
                    <div class="level-item has-text-left">
                        <div class="select">
                            <select>
                                <option v-for="heading in columnTypes">{{heading.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Average</p>
                            <p class="title">3,456</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Max</p>
                            <p class="title">123</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Median</p>
                            <p class="title">456</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Min</p>
                            <p class="title">789</p>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
        </div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">

                    <best-table :columntypes="columnTypes" :setid="myDataset.id"></best-table>

                </article>
            </div>
        </div>


        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">

                    <column-transformations :columntypes="columnTypes" :setid="myDataset.id"></column-transformations>

                </article>
            </div>

        </div>


        <div class="tile is-ancestor">


            <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">BARS</h4>
                <chart :type="'bar'" :data="seriesData" :options="options_3"></chart>
            </article>
            </div>

            <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">LINE</h4>
                <chart :type="'line'" :data="seriesData" :options="options_3"></chart>
            </article>
            </div>

            <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">PIE</h4>
                <chart :type="'pie'" :data="pieData" :options="options"/>
                <br/>
                <p>
                    <router-link to="" class="button is-fullwidth is-primary is-outlined">Show more charts</router-link>
                </p>
            </article>
            </div>
        </div>
    </div>
    <div v-if="error">
        <p class="has-text-danger">
            There went something wrong getting your dataset.
        </p>
    </div>
</div>

</template>

<script>
    import DataCard from '../../components/data/dataCard'
    import Chart from 'vue-bulma-chartjs'
    import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
    import BestTable from '../tables/BestTable'
    import ColumnTransformations  from '../tables/ColumnTransformations'


    const api = 'datasets/'

    export default {
        name: 'dataset',
        components: {
            ColumnTransformations,
            DataCard, Chart, Collapse, CollapseItem, BestTable},
        data () {
            return {
                myDataset: null,
                columnTypes: [],
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
                error: false,

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
        created() {
            this.isloading = true
            this.$http.get( api + this.id + '/?format=json').then((response) => {
                console.log(response.data)
                this.myDataset = response.data
            }).catch((error) => {
                this.error = true
            });

            this.$http.get('data/types/' + '?dataset_id=' + this.id).then((response) => {
                this.columnTypes = response.data;
                console.log(response.data)

            }).catch((error) => {
                window.alert("Something went wrong with getting the datasets")
            });

        },
    }

</script>

<style scoped lang="scss">
    @import "~cool-checkboxes-for-bulma.io";
    .table-responsive {
        display: block;
        width: 100%;
        min-height: .01%;
        overflow-x: auto;
    }
</style>