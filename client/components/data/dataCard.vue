<template>
    <base-card
            :title="item.name"
            :content="item.description">
        <card-footer-item slot="footer" element='link' :to="{name: 'Dataset', params:{id: item.id}}">
                      <span class="icon is-small">
                        <i aria-hidden="true" class="fa fa-line-chart"></i>
                      </span>&nbsp;View
        </card-footer-item>
        <card-footer-item v-if="item.favored" class="has-text-danger" slot="footer">
            <span @click="dislike">
                  <span class="icon is-small">
                    <i aria-hidden="true" class="fa fa-heart"></i>
                  </span>&nbsp;&nbsp;Favorite
            </span>
        </card-footer-item>
        <card-footer-item v-else class="has-text-grey" slot="footer">
            <span @click="like">
                  <span class="icon is-small">
                    <i aria-hidden="true" class="fa fa-heart"></i>
                  </span>&nbsp;&nbsp;Favorite
            </span>
        </card-footer-item>
    </base-card>
</template>

<script>
    /* eslint-disable indent */

    import {BaseCard, CardFooterItem} from 'vue-bulma-card'

    export default {
        name: 'DataCard',
        components: {
            BaseCard,
            CardFooterItem
        },
        props: {
            item: Object
        },
        methods: {
            like(){
                this.$http.post('/data/likes/'+ this.item.id + '/').then(
                    (response) => {
                        this.item.favored = true
                    }
                ).catch(
                    (error) => {
                        window.alert('Something went wrong with liking the dataset')
                    }
                )
            },
            dislike(){
                this.$http.delete('/data/likes/'+ this.item.id + '/').then(
                    (response) => {
                        this.item.favored = false
                    }
                ).catch(
                    (error) => {
                        window.alert('Something went wrong with liking the dataset')
                    }
                )
            }
        }

    }
</script>