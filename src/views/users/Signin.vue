<template lang="pug">
v-hover(v-slot:default="{ hover }")
  v-card(
    :class="`elevation-${hover ? 12 : 4}`"
    style="background:white"
  )
    v-toolbar(
      color="primary"
      dark
    )
      v-toolbar-title {{ $t('page.signin') }}
      v-spacer
      v-btn(text to="/u/signup") Sign up
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
          v-model="username.value"
          prepend-icon="mdi-account"
          type="text"
          required
          filled
          :label="$t('field.username')"
          :rules="username.rules"
          @focus="onFocus"

        )
        v-text-field(
          v-model="password.value"
          prepend-icon="mdi-lock"
          type="password"
          required
          filled
          :label="$t('field.password')"
          :rules="password.rules"
          @focus="onFocus"
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
        normal
      ) submit
      v-spacer
</template>

<script>
export default {
  metaInfo: () => ({
    title: "IOJ | Sign In"
  }),
  data() {
    return {
      uValid: true,
      valid: true,
      username: {
        value: "",
        rules: [
          v =>
            !!v ||
            this.$t("form.required", { field: this.$t("field.username") }),
          () => this.uValid || "Username or Password Wrong"
        ]
      },
      password: {
        value: "",
        rules: [
          v =>
            !!v ||
            this.$t("form.required", { field: this.$t("field.password") }),
          // v => (v && v.length >= 6) || '6 characters at least',
          () => this.uValid || "Username or Password Wrong"
        ]
      },
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
  mounted() {
    this.redirect = this.$route.query.redirect || "/";
  },
  methods: {
    onFocus() {
      this.toggle = false;
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("user/login", {
            username: this.username.value,
            password: this.password.value
          });
          this.color = "success";
          this.icon = "check_circle";
          this.message = "success";
          setTimeout(() => {
            this.$router.replace(this.redirect);
          }, 1000);
        } catch (error) {
          this.color = "error";
          this.icon = "error";
          this.message = "error";
        } finally {
          this.toggle = true;
        }
      }
    },
    setlocale(locale) {
      this.$i18n.locale = locale;
    }
  }
};
</script>
