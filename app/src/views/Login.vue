<template>
    <div class="container">
        <div class="input-area"></div>
        <div class="bg"></div>
    </div>
</template>

<style>
    .container {
        display: flex;
    }
    .input-area {
        width: 700px;
        /* height: 50vh; */
        z-index: 1;
        -webkit-box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        -moz-box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
        box-shadow: 11px 0px 25px 2px rgba(0,0,0,0.65);
    }
    .bg {
        flex: 1;
        height: 100vh;
        background-color: lightgreen;
        background: url('https://images.unsplash.com/photo-1554384835-2bff08618ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80');
        background-size: cover;
    }
</style>
