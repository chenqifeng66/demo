<template>
  <div class="layout">
    <Layout>
      <Content>
        <!-- 搜索区域 -->
        <Input
          search
          placeholder="输入要搜索的商品"
          v-model="keyword"
          style="width: 50%; margin-top: 30px"
          clearable
          @on-search="search"
        />
        <!-- 分类标签区域 -->
        <div class="category">
          <h3 class="category-title">商品分类：</h3>
          <ul>
            <li
              v-for="item in categoryList"
              :key="item.id"
              @click="selectedCategory(item)"
            >
              <a href="javascript:void(0)">{{ item.name }}</a>
            </li>
          </ul>
        </div>

        <!-- 商品区域 -->
        <div class="goods-area">
          <ul>
            <li class="good" v-for="item in productList" :key="item.id">
              <img :src="item.image" />
              <span class="good-title">{{ item.title }}</span>
              <div>
                <span class="price">¥ {{ item.price | fenChange }}</span>
                <Icon
                  type="ios-add-circle-outline"
                  class="icon-cart"
                  size="24"
                  @click="addProduct(item)"
                />
              </div>
            </li>
          </ul>
        </div>
      </Content>
      <Page
        :total="total"
        :current="current_page"
        show-sizer
        show-total
        style="margin-top: 20px"
        :page-size="30"
        @on-change="changePage"
      />
    </Layout>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      // 分类列表
      categoryList: [],
      // 商品列表
      productList: [],
      // 搜索内容
      keyword: "",
      // 当前页数
      current_page: 1,
      // 总条数
      total: 0,
      // 分堆后的数据
      handlerArray: [],
    };
  },
  created() {
    this.getProductList();
  },
  computed: {
    ...mapState("cart", ["carts"]),
  },
  methods: {
    ...mapMutations("cart", ["addCart"]),
    // 添加商品到购物车
    addProduct(item) {
      this.$api
        .post("/carts", { item })
        .then(() => {
          this.addCart(item);
          // 提示信息
          this.$Message.success("添加成功!");
        })
        .catch(() => this.$Message.error("添加失败"));
    },

    // 获取商品列表
    getProductList() {
      this.$api.get("/products").then(({ data }) => {
        this.productList = data.products;
        this.current_page = data.current_page;
        this.total = data.total;
        this.categoryList = this.productList.reduce((pre, cur) => {
          pre.push(cur.category);
          return pre;
        }, []);
        // this.spliceProductList();
      });
    },

    // 对商品列表进行分堆
    spliceProductList() {
      const length = this.productList.length;
      // 分成5堆
      const heap = length / 5;
      for (let i = 0; i < heap; i++) {
        const heapArray = this.productList.slice(i * heap, (i + 1) * heap);
        this.handlerArray.push(heapArray);
      }
    },

    // 搜索
    search() {
      if (!this.keyword.trim()) {
        this.getProductList();
        return;
      }
      this.$api.get("/products?search=" + this.keyword).then(({ data }) => {
        this.productList = data.products;
        this.categoryList = this.productList.reduce((pre, cur) => {
          pre.push(cur.category);
          return pre;
        }, []);
      });
    },

    // 选中分类
    selectedCategory(item) {
      this.$api.get("products?categoryId=" + item.id).then(({ data }) => {
        this.productList = data.products;
        this.categoryList = [];
        this.categoryList.push(item);
      });
    },

    // 页码改变
    changePage(page) {
      this.current_page = page;
      this.$api.get("/products?page=" + this.current_page).then(({ data }) => {
        this.productList = data.products;
        this.current_page = data.current_page;
        this.total = data.total;
        this.categoryList = this.productList.reduce((pre, cur) => {
          pre.push(cur.category);
          return pre;
        }, []);
      });
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
  display: flex;
}

.category-title {
  min-width: 100px;
  margin-top: 5px;
}

.category ul {
  display: flex;
  list-style: none;
  align-items: center;
  flex-wrap: wrap;
}

.category ul li a {
  display: block;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  margin: 5px 10px;
  padding: 0 5px;
  color: #000;
  background: #f7f7f7;
  border: 1px solid #f7f7f7;
}

.category ul li a:hover {
  border: 1px solid;
}

.category ul li a:visited {
  border: 1px solid;
}

/* 商品区域 */
.goods-area {
  width: 100%;
  height: 100%;
}

.goods-area ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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