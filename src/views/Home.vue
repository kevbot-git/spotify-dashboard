<template>
  <h1>what’s new</h1>
  <h2>new releases</h2>
  <div class="list new-releases">
    <div
      v-for="item of newReleases"
      :key="item.uri"
      class="list__item"
    >
      <div class="item">
        <div class="item__image">
          <img
            :src="item.images[1].url"
            alt="album art"
          >
        </div>
        <div class="item__content">
          <h3 v-text="item.name" />
          <h4 v-text="item.artists[0].name" />
        </div>
      </div>
    </div>
  </div>
  <h2>featured playlists</h2>
  <div class="list featured-playlists">
    <div
      v-for="item of featuredPlaylists"
      :key="item.uri"
      class="list__item"
    >
      <div class="item">
        <div class="item__image">
          <img
            :src="item.images[0].url"
            alt="album art"
          >
        </div>
        <div class="item__content">
          <h3 v-text="item.name" />
          <h4 v-text="item.owner.display_name" />
        </div>
      </div>
    </div>
  </div>
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
    ...mapState(['authToken', 'newReleases', 'featuredPlaylists']),
  },
  async mounted() {
    await Promise.all([
      this.fetchNewReleasesPage(),
      this.fetchFeaturedPlaylistPage(),
    ]);
    this.setIsLoading(false);
  },
  methods: {
    ...mapActions(['signOut']),
    ...mapMutations({
      setIsLoading: (commit, payload) => commit(mutations.SET_IS_LOADING),
      setNewReleases: (commit, payload) => commit(mutations.SET_NEW_RELEASES, payload),
      setFeaturedPlaylists: (commit, payload) => commit(mutations.SET_FEATURED_PLAYLISTS, payload),
    }),
    async fetchNewReleasesPage(page = 0) {
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

        this.setNewReleases(items);
      } catch (error) {
        if (error.response?.status === 401) {
          this.signOut();
          this.$router.push({ name: 'auth' });
        }
      }
    },
    async fetchFeaturedPlaylistPage(page = 0) {
      try {
        const {
          data: {
            playlists: {
              items
            }
          }
        } = await axios.get(`${
          import.meta.env.VITE_SPOTIFY_API_BASE_URL
        }${
          import.meta.env.VITE_SPOTIFY_API_PLAYLISTS_ENDPOINT
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

        this.setFeaturedPlaylists(items);
      } catch (error) {
        if (error.response?.status === 401) {
          this.signOut();
          this.$router.push({ name: 'auth' });
        }
      }
    }
  },
})
</script>

<style scoped lang="scss">
$red: rgb(250, 10, 70);
$gradient-red: linear-gradient(to top, rgba(255, 8, 68, 1) 0%, rgba(255, 177, 153, 0.8) 100%);

.list {
  overflow-x: scroll;
  white-space: nowrap;
  padding-bottom: 8px;
  height: 214px;

  &__item {
    display: inline-block;
    width: 200px;
    height: 200px;
    margin: 0 16px;
  }
}

%absolute-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12.5%;
  overflow: hidden;

  &:hover {
    .item__image {
      transform: scale(1.25);
    }

    .item__content {
      opacity: 1;
    }
  }

  &__content {
    @extend %absolute-fill;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    background: $gradient-red;
    opacity: 0;
    border-radius: 12.5%;
    transition: opacity 0.5s ease-in-out;
    color: #fff;

    h3, h4 {
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      min-width: 0;
      padding: 0 4px;
    }
  }

  &__image {
    @extend %absolute-fill;
    transform-origin: center;
    transition: all 1s ease-in;

    img {
      width: 100%;
    }
  }
}
</style>