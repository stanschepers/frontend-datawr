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
                    <div class="level-item has-text-left">
                        <div class="select">
                            <select>
                                <option selected>Column 1</option>
                                <option>Column 2</option>
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
                <nav class="level is-mobile">
                    <div class="level-item has-text-left">
                        <div class="select">
                            <select>
                                <option>Column 1</option>
                                <option selected>Column 2</option>
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
                            <p><small class="has-text-danger">INCOMPLETE</small></p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Min</p>
                            <p class="title">789</p>
                            <p><small class="has-text-success">UPDATED</small></p>
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
                        <h4 class="title">Transormations</h4>
                        <div class="block is-flex">
                            <collapse accordion>
                                <collapse-item title="Table changes">
                                    <collapse accordion>
                                        <collapse-item title="Change Attribute">

                                            <div class="field">
                                                <div class="control is-grouped">
                                                    <div class="control-label">
                                                        <label class="label">Select column to change</label>
                                                    </div>
                                                    <div class="select is-fullwidth">
                                                        <select>
                                                            <option>registration_id</option>
                                                            <option>client_id</option>
                                                            <option>checkin_time</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <div class="control is-grouped">
                                                    <div class="control-label">
                                                        <label class="label">Select attribute type</label>
                                                    </div>
                                                    <div class="select is-fullwidth">
                                                        <select>
                                                            <option>integer</option>
                                                            <option>text</option>
                                                            <option>date</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <div class="block">
                                                    <button class="button is-info">Update Attribute</button>
                                                </div>
                                            </div>



                                        </collapse-item>

                                        <collapse-item title="Remove attribute">

                                            <div class="field">
                                                <div class="control is-grouped">
                                                    <div class="control-label">
                                                        <label class="label">Select column to delete</label>
                                                </div>
                                                    <div class="select is-fullwidth">
                                                        <select>
                                                            <option>registration_id</option>
                                                            <option>client_id</option>
                                                            <option>checkin_time</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <div class="block">
                                                    <button class="button is-danger">Delete Attribute</button>
                                                </div>
                                            </div>
                                        </collapse-item>
                                        <collapse-item title="Join operations">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                                        </collapse-item>

                                    </collapse>
                                </collapse-item>

                                <collapse-item title="Numerical transformations">
                                    <collapse accordion>
                                        <collapse-item title="Normalise">
                                            <div class="block">
                                                Normalise numerical columns between 0 and 1.

                                                <div class="control is-horizontal">
                                                    <div class="control-label">
                                                        <label class="label">Column</label>
                                                    </div>
                                                    <div class="control">
                                                        <div class="select is-fullwidth">
                                                            <select>
                                                                <option>registration_id</option>
                                                                <option>client_id</option>
                                                                <option>checkin_time</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="control is-horizontal">
                                                    <div class="control-label">
                                                        <label class="label">Mean</label>
                                                    </div>
                                                    <div class="control is-grouped">
                                                        <p class="control is-expanded">
                                                            <input class="input" type="number" placeholder="mean">
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="control is-horizontal">
                                                    <div class="control-label">
                                                        <label class="label">Standard deviation</label>
                                                    </div>
                                                    <div class="control is-grouped">
                                                        <p class="control is-expanded">
                                                            <p></p>
                                                            <input class="input" type="number" placeholder="standard deviation">
                                                        </p>
                                                    </div>
                                                </div>


                                                <div class="control is-grouped">
                                                    <div class="control-label">
                                                        <label class="label"></label>
                                                    </div>
                                                    <div class="control">
                                                        <button class="button is-primary">Normalise</button>
                                                    </div>
                                                </div>
                                            </div>




                                        </collapse-item>
                                        <collapse-item title="Discretise">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                                        </collapse-item>
                                        <collapse-item title="Remove outliers">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                                        </collapse-item>
                                    </collapse>
                                </collapse-item>

                                <collapse-item title="Date | time parsing">
                                    <collapse accordion>
                                        <collapse-item title="Parse date/time values">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                                        </collapse-item>
                                        <collapse-item title="....">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                                        </collapse-item>
                                    </collapse>
                                </collapse-item>

                                <collapse-item title="One-hot-encoding">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
                                </collapse-item>

                                <collapse-item title="Find-and-replace">
                                    <div class="field">
                                        <p class="control">
                                            <input class="input" type="text" placeholder="Find">
                                        </p>
                                    </div>

                                    <div class="field">
                                        <p class="control">
                                            <input class="input" type="text" placeholder="Replace by">
                                        </p>
                                    </div>

                                    <div class="field">
                                        <p class="control">

                                        <div class="field is-grouped">
                                            <div class="b-checkbox is-default is-inline">
                                                <input id="matchcase" class="styled" checked type="checkbox">
                                                <label for="matchcase">
                                                    Match case
                                                </label>
                                            </div>
                                            <div class="b-checkbox is-default is-inline">
                                                <input id="word" class="styled" checked type="checkbox">
                                                <label for="word">
                                                    Word
                                                </label>
                                            </div>
                                            <div class="b-checkbox is-default is-inline">
                                                <input id="regex" class="styled" checked type="checkbox">
                                                <label for="regex">
                                                    Regex
                                                </label>
                                            </div>
                                        </div>
                                        <div class="field is-grouped">
                                            <div class="block">
                                                <button class="button is-primary">Find</button>
                                                <button class="button is-primary is-outlined">Find & Replace</button>
                                                <button class="button is-primary is-outlined">Replace All</button>
                                            </div>
                                        </div>
                                        </p>
                                    </div>

                                </collapse-item>
                            </collapse>
                        </div>
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



    const api = 'datasets/'

    export default {
        name: 'dataset',
        components: {DataCard, Chart, Collapse, CollapseItem},
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
    @import "~cool-checkboxes-for-bulma.io";
    .table-responsive {
        display: block;
        width: 100%;
        min-height: .01%;
        overflow-x: auto;
    }
</style>