<template>
    <form>
        <div class="block">
            <div class="level is-mobile">
                <div class="level-left">
                    <h3 class="subtitle level-item">Edit Dataset {{ dataset.name }}</h3>
                </div>
            </div>
            <p> {{ dataset }} </p>
            <div class="field">
                <div class="control">
                    <input class="input" maxlength="63" v-model="dataset.name" type="text" name="name"
                           placeholder="Name"/>
                </div>
                <p class="help is-danger" v-if="nameIsEmpty">Name can not be empty</p>
            </div>
            <div class="field">
                <div class="control">
                                <textarea v-bind:maxlength="MAX_LENGTH_ABOUT + 1" class="textarea"
                                          v-model="dataset.description" placeholder="Description"></textarea>
                </div>
                <p class="help" :class="[aboutIsOutOfRange ? 'is-danger': 'is-info']">{{ MAX_LENGTH_ABOUT -
                    aboutRemaingChars}} / {{ MAX_LENGTH_ABOUT}} </p>

            </div>

            <div class="field">
                <div class="control">
                    <div class="tabs">
                        <ul>
                            <li :class="tab === 'read' ? 'is-active' : ''"><a @click="tab = 'read'">Read Permission</a>
                            </li>
                            <li :class="tab === 'write' ? 'is-active' : ''"><a @click="tab = 'write'">Read+Write
                                Permission</a></li>
                        </ul>
                    </div>
                    <div v-show="tab === 'read'">
                        <p> These persons could read the dataset. They can not edit something. </p>
                        <br/>
                        <div class="tags has-addons">
                            <template v-for="(person, index) in read">
                                <span class="tag is-dark">{{ person.name }}</span>
                                <a @click="" class="tag is-delete"></a> &nbsp;
                            </template>
                            <a class="tag is-success">Add</a>
                        </div>
                    </div>
                    <div v-show="tab === 'write'">
                        <p> These persons could read and edit the dataset. They also can delete the dataset. </p>
                        <div class="tags has-addons">

                            <template v-for="(person, index) in write">
                                <span class="tag is-dark">{{ person.name }}</span>
                                <a @click="write.splice(0, index)" class="tag is-delete"></a> &nbsp;
                            </template>
                            <span class="tag"> Add </span>
                            <a @click="" class="tag is-success"> <i class="fa fa-plus"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
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

</template>

<script>
    export default {
        name: 'edit-table',
        props: {
            dataset: Object
        },
        created() {
            this.getReadPermissions();
            this.getWritePermissions();
        },
        data() {
            return {
                unsaved_changed: false,
                MAX_LENGTH_ABOUT: 140,
                deleted: '',
                tab: 'read',
                read: [],
                write: [],
                users: []
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
            },
            getUsers() {
                this.users = [
                    {name: 'John', id: 13}, {name: 'Len', id: 10}, {name: 'Laurens', id: 12}, {
                        name: 'Mats',
                        id: 4
                    },

                ]
            },
            getReadPermissions() {
                this.read = [{name: 'John', id: 13}, {name: 'Len', id: 10}, {name: 'Laurens', id: 12}, {
                    name: 'Mats',
                    id: 4
                }];
            },
            getWritePermissions() {
                this.write = [{name: 'Stan', id: 1}, {name: 'Luckas', id: 2}];
            }

        },
        computed: {
            nameIsEmpty: function () {
                return this.dataset.name.length === 0
            },
            aboutIsEmpty: function () {
                return this.dataset.description.length === 0
            },
            aboutRemaingChars: function () {
                return this.MAX_LENGTH_ABOUT - this.dataset.description.length
            },
            aboutIsOutOfRange: function () {
                return this.aboutIsEmpty || this.MAX_LENGTH_ABOUT < this.dataset.description.length
            },
            formIsNotValid: function () {
                return this.nameIsEmpty || this.aboutIsOutOfRange || !this.unsaved_changed
            }
        }
    }

</script>
