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
                                <span class="subtitle level-item">&lt;Owner&gt;</span>
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
                            <p><small class="has-text-danger">OFFICIAL</small></p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Likes</p>
                            <p class="title">789</p>
                            <p><small>POP</small></p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        </div>
            <div class="tile is-ancestor">
                <div class="tile is-parent is-8">
                    <article class="tile is-child box">
                        <h4 class="title">Table Responsive</h4>
                        <div class="table-responsive">
                            <table class="table is-bordered is-striped is-narrow">
                                <tbody>
                                <tr>
                                    <td>rownum</td>
                                    <td>weight</td>
                                    <td>Time</td>
                                    <td>Chick</td>
                                    <td>Diet</td>
                                    <td>rownum</td>
                                    <td>weight</td>
                                    <td>Time</td>
                                    <td>Chick</td>
                                    <td>Diet</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>51</td>
                                    <td>2</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>59</td>
                                    <td>4</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>64</td>
                                    <td>6</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>76</td>
                                    <td>8</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>93</td>
                                    <td>10</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>42</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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


    const api = 'datasets/'

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
                error: false
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
            }
        },
        beforeMount () {
            this.isloading = true
            this.$http.get( api + this.id + '/?format=json').then((response) => {
                console.log(response.data)
                this.myDataset = response.data
            }).catch((error) => {
                this.error = true
            })
        }
    }
</script>

<style scoped>
    .table-responsive {
        display: block;
        width: 100%;
        min-height: .01%;
        overflow-x: auto;
    }
</style>