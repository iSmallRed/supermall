<template>
  <div>
    <div class="top-tool">
      <Tabs v-model="typeOfIntegral">
        <TabPane label="款式素材" name="1"></TabPane>
        <TabPane label="图案花稿" name="2"></TabPane>
      </Tabs> 
    </div>

    <Form :model="searchForm" :label-width="70" inline>
        <FormItem label="商品名称" >
            <Input v-model="searchForm.productName"/>
        </FormItem>
        <FormItem label="商品ID">
            <Input v-model="searchForm.productId"/>
        </FormItem>
        <FormItem label="标签">
            <Select v-model="searchForm.tags">
              <Option v-for="(value, key) in tagsMap" :key="key" :value="key">{{value}}</Option>
            </Select>
        </FormItem>

        <FormItem label="创建时间">
          <DatePicker type="daterange" 
            placeholder="选择日期"  
            v-model="searchForm.dateRange" 
            @on-change="searchTime" 
            :clearable="false"
            ></DatePicker>
        </FormItem>
        <div>
          <FormItem>
            <Button type="primary" @click="search">搜索</Button>
            <Button @click="reset" style="margin-left: 8px">重置</Button>
          </FormItem>
        </div>
    </Form>

    <Modal v-model="showModal" title="请选择商品标签" width="400px" @on-ok="submitTags">
      <Form :lable-width="80" inline>
        <FormItem label="商品ID:">
          <Input :value="editRowData.designWorksId || editRowData.designPatternId" disabled/>
        </FormItem>
        <FormItem label="商品名称：">
          <Input v-model="editRowData.productName" disabled/>
        </FormItem>
      </Form>

      <CheckboxGroup v-model="checkAllGroup">
        <Checkbox v-for="(value, key) in tagsMap" :label="value" :key="key"></Checkbox>
      </CheckboxGroup>
    </Modal>

    <Table :loading="loading" :columns="columns" :data="data.rowsData"></Table>
    <Page
      :total="data.count"
      size="small"
      :page-size="30"
      :current.sync="searchForm.pageIndex"
      @on-change="changePage"
      show-total
    ></Page>
    
  </div>
</template>

<script>
import { requestThird } from 'network/profile'
import { formatIso8601 } from 'network/time'
import { mapGetters } from "vuex";

const tagsMap = {
  1: "个人专属",
  2: "企业专属",
  3: "体验版"
}

const activateTagProp = {
  type: "primary",
  ghost: "ghost",
  size: "small"
}

const defaultTagProp = {
    type: "text",
    size: "small"
}

