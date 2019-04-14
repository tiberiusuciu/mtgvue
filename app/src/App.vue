<template>
  <div>
    <transition name="fade">
      <div id="nav" v-if="showMenu">
        <div class="menu">
          <div v-if="user" class="profile-pic" :style="{'backgroundImage': `url(${user.profile_picture.core_fallbackLinks[0]})`}"></div>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/" class="first-item" exact>Home</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/usersettings" v-if="user">Settings</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/login" v-if="!user">Login</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/signup" v-if="!user">Sign Up</router-link>
          <router-link v-on:click.native="handleLogout" active-class="active-link" to="/login" v-if="user">Log Out</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/game" v-if="user">Game</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/cardsearch" v-if="user">Cards</router-link>
          <router-link v-on:click.native="toggleMenu" active-class="active-link" to="/about">About</router-link>
        </div>
        <div class="shadow" @click="toggleMenu">

        </div>
      </div>
    </transition>
    <div class="burger-button" @click="toggleMenu" :class="{'is-not-active': this.user && !this.user.isActive}">
      <div class="burger-icon">
        <i class="fas fa-bars"></i>

      </div>
      <template v-if="this.user && !this.user.isActive">
        <div class="not-active-message">
          Your account has not been activated. Please check your emails!
        </div>
      </template>
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
      },
      handleLogout() {
        this.toggleMenu();
        this.$store.dispatch('logout');
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
    created() {
      this.$store.dispatch('tryAutoLogin')
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
  display: flex;
}

.burger-button:hover i{
  font-size: 40px;
  color: dodgerblue;
  margin-left: 18px;
}

.burger-icon {
  transition-property: line-height;
  transition-duration: .25s;
}


.burger-button:hover .burger-icon {
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

.profile-pic {
  height: 221px;
  width: 221px;
  background-position-x: -31px;
  background-position-y: -60px;
  background-size: 363px auto;
  border-radius: 66%;
  margin: auto;
  margin-top: 90px;
  border: 6px solid ghostwhite;
}

.is-not-active {
  background-color: crimson;
}

.is-not-active .burger-icon{
  color: ghostwhite;
}

.burger-icon {
  display: inline-block;
  width: 100px;
}
.not-active-message {
  color: ghostwhite;
  text-align: center;
  display: inline-block;
  flex: 1;
  line-height: 60px;
  font-weight: bold;
}
</style>
