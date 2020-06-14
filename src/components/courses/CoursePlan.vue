<template>
  <v-hover v-slot:default="{ hover }">
    <v-sheet
      :class="`elevation-${hover ? 12 : 0}`"
      class="mx-auto pa-6 transition-swing"
    >
      <v-card v-if="departmentsInPlan.length === 0">
        <v-card-title> None..</v-card-title>
      </v-card>
      <v-slide-group v-model="model" class="pa-4" show-arrows>
        <v-slide-item
          v-for="department in departmentsInPlan"
          :key="`${department}`"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="primary white--text"
            depressed
            rounded
            @click="toggle"
          >
            {{ department }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" tile>
          <v-row class="fill-height">
            <v-col
              v-for="(item, i) in planInDepartment(model)"
              :key="i"
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="3"
              ><v-card>
                <v-card-title class="headline">
                  {{ item.grade }} {{ item.gradePlan.major }}</v-card-title
                >
                <v-card-subtitle>{{ item.gradePlan.category }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </v-hover>
</template>
<script>
export default {
  props: {
    plan: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    departmentsInPlan() {
      return [...new Set(this.plan.map(plan => plan.gradePlan.faculty))];
    }
  },
  methods: {
    planInDepartment(index) {
      return this.plan
        .filter(
          plan => plan.gradePlan.faculty === this.departmentsInPlan[index]
        )
        .sort(function(a, b) {
          return parseInt(a.grade) - parseInt(b.grade);
        });
    }
  },
  data: () => ({
    model: null
  })
};
</script>
