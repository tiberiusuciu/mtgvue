<template>
    <div class="bg">
      <div class="backdrop">
        <div class="user-create-box">
            <div class="user-create-form">
                <h1 class="title">Sign Up</h1>
                <div class="pill-input">
                    <div class="left-pill"><i class="fas fa-envelope"></i></div>
                    <div class="pill-input-area">
                        <input type="text" placeholder="E-Mail" class="pill-input-tag"/>
                    </div>
                    <div class="right-pill"></div>
                </div>
                <div class="pill-input">
                    <div class="left-pill"><i class="fas fa-user-alt"></i></div>
                    <div class="pill-input-area">
                        <input type="text" placeholder="Username" class="pill-input-tag"/>
                    </div>
                    <div class="right-pill"></div>
                </div>
                <div class="pill-input">
                    <div class="left-pill"><i class="fas fa-key"></i></div>
                    <div class="pill-input-area">
                        <input type="password" placeholder="Password" class="pill-input-tag"/>
                    </div>
                    <div class="right-pill"></div>
                </div>
                <div class="pill-input">
                    <div class="left-pill"><i class="fas fa-key"></i></div>
                    <div class="pill-input-area">
                        <input type="password" placeholder="Confirm Password" class="pill-input-tag"/>
                    </div>
                    <div class="right-pill"></div>
                </div>
                <div class="submit-button">
                    Submit
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
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
    }
    .user-create-box {
        height: 600px;
        width: 50%;
        background-color: ghostwhite;
        margin-top: -50px;
        -webkit-box-shadow: -18px 0px 48px -14px rgba(0,0,0,0.73);
        -moz-box-shadow: -18px 0px 48px -14px rgba(0,0,0,0.73);
        box-shadow: -18px 0px 48px -14px rgba(0,0,0,0.73);
        border-radius: 5px;
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
</style>
