<template>
  <div>
    <transition name="fade">
      <div id="nav" v-if="showMenu">
        <div class="menu">
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/" class="first-item" exact>Home</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/usersettings">Settings</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/login" v-if="!user">Login</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/signup" v-if="!user">Sign Up</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/game">Game</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/about">About</router-link>
        </div>
        <div class="shadow" @click="toggleMenu">

        </div>
      </div>
    </transition>
    <div class="burger-button" @click="toggleMenu">
      <i class="fas fa-bars"></i>
    </div>
    <!-- <img src="https://img.scryfall.com/cards/large/en/c16/322.jpg?1517813031" width="300" alt="test"> -->
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuInterval: "",
        currentWidth: 0
      }
    },
    methods: {
      toggleMenu() {
        // This animates the slide effect for the menu. This could be re-written using vuejs transitions perhaps
        // give callbacks!
        if (!this.showMenu) {
          clearInterval(this.menuInterval);
          this.currentWidth = 0;
          this.menuInterval = setInterval(() => {
            var menu = document.querySelector('.menu');
            if(menu) {
              menu.style.width = this.currentWidth + 'px';
            }
            this.currentWidth += 6;
            if (this.currentWidth >= 300) {
              clearInterval(this.menuInterval);
            }
          }, 60 / 1000)
        }
        else {
          clearInterval(this.menuInterval);
          this.menuInterval = setInterval(() => {
            var menu = document.querySelector('.menu');
            if(menu) {
              menu.style.width = this.currentWidth + 'px';
            }
              this.currentWidth = this.currentWidth - 2;
            if (this.currentWidth <= 150) {
              clearInterval(this.menuInterval);
            }
          }, 60 / 1000)
        }
        this.$store.dispatch('onToggleMenu');
      }
    },
    computed: {
      showMenu() {
        return this.$store.getters.showMenu
      },
      user() {
        return this.$store.getters.user
      }
    }, 
  }
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  position: absolute;
  display: flex;
  width: 100%;
  top: 0;
  height: 100vh;
  z-index: 11;
  /* padding-top: 30px; */
}
.menu {
  width: 300px;
  background-color: #223;
  /* padding: 30px; */
}
.shadow {
  flex: 1;
  background-color: #0006;
}

.first-item {
  margin-top: 30px;
}
#nav a {
  color: ghostwhite;
  text-decoration: none;
  display: block;
  height: 60px;
  line-height: 60px;
  padding: 0px 30px;
  transition: background-color .25s ease-in-out;
}
#nav a:hover {
  color: ghostwhite;
  background-color: #FFFFFF22;
  text-decoration: none;
  display: block;
  height: 60px;
  line-height: 60px;
}
.active-link {
  background-color: #FFFFFF22;
}
.burger-button {
  background-color: transparent;
  position: absolute;
  top: 0px;
  height: 60px;
  width: 100%;
  line-height: 70px;
  cursor: pointer;
  transition-property: line-height;
  transition-duration: .25s;
  transition-timing-function: ease-in-out;
  z-index: 2;
}

.burger-button:hover i{
  font-size: 40px;
  color: dodgerblue;
  margin-left: 18px;
}

.burger-button:hover {
  line-height: 75px;
}

.burger-button i {
  margin-left: 20px;
  font-size: 32px;

  transition-property: font-size, color, line-height, margin-left;
  transition-duration: .25s;
  transition-timing-function: ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
