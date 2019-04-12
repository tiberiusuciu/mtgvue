<template>
    <div class="usernamecontainer">
        <div class="username-area">
            <div class="verticalalign">
                <h1 class="title">Create a username</h1>
                <p class="sub-title">You are almost done!</p>
                <p class="sub-title">Set your username for others to identify you!</p>
                <div class="formarea" id="username" :class="{
                        'valid': requests.requestSent && !requests.isLoading && !requests.errorCode,
                        'invalid': requests.requestSent && !requests.isLoading && requests.errorCode
                    }">
                    <div class="left-pill">
                        <template v-if="requests.requestSent && !requests.isLoading && !requests.errorCode">
                            <i class="fas fa-check"></i>
                        </template>
                        <template v-if="requests.requestSent && !requests.isLoading && requests.errorCode">
                            <i class="fas fa-times"></i>
                        </template>
                        <template v-if="!requests.requestSent && !requests.isLoading && !requests.errorCode">
                            <i class="fas fa-user"></i>
                        </template>
                    </div>
                    <input
                        type="text"
                        placeholder="username"
                        v-model="formdata.username"
                        @input="applyColoration('username')"
                        :disabled="requests.requestSent">
                    <div class="right-pill" @click="verifyOrRetry" :class="{'disabled': formdata.username.length == 0}">
                        <span v-if="!requests.requestSent && !requests.isLoading && !requests.errorCode">Verify</span>
                        <span v-else>Retry</span>
                    </div>
                </div>
                <p class="sub-title post-form" v-if="requests.errorCode == 'NAME_TAKEN'">That name is not available, please try again</p>
                <p class="sub-title post-form error-message" style="margin-top:30px;" v-if="requests.errorCode == 'NAME_INVALID'">That name is not valid, please try again</p>
                <p class="sub-title post-form error-message" v-if="requests.errorCode == 'NAME_INVALID'">- It must not have special characters</p>
                <p class="sub-title post-form error-message" v-if="requests.errorCode == 'NAME_INVALID'">- It must not be longer than 12 characters</p>
                <div class="submit-button save" @click="submitName" v-if="requests.requestSent && !this.requests.isLoading && !requests.errorCode">
                    Save
                </div>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formdata: {
                    username: ""
                },
                isValid: false,
                displayError: false,
            }
        },
        methods: {
            verifyOrRetry() {
                // is invalid


                this.formdata.username = this.formdata.username.trim();
                var format = /[!@#$%^&*()+\\=\[\]{};':"\\|,.<>\/?]/;
                this.isValid = !format.test(this.formdata.username) && !this.formdata.username.length == 0 && this.formdata.username.length <= 12;

                if (!this.isValid && !this.displayError) {
                    this.displayError = true;
                    this.requests.errorCode = "NAME_INVALID";
                    this.requests.requestSent = true;
                    this.requests.isLoading = false;
                    return;
                }

                if (this.formdata.username.isTouched) {
                    this.applyValidationColor('username', this.formdata.username.isValid)
                }

                if (this.requests.requestSent && !this.requests.isLoading) {
                    // cancel reqeust, re-init formdata
                    this.formdata.username = "";
                    this.$store.dispatch('clearRequest');
                }
                else if (this.formdata.username.length > 0 || this.requests.isLoading) {
                    this.$store.dispatch('onSubmitUsername', {username: this.formdata.username, toVerify: true});
                }                
            },
            submitName() {
                console.log('username saved');
                this.$store.dispatch('onSubmitUsername', {username: this.formdata.username, toVerify: false});
            },
            applyColoration() {
                if (!this.requests.requestSent && !this.requests.isLoading) {
                    var formarea = document.querySelector('.formarea');
                    if (this.formdata.username.length > 0) {
                        formarea.classList.add('active');
                    }
                    else {
                        formarea.classList.remove('active');
                    }
                }
            }
        },
        computed: {
            requests() {
                return this.$store.getters.requests;
            }
        },
    }
</script>

