<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="2" @on-select="selectMenuItem">
          <div class="layout-nav">
            <MenuItem name="1" to="/home">
              <Icon type="ios-navigate"></Icon>
              商城
            </MenuItem>
            <MenuItem name="2" to="/cart">
              <Badge :count="count" :offset="[20, -60]">
                <Icon type="ios-cart-outline"></Icon
              ></Badge>
              购物车
            </MenuItem>
            <Submenu name="3">
              <template slot="title"
                ><Icon type="md-person"></Icon> 我的</template
              >
              <MenuItem name="3-1">退出登录</MenuItem>
            </Submenu>
          </div>
        </Menu>

        <!-- 登出确认对话框 -->
    <Modal v-model="showSignOutModal" title="提示" @on-ok="confirmSignOut">
      <p>您确定要退出该账号吗?</p>
    </Modal>
      </Header>
</template>

<script>
export default {
    props:['count'],
    data(){
      return {
        // 控制登出对话框的显示与隐藏
           showSignOutModal:false
      }
    },
    methods:{
        confirmSignOut(){
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          userInfo.token = ""
          localStorage.setItem("userInfo",JSON.stringify(userInfo))
          this.$router.push('/')
        },
        selectMenuItem(name){
          if(name == '3-1'){
            this.showSignOutModal = true
          }
          
        }
    }
}
</script>

<style scoped>
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>