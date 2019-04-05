<template>
    <div class="bg">
        <div class="backdrop">
            <div class="user-create-box">
                <div class="user-create-form">
                    <h1 class="title">Sign Up</h1>
                    <div class="pill-input" id="email">
                        <div class="left-pill"><i class="fas fa-envelope"></i></div>
                        <div class="pill-input-area">
                            <input 
                                type="email"
                                placeholder="E-Mail"
                                class="pill-input-tag" 
                                v-model="formdata.email.value"
                                @change='hasChanged("email")'
                                @blur='validateEmail()'/>
                        </div>
                        <div class="right-pill"></div>
                    </div>
                    <div class="pill-input" id="username">
                        <div class="left-pill"><i class="fas fa-user-alt"></i></div>
                        <div class="pill-input-area">
                            <input
                                type="text"
                                placeholder="Username"
                                class="pill-input-tag"
                                v-model="formdata.username.value"
                                @change='hasChanged("username")'
                                @blur='validateUsername()'/>
                        </div>
                        <div class="right-pill"></div>
                    </div>
                    <div class="pill-input" id="password">
                        <div class="left-pill"><i class="fas fa-key"></i></div>
                        <div class="pill-input-area">
                            <input
                                type="password"
                                placeholder="Password"
                                class="pill-input-tag"
                                v-model="formdata.password.value"
                                @change='hasChanged("password")'
                                @blur='validatePassword()'/>
                        </div>
                        <div class="right-pill"></div>
                    </div>
                    <div class="pill-input" id="confirm">
                        <div class="left-pill"><i class="fas fa-key"></i></div>
                        <div class="pill-input-area">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                class="pill-input-tag"
                                v-model="formdata.confirmpassword.value"
                                @change='hasChanged("confirmpassword")'
                                @blur='validateConfirmPassword()'/>
                        </div>
                        <div class="right-pill"></div>
                    </div>
                    <div class="submit-button" @click="submitSignup">
                        Submit
                    </div>
                </div>
            </div>
            <div class="secondary-panel">
                <h1>Sign in</h1>
                <h4>If you already have an account, click right here to connect</h4>
                <div class="login-button">
                    Sign In
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                email: {
                    value: "",
                    isValid: false,
                    isTouched: false
                },
                username: {
                    value: "",
                    isValid: false,
                    isTouched: false
                },
                password: {
                    value: "",
                    isValid: false,
                    isTouched: false
                },
                confirmpassword: {
                    value: "",
                    isValid: false,
                    isTouched: false
                },
            }
        }
    },
    methods: {
        submitSignup() {
            console.log(this.formdata);
            this.$store.dispatch('onCreateUser', this.formdata);
        },
        hasChanged(key) {
            this.formdata[key].isTouched = true;
        },
        applyValidationColor (id, isValid) {
            var i = document.querySelector('#' + id + ' i');
            var lp = document.querySelector('#' + id + ' .left-pill');
            var pa = document.querySelector('#' + id + ' .pill-input-area');
            var rp = document.querySelector('#' + id + ' .right-pill');
            var input = document.querySelector('#' + id + ' input');

            if (isValid) {
                i.style.color = "dodgerblue";
                input.style.color = "dodgerblue";
                lp.style.borderColor = "dodgerblue";
                pa.style.borderColor = "dodgerblue";
                rp.style.borderColor = "dodgerblue";
            }
            else {
                i.style.color = "lightcoral";
                input.style.color = "lightcoral";
                lp.style.borderColor = "lightcoral";
                pa.style.borderColor = "lightcoral";
                rp.style.borderColor = "lightcoral";
            }
        },
        validateEmail() {
            // basic email validation
            var emailfield = document.querySelector('#email input');
            this.formdata.email.isValid = emailfield.checkValidity() && this.formdata.email.isTouched && this.formdata.email.value.length > 0;

            if (this.formdata.email.isTouched) {
                this.applyValidationColor('email', this.formdata.email.isValid)
            }
        },
        validateUsername() {
            // Making sure username has no special characters, and it's not empty either
            this.formdata.username.value = this.formdata.username.value.trim();
            var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            this.formdata.username.isValid = !format.test(this.formdata.username.value) && !this.formdata.username.value.length == 0;

            if (this.formdata.username.isTouched) {
                this.applyValidationColor('username', this.formdata.username.isValid)
            }
        },
        validatePassword() {
            // Making sure the password is at least 8 character (really standard, nothing fancy)
            this.formdata.password.isValid = this.formdata.password.value.length >= 8;
            if (this.formdata.password.isTouched) {
                this.applyValidationColor('password', this.formdata.password.isValid)
            }
        },
        validateConfirmPassword() {
            // Making sure the confirmation matches the password
            this.formdata.confirmpassword.isValid = this.formdata.password.value === this.formdata.confirmpassword.value && this.formdata.password.isValid;

            if (this.formdata.confirmpassword.isTouched) {
                this.applyValidationColor('confirm', this.formdata.confirmpassword.isValid)
            }
        }
    }
}
</script>

