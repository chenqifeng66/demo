<template>
  <div>
    <Table border :columns="columns7" :data="data6"></Table>
    <Switch :value="false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns7: [
        {
          title: "Name",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("div", [h("strong", params.row.name)]);
          },
        },
        {
          title: "Age",
          key: "age",
          align: "center",
        },
        // 图片
        {
          title: "Image",
          key: "image",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.image,
                },
                class: {
                  "table-img": true,
                },
                style: {
                  width: "100px",
                  height: "100px",
                },
              }),
              h(
                "Upload",
                [
                  h(
                    "Button",
                    {
                      props: {
                        icon: "ios-cloud-upload-outline",
                      },
                    },
                    "上传头像"
                  ),
                ],
                {
                  props: {
                    action: "//127.0.0.1",
                  },
                }
              ),
            ]);
          },
        },
        {
          title: "Address",
          key: "address",
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    },
                  },
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    },
                  },
                },
                "Delete"
              ),
            ]);
          },
        },
        // switch开关
        {
          title: "Status",
          key: "status",
          width: "150px",
          align: "center",
          render: (h, params) => {
            return h("i-switch", {
              attrs: {
                value: params.row.status,
              },
              on: {
                "on-change": (status) => {
                  this.data6[params.index].status = status;
                  this.$Message.info("已修改");
                },
              },
            });
          },
        },
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          image:
            "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          address: "New York No. 1 Lake Park",
          status: true,
        },
        {
          name: "Jim Green",
          age: 24,
          image:
            "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          address: "London No. 1 Lake Park",
          status: false,
        },
        {
          name: "Joe Black",
          age: 30,
          image:
            "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          address: "Sydney No. 1 Lake Park",
          status: false,
        },
        {
          name: "Jon Snow",
          age: 26,
          image:
            "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          address: "Ottawa No. 2 Lake Park",
          status: true,
        },
      ],
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    change(status) {
      this.$Message.info("开关状态：" + status);
    },
  },
};
</script>

<style scoped>
.table-img {
  width: 100px;
  height: 100px;
  white-space: nowrap;
}
</style>


