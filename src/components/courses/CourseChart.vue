<template>
  <apexchart
    type="area"
    height="350"
    :options="chartOptions"
    :series="series"
    :colors="colors"
  ></apexchart>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { getStatistics } from "@/api/comment";
export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    cid: {
      type: String,
      required: true,
      default: ""
    }
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "numeric",
          categories: [...Array(11)].map((v, k) => k * 0.5)
        }
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm"
        //   }
        // }
      },
      datas: {}
    };
  },
  computed: {
    series() {
      return [
        {
          name: "likes",
          data: this.datas.likes
        },
        {
          name: "usefuls",
          data: this.datas.useful
        },
        {
          name: "easys",
          data: this.datas.easy
        }
      ];
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const res = await getStatistics(this.cid);
        this.datas = res.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
