<template lang="pug">
v-hover(v-slot:default="{ hover }")
  v-card(
    :class="`elevation-${hover ? 12 : 6}`"
    style="background:white"
  )
    v-toolbar(
      color="primary"
      dark
    )
      v-toolbar-title {{ $t('page.signup') }}
      v-spacer
      v-btn(text to="/u/signin") Sign in
      v-btn(icon to="/")
        v-icon mdi-home
      v-menu(open-on-hover offset-y)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on" icon)
            v-icon mdi-translate
        v-list
          v-list-item(v-for="locale in locales" :key="locale.value" @click="setlocale(locale.value)")
            v-list-item-title {{ locale.text }}
    v-card-text.pt-4
      v-form(
        ref="form"
        v-model="valid"
        lazy-validation
      )
        v-text-field(
          v-model="username"
          autocomplete="off"
          prepend-icon="mdi-account"
          required
          filled
          :label="$t('field.username')"
          :rules="usernameRules"
          @focus="onFocus"
        )
        v-text-field(
          v-model="ic"
          autocomplete="off"
          prepend-icon="mdi-email"
          filled
          :rules="icRules"
          label="Email"
          required
        )
        v-text-field(
          v-model="password"
          autocomplete="new-password"
          prepend-icon="mdi-lock"
          type="password"
          required
          filled
          :label="$t('field.password')"
          :rules="passwordRules"
        )
        v-text-field(
          v-model="rpassword"
          autocomplete="new-password"
          prepend-icon="mdi-lock"
          type="password"
          required
          filled
          :label="$t('field.password')"
          :rules="rpasswordRules"
        )
    v-expand-transition
      v-alert(v-show="toggle" :color="color" :icon="icon")
        div {{ message }}
    v-card-actions
      v-spacer
      v-btn(
        color="primary"
        :disabled="!valid"
        @click="onSubmit"
      ) submit
      v-spacer
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      XD: true,
      username: "",
      password: "",
      rpassword: "",
      ic: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && /^[\da-z]+$/i.test(v)) || "Invalid character!",
        v => (v && v.length >= 6) || "6 characters at least"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "6 characters at least"
      ],
      rpasswordRules: [
        v => !!v || "Password is required",
        v => v === this.password || "Not the same"
      ],
      icRules: [
        v => !!v || "Invite Code is required"
        //
      ],
      color: "info",
      icon: "info",
      toggle: false,
      message: null,
      locales: ["en", "zh-cmn-Hans", "zh-cmn-Hant"].map(item => ({
        text: this.$t("locale", item),
        value: item
      }))
    };
  },
  methods: {
    onFocus() {
      this.toggle = false;
    },
    setlocale(locale) {
      this.$i18n.locale = locale;
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const username = this.username;
        const password = this.password;
        const inviteCode = this.ic;
        try {
          await this.$store.dispatch("Signup", {
            username,
            password,
            inviteCode
          });
          this.color = "success";
          this.icon = "check_circle";
          this.message = "success";
          this.toggle = true;
          setTimeout(() => {
            this.$router.replace("/");
          }, 1000);
        } catch (error) {
          this.color = "error";
          this.icon = "error";
          this.toggle = true;
          this.message = "error";
        }
      }
    }
  }
};
</script>
