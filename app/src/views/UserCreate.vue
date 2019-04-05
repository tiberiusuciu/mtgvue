<template>
    <div class="bg">
      <div class="backdrop">
        <div class="user-create-box">
            <div class="user-create-form">
                <h1 class="title">Sign Up</h1>
                <div class="pill-input">
                    <div class="left-pill"></div>
                    <input type="text" class="pill-input"></div>
                    <div class="right-pill"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
    h1 {
        margin: 0px;
        padding: 0px;
        font-weight: lighter;
    }
    .title {
        margin-left: 70px;
        color: #777;
    }
    .user-create-form {
        height: 300px;
        width: 100%;
        display: inline-block;
        position: relative;
        margin-top: 100px;
    }
    .bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background-color: #335;
        background-image: url('https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80');
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
</style>
