<template>
    <div class="usernamecontainer">
        <div class="username-area">
            <div class="verticalalign">
                <h1 class="title">Create a username</h1>
                <p class="sub-title">You are almost done!</p>
                <p class="sub-title">Set your username for others to identify you!</p>
                <div class="formarea" id="username">
                    <div class="left-pill">
                        <template v-if="false">
                            <i class="fas fa-check"></i>
                        </template>
                        <template v-if="false">
                            <i class="fas fa-times"></i>
                        </template>
                        <template v-if="true">
                            <i class="fas fa-user"></i>
                        </template>
                    </div>
                    <input
                        type="text"
                        placeholder="username"
                        v-model="formdata.username"
                        @input="applyColoration('username')">
                    <div class="right-pill" @click="verify" :class="{'disabled': formdata.username.length == 0}">
                        Verify
                    </div>
                </div>
                <!-- <div class="submit-button" @click="submitName">
                    Submit
                </div> -->
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
                }
            }
        },
        methods: {
            verify() {
                if (this.formdata.username.length > 0) {
                    this.$store.dispatch('onSubmitUsername', this.formdata.username);
                }                
            },
            submitName() {
                console.log('username saved');
                
            },
            applyColoration(id) {
                var lp =  document.querySelector('#' + id + ' .left-pill');
                var input = document.querySelector('#' + id + ' input');
                var i = document.querySelector('#' + id + ' i');
                if (this.formdata.username.length > 0) {
                    lp.style.color = "dodgerblue";
                    input.style.color = "dodgerblue";
                    i.style.color = "dodgerblue";
                    lp.style.borderColor = "dodgerblue";
                    input.style.borderColor = "dodgerblue";
                }
                else {
                    lp.style.color = "#ccc";
                    input.style.color = "#aaa";
                    i.style.color = "#ccc";
                    lp.style.borderColor = "#ccc";
                    input.style.borderColor = "#ccc";
                }
                this.isSubmitAvailable = this.formdata.username.length > 0;
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
        background: url('https://images.unsplash.com/photo-1554585910-c42936acd8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');
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
        border: 2px solid #ccc;
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
        border: 2px solid #ccc;
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
        background: #dedede
    }
</style>
