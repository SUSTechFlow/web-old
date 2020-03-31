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
      v-toolbar-title {{ $t('page.signup') }}
      v-spacer
      v-btn(icon to="/")
        v-icon mdi-home
      v-menu(open-on-hover offset-y)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on" icon)
            v-icon mdi-translate
        v-list
          v-list-item(v-for="locale in locales" :key="locale.value" @click="setlocale(locale.value)")
            v-list-item-title {{ locale.text }} {{ hasCode }}

    v-window(v-model="step")
      v-window-item(:value="1")
        v-card-text
          v-text-field(
            v-model="email"
            label="Email"
            suffix="@mail.sustech.edu.cn"
            :rules="[rules.email.dight]"
          )
          v-row
            v-col(
              cols="12"
              md="8"
            )
              v-text-field(
                v-model="identifyCode_"
                label="Verification code"
              )
            v-col(
              cols="12"
              md="4"
            )
              Captcha(
                :identifyCode="identifyCode"
                @click="refresh"
              )
          span(class="grey--text text--darken-1")
            | If your email has signed up, it will be used to sign in. Suffix has been fiiled.
            br
            | If your email address doesn't end with @mail.sustech.edu.cn, contact us for help.

      v-window-item(:value="2")
        div(class="pa-4 text-center")
          h3(class="title font-weight-light mb-2") Thanks for signing up!
          span(class="caption grey--text") An verification email has been sent to your email address!


      v-window-item(:value="3")
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


      v-window-item(:value="4")
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

    v-expand-transition
      v-alert(v-show="toggle" :color="color" :icon="icon")
        div {{ message }}

    v-card-actions
      //- v-btn(:disabled="step === 1 || step === 2" text @click="step--") Back
      v-spacer
      v-btn(v-if="step < 3" :disabled="step === 3 || step === 2" color="primary" depressed @click="onVerify") Next
      v-btn(
        v-else
        depressed
        color="primary"
        :disabled="!valid"
        @click="onSubmit"
      ) Submit
</template>

<script>
import { verify } from "@/api/user";
import { randomString } from "@/utils/random";
import Captcha from "@/components/Captcha";
export default {
  metaInfo: () => ({
    title: "Sign Up | SUSTech Flow"
  }),
  components: {
    Captcha
  },
  computed: {
    code() {
      return this.$route.query.vcode;
    },
    hasCode() {
      return !!this.code;
    }
  },
  data() {
    return {
      step: 1,
      uValid: true,
      valid: true,
      username: "",
      password: "",
      email: "",
      rpassword: "",
      identifyCode: "",
      identifyCode_: "",
      rules: {
        email: {
          dight: v => /^[\d]+$/.test(v) || "Number only!"
        }
      },
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
    this.refresh();
    this.redirect = this.$route.query.redirect || "/";
    if (this.hasCode) {
      this.step = 3;
    }
  },
  methods: {
    refresh() {
      this.identifyCode = randomString(4);
    },
    onFocus() {
      this.toggle = false;
    },
    async onVerify() {
      if (
        this.identifyCode.toLowerCase() === this.identifyCode_.toLowerCase()
      ) {
        try {
          await verify(`${this.email}@mail.sustech.edu.cn`);
          this.step++;
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Wrong identify code");
        this.refresh();
        this.identifyCode_ = "";
      }
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const username = this.username;
        const password = this.password;
        try {
          await this.$store.dispatch("user/signup", {
            username,
            password,
            vcode: this.code
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
    },
    setlocale(locale) {
      this.$i18n.locale = locale;
    }
  }
};
</script>