<style scoped>
    .usernamecontainer {
        display: flex;
    }
    .username-area {
        display: inline-block;
        left: 0;
        width: 700px;
        z-index: 1;
        -webkit-box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        -moz-box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        height: 100vh;
    }
    .bg {
        height: 100vh;
        background-image: url('/img/backgrounds/username.jpg');
        background-size: cover;
        background-position-y: center;
        background-position-x: center;
        flex: 1;
    }
    .title {
        padding-left: 165px;
        color: #888;
        font-weight: lighter;
    }
    .sub-title {
        padding-left: 145px;
        color: #888;
        font-weight: lighter;
    }

    .verticalalign {
        position: absolute;
        width: 700px;
        top: 50%;
        transform: translateY(-65%);
    }

    .formarea {
        margin-top: 30px;
        height: 60px;
        box-sizing: border-box;
        display: flex;
        margin: auto;
        margin-top: 25px;
        width: 60%;
    }
    .formarea input {
        height: 60px;
        border: none;
        border: 2px solid #dedede;
        border-left: none;
        border-right: none;
        vertical-align: bottom;
        box-sizing: border-box;
        flex: 1;
        outline: none;
        background-color: ghostwhite;
        font-size: 1.05em;
    }
    .formarea i {
        text-align: center;
        line-height: 58px;
        color: #aaa;
        font-size: 22px;
    }
    .formarea input::placeholder {
        color: #aaa;
    }
    .left-pill {
        width: 70px;
        height: 60px;
        display: inline-block;
        margin-top: 0px;
        border: 2px solid #dedede;
        border-right: none;
        border-bottom-left-radius: 35px;
        border-top-left-radius: 35px;
        box-sizing: border-box;
        vertical-align: bottom;
        background-color: ghostwhite;
        text-align: center;
    }
    .right-pill {
        width: 100px;
        height: 60px;
        display: inline-block;
        margin-top: 0px;
        border: none;
        border-bottom-right-radius: 35px;
        border-top-right-radius: 35px;
        box-sizing: border-box;
        vertical-align: bottom;
        background-color: ghostwhite;
        text-align: center;
        line-height: 62px;
        cursor: pointer;
        background: rgba(52,163,247,1);
        background: -moz-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(52,163,247,1)), color-stop(100%, rgba(90,39,230,1)));
        background: -webkit-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -o-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -ms-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: linear-gradient(to right, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#34a3f7', endColorstr='#5a27e6', GradientType=1 );
        color: ghostwhite;
        font-weight: bold;
        padding-right: 7px;
    }
    .right-pill:hover {
        opacity: .8;
    }
    .disabled {
        background: #dedede;
        cursor: auto;
    }
    .disabled:hover {
        opacity: 1;
    }
    
    .submit-button {
        border-radius: 35px;
        text-align: center;
        color: ghostwhite;
        font-weight: bold;
        height: 60px;
        display: block;
        margin: auto;
        width: 60%;
        margin-top: 25px;
        line-height: 60px;
    }

    .active i, .active .left-pill, .active input {
        color: dodgerblue;
        border-color: dodgerblue;
    }

    .valid i, .valid .left-pill, .valid input, .valid .submit-button{
        color: lightgreen;
        border-color: lightgreen;
    }
    .valid .right-pill {
        background: lightgreen;
        color: white;
    }

    .invalid i, .invalid .left-pill, .invalid input, .invalid .submit-button{
        color: lightcoral;
        border-color: lightcoral;
    }
    .invalid .right-pill {
        background: lightcoral;
        color: white;
    }
    
    .post-form {
        margin-top: 40px;
    }

    .save {
        background: rgba(52,163,247,1);
        background: -moz-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(52,163,247,1)), color-stop(100%, rgba(90,39,230,1)));
        background: -webkit-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -o-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -ms-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: linear-gradient(to right, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#34a3f7', endColorstr='#5a27e6', GradientType=1 );
        cursor: pointer;
    }
    .save:hover {
        opacity: .8;
    }
    .error-message {
        margin-top: 0px;
    }
</style>