<style scoped>
    .invalid {
        color: lightcoral;
    }
    .valid {
        color: dodgerblue;
    }

    .title {
        margin: 0px;
        padding: 0px;
        font-weight: lighter;
        margin-left: 120px;
        color: #777;
    }
    .user-create-form {
        height: 300px;
        width: 100%;
        display: inline-block;
        position: relative;
        margin-top: 65px;
    }
    .bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background-color: #335;
        background-image: url('/img/backgrounds/usercreate.jpg');
        background-size: cover;
    }
    .backdrop {
        position: absolute;
        height: 500px;
        width: 75%;
        background-color: #223e;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 0;
        border-radius: 5px;
        max-width: 1186px;
    }
    .user-create-box {
        height: 600px;
        width: 50%;
        display: inline-block;
        background-color: ghostwhite;
        margin-top: -50px;
        -webkit-box-shadow: -18px 0px 48px -14px rgba(0,0,0,0.73);
        -moz-box-shadow: -18px 0px 48px -14px rgba(0,0,0,0.73);
        box-shadow: -18px 0px 48px -14px rgba(0,0,0,0.73);
        border-radius: 5px;
    }
    .secondary-panel {
        display: inline-block;
        width: 50%;
        color: ghostwhite;
        padding: 30px 0px 0px 60px;
        box-sizing: border-box;
        vertical-align: top;
        margin-top: 100px;
    }
    .secondary-panel h4, .secondary-panel h1  {
        font-weight: lighter;
    }
    .pill-input {
        height: 60px;
        display: flex;
        margin: auto;
        width: 70%;
        margin-top: 25px;
        text-align: center;
    }
    .left-pill, .right-pill, .pill-input-area {
        display: inline-block;
        height: 60px;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
        box-sizing: border-box;
    }

    .pill-input-area {
        vertical-align: top;
        position: relative;
        flex: 1;
        line-height: 58px;
    }
    .pill-input-tag {
        position: relative;
        display: inline-block;
        padding: 0px;
        border: 0px;
    }
    input {
        display: inline-block;
        width: 100%;
        background-color: ghostwhite;
        font-size: 1.05em;
    }
    input::placeholder {
        color: #aaa;
    }
    input:focus {
        display: inline-block;
        width: 100%;
        background-color: ghostwhite;
        outline: none;
    }

    .left-pill {
        width: 70px;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-left: 2px solid #ccc;
        line-height: 58px;
        color: #aaa;
        font-size: 22px;
    }
    .right-pill {
        width: 50px;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        border-right: 2px solid #ccc;
    }

    .submit-button {
        cursor: pointer;
        border-radius: 35px;
        text-align: center;
        color: ghostwhite;
        font-weight: bold;

        height: 60px;
        display: block;
        margin: auto;
        width: 70%;
        margin-top: 25px;
        line-height: 60px;

        background: rgba(52,163,247,1);
        background: -moz-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(52,163,247,1)), color-stop(100%, rgba(90,39,230,1)));
        background: -webkit-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -o-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -ms-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: linear-gradient(to right, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#34a3f7', endColorstr='#5a27e6', GradientType=1 );

    }
    .login-button {
        cursor: pointer;
        border-radius: 35px;
        text-align: center;
        color: ghostwhite;
        font-weight: bold;

        height: 60px;
        display: block;
        width: 175px;
        line-height: 60px;
        box-sizing: border-box;
        margin-top: 50px;

        border: 2px solid #ccc;
    }
</style>
