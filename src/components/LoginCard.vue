<template>
    <Card style="width:350px">
        <Form label-position="left" ref="loginForm" :model="loginForm" :rules="loginRule" :label-width="100">
            <FormItem label="用户名/邮箱" prop="username">
                <Input type="text" v-model="loginForm.username"/>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="loginForm.password"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
                <Button @click="handleReset('loginForm')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import {Card} from 'view-design'
    import util from '../libs/util'

    export default {
        name: "LoginCard",
        components: {
            'Card': Card
        },
        props: ['disableJump'],
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRule: {
                    username: [
                        {required: true, message: '用户名/邮箱不能为空', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            async handleSubmit(form) {
                const valid = this.$refs[form].validate();
                if (!valid) {
                    this.$Message.error('验证失败.');
                    return;
                }
                const response = await util.http.post('/user', {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                });
                if (response.status !== 200)
                    this.$Message.error('HTTP请求错误：' + response.statusText);
                else {
                    const data = response.data;
                    if (data.success) {
                        this.$Message.success('欢迎，' + data.username);
                        localStorage.temp_token = data.temp_token;
                        this.$store.commit('setLoggedUser', data.username);
                        if (!this.disableJump)
                            await this.$router.replace('/course');
                    } else
                        this.$Message.error(data.msg)
                }
            }
            ,
            handleReset(form) {
                this.$refs[form].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>