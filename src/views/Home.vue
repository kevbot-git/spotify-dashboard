<template>
  <div>home</div>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "@vue/runtime-core";
import { mapMutations, mapActions, mapState } from "vuex";
import { mutations } from '../store';

const PAGING_ITEMS = 10;

export default defineComponent({
  name: 'Home',
  computed: {
    ...mapState(['authToken']),
  },
  async mounted() {
    await Promise.all([
      this.fetchReleasePage(),
    ]);
    this.setIsLoading(false);
  },
  methods: {
    ...mapActions(['signOut']),
    ...mapMutations({
      setIsLoading: (commit, payload) => commit(mutations.SET_IS_LOADING),
    }),
    async fetchReleasePage(page = 0) {
      try {
        const {
          data: {
            albums: {
              items
            }
          }
        } = await axios.get(`${
          import.meta.env.VITE_SPOTIFY_API_BASE_URL
        }${
          import.meta.env.VITE_SPOTIFY_API_RELEASES_ENDPOINT
        }`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
          params: {
            country: 'NZ',
            offset: page * PAGING_ITEMS,
            limit: PAGING_ITEMS,
          }
        });

        console.log(items);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          this.signOut();
          this.$router.push({ name: 'auth' });
        }
      }
    }
  },
})
</script>