<template>
    <div class="mainContent">
        <Row type="flex">
            <Col span="6">
                <LoginCard>

                </LoginCard>
            </Col>
            <Col span="6">
                <RegisterCard>

                </RegisterCard>
            </Col>
        </Row>
    </div>
</template>

<script>
    import LoginCard from "../components/LoginCard";
    import RegisterCard from "../components/RegisterCard";

    export default {
        name: "Login",
        components: {
            'RegisterCard':RegisterCard,
            'LoginCard': LoginCard
        }
    }
</script>

<style scoped>
    .mainContent{
        margin-top: 10%;
        margin-left: 20%;
    }
</style>