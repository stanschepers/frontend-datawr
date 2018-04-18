<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <form>
                    <div class="block">
                        <div class="level is-mobile">
                            <div class="level-left">
                                <h3 class="subtitle level-item">Edit your profile </h3>
                            </div>
                            <div class="level-right">
                                <a class="delete is-small level-item" @click=""></a>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input class="input" maxlength="63" v-model="person.name" type="text" name="name"
                                       placeholder="Name"/>
                            </div>
                            <p class="help is-danger" v-if="nameIsEmpty">Name can not be empty</p>
                        </div>
                        <div class="field">

                            <div class="control">
                                <input class="input" maxlength="63" v-model="person.email" type="email" name="email"
                                       placeholder="Email"/>
                            </div>
                            <p class="help is-danger" v-if="emailIsEmpty">Email can not be empty</p>

                        </div>
                        <div class="field">
                            <div class="control">
                                <textarea v-bind:maxlength="MAX_LENGTH_ABOUT + 1" class="textarea"
                                          v-model="person.about" placeholder="About me"></textarea>
                            </div>
                            <p class="help" :class="[aboutIsOutOfRange ? 'is-danger': 'is-info']">{{ MAX_LENGTH_ABOUT -
                                aboutRemaingChars}} / {{ MAX_LENGTH_ABOUT}} </p>

                        </div>
                        <div class="field">
                            <div class="control level is-mobile">
                                <div class="level-left">
                                    <div class="control level-item">
                                        <button type="submit" class="button is-primary" :disabled="formIsNotValid">
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'person-edit',
      props: {
        person: Object
      },
      data () {
        return {
          unsaved_changed: false,
          MAX_LENGTH_ABOUT: 140,
          deleted: ''
        }
      },
      methods: {
        has_changed: function () {
          this.unsaved_changed = true
        },
        cancel: function () {
          // this.person.name = this.oldPerson.name
          // this.person.email = this.oldPerson.email
          // this.person.about = this.oldPerson.about
        },
        send_changes: function () {
          this.$emit('save')
          this.unsaved_changed = false
          this.close()
        },
        close: function () {
          if (this.unsaved_changed) {
            window.alert('There are unsaved fields')
          } else {
            this.$emit('close')
          }
        }
            // deleteAccount () {
            //     this.$http.delete(api1)
            //     this.$router.back()
            // }

      },
      computed: {
        nameIsEmpty: function () {
          return this.person.name.length === 0
        },
        emailIsEmpty: function () {
          return this.person.email.length === 0
        },
        aboutIsEmpty: function () {
          return this.person.about.length === 0
        },
        aboutRemaingChars: function () {
          return this.MAX_LENGTH_ABOUT - this.person.about.length
        },
        aboutIsOutOfRange: function () {
          return this.aboutIsEmpty || this.MAX_LENGTH_ABOUT < this.person.about.length
        },
        formIsNotValid: function () {
          return this.nameIsEmpty || this.aboutIsOutOfRange || this.emailIsEmpty || !this.unsaved_changed
        }
      }
    }

</script>
