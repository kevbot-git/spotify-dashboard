<template>
  <div
    class="container"
    :class="{ 'container--loading': isLoading }"
  >
    <transition name="fade">
      <div
        v-if="isLoading"
        class="loader"
      >
        <div class="loader__icon">
          <Icon
            :icon="['fab', 'spotify']"
            size="4x"
          />
        </div>
      </div>
    </transition>
    <div class="header">
      <button
        v-if="authToken"
        @click="handleSignOut()"
      >
        sign out
      </button>
      <router-link
        v-else
        :to="{ name: 'auth' }"
      >
        sign in
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from "vuex";
import { mutations } from './store';

export default {
  name: 'App',
  computed: {
    ...mapState(['authToken', 'isLoading']),
  },
  methods:  {
    ...mapActions(['signOut']),
    async handleSignOut() {
      this.signOut();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$router.push({ name: 'auth' });
    },
  }
};
</script>

<style lang="scss">
*, *:before, *:after {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#app, #app > .container {
  height: 100%;
}
</style>

<style scoped lang="scss">
$ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
$gradient-red: linear-gradient(to top, #ff0844 0%, #ffb199 100%);

@keyframes float {
	0%, 100% {
		box-shadow: 20px 30px 60px #aaaaaa;
		transform: translateY(-10px);
	}
	50% {
		box-shadow: 20px 10px 60px #aaaaaa;
		transform: translateY(10px);
	}
}

%unstyled-button {
  padding: 0;
  margin: 0;
  font: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;

  &__icon {
    border-radius: 50%;
    padding: 16px;
    background: $gradient-red;
    animation: float 3s ease-in-out infinite;
  }
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    @extend %unstyled-button;
    padding: 0 4px;
  }

  a {
    padding: 0 4px;
    text-decoration: none;
    color: inherit;

    &:hover, &:visited, :active {
      color: inherit;
    }
  }
}

.fa-spotify {
  color: #fff;
}

@media (prefers-reduced-motion: no-preference) {
  .fade {
    &-enter-active,
    &-leave-active {
      transform: scale(1);
      transform-origin: center;
      transition: opacity 0.5s ease, transform 1s #{$ease-in-out-cubic};
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: scale(1.25);
    }
  }
}
</style>
