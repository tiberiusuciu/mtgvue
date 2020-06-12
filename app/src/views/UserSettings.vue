<template>
    <div>
        User Settings
        <div @click="userupdate" class="submit-button">
            update user
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    userupdate () {
      this.$store.dispatch('onUserUpdate')
    }
  }
}
</script>

<style scoped>
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
        cursor: pointer;
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
</style>