export default {
  name: 'FormView',
  data () {
    return {
      searchForm: {
        beginTime: "",
        endTime: "",
        currentPage: 1,
        productName: '',
        productId: '',
        pageIndex: 1,
        tags: '',
        dateRange: ''
      },
      editRowData: {
        productName: '',
        designWorksId: '',
        designPatternId: ''
      },
      showModal: false,
      checkAllGroup: [],
      typeOfIntegral: '1', // 款式素材: '1', 图案花稿: '2'
      loading: false,
      columns: this.columnsHead(),
      tagsMap: tagsMap,
      data: {
          // 请求的响应数据
          rowsData: [], // table的数据
          count: 0 // 总条数
        }
    }
  },

  mounted() {
    this.fetchData();
  },

  watch: {
    typeOfIntegral(type) {
        /**
         * tab切换时的操作
         */
      this.searchForm = {};
      this.columns = this.columnsHead();
      this.fetchData();
    }
  },

  computed: {
    ...mapGetters(['getuser'])
  },

  methods: {
    fetchStyleMaterialData(params){
      this.loading = true
      this.data.rowsData = []
      requestThird({
        third_path: "/DesignTool/Manage/ManageDesignWorks/TagManage",
        method: "get",
        pageSize: 10,
        ...params
      }).then( res => {
        let { code, result } = res;
        if( code === 200 && result.statusCode === 200) {
          let content = result.content;
          this.data.rowsData = content ? content.items : []
          this.data.count = content ? content.recordTotalCount : 0
        }   
      }).finally(() => {
        this.loading = false
      })
    },
    fetchPatternData(params){
      this.loading = true
      this.data.rowsData = []
      requestThird({
        third_path: "/design/Manage/DesignPatternTagManage/list",
        method: "get",
        pageSize: 10,
        ...params
      }).then(res => {
        let { code, result } = res;
          if (code === 200 && result.statusCode === 200) {
            let content = result.content;
            this.data.rowsData = content ? content.list : []
            this.data.count = content ? content.recordTotalCount : 0
          }
        }).finally(() => {
          this.loading = false;
        })
    },
    fetchData(params){
      params && params.productId === '' ? delete params.productId : null
      switch(this.typeOfIntegral){
        case "1": 
          this.fetchStyleMaterialData(params);
          break;
        case "2":
          this.fetchPatternData(params);
          break;
      }
    },
    submitStyleMaterialTags(tagsIds){
      this.loading = true
      requestThird({
        third_path: "/DesignTool/Manage/ManageDesignWorks/TagManageEdit",
        method: 'post',
        designWorksId: this.editRowData.designWorksId,
        userId: this.getuser.id,
        tags: tagsIds
      }).then(res => {
        let { code, result} = res
        if(code == 200 && result.statusCode == 200){
          this.$Message.success("更新标签成功")
        }
        console.log(res);
        
      }).finally(() => {
           this.loading = false;
           this.fetchData(this.searchForm);
      })
    },

    submitPatternTags(tagsIds){
      this.loading = true
      requestThird({
        third_path: "/design/Manage/DesignPatternTagManage",
        method: 'post',
        designPatternId: this.editRowData.designPatternId,
        userId: this.getuser.id,
        tags: tagsIds
      }).then(res => {
        let { code, result} = res
        if (code == 200 && result.statusCode == 200) {
          this.$Message.success("更新标签成功"); 
        }
        console.log(res);
      }).finally(() => {
        this.loading = false;
        this.fetchData(this.searchForm);
      })
    },

    submitTags(params = {}) {
      let tagsIds = []
      this.checkAllGroup.forEach(element => {
        for(let id in tagsMap){
          if(tagsMap[id] == element){
            tagsIds.push(id)
          }
        }
      });
      switch (this.typeOfIntegral){
        case "1": 
          this.submitStyleMaterialTags(tagsIds)
          break;
        case "2":
          this.submitPatternTags(tagsIds)
          break;
      }

    },
    // 搜索
    search(){
      this.searchForm.currentPage = 1
      this.searchForm.pageIndex = 1
      this.fetchData(this.searchForm)
    },
    searchTime(){

    },
    // 换页
    changePage(page){
      this.searchForm.currentPage = page
      this.searchForm.pageIndex = page
      this.fetchData(this.searchForm)
    },
    reset() {
        this.searchForm = {};
    },

    rowEdit(row){
      this.showModal = true
      this.editRowData.productName = row.productName
      this.editRowData.designWorksId = row.designWorksId
      this.editRowData.designPatternId = row.designPatternId

      this.checkAllGroup = []
      row.tags.forEach(element => {
        this.checkAllGroup.push(tagsMap[element.toString()])
      })
    },

    commentButton(h, data, func, buttonName, premission){
      /**
         *h: render中的第一个参数，h
         *data: row, 每行的json
         *func: function,按钮调用的方法
         *buttonName: str
         *permission: str 增删查改 审核
         */
      return h(
        'Button',{
          on: {
            click:() => {
              func(data);
            }
          },
          directive: [
          {
            name: 'premission',
            value: [premission]
          }
          ]
        },
        buttonName
      );
    },

    rowButton(h, row){

      let buttonList = []

      buttonList.push(
        this.commentButton(h, row, this.rowEdit, '编辑', 'updata')
      );

      return buttonList;
    },

    columnsHead() {
      let baseColumns = [
        {
          title: '创建时间',
          key:"createDate",
          render: (h, {row, columns, index}) => {
            return h('span', formatIso8601(row.createDate))
          }
        },
        {
          title: '商品名称',
          key: "productName"
        },
        {
          title: '商品ID',
          key: "designWorksId",
          render: (h, {row, columns, index}) => {
            return h('span', row.designWorksId || row.designPatternId)
          }
        },
        {
          title: '个人专属标签',
          key: 'FUserName',
          render: (h, {row, columns, index}) => {
            let props = row.tags && row.tags.includes(1) ? activateTagProp : defaultTagProp;
            return h('button', {
              props: props
            }, "个人专属")
          }
        },
        {
          title: '企业专属标签',
          key: 'FUserName',
          render: (h, {row, columns, index}) => {
            let props = row.tags && row.tags.includes(2) ? activateTagProp : defaultTagProp;
            return h('button', {
              props: props
            },'企业专属')
          }
        },
        {
          title: '体验版标签',
          key: 'FUserName',
          render: (h, {row, columns, index}) => {
            let props = row.tags && row.tags.includes(3) ? activateTagProp : defaultTagProp;
            return h('button', {
              props: props
            }, '体验专属')
          }
        },
        {
          title: '操作',
          render: (h, {row, cloumns, index}) => {
            return h('div', this.rowButton(h, row))
          }
        }
        ];
        return baseColumns;
    }
  }    
}
</script>

<style lang="scss" scoped>
.top-tool {
  margin-bottom: 30px;
  .create-button {
    margin-bottom: 20px;
  }
}

// 搜索框大小
.ivu-form {
  .ivu-form-item {
    width: 250px;
  }
}

.ivu-modal-content {
  .ivu-form-item {
    display: inline-block;
  }
  .label {
    font-size: 14px;
  }
}
</style>