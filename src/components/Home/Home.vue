<template>
  <div class="layout">
    <Layout>
      <Top :count="count"></Top>
      <Content>
        <!-- 分类标签 -->
        <div class="category">
          <ul>
            <span>商品分类：</span>
            <li v-for="(item, index) in categoryList" :key="index">
              <a href="javascript:void(0)">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <!-- 商品区域 -->
        <div class="goods-area">
          <ul>
            <li class="good" v-for="(item, index) in goodsList" :key="index">
              <img :src="item.imgSrc" />
              <span class="good-title">{{ item.title }}</span>
              <div>
                <span class="price">¥ {{ item.price }}</span>
                <Icon
                  type="ios-add-circle-outline"
                  class="icon-cart"
                  size="24"
                  @click="addGood(item)"
                />
              </div>
            </li>
          </ul>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import hat from "@/assets/hat.jpeg";
import Top from "../Common/Top.vue";
export default {
  data() {
    return {
      // 分类列表
      categoryList: [
        {
          title: "帽子",
        },
        {
          title: "上衣",
        },
        {
          title: "裤子",
        },
        {
          title: "鞋子",
        },
      ],
      // 商品列表
      goodsList: [
        {
          imgSrc: hat,
          title: "hat 1",
          price: 50,
        },
        {
          imgSrc: hat,
          title: "hat 2",
          price: 350,
        },
        {
          imgSrc: hat,
          title: "hat 3",
          price: 540,
        },
        {
          imgSrc: hat,
          title: "hat 4",
          price: 530,
        },
        {
          imgSrc: hat,
          title: "hat 5",
          price: 510,
        },
        {
          imgSrc: hat,
          title: "hat 6",
          price: 150,
        },
        {
          imgSrc: hat,
          title: "hat 7",
          price: 520,
        },
      ],
      // 用户信息
      userInfo: {},
      // 购物车徽标
      count: 0,
    };
  },
  components: { Top },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let count = 0
    this.userInfo.cartInfo.forEach((item)=>{
      count += item.count
    })
    this.count = count
  },
  methods: {
    // 添加商品到购物车
    addGood(item) {
      // 获取本地存储的信息
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // 查询是否已有相同商品
      // 有则修改数量
      // 无则添加新的一项
      const goodIndex = userInfo.cartInfo.findIndex(
        (good) => good.title === item.title
      );
      if(goodIndex == '-1'){
        // 添加数量属性
        item['count'] = 1
        userInfo.cartInfo.push(item)
      }else{
        userInfo.cartInfo[goodIndex].count += 1
      }
      // 修改购物车徽标
      this.count += 1;
      // 提示信息
      this.$Message.success("添加成功!");
      // 保存用户信息到本地存储
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
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
}

.ivu-layout {
  height: 100%;
  background: #fff;
}

.ivu-layout-content {
  padding: 0 200px;
}

/* 分类标签区域 */
.category {
  margin: 50px 0;
}

.category ul {
  display: flex;
  list-style: none;
  align-items: center;
}

.category ul li a {
  display: block;
  height: 30px;
  width: 60px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
  background-color: #515a61;
  color: #fff;
  margin: 0 10px;
}

.category ul li a:hover {
}

/* 商品区域 */
.goods-area {
  width: 100%;
  height: 100%;
}

.goods-area ul {
  display: flex;
  flex-wrap: wrap;
}

.goods-area .good {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 0 20px;
  border: 1px solid #fff;
  border-radius: 5px;
}

.goods-area .good:hover {
  border: 1px solid #ccc;
}

.goods-area .good img {
  height: 200px;
  width: 200px;
  cursor: pointer;
}

.goods-area .good .good-title {
  margin: 5px 0;
  cursor: pointer;
}

.goods-area .good .price {
  color: rgb(255, 0, 0);
  font-size: 20px;
}

.goods-area .good > div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.goods-area .good .icon-cart {
  cursor: pointer;
}
</style>