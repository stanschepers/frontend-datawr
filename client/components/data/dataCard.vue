<template>
    <base-card
            :title="item.name"
            :content="getDescription(item)">
        <card-footer-item slot="footer" :href="item.meta && item.meta.repository">
                      <span class="icon is-small">
                        <i aria-hidden="true" class="fa fa-line-chart"></i>
                      </span> &nbsp;View
        </card-footer-item>
        <card-footer-item slot="footer" element='link' :to="{name: item.name}">

                  <span class="icon is-small">
                    <i aria-hidden="true" class="fa fa-edit"></i>
                  </span>&nbsp;&nbsp;Edit
        </card-footer-item>
        <card-footer-item class="has-text-danger" slot="footer" element='link' :to="{name: item.name}">
                  <span class="icon is-small">
                    <i aria-hidden="true" class="fa fa-times-circle"></i>
                  </span>&nbsp;Delete
        </card-footer-item>
    </base-card>
</template>

<script>
    /* eslint-disable indent */

    import {BaseCard, CardFooterItem} from 'vue-bulma-card'

    export default {
        components: {
            BaseCard,
            CardFooterItem
        },
        props: {
            item: Object
        },
        methods: {
            getActions (item) {
                return [{
                    text: 'Repository',
                    icon: 'github',
                    href: item.meta && item.meta.repository
                }, {
                    text: 'Demo',
                    icon: 'link',
                    name: item.name
                }]
            },

            getDescription (item) {
                return item.meta && item.meta.description
            }
        }

    }
</script>
