<template>
  <div>
    <v-container>
      <div class="row">
        <!-- <div class="col-md-3 col-sm-3 col-xs-12">
          <FilterCard></FilterCard>
        </div> -->
        <div class="col-md-12 col-sm-12 col-xs-12">
          <!-- <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs> -->

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-12 of 200 products</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="select"
                :items="options"
                style="margin-bottom: -20px;"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              :key="pro.id"
              v-for="pro in products"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    :src="pro.src"
                  >
                    <v-card-title>{{ pro.type }} </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn v-if="hover" to="/items/1" class="" outlined
                          >VIEW</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>
                      <router-link
                        to="/items/1"
                        style="text-decoration: none"
                        >{{ pro.name }}</router-link
                      >
                    </div>
                    <div>${{ pro.price }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div class="text-center mt-12">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
// import FilterCard from '@/components/market/FilterCard';
export default {
  // components: {
  //   FilterCard,
  // },
  data: () => ({
    select: 'Popularity',
    options: [
      'Default',
      'Popularity',
      'Relevance',
      'Price: Low to High',
      'Price: High to Low',
    ],
    breadcrums: [
      {
        text: 'Home',
        disabled: false,
        href: 'breadcrumbs_home',
      },
      {
        text: 'Clothing',
        disabled: false,
        href: 'breadcrumbs_clothing',
      },
      {
        text: 'T-Shirts',
        disabled: true,
        href: 'breadcrumbs_shirts',
      },
    ],
    products: [
      {
        id: 1,
        name: 'BLACK TEE',
        type: 'Jackets',
        price: '18.00',
        src: require('@/assets/img/shop/1.jpg'),
      },
      {
        id: 2,
        name: 'WHITE TEE',
        type: 'Polo',
        price: '40.00',
        src: require('@/assets/img/shop/2.jpg'),
      },
      {
        id: 3,
        name: 'Zara limited...',
        type: 'Denim',
        price: '25.00',
        src: require('@/assets/img/shop/3.jpg'),
      },
      {
        id: 4,
        name: 'SKULL TEE',
        type: 'Jackets',
        price: '30.00',
        src: require('@/assets/img/shop/4.jpg'),
      },
      {
        id: 5,
        name: 'MANGO WINTER',
        type: 'Sweaters',
        price: '50.00',
        src: require('@/assets/img/shop/5.jpg'),
      },
      {
        id: 6,
        name: 'SHIRT',
        type: 'Denim',
        price: '34.00',
        src: require('@/assets/img/shop/6.jpg'),
      },
      {
        id: 7,
        name: 'TRUCKER JACKET',
        type: 'Jackets',
        price: '38.00',
        src: require('@/assets/img/shop/7.jpg'),
      },
      {
        id: 8,
        name: 'COATS',
        type: 'Jackets',
        price: '25.00',
        src: require('@/assets/img/shop/8.jpg'),
      },
      {
        id: 9,
        name: 'MANGO WINTER',
        type: 'Sweaters',
        price: '50.00',
        src: require('@/assets/img/shop/9.jpg'),
      },
      {
        id: 10,
        name: 'SHIRT',
        type: 'Denim',
        price: '34.00',
        src: require('@/assets/img/shop/10.jpg'),
      },
      {
        id: 11,
        name: 'TRUCKER JACKET',
        type: 'Jackets',
        price: '38.00',
        src: require('@/assets/img/shop/11.jpg'),
      },
      {
        id: 12,
        name: 'COATS',
        type: 'Jackets',
        price: '25.00',
        src: require('@/assets/img/shop/12.jpg'),
      },
    ],
  }),
};
</script>
