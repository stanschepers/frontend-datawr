<template>
    <base-card
            :title="item.name"
            :content="item.description">
        <card-footer-item slot="footer" element='link' :to="{name: item.name}">
                      <span class="icon is-small">
                        <i aria-hidden="true" class="fa fa-line-chart"></i>
                      </span>&nbsp;View
        </card-footer-item>
        <card-footer-item class="has-text-dark" slot="footer" element='link' :to="{name: item.name}">
                  <span class="icon is-small">
                    <i aria-hidden="true" class="fa fa-gear"></i>
                  </span>&nbsp;&nbsp;Settings
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
        }

    }
</script>
