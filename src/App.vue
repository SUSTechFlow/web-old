<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header>
          <Navbar></Navbar>
        </Header>
        <Content :style="{ margin: '0 50px', padding: '0 50px' }">
          <Card>
            <div style="min-height: 1200px;">
              <router-view></router-view>
            </div>
          </Card>
        </Content>
        <Footer class="layout-footer-center">
          <a style="top:auto; bottom: 0;" href="http://www.beian.miit.gov.cn"
            >粤ICP备20009314号</a
          ></Footer
        >
      </Layout>
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: { Navbar }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-footer-center {
  text-align: center;
}
</style>
