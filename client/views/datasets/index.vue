<template>
  <div class="columns is-multiline is-mobile">

    <div class="column is-full-mobile is-one-third-tablet is-one-third-desktop" v-for="item in items" v-if="item.name">
      <data-card :item="item"/>
    </div>

  </div>
</template>

<script>
    import DataCard from '../../components/data/dataCard'

    export default {
        components: { DataCard},
        data () {
            return {
                items: getItems()
            }
        }
    }

    function getItems () {
        return [
            {
                name: 'Dataset Cool',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            },
            {
                name: 'Dataset Cool',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            },
            {
                name: 'Dataset Cool',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            },
            {
                name: 'Dataset Cool',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            },
            {
                name: 'Dataset Cool',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            },
            {
                name: 'Dataset Ckjfdk',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            },
            {
                name: 'Dataset Cool',
                meta: {
                    description: 'Hey',
                    repository: 'Hey'
                }
            }
        ]
    }
</script>
