<template>
  <v-card outlined>
    <v-card-title>Filters</v-card-title>
    <v-divider></v-divider>
    <template>
      <v-treeview
        :items="items"
        :open="[1]"
        :active="[5]"
        :selected-color="'#fff'"
        activatable
        open-on-click
        dense
      ></v-treeview>
    </template>
    <v-divider></v-divider>
    <v-card-title>Price</v-card-title>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      :height="10"
      class="align-center"
      dense
    ></v-range-slider>
    <v-row class="pa-2" dense>
      <v-col cols="12" sm="5">
        <v-text-field
          :value="range[0]"
          label="Min"
          outlined
          dense
          @change="$set(range, 0, $event)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <p class="pt-2 text-center">TO</p>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field
          :value="range[1]"
          label="Max"
          outlined
          dense
          @change="$set(range, 1, $event)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-title class="pb-0">Customer Rating</v-card-title>
    <v-container class="pt-0" fluid>
      <v-checkbox
        append-icon="mdi-star"
        label="4 & above"
        hide-details
        dense
      ></v-checkbox>
      <v-checkbox
        append-icon="mdi-star"
        label="3 & above"
        hide-details
        dense
      ></v-checkbox>
      <v-checkbox
        append-icon="mdi-star"
        label="2 & above"
        hide-details
        dense
      ></v-checkbox>
      <v-checkbox
        append-icon="mdi-star"
        label="1 & above"
        hide-details
        dense
      ></v-checkbox>
    </v-container>
    <v-divider></v-divider>
    <v-card-title class="pb-0">Size</v-card-title>
    <v-container class="pt-0" fluid>
      <v-checkbox label="XS" hide-details dense></v-checkbox>
      <v-checkbox label="S" hide-details dense></v-checkbox>
      <v-checkbox label="M" hide-details dense></v-checkbox>
      <v-checkbox label="L" hide-details dense></v-checkbox>
      <v-checkbox label="XL" hide-details dense></v-checkbox>
      <v-checkbox label="XXL" hide-details dense></v-checkbox>
      <v-checkbox label="XXXL" hide-details dense></v-checkbox>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    range: [0, 10000],
    page: 1,
    min: 0,
    max: 10000,
    items: [
      {
        id: 2,
        name: 'Shoes',
        children: [
          { id: 2, name: 'Casuals' },
          { id: 3, name: 'Formals' },
          { id: 4, name: 'Sneakers' },
        ],
      },
      {
        id: 1,
        name: 'Clothing',
        children: [
          { id: 5, name: 'Shirts' },
          { id: 6, name: 'Tops' },
          { id: 7, name: 'Tunics' },
          { id: 8, name: 'Bodysuit' },
        ],
      },
    ],
  }),
};
</script>
