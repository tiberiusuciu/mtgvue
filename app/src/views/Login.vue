<template>
    <div class="container">
        <div class="input-area">
            <div class="verticalalign">
                <h1 class="title">Login</h1>
                <div class="formarea usernameinput">
                    <div class="left-pill"><i class="fas fa-envelope"></i></div>
                    <input type="text" placeholder="E-Mail">
                </div>
                <div class="formarea passwordinput">
                    <div class="left-pill"><i class="fas fa-key"></i></div>
                    <input type="password" placeholder="Password">
                </div>
                <div class="submit-button" @click="login">
                    Submit
                </div>
            </div>
            <div class="more-options">
                <div>
                    Don't have an account? <span class="additional-button" @click="$router.push('/signup')">Sign up</span>
                </div>
                <div>
                    Forgot your password? <span class="additional-button">Click here</span>
                </div>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    export default {
        methods: {
            login() {
                console.log('login performed');
                
            }
        },   
    }
</script>

<style scoped>
    .container {
        display: flex;
    }
    .input-area {
        width: 700px;
        z-index: 1;
        -webkit-box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        -moz-box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        height: 100vh;
    }
    .bg {
        flex: 1;
        height: 100vh;
        background-color: lightgreen;
        background: url('https://images.unsplash.com/photo-1554384835-2bff08618ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80');
        background-size: cover;
        background-position-y: 60%;
    }
    .title {
        /* margin-top: 200px; */
        padding-left: 165px;
        color: #888;
        font-weight: lighter;
    }
    .formarea {
        /* padding-left: 100px; */
        margin-top: 30px;
        height: 60px;
        box-sizing: border-box;
        /* width: 450px; */
        display: flex;
        margin: auto;
        margin-top: 25px;
        width: 60%;
    }

    .formarea input {
        height: 60px;
        border: none;
        border-top-right-radius: 35px;
        border-bottom-right-radius: 35px;
        border: 2px solid #ccc;
        border-left: none;
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

    .submit-button {
        cursor: pointer;
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

        background: rgba(52,163,247,1);
        background: -moz-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(52,163,247,1)), color-stop(100%, rgba(90,39,230,1)));
        background: -webkit-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -o-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: -ms-linear-gradient(left, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        background: linear-gradient(to right, rgba(52,163,247,1) 0%, rgba(90,39,230,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#34a3f7', endColorstr='#5a27e6', GradientType=1 );
    }

    .submit-button:hover {
        opacity: .8;
    }

    .verticalalign {
        position: absolute;
        width: 700px;
        top: 50%;
        transform: translateY(-65%);
    }
    .more-options {
        position: absolute;
        bottom: 30px;
        text-align: center;
        width: 700px;
        color: #aaa;
        letter-spacing: 1px;
        font-size: 12px;
    }
    .additional-button {
        color: dodgerblue;
        cursor: pointer;
    }
    .additional-button:hover {
        text-decoration: underline;
    }
</style>
