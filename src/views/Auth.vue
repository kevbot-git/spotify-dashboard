<template>
  <div />
</template>

<script>
import axios from 'axios';
import { v4 as uuid} from 'uuid';
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import { mutations } from '../store';
import { decodeHashFragment } from '../helpers';

export default defineComponent({
  computed: {
    ...mapState(['authChallenge', 'redirectUri', 'appRedirectPath']),
  },
  async mounted() {
    let appRedirectPath = '/';

    const { access_token: accessToken, state: authChallenge } = decodeHashFragment(this.$route.hash);
    if (!accessToken || authChallenge !== this.authChallenge) {
      this.authorise();
      return;
    }

    this.setAuthToken(accessToken);

    if (this.appRedirectPath) {
      appRedirectPath = this.appRedirectPath;
      this.setAppRedirectPath('');
    }

    this.$router.push(appRedirectPath);
  },
  methods: {
    ...mapMutations({
      setAuthToken: (commit, payload) => commit(mutations.SET_AUTH_TOKEN, payload),
      setAuthChallenge: (commit, payload) => commit(mutations.SET_AUTH_CHALLENGE, payload),
      setAppRedirectPath: (commit, payload) => commit(mutations.SET_APP_REDIRECT_PATH, payload),
    }),
    authorise() {
      const challenge = uuid();
      const redirectUri = `${window.location.origin}/`;
      const appRedirect = this.$route.params?.redirect;

      this.setAuthChallenge(challenge);
      if (appRedirect) {
        this.setAppRedirectPath(appRedirect);
      }
      
      const params = new URLSearchParams({
        client_id: `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}`,
        redirect_uri: redirectUri,
        response_type: 'token',
        state: challenge,
      });

      window.location.href = `${import.meta.env.VITE_SPOTIFY_AUTH_URL}?${params.toString()}`;
    },
  },
});
</script>
