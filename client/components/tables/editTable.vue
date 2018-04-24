<template>
    <div>
        <div class="block">
            <form @change="saveChanges">

            <div class="level is-mobile">
                <div class="level-left">
                    <h3 class="subtitle level-item">Edit Dataset {{ dataset.name }}</h3>
                </div>
                <div class="level-right">
                    <a @click="$emit('close')" class="delete"> </a>
                </div>
            </div>
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
        </form>
            <!--<hr/>-->
            <!--<div class="field">-->
                <!--<div class="control level is-mobile">-->
                    <!--<div class="level-left">-->
                        <!--<div class="control level-item">-->
                            <!--<a @click="saveChanges" class="button is-primary" :disabled="formIsNotValid">-->
                                <!--Change-->
                            <!--</a>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="field">
                <div class="control">
                    <table class="table is-fullwidth">
                        <thead>
                        <tr>
                            <th> Name</th>
                            <th> Permission</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="read_person in read">
                            <tr>
                                <td> {{ read_person.username }}</td>
                                <td> READ</td>
                                <td><a class="delete" @click="deleteRead(read_person.id)"> </a></td>
                            </tr>
                        </template>
                        <template v-for="write_person in write">
                            <tr>
                                <td> {{ write_person.username }}</td>
                                <td> READ + WRITE</td>
                                <td><a class="delete" @click="deleteWrite(write_person.id)"> </a></td>
                            </tr>
                        </template>
                        <tr>
                            <td>
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <div class="select">
                                            <select v-model="selectedUser">
                                                <template v-for="user in users">
                                                    <option :value="user.id"> {{ user.username }}</option>
                                                </template>
                                            </select>
                                        </div>
                                        <div class="icon is-small is-left">
                                            <i class="fa fa-user"></i>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="field">
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="selectedPermission">
                                                <option value="1"> Read</option>
                                                <option value="2"> Read + Write</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a class="button is-primary" @click="addUser">Add</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import 'qs'
    import * as qs from "qs";

    export default {
        name: 'edit-table',
        props: {
            dataset: Object
        },
        created() {
            this.getUsers();
            this.getPermissions();
        },
        data() {
            return {
                unsaved_changed: false,
                MAX_LENGTH_ABOUT: 140,
                deleted: '',
                tab: 'read',
                read: [],
                write: [],
                users: [],
                selectedUser: null,
                selectedPermission: 1
            }
        },
        methods: {
            // has_changed: function () {
            //     this.unsaved_changed = true
            // },
            // cancel: function () {
            //     // this.person.name = this.oldPerson.name
            //     // this.person.email = this.oldPerson.email
            //     // this.person.about = this.oldPerson.about
            // },
            // send_changes: function () {
            //     this.$emit('save')
            //     this.unsaved_changed = false
            //     this.close()
            // },
            close: function () {
                if (this.unsaved_changed) {
                    window.alert('There are unsaved fields')
                } else {
                    this.$emit('close')
                }
            },
            getUsers() {
                this.$http.get('/core/profiles/').then((response) => {
                    this.users = response.data
                }).catch((error) => window.alert('Something went wrong getting the persons'))
            },
            getPermissions() {
                this.$http.get('/core/permission/?dataset_id=' + this.dataset.id.toString()).then((response) => {
                    this.read = response.data.read
                    this.write = response.data.write
                }).catch((error) => window.alert('Something went wrong getting the permissions'))
            },
            deleteRead(id) {
                this.$http.delete('/core/permission/?dataset_id=' + this.dataset.id.toString() + '&user_id=' + id.toString()).then(
                    (response) => {
                        this.read = this.read.filter(function (obj) {
                            return obj.id !== id;
                        });
                    }
                )
            },
            deleteWrite(id) {
                this.$http.delete('/core/permission/?dataset_id=' + this.dataset.id.toString() + '&user_id=' + id.toString()).then(
                    (response) => {
                        this.write = this.write.filter(function (obj) {
                            return obj.id !== id;
                        });
                    }
                )
            },
            addUser() {
                this.$http.post('/core/permission/', qs.stringify({
                    user_id: this.selectedUser,
                    dataset_id: this.dataset.id,
                    permission_id: this.selectedPermission
                })).then( (res) => {
                    this.getPermissions();
                })



            },
            saveChanges() {
                this.$http.put('/data/?dataset_id=' + this.dataset.id + '&name=' + this.dataset.name + '&description' + this.dataset.description).then((response) => {
                    console.log('Saved')
                }).catch((error) => window.alert('Something went wrong getting saving the dataset'))
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
                    return this.nameIsEmpty || this.aboutIsOutOfRange
                }
        }
    }

</script>
