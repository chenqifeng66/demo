<template>
  <div class="layout">
    <Layout>
      <Top :count="count"></Top>
      <Content class="main">
        <!-- 购物车区域 -->
        <div class="cart">
          <h1>购物车</h1>
          <!-- 购物车信息区域 -->
          <Card class="good" v-for="(item, index) in cartInfo" :key="index">
            <Layout>
              <Sider hide-trigger>
                <img :src="item.imgSrc" />
              </Sider>
              <Layout class="right">
                <Header class="title">{{ item.title }}</Header>
                <Content class="describe">商品描述</Content>
                <Footer class="footer">
                  <div>
                    <span>¥ </span>
                    <span class="price">{{ item.price }}</span>
                  </div>
                  <div class="footer-right">
                    <Icon
                      type="md-trash"
                      :size="24"
                      class="icon-delete"
                      @click="deleteGood(index)"
                    />
                    <InputNumber
                      controls-outside
                      :min="1"
                      v-model="item.count"
                      @on-change="numberChange"
                    ></InputNumber>
                  </div>
                </Footer>
              </Layout>
            </Layout>
          </Card>

          <div class="message" v-if="!count">购物车空空如也~</div>
        </div>
      </Content>
    </Layout>

    <!-- 结算区域 -->
    <div class="settlement-area">
      <div class="money">
        <span>¥ </span>
        <span class="price">{{ sum }}</span>
      </div>
      <div class="settlement">结算</div>
    </div>

    <!-- 删除确认对话框 -->
    <Modal v-model="showDeleteModal" title="提示" @on-ok="confirmDelete">
      <p>您确定要删除该商品吗?</p>
    </Modal>
  </div>
</template>

<script>
import Top from "@/components/Common/Top.vue"
export default {
  components: {
    Top,
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.cartInfo = this.userInfo.cartInfo;
    let count = 0;
    this.cartInfo.forEach((item) => {
      count += item.count;
    });
    this.count = count;
  },
  data() {
    return {
      // 购物车信息
      cartInfo: [],
      // 用户信息
      userInfo: [],
      // 购物车徽标
      count: 0,
      // 控制删除对话框的显示与隐藏
      showDeleteModal: false,
      // 选中删除商品的索引
      deleteIndex: -1,
    };
  },
  computed: {
    sum() {
      let sum = 0;
      this.cartInfo.forEach((item) => {
        sum += item.price * item.count;
      });
      return sum;
    },
  },
  watch: {
    userInfo: {
      deep: true,
      handler(newValue) {
        let count = 0;
        newValue.cartInfo.forEach((item) => {
          count += item.count;
        });
        this.count = count;
      },
    },
  },
  methods: {
    // 保存用户信息到本地
    saveUserInfoToLocal() {
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    // 修改购物车商品数量
    numberChange() {
      this.saveUserInfoToLocal();
    },
    // 显示删除对话框
    deleteGood(index) {
      this.showDeleteModal = true;
      this.deleteIndex = index;
    },
    // 确认删除
    confirmDelete() {
      this.userInfo.cartInfo.splice(this.deleteIndex, 1);
      this.saveUserInfoToLocal();
      this.$Message.success("删除成功!");
    },
  },
};
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  height: 100%;
  min-width: 1800px;
  margin-bottom: 80px;
}

.ivu-layout {
  height: 100%;
  background: #fff;
}

.main {
  padding: 0 200px;
}

.cart {
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cart .message {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #979595;
}

.cart .good {
  margin: 10px 0;
  width: 100%;
}

.cart .ivu-layout-sider img {
  width: 100%;
  height: 100%;
}

.cart .good .right {
  align-items: flex-start;
  margin-left: 100px;
}

.cart .good .right .title {
  font-size: 30px;
  font-weight: 600;
}

.cart .good .right .describe {
  color: #979595;
}

.cart .good .right .footer {
  width: 100%;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-right {
  display: flex;
  align-items: center;
}

.footer-right .icon-delete {
  margin-right: 10px;
}

.footer-right .icon-delete:hover {
  color: rgb(255, 0, 0);
}

.cart .good .right .footer span {
  color: rgb(255, 0, 0);
}

.cart .good .right .footer .price {
  font-size: 20px;
}

.ivu-input-number {
  width: 100px;
}

.ivu-input-number-input {
  text-align: center !important;
}

.settlement-area {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  height: 80px;
  width: 100%;
  align-items: center;
  border-radius: 5px;
  color: #fff;
  justify-content: flex-end;
  background-color: #fff;
}

.settlement-area .money {
  color: rgb(255, 0, 0);
}

.settlement-area .money .price {
  font-size: 25px;
}

.settlement {
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 20px;
  background-color: #5b6270;
  margin-left: 20px;
}
</style>