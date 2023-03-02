<template>
  <div class="container">
    <!-- 登陆表单区域 -->
    <Card>
        <h1 class="title">Welcome</h1>
      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
      >
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="Password"
          >
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
      formInline: {
        user: "admin",
        password: "123456",
      },
      // 表单验证规则
      ruleInline: {
        user: [
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
            // 保存用户信息到本地
            if(!localStorage.getItem('userInfo')){
                const userInfo = {
                    username:this.formInline.user,
                    cartInfo:[],
                    token:"123456123456"
                }
  
                localStorage.setItem('userInfo',JSON.stringify(userInfo))
            }
            else{
              const userInfo = JSON.parse(localStorage.getItem('userInfo'))
              userInfo['token'] = '123456123456'
              localStorage.setItem('userInfo',JSON.stringify(userInfo))
            }

            this.$router.push('/home')
            this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
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

.title{
    margin: 20px 0;
}
</style>