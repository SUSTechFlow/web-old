<template>
    <Card style="width:450px">
        <Form label-position="left" ref="registerForm" :model="registerForm" :rules="registerRule" :label-width="80">
            <FormItem label="用户名" prop="username">
                <Input type="username" v-model="registerForm.username"/>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="registerForm.email">
                    <Select v-model="suffix" slot="append" style="width: 180px">
                        <Option value="@mail.sustech.edu.cn">@mail.sustech.edu.cn</Option>
                        <Option value="@sustech.edu.cn">@sustech.edu.cn</Option>
                    </Select>
                </Input>
            </FormItem>
            <FormItem label="验证码" prop="verifyCode">
                <Row>
                    <Col span="15">
                        <Input maxlength="6" type="tel" v-model="registerForm.verifyCode"/>
                    </Col>
                    <Col span="8" offset="1">
                        <Button @click="sendVerifyCode()">发送验证码</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="registerForm.password"/>
            </FormItem>
            <FormItem label="重复密码" prop="confirmPassword">
                <Input type="password" v-model="registerForm.confirmPassword"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('registerForm')">注册</Button>
                <Button @click="handleReset('registerForm')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import {Card} from 'view-design'
    import util from '../libs/util'

    export default {
        name: "RegisterCard",
        components: {
            'Card': Card
        },
        data() {
            const validateCode = async (rule, value, callback) => {
                if (!value)
                    callback(new Error('验证码不能为空'));
                else {
                    const response = await util.http.post('verify', {
                            email: this.registerForm.email,
                            vcode: this.registerForm.verifyCode.toString()
                        }
                    );
                    if (response.status !== 200)
                        callback(new Error('HTTP请求错误：' + response.statusText));
                    else {
                        const data = response.data;
                        if (data.success)
                            callback();
                        else
                            callback(new Error(data.msg))
                    }

                }
            };
            const validateEmail = (rule, value, callback) => {
                value = value + this.suffix;
                if (!value)
                    callback(new Error('邮箱不能为空'));
                const pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(mail\.sustech\.edu\.cn)|(mail\.sustc\.edu\.cn)|(sustech\.edu\.cn)|(sustc\.edu\.cn)/;
                if (!pattern.test(value))
                    callback(new Error('邮箱必须为南科大邮箱'));
                callback();
            };
            const validatePassword = (rule, value, callback) => {
                if (!value)
                    callback(new Error('密码不能为空'));
                else {
                    if (this.registerForm.confirmPassword !== '')
                        this.$refs.registerForm.validateField('confirmPassword');
                }
                callback();
            };
            const validateConfirm = (rule, value, callback) => {
                if (!value)
                    callback(new Error('请重复一遍密码'));
                else if (value !== this.registerForm.password) {
                    callback(new Error('两次密码不一致'))
                }
                callback()
            };
            return {
                suffix:'@mail.sustech.edu.cn',
                registerForm: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    verifyCode: ''
                },
                registerRule: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, validator: validateEmail, trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, validator: validateCode, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: validatePassword, trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, validator: validateConfirm, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            async handleSubmit(form) {
                const valid = await this.$refs[form].validate();
                if(!valid) {
                    this.$Message.error('验证失败');
                    return;
                }

                const response = await util.http.put('/user', {
                    email: this.registerForm.email + this.suffix,
                    username: this.registerForm.username,
                    password: this.registerForm.password,
                    vcode: this.registerForm.verifyCode.toString()
                });
                if (response.status !== 200)
                    this.$Message.error('HTTP请求错误：' + response.statusText);
                else {
                    const data = response.data;
                    if (data.success)
                        this.$Message.success('欢迎，' + this.registerForm.username);
                    else
                        this.$Message.error(data.msg)
                }
            },
            handleReset(form) {
                this.$refs[form].resetFields();
            },
            async sendVerifyCode() {
                const response = await util.http.get('/verify', {
                    params: {
                        email: this.registerForm.email + this.suffix
                    }
                });
                if (response.status !== 200)
                    this.$Message.error('HTTP请求错误：' + response.statusText);
                else {
                    const data = response.data;
                    if (data.success)
                        this.$Message.success('验证码已发送.');
                    else
                        this.$Message.error(data.msg)
                }
            }
        }
    }
</script>

<style scoped>

</style>