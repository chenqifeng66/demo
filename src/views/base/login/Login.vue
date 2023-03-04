<template>
  <div class="container">
    <!-- 登陆表单区域 -->
    <Card>
      <h1 class="title">Welcome</h1>
      <Form ref="formInline" :model="auth" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="auth.email" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="auth.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')"
            >登陆</Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单信息
      auth: {
        email: "v.xkxhiwffe@kztl.tr",
        password: "12345678",
      },
      // 表单验证规则
      ruleInline: {
        email: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登陆提交表单
    handleSubmit(name) {
      // 验证表单信息
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 发起登陆请求
          this.$api
            .post("/sign_in", { auth: this.auth })
            .then(({ data }) => {
              const authorization = data.jwt;

              if (authorization) {
                window.localStorage.setItem("authorization", authorization);
              }

              this.$router.push("/home");
              this.$Message.success("登录成功!");
            })
            .catch(() => this.$Message.error("用户名或密码错误!"));
        } else {
          this.$Message.error("登录失败!");
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ivu-card {
  width: 350px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.title {
  margin: 20px 0;
}
</style>