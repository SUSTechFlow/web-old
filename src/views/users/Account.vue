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
      v-toolbar-title {{ $t('page.account') }}
      v-spacer
      v-btn(icon to="/")
        v-icon mdi-home
      v-menu(open-on-hover offset-y)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on" icon)
            v-icon mdi-translate
        v-list
          v-list-item(v-for="locale in locales" :key="locale.value" @click="setlocale(locale.value)")
            v-list-item-title {{ locale.text }}

    v-window(v-model="step")
      v-window-item(:value="1")
        v-card-text
          v-text-field(
            v-model="email"
            label="Email"
          suffix="@mail.sustech.edu.cn")
          span(class="grey--text text--darken-1")
            | If your email has signed up, it will be used to sign in. Suffix has been fiiled.
            br
            | If your email address doesn't end with @mail.sustech.edu.cn, contact us for help.

      v-window-item(:value="2")
        v-card-text
          v-text-field(label="Password" type="password")
          v-text-field(label="Confirm Password" type="password")
          span(class="caption grey--text text--darken-1") Please enter a password for your account


      v-window-item(:value="3")
        div(class="pa-4 text-center")
          v-img(

              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          )
            h3(class="title font-weight-light mb-2") Welcome to Vuetify
            span(class="caption grey--text") Thanks for signing up!


    v-divider

    v-card-actions
      v-btn(:disabled="step === 1" text @click="step--") Back
      v-spacer
      v-btn( :disabled="step === 3" color="primary" depressed @click="step++") Next
</template>

<script>
export default {
  metaInfo: () => ({
    title: "IOJ | Sign In"
  }),
  data() {
    return {
      step: 1,
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
