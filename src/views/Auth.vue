<template>
  <div />
</template>

<script>
import { v4 as uuid} from 'uuid';
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import { mutations } from '../store';

export default defineComponent({
  computed: {
    ...mapState(['authChallenge', 'appRedirectPath']),
  },
  mounted() {
    let appRedirectPath = '/';
    const { code, state } = this.$route.query;
    if (code && (!state || state === this.authChallenge)) {
      this.setAuthToken(code);

      if (this.appRedirectPath) {
        appRedirectPath = this.appRedirectPath;
        this.setAppRedirectPath('');
      }

      this.$router.push(appRedirectPath);
      return;
    }

    this.authorise();
  },
  methods: {
    ...mapMutations({
      setAuthToken: (commit, payload) => commit(mutations.SET_AUTH_TOKEN, payload),
      setAuthChallenge: (commit, payload) => commit(mutations.SET_AUTH_CHALLENGE, payload),
      setAppRedirectPath: (commit, payload) => commit(mutations.SET_APP_REDIRECT_PATH, payload),
    }),
    authorise() {
      const challenge = uuid();
      const redirectUri = `${window.location.origin}${this.$route.path}`;
      const appRedirect = this.$route.params?.redirect;

      this.setAuthChallenge(challenge);
      if (appRedirect) {
        this.setAppRedirectPath(appRedirect);
      }
      
      const params = new URLSearchParams({
        client_id: `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}`,
        redirect_uri: redirectUri,
        response_type: 'code',
        state: challenge,
      });
      window.location.href = `${import.meta.env.VITE_SPOTIFY_AUTH_URL}?${params.toString()}`;
    },
  },
});
</script>
