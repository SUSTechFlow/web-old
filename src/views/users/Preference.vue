<template lang="pug">

v-container(grid-list-xl align="center")
  v-row(row wrap)
    v-row
    v-card(width="90%" max-width="1024" class="mx-auto my-5")
      v-card-title.title {{ $t('profile.title') }}
      v-card-text
        v-row(row wrap text-xs-center)
          v-col.my-3(xs="12" lg="3")
            div.title.font-weight-light {{ $t('profile.avatar') }}
          v-col.my-3(xs="12" lg="3")
            //- cuavatar(
            //-   :uploadUrl="'/user/avatar'"
            //-   :src="avatar"
            //-   :size="128"
            //-   @crop-success="cropSuccess"
            //-   @crop-upload-success="cropUploadSuccess"
            //-   @crop-upload-fail="cropUploadFail"
            //- )
            div gg
        v-divider.my-3
        v-row(row wrap text-xs-center)
          v-col.my-3(xs="12" lg="3")
            div.title.font-weight-light {{ $t('profile.settings') }}
          v-col.my-3(xs="12" lg="9")
            v-form(ref="common_setting" color="white")
              v-text-field(
                v-model="name"
                :label="$t('field.profile.name')"
                required
                filled
              )
              v-text-field(
                v-model="email"
                :label="$t('field.profile.email')"
                required
                filled
              )
              v-text-field(
                v-model="QQ"
                :label="$t('field.profile.QQ')"
                required
                filled
              )
              v-textarea(
                v-model="bio"
                :label="$t('field.profile.bio')"
                required
                filled
              )
              v-select(
                v-model="locale"
                :label="$t('field.profile.locale')"
                filled
                :items="locales"
              )
              v-select(
                v-model="gender"
                :label="$t('field.profile.gender')"
                filled
                :items="genders"
              )
        v-divider.my-3
        v-row(row wrap text-xs-center)
          v-col.my-3(xs="12" lg="3")
            div.title.font-weight-light {{ $t('profile.privacy') }}
          v-col.my-3(xs="12" lg="9")
            v-switch(v-model="hide_email"
              class="ma-2"
              :label="$t('field.profile.hide_email')"
            )
            v-switch(v-model="hide_QQ"
              class="ma-2"
              :label="$t('field.profile.hide_QQ')"
            )
            v-switch(v-model="hide_bio"
              class="ma-2"
              :label="$t('field.profile.hide_bio')"
            )
            v-switch(v-model="hide_gender"
              class="ma-2"
              :label="$t('field.profile.hide_gender')"
            )

      v-card-actions
        v-spacer
        v-btn(
          large
          color="primary"
          @click="submit"
        ) {{ $t('profile.update') }}
        v-btn(
          large
          @click="reset"
        ) {{ $t('profile.reset') }}
</template>

<script>
// import CUAvatar from "@/components/CUAvatar";
export default {
  metaInfo: () => ({
    title: "Profile · IOJ"
  }),
  data() {
    return {
      locales: ["en", "zh-cmn-Hans", "zh-cmn-Hant"].map(item => ({
        text: this.$t("locale", item),
        value: item
      })),
      avatar: this.$store.state.user.avatar,
      name: this.$store.state.user.nickname,
      email: this.$store.state.user.email,
      QQ: this.$store.state.user.QQ,
      locale: this.$store.state.user.locale,
      gender: this.$store.state.user.gender,
      bio: this.$store.state.user.bio,
      hideEmail: this.$store.state.user.hide_email,
      hideQQ: this.$store.state.user.hide_QQ,
      hideBio: this.$store.state.user.hide_bio,
      hideGender: this.$store.state.user.hide_gender
    };
  },
  computed: {
    genders() {
      return ["male", "female"].map(item => this.$t(`sex.${item}`));
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },
  methods: {
    // cropSuccess(imgDataUrl, field) {
    //   this.imgDataUrl = imgDataUrl;
    // },
    // cropUploadSuccess(data, field) {
    //   if (data.success === true) {
    //     try {
    //       this.avatar = data.url;
    //       this.$store.commit("user/SET_STATUS", {
    //         avatar: data.url
    //       });
    //     } catch (error) {
    //       alert("failed");
    //     }
    //   } else {
    //     alert("failed");
    //   }
    // },
    // cropUploadFail(status, field) {},
    async submit() {
      try {
        const data = {
          name: this.name,
          email: this.email,
          QQ: this.QQ,
          bio: this.bio,
          avatar: this.avatar,
          locale: this.locale,
          hideMail: this.hide_mail,
          hideQQ: this.hide_QQ,
          hideBio: this.hide_bio,
          hideGender: this.hide_gender
        };
        await this.$store.dispatch("UpdateProfile", data);
      } catch (err) {
        console.log(err);
      }
    },
    async reset() {
      try {
        await this.$store.dispatch("FetchProfile");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
