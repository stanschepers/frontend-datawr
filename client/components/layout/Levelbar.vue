<template>
  <nav class="level app-levelbar is-mobile">
    <div class="level-left">
      <div class="level-item">
        <a @click="backward"><i class="fa fa-arrow-left has-text-grey-darker"></i></a>
      </div>
      <div class="level-item">
        <a @click="forward"><i class="fa fa-arrow-right has-text-grey-darker"></i></a>
      </div>
      <div class="level-item">
        <h3 class="subtitle is-5">
          <strong>{{ name }}</strong>
        </h3>
      </div>
    </div>
    <div class="level-right is-hidden-mobile">
      <breadcrumb :list="list"></breadcrumb>
    </div>
  </nav>
</template>

<script>
import Breadcrumb from 'vue-bulma-breadcrumb'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Breadcrumb
  },

  data () {
    return {
      list: null
    }
  },

  created () {
    this.getList()
  },

  computed: {
    name () {
      return this.$route.name
    }
  },

  methods: {
    getList () {
      let matched = this.$route.matched.filter(item => item.name)
      let first = matched[0]
      if (first && (first.name !== 'Home' || first.path !== '')) {
        matched = [{ name: 'Home', path: '/' }].concat(matched)
      }
      this.list = matched
    },
      backward() {
        this.$router.go(-1)
      },
      forward() {
        this.$router.go(1)
      }

  },

  watch: {
    $route () {
      this.getList()
    }
  }
}
</script>
