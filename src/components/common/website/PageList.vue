<template>
  <div>
    <Button v-permission="['create']" style="margin: 0 0 18px 18px;" type="primary" @click="onCreate">添加网页</Button>

    <Button style="margin: 0 0 18px 18px;" type="primary" @click="onHistory" v-if="['home', 'appBanner', 'appSplash'].includes(page_type)">
      历史记录
    </Button>

    <Form ref="searchForm" :model="searchForm" :label-width="70" line>
      <FormItem label="页面昵称" prop="title">
        <Input style="width: 200px" v-model="searchForm.title" placeholder="请输入"/>
      </FormItem>

      <FormItem>
        <Button @click="search" :disabled="loading">查询</Button>
        <Button @click="reset" style="margin: 0 8px" icon="refresh">重置</Button>
      </FormItem>
    </Form>

    <Table ref="table" :loading="loading" :columns="columns" :row-class-name="rowClassName" :data="pages"></Table>
    <page :total="count" size="small" @on-change="pageChange" show-total></page>

    <Modal v-model="createModal" title="新增页面(从已发布的页面复制或全新页面)" @on-ok="cancle" @on-cancle="cancle">
      <Form ref="createForm" :model="createForm" :label-width="140" :rules="formValidate">
        <FormItem label="页面昵称" prop="title">
          <Input style="width: 200px;" v-model="createForm.title"  placeholder="请输入"/>
        </FormItem>

        <FormItem>
          <Button class="submit-button" @click="copyPage" :disabled="loading" type="primary">提交</Button>
          <Button class="submit-button" @click="cancle">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {requestWebsitePages,
        requestWebsitePagesCreate,
        requestWebsitePageDelete,
        } from 'network/profile'

export default {
  name: 'PageList',
  data() {
    const routeConfig = {
      home: {
        editRouteName: "EditHomePage",
        historyRouteName: "HomeHistory"
      },
    }

    const columns = [
      {
        title: '网页昵称',
        key: 'title',
        render(h, params) {
          let style = {};
          if (params.row.status === 'publish') {
            style = {
              style: {
                color: "#2d8cf0",
                fontWeight: "blod"
              }
            }
          }
          return h('span', style, `${params.row.title}`)
        }
      },
      {
        title: '添加时间',
        key: 'create_time',
        render(h, params) {
          let style = {};
          if (params.row.status === 'publish') {
            style = {
              style: {
                color: "#2d8cf0",
                fontWeight: "blod"
              }
            }
          }
          return h('span', style, formatIso8601(params.row.create_time));
        }
      },
      {
         title: "修改时间",
          key: "update_time",
          render: function(h, params) {
            let style = {};
            if (params.row.status === "publish") {
              style = {
                style: {
                  color: "#2d8cf0",
                  fontWeight: "blod"
                }
              };
            }
            return h("span", style, formatIso8601(params.row.update_time));
          } 
      },
      {
        title: '状态',
        key: 'status',
        render: function(h, params) {
            let style = {};
            if (params.row.status === "publish") {
              style = {
                style: {
                  color: "#2d8cf0",
                  fontWeight: "blod"
                }
              };
            }
            return h("span", style, `${statusMap[params.row.status]}`);
        }
      },
      {
        title: '操作',
        key: 'option',
        width: 220,
        render(h, params) {
          let buttons = [];
          if (params.row.status === 'enable') {
            buttons = [
              h(
                'Button',
                {
                  on: {
                    click: () => {
                      this.onEdit(params.row);
                    }
                  },
                  directives: [
                    {
                      name: 'permission',
                      value: ['updata']
                    }
                  ]
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  on: {
                    click: () => {
                      this.onDelect(params.row);
                    }
                  },
                  directives: [
                    {
                      name: 'premission',
                      value: ['delete']
                    }
                  ]
                },
                '删除'
              )
            ];
          }else if (params.row.status === "publish") {
            buttons = [
              h(
                'Button',
                {
                  on: {
                    click: () => {
                      this.onEdit(params.row);
                    }
                  },
                  directives: [
                    {
                      name: 'premission',
                      value: ['view']
                    }
                  ]
                },
                '查看'
              )
            ];
          }
          return h('div', buttons);
        }
      }
    ]

    const formValidate = {
      title: [
        {
          required: true,
          message: '请输入网页昵称',
          trigger: 'blur',
        },
      ]
    }
    return{
      searchForm:{
        page_num: '1',
        limit: '10',
        title: ''
      },
      page_type: '',
      loading: false,
      pages: [],
      count: 0,
      createModal: false,
      createForm: {
        title: ''
      },
      formValidate: formValidate,
      columns: columns
    }
  },
  mounted() {
     if (this.$route.name === "HomePages") {
      this.page_type = "home_v2";
    }
    this.fetchData(this.searchForm);
  },
  methods: {
    rowClassName(row, index){
      if (row.status === 'pushlish') {
        return 'pushlish-table-info-row';
      }
      return '';
    },
    fetchData(params){
      this.loading = true;
      requestWebsitePages({
        ...params,
        _page_type: this.page_type
      }).then(res => {
        this.loading = false;
        let {code, result} = res;
        if (code === 200) {
          this.pages = result.pages;
          this.count = result.count;
        }
      });
    },
    onCreate() {
      this.createModal = true;
    },
    onHistory() {
      this.$router.push({
        name: routeConfig[this.page_type].historyRouteName
      })
    },
    search() {
      this.fetchData(this.searchForm);
    },
    reset() { 
      this.$refs['searchForm'].resetFields();
    },
    pageChange(page_num) {
      this.searchForm.page_num = page_num;
      this.fetchData(this.searchForm);
    },
    cancle() {
      this.createModal = false;
      this.createForm = {};
    },
    copyPage() {
      this.$refs['createForm'].validate(valid => {
        if (!valid) {
          this.$Message.error('请填入必填项');
        } else {
          this.$Message.loading({
            content: '正在提交...',
            duration: 0
          });
          this.loading = true;
          this.createForm.page_type = this.page_type;
          
          requestWebsitePagesCreate(this.createForm).then(res => {
            this.loading = false;
            this.$Message.destroy();

            let {code, result} = res;
            if (code === 200) {
              this.$Message.info('新建成功,正在跳转');
              this.createModal = false;
              this.$router.push({
                name: routeConfig[this.page_type].editRouteName,
                params: {
                  page_id: result
                }
              });
            } else {
              this.$Message.error('处理失败');
            }
          })
        }
      })
    },
    onEdit(row){
      this.$router.push({
        name: routeConfig[this.page_type].editRouteName,
        params:{
          page_id: row.id
        }
      })
    },
    onDelete(row) {
      this.$Message.confirm({
        title: '确认删除',
        content: '您确认要删除',
        onOk: () => {
          this.$Message.loading({
            content: '正在删除...',
            duration: 0
          });
        let params = {
          page_id: row.id
        };

        requestWebsitePageDelete(params).then(res => {
          this.$Message.destroy();
          let {code, msg} = res;

          if (code === 200) {
            this.$Message.info('删除成功');
            //关闭弹窗
            this.fetchData(this.searchForm);
          } else {
            this.$Message.error(msg);
          }
        })
        }
      })
    }
  }
}

var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver){
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
})

var handler = {
  get: function (traget, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello' + name;
  },

  apply: function (traget, thisBinging, args) {
    return arg[0];
  },

  construct: function (traget, args){
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2)  // 1
new fproxy(1, 2)  // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
</script>

<style scoped>
.create-button {
  margin: 0 0 18px 18px;
}

.form-item {
  width: 300px;
}
</style>