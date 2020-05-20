<template>
  <div>
    <Button type="primary" @click="publishPage" v-if="!isPublis">发布首页</Button>
    
    <!-- 首页轮播 -->
    <div class="layout-box banner">
      <h3 class="box-title">首页轮播图</h3>
      <Row :gutter="10" class="block-row">
        <Col v-for="(widget, key) in banner.wedgets" :key="key" :span="5"> 
          <div class="widget-item">
            <div class="item-cover" :style="{'background-image': 'url(' + widget.cover + ')'}"></div>
            <div class="item-tool-bar" v-if="!isPublis">
              <Button @click="editWidget('banner', widget)" size="small">编辑</Button>
              <Button @click="deleteWidget('banner', widget)" size="small">删除</Button>
            </div>
          </div>
        </Col>

        <Col v-if="banner.widgets.length < 5" :span="3"> 
          <div class="widget-item">
            <div class="plus-block" @click="configureLayout('banner', '')" v-if="!isPublis"></div>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 弹窗广告 -->
    <div class="layout-box banner">
      <h3 class="box-title">弹窗广告  </h3>
      <Row :gutter="10" class="block-row">
        <Col v-for="(widget, key) in popup.wedgets" :key="key" :span="5"> 
          <div class="widget-item">
            <div class="item-cover" :style="{'background-image': 'url(' + widget.cover + ')'}"></div>
            <div class="item-tool-bar" v-if="!isPublis">
              <Button @click="editWidget('popup', widget)" size="small">编辑</Button>
              <Button @click="deleteWidget('popup', widget)" size="small">删除</Button>
            </div>
          </div>
        </Col>

        <Col v-if="popup.widgets.length < 5" :span="3"> 
          <div class="widget-item">
            <div class="plus-block" @click="configureLayout('popup', '')" v-if="!isPublis"></div>
          </div>
        </Col>
      </Row>
    </div>
    
    <h1 style="margin-top:20px;">设计工具直通车</h1>
    <hr>
    <!-- 图案花稿-轮播图 -->
    <div class="layout-box banner">
      <h3 class="box-title">图案花稿-轮播图  </h3>
      <Row :gutter="10" class="block-row">
        <Col v-for="(widget, key) in patternPic.wedgets" :key="key" :span="5"> 
          <div class="widget-item">
            <div class="item-cover" :style="{'background-image': 'url(' + widget.cover + ')'}"></div>
            <div class="item-tool-bar" v-if="!isPublis">
              <Button @click="editWidget('patternPic', widget)" size="small">编辑</Button>
              <Button @click="deleteWidget('patternPic', widget)" size="small">删除</Button>
            </div>
          </div>
        </Col>

        <Col v-if="patternPic.widgets.length < 5" :span="3"> 
          <div class="widget-item">
            <div class="plus-block" @click="configureLayout('patternPic', '')" v-if="!isPublis"></div>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 资讯图库-轮播图 -->
    <div class="layout-box banner">
      <h3 class="box-title">资讯图库-轮播图</h3>
      <Row :gutter="10" class="block-row">
        <Col v-for="(widget, key) in flashPic.widgets" :key="key" :span="5">
          <div class="widget-item">
            <div class="item-cover" :style="{ 'background-image': 'url(' + widget.cover + ')' }"></div>
            <div class="item-tool-bar" v-if="!isPublish">
              <Button @click="editWidget('flashPic',widget)" size="small">编辑</Button>
              <Button @click="deleteWidget('flashPic',widget)" size="small">删除</Button>
            </div>
          </div>
        </Col>
        <Col v-if="flashPic.widgets.length < 5" :span="3">
          <div class="widget-item">
            <div class="plus-block" @click="configureLayout('flashPic', '')" v-if="!isPublish"></div>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 款式素材-轮播图 -->
    <div class="layout-box banner">
      <h3 class="box-title">款式素材-轮播图</h3>
      <Row :gutter="10" class="block-row">
        <Col v-for="(widget, key) in stylePic.widgets" :key="key" :span="5">
          <div class="widget-item">
            <div class="item-cover" :style="{ 'background-image': 'url(' + widget.cover + ')' }"></div>
            <div class="item-tool-bar" v-if="!isPublish">
              <Button @click="editWidget('stylePic',widget)" size="small">编辑</Button>
              <Button @click="deleteWidget('stylePic',widget)" size="small">删除</Button>
            </div>
          </div>
        </Col>
        <Col v-if="stylePic.widgets.length < 5" :span="3">
          <div class="widget-item">
            <div class="plus-block" @click="configureLayout('stylePic', '')" v-if="!isPublish"></div>
          </div>
        </Col>
      </Row>
    </div>

    <!-- 行业新闻 -->
    <hr>
    <div class="layout-box news">
      <Row :gutter="20" class="block-row">
        <Col span="12">
          <h3 class="box-title">行业新闻</h3>
          <Row>
            <Col span="24" v-for="(widget, key) in news.widgets" :key="key">
              <div class="widget-item">
                <div
                  class="item-cover"
                  :style="{ 'background-image': 'url(' + widget.cover + ')' }"
                ></div>
                <div class="item-tool-bar" v-if="!isPublish">
                  <Button @click="editWidget('news', widget)" size="small">编辑</Button>
                  <Button @click="deleteWidget('news',widget)" size="small">删除</Button>
                </div>
              </div>
            </Col>

            <Col v-if="news.widgets.length < 1" span="24">
              <div class="widget-item">
                <div class="plus-block" @click="configureLayout('news', '')" v-if="!isPublish"></div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col span="12">
          <h3 class="box-title">快讯</h3>
          <Row>
            <Col span="24">
              <div class="widget-item" v-if="flash.widgetMap.get(0)">
                <div class="item-title">{{flash.widgetMap.get(0).title}}</div>
                <div class="item-tool-bar" v-if="!isPublish">
                  <Button @click="editWidget('flash',flash.widgetMap.get(0))" size="small">编辑</Button>
                  <Button @click="deleteWidget('flash',flash.widgetMap.get(0))" size="small">删除</Button>
                </div>
              </div>
              <div class="widget-item" v-else>
                <div class="plus-block" @click="configureLayout('flash', 0)" v-if="!isPublish"></div>
              </div>
            </Col>

            <Col span="24">
              <div class="widget-item" v-if="flash.widgetMap.get(1)">
                <div class="item-title">{{flash.widgetMap.get(1).title}}</div>
                <div class="item-tool-bar" v-if="!isPublish">
                  <Button @click="editWidget('flash',flash.widgetMap.get(1))" size="small">编辑</Button>
                  <Button @click="deleteWidget('flash',flash.widgetMap.get(1))" size="small">删除</Button>
                </div>
              </div>
              <div class="widget-item" v-else>
                <div class="plus-block" @click="configureLayout('flash', 1)" v-if="!isPublish"></div>
              </div>
            </Col>

            <Col span="24">
              <div class="widget-item" v-if="flash.widgetMap.get(2)">
                <div class="item-title">{{flash.widgetMap.get(2).title}}</div>
                <div class="item-tool-bar" v-if="!isPublish">
                  <Button @click="editWidget('flash',flash.widgetMap.get(2))" size="small">编辑</Button>
                  <Button @click="deleteWidget('flash',flash.widgetMap.get(2))" size="small">删除</Button>
                </div>
              </div>
              <div class="widget-item" v-else>
                <div class="plus-block" @click="configureLayout('flash', 2)" v-if="!isPublish"></div>
              </div>
            </Col>

            <Col span="24">
              <div class="widget-item" v-if="flash.widgetMap.get(3)">
                <div class="item-title">{{flash.widgetMap.get(3).title}}</div>
                <div class="item-tool-bar" v-if="!isPublish">
                  <Button @click="editWidget('flash',flash.widgetMap.get(3))" size="small">编辑</Button>
                  <Button @click="deleteWidget('flash',flash.widgetMap.get(3))" size="small">删除</Button>
                </div>
              </div>
              <div class="widget-item" v-else>
                <div class="plus-block" @click="configureLayout('flash', 3)" v-if="!isPublish"></div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

    <Modal
      v-model="showConfigurationModal"
      title="详情"
      width='800'
      @on-ok="cancel"
      @on-cancel="cancel"
      :closable="false"
      :mack-closable="false"
      >
      <Tabs type="line" @on-click="tabChange" :value="current_tab">
        <TabPane :disabled="!showInformationTab" label="从资料库里选择"  name="informationTab">
          <From ref="infromationForm" :model="editForm" :label-width="100" :rules="formValidate">
            <FromItem label="封面图片" prop="cover" v-if="currentLayoutType != 'flash'">

              <Button type="primary" icon="ios-cloud-upload-outline" :loading="uploadCoverLoading" :disabled="uploadCoverLoading">
                <span v-if="uploadCoverLoading">正在上传...</span>
                <span v-else-if="coverSize">上传图片请上传{{coverSize}}像素的图片</span>
                <span v-else>上传图片</span>
              </Button>
              <div>
                <img :src="editForm.cover" class="cover-image">
              </div>
            </FromItem>

            <FormItem label="权重" v-if="['banner', 'patternPic', 'flashPic', 'stylePic'].includes(currentLayoutType)" prop="weight">
              <Input class="form-item" type="text" v-model="editForm.weight" number/>
              <span>(权重范围: 0-99)，数值越大，位置越靠后</span>
            </FormItem>

            <FormItem label="摘要" v-if="currentLayoutType === 'news' || currentLayoutType === 'flash'" prop="abstract">
              <Input style="width: 500px;" type="textarea" :rows="8" v-model="editForm.abstract" placeholder="此处不能少于50字"/>
            </FormItem>

            <Table ref="table" :loading="loading" :columns="column" :data="informaction" @on-current-change="onTableRowChange" 
                    :disabled-hover="true" highlight-row>
            </Table>
            <Page :total="count" size="small" @on-change="pageChange" show-total></Page>

            <div class="bottom-tips" v-if="currentRow">
              <h3>已选内容</h3>
              <Table :columns="column" :data="[currentRow]"></Table>
            </div>

            <FormItem>
              <Botton class="submit-button" @click="onRowSelect" :disabeld="loading" type="primary">提交</Botton>
              <Botton class="submit-button" @click="cancel"></Botton>
            </FormItem>
          </From>
        </TabPane>

        <TabPane :disabled="!showCreateLinkTab" label="新建连接" name="createLinkTab">
          <Form ref="linkForm" :model="editForm" :label-width="100" :rules="formValidate">
            <FormItem label="标题" prop="title">
              <Input class="form-item" v-model="editForm.title"/>
               <Button
                  type="primary"
                  icon="ios-cloud-upload-outline"
                  :loading="uploadCoverLoading"
                  :disabled="uploadCoverLoading"
                >
                  <span v-if="uploadCoverLoading">正在上传...</span>
                  <span v-else-if="coverSize">上传图片请上传{{coverSize}}像素的图片</span>
                  <span v-else>上传图片</span>
                </Button>
              </my-upload>
              <div v-if="editForm.cover">
                <img :src="editForm.cover" class="cover-image">
              </div>
            </FormItem>

            <FormItem label="链接" prop="url">
              <Input class="form-item" v-model="editForm.url" placeholder="请输入链接"/>
            </FormItem>

            <FormItem label="起止时间" prop="day_picker">
              <Datepicker
                :value="day_picker"
                format="yyyy-MM-dd"
                style="width: 200px;"
                type="daterange"
                placeholder="请选择日期"
                v-model="editForm.day_picker"
                @on-change="onDatePickerChange"
                :options="datePickerOption"
                :clearable="false">
              </Datepicker>
            </FormItem>

            <FormItem label="权重" v-if="['banner', 'patternPic', 'flashPic', 'stylePic'].includes(currentLayoutType)" prop="weight">
              <Input class="form-item" type="text" v-model="editForm.weight" number/>
              <span>(权重范围: 0-99)，数值越大，位置越靠后</span>
            </FormItem>
            <FormItem>
              <Button class="submit-button" @click="submitLink" :disabled="loading" type="primary">提交</Button>
              <Button class="submit-button" @click="cancel">取消</Button>
            </FormItem>
          </Form>
        </TabPane>

        <TabPane :disabled="!showCoverTab" label="封面图" name="createCoverTab">
          <From ref="coverForm" :model="editForm" :label-width="100" :rules="formValidate">
            <FormItem label="标题" prop="title">
              <Input class="form-item" v-model="editForm.title"/>
            </FormItem>

            <FormItem label="封面图片" prop="cover">
                <Button
                  type="primary"
                  icon="ios-cloud-upload-outline"
                  :loading="uploadCoverLoading"
                  :disabled="uploadCoverLoading"
                >
                  <span v-if="uploadCoverLoading">正在上传...</span>
                  <span v-else-if="coverSize">上传图片请上传{{coverSize}}像素的图片</span>
                  <span v-else>上传图片</span>
                </Button>
              </my-upload>
              <div v-if="editForm.cover">
                <img :src="editForm.cover" class="cover-image">
              </div>
            </FormItem>

            <!-- <FormItem label="链接" prop="url">
              <Input class="form-item" v-model="editform.url" placeholder="请输入链接"/>
            </FormItem> -->

            <FormItem label="起止时间" prop="day_picker">
              <DatePicker
                :value="day_picker"
                format="yyyy-MM-dd"
                style="width: 200px"
                type="daterange"
                placeholder="选择日期"
                v-model="editForm.day_picker"
                @on-change="onDatePickerChange"
                :options="datePickerOption"
                :clearable="false"
              ></DatePicker>
            </FormItem>

            <FormItem label="权重" v-if="['banner', 'patternPic', 'flashPic', 'stylePic'].includes(currentLayoutType)" prop="weight">
              <Input class="form-item" type="text" v-model="editForm.weight" number/>
              <span>(权重范围: 0-99)，数值越大，位置越靠后</span>
            </FormItem>
            <FormItem>
              <Button
                class="submit-button"
                @click="submitCover"
                :disabled="loading"
                type="primary">提交</Button>
                <Button class="submit-button" @click="cancel">取消</Button>
            </FormItem>
          </From>
        </TabPane>
      </Tabs>     
    </Modal>  
  </div>
</template>

<script>

const UPLOAD_VERIFY_KEY = {
  advertisement: "website-home-advertisement",
  // banner: "website-home-banner",
  flash: "website-home-flash",
  // news: "website-home-news",
  selection: "website-home-selection",

  banner: "website-home_v2-banner",
  popup: "website-home_v2-popup",
  patternPic: "website-home_v2-patternPic",
  flashPic: "website-home_v2-flashPic",
  stylePic: "website-home_v2-stylePic",
  news: "website-home_v2-news"
};

import {requestWebsiteHomeV2Detail,
        requestSpiderInformationList,
        requestWebsiteWidgetDelete,
        requestWebsiteHomeV2WidgetCreate,
        requestWebsiteWidgetEdit,
        requestWebsiteHomeV2Publish} from 'network/profile'

import { isEmpty } from "network/util"
export default {
  name: 'Home',
  data() {
    const formValidate = {
      cover: [
        {
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }
      ],
      weight: [
        {
          validator: (rule, value, callback) => {
            if (value.length <= 0) {
              callback(new Error('请输入权重范围： 0-99'));
            } else if (typeof value !== 'number' || value < 0 || value > 99){
              callback(new Error('(权重范围: 0-99)，数值越大，位置越靠后'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
      ],
      title: [
        {
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        },
        {
          type: 'string',
          max: 40,
          message: '请输入少于40个字',
          trigger: 'blur'
        }
      ],
      url: [
        {
          required: true,
          message: '请输入链接',
          trigger: 'blur'
        },
        {
          type: "url",
          message: "请输入正确的链接 (http://*.*)",
          trigger: "blur"
        }
      ],
      abstract: [
        {
          required: true,
          message: "请输入摘要 (不能少于50字)",
          trigger: "blur"
        },
        {
          type: "string",
          min: 50,
          message: "不能少于50字",
          trigger: "blur"
        }
      ],
      day_picker: [
        {
          required: true,
          message: '请选择起止时间'
        },
        {
          validate: (rule, value, callback) => {
            if (!this.editForm.day_picker) {
              callback(new Error('时间必填项'))
            } else {
              callback()
            }
          }
        }
      ]
    };
    return {
      page_id: '',//判断是否为编辑
      formValidate: formValidate,
      current_tab: '',
      banner: {
        id: '',
        widgets: [],
        cover_size: '',
        widgetMap: new Map()
      },
      news: {
        id: '',
        widgets: [],
        cover_size: '',
        widgetMap: new Map()
      },
      popup: {
        id: '',
        widgets: [],
        cover_size: '',
        widgetMap: new Map()
      },
      flashPic: {
        id: '',
        widgets: [],
        cover_size: '',
        widgetMap: new Map()
      },
       stylePic: {
        id: '',
        widgets: [],
        cover_size: '',
        widgetMap: new Map()
      },
       patternPic: {
        id: '',
        widgets: [],
        cover_size: '',
        widgetMap: new Map()
      },
      isPublish: false, //是否为已发布
      containerSpinShow: false,
      LayoutConfig: {},
      modalSpinShow: false,
      page: 1, //当前第几页
      limit: 10,
      count: 0,
      information: [],
      showConfigurationModal: false, //配置首页内容弹窗
      showInformationTab: false, //从资料库选择tab
      showCreateLinkTab: false, //新建一个链接tab
      showCoverTab: false,//选择图片
      uploadCoverLoading: false,
      currentLayoutType: "", //正在配置的布局类型
      coverSize: "", //封面尺寸
      currentWidget: {}, //正在修改的组件
      day_picker: [], //起止时间
      editForm: {     //编辑
        day_picker: '',
        weight: 0,
        cover: '',
        title: '',
        abstract: '',
        url: ''
      },
      currentRow: undefined,
      
    }
  },
  mounted () {
    if (this.$route.params.page_id) {
      this.page_id = this.$route.params.page_id;
      this.fetchData()
    } else {
      this.$Modal.warning({
        title: '警告',
        content: '请从页面列表选择'
      });
      this.$router.push({
        name: 'HomePages'
      })
    }
  },
  methods:{
    fetchData() {
      this.containerSpinShow = true
      requestWebsiteHomeV2Detail({
        _page_id: this.page_id
      }).then(res => {
        let {result, code} = res;
        if(code === 200) {
          let data = result;
          this.isPublish = data.status === 'publish';

          let layouts = data.layouts;
           //widget转化成key-value的格式
          for(let key in layouts){
            let widgets = layouts[key].widgets
            let widgetMap = new Map();
            if (
              [
                'banner',
                'news',
                'popup',
                'flashPic',
                'patternPic',
                'stylePic'
              ].includes(key)
            ) {
              // 针对weight进行排序
              layouts[key].widgets.sort((a, b) => {
                if (a.widgets - b.widgets < 0) {
                  return -1
                } else if (a.widgets - b.widgets > 0) {
                  return 1
                } else {
                  let a_day = Date.parse(a.update_time);
                  let b_day = Date.parse(b.update_time);
                  if (a_day < b_day) {
                    return 1;
                  } else if (a_day > b_day) {
                    return -1;
                  } else {
                    return 0
                  }
                }
              });
              layouts[key].widgetMap = widgetMap;
            } else {
              //把weight作为key
              widgets.forEach(e => {
                widgetMap.set(e.weight, e);
              });
              layouts[key].widgetMap = widgetMap;
            }
          }
          this.LayoutConfig = layouts;
          this.banner = layouts.banner;
          this.popup = layouts.popup;
          this.news = layouts.news;
          this.flashPic = layouts.flashPic;
          this.patternPic = layouts.patternPic;
          this.stylePic = layouts.stylePic;
        } 
        this.containerSpinShow = false;
      })
    },
    fetchInfromation(){
      this.modalSpinShow = true;
      this.loading = true;
      let params = {
        status: 'publish',
        page_num: this.page
      };
      requestSpiderInformationList(params).then(res => {
        this.modalSpinShow = false;
        this.loading = false;
        let {result, code} = res;
        if (code === 200) {
          this.information = result.items;
          this.count = result.count;
        }
      })
    },
    publishPage(){
      //检查layout是否有空缺
      this.layouts = this.LayoutConfig;
      delete layouts.popup; //删除对弹窗必填的校验
      for(let key in layouts){
        let widgets = layouts[key].widgets;
        if (isEmpty(widgets)) {
          this.$Message.error({
            title: '提交失败',
            content: '页面模块缺失，请检查并配置完整'
          });
          return;
        }
      }
      this.$Message.confirm({
        title: '确认发布',
        content: '确定发布后不可撤回',
        onOK: () => {
          this.$Message.loading({
            content: '正在发布',
            duration: 0
          })
        
      requestWebsiteHomeV2Publish({
        _page_id: this.page_id
      }).then(res => {
        this.$Message.destroy();
        let {code, msg} = res;
        if (code === 200) {
          this.$Message.info('发布成功');
          this.resetVariable();
          this.fetchData()
        } else {
          this.$Message.error(msg);
          this.resetVariable();
          this.fetchData();
        }
      });
      }, 
        onCancel: () => {}
    });  
    },
    submitInformation() {
      let content = {
        id: this.currentRow.id,
        title: this.currentRow.title,
        abstract: this.currentRow.abstract,
        category: this.currentRow.category,
        keyworks: this.currentRow.keyworks
      };
      if (this.currentLayoutType === 'news' || this.currentLayoutType === 'flash') {
        content.abstract = this.editForm.abstract;
      }
      this.editForm.widget_type = 'information';
      this.editForm.description = '资料库';
      this.editForm.content = JSON.stringify(content);
      this.editForm.layout_type = this.currentLayoutType;

      this.$Message.loading({
        content: '正在提交...',
        duration: 0
      });
      if (!isEmpty(this.currentWidget)) {
        requestWebsiteWidgetEdit({
          _widget_id: this.currentWidget.widget_id,
          ...submitForm
        }).then(res => {
          this.$Message.destroy();
          let {code, msg} = res;
          if (code === 200) {
            this.$Message.Info('创建成功');
            //关闭弹窗
            this.showConfigurationModal = false;
            this.resetVariable();
            this.fetchData();
          } else {
            this.$Message.error(msg);
          }
        })
      } else {
        requestWebsiteHomeV2WidgetCreate({
          _page_id: this.page_id,
          ...this.editForm
        }).then(res => {
          this.$Message.destroy();
          let {code, msg} = res;
          if (code === 200) {
            this.$Message.info("创建成功");
            this.showConfigurationModal = false;
            this.resetVariable();
            this.fetchData();
          } else {
            this.$Message.error(msg);
          }
        })
      }
    },
    submitLink(){
      this.$refs['linkForm'].validate(valid => {
        if (!valid) {
          this.$Message.error('请填入必填项')
        } else {
          let content = {
            title: this.editForm.title,
            url: this.editForm.url
          }
        }
        let submitForm = {
          widget_id: 'link',
          cover: this.editForm.cover,
          weight: this.editForm.weight,
          description: '链接',
          content: JSON.stringify(content),
          layout_type: this.currentLayoutType,
          start_time: this.editForm.start_time,
          end_time: this.editForm.end_time
        };

        this.$Message.loading({
          content: '正在提交',
          duration: 0
        });

      if (!isEmpty(this.currentWidget)) {
        requestWebsiteWidgetEdit({
         _widget_id: this.currentWidget.widget_id,
          ...submitForm
        }).then(res => {
          this.$Message.destroy();
          let {code, msg} = res;
          if (code === 200) {
            this.$Message.Info('创建成功');
            //关闭弹窗
            this.showConfigurationModal = false;
            this.resetVariable();
            this.fetchData();
          } else {
            this.$Message.error(msg);
          }
        })
      } else {
        requestWebsiteHomeV2WidgetCreate({
          _page_id: this.page_id,
          ...submitForm
        }).then(res => {
          this.$$Message.destroy();
          let {code, msg} = res;
          if (code === 200) {
            this.$Message.info("创建成功");
                //关闭弹窗
                this.showConfigurationModal = false;
                this.resetVariable();
                this.fetchData();
          } else {
            this.$Message.error(msg);
          }
        })
      }
      })
    },
    submitCover() {
      this.$refs["coverForm"].validate(valid => {
        if (!valid) {
          this.$Message.error("请输入必填项");
        } else {
          let content = {
            title: this.editForm.title,
            url: this.editForm.cover
          };

          let submitForm = {
            widget_type: "pic",
            cover: this.editForm.cover,
            weight: this.editForm.weight,
            //          description: categories[this.editForm.category],
            description: "纯封面",
            content: JSON.stringify(content),
            layout_type: this.currentLayoutType,
            start_time: this.editForm.start_time,
            end_time: this.editForm.end_time
          };

          this.$Message.loading({
            content: "正在提交...",
            duration: 0
          });

          if (!isEmpty(this.currentWidget)) {
            requestWebsiteWidgetEdit({
              _widget_id: this.currentWidget.widget_id,
              ...submitForm
            }).then(res => {
              this.$Message.destroy();

              let { code, msg } = res;
              if (code === 200) {
                this.$Message.info("修改成功");
                //关闭弹窗
                this.showConfigurationModal = false;
                this.resetVariable();
                this.fetchData();
              } else {
                this.$Message.error(msg);
              }
            });
          } else {
            requestWebsiteHomeV2WidgetCreate({
              _page_id: this.page_id,
              ...submitForm
            }).then(res => {
              this.$Message.destroy();
              let { code, msg } = res;
              if (code === 200) {
                this.$Message.info("创建成功");
                //关闭弹窗
                this.showConfigurationModal = false;
                this.resetVariable();
                this.fetchData();
              } else {
                this.$Message.error(msg);
              }
            });
          }
        }
      });
    },
    editWidget(layout_type, weight) {
      //编辑
      this.currentLayoutType = layout_type;
      this.coverSize = this.LayoutConfig[layout_type].cover_size;
      this.currentWidget = weight;
      this.editForm = weight;
      this.editForm.day_picker = [widget.start_time, widget.end_time];
      this.currentRow = weight;

      this.current_tab = tabs[weight['type']];
      
      this.showConfigurationModal = true;
    },
    deleteWidget(layout_type, weight) {
      this.$Modal.confirm({
        title: '确定删除',
        content: '您确定要删除嘛？',
        onOK:() => {
          this.currentWidget = widget;
          this.$Message.loading({
            content: '正在删除',
            duration: 0
          });
        requestWebsiteWidgetDelete({
          _widget_id: this.currentWidget.widget_id
        }).then(res => {
          this.$Message.destroy();
          let {msg, code} = res;
          if (code === 200) {
            this.$$Message.info('删除成功');
            //关闭弹窗
            this.resetVariable();
            this.fetchData();
          } else {
            this.$Message.error(msg);
            this.resetVariable();
            this.fetchData();
          }
        })
        }
      })
    },
    resetVariable(){
      // 初始化变量
      this.editForm = {};
      this.currentLayoutType = {};
      this.cover_size = '';
      this.currentWidget = {};
      this.currentRow = undefined;
      
      this.page = 1;
      this.banner = {};
      this.selection = {};
      this.LayoutConfig = {};
      this.loading = false;
      this.current_tab = tabs['information'];
      this.banner = {
        id: "",
        widgets: [],
        cover_size: "",
        widgetMap: new Map()
      };
      this.selection = {
        id: "",
        widgets: [],
        cover_size: "",
        widgetMap: new Map()
      };
      this.advertisement = {
        id: "",
        widgets: [],
        cover_size: "",
        widgetMap: new Map()
      };
      this.flash = {
        id: "",
        widgets: [],
        cover_size: "",
        widgetMap: new Map()
      };
      this.news = {
        id: "",
        widgets: [],
        cover_size: "",
        widgetMap: new Map()
      };    
    },
    cancel(){
      this.showConfigurationModal = false;
      this.resetVariable();
      this.fetchData();
    },
    onDatePickerChange(data_range){
      this.editForm.start_time = data_range[0];
      this.editForm.end_time = data_range[1];
    },
    onRowSelect(){
      this.$refs['informationForm'].validate(valid => {
        if (!valid) {
          this.$Message.error('请输入必填项')
        } else {
          if (isEmpty(this.currentRow)) {
            this.$Message.error("请单击选择资料库中的内容");
          } else if ((this.currentLayoutType === 'news' || this.currentLayoutType === 'flash') && this.editForm.abstract.length < 50) {
            this.$Message.error("摘要不能少于50字");
          } else {
            this.submitInformation();
          }
        }
      })
    },
    configureLayout(layout_type, weight) {
      this.currentLayoutType = layout_type;
      this.cover_size = this.LayoutConfig[layout_type].cover_size;
      
      if (layout_type === 'banner') {
        this.showInformationTab = true;
        this.showCreateLinkTab = true;
        this.showCoverTab = false;
        this.current_tab = 'informationTab';
      } else if (layout_type === 'popup') {
        this.showInformationTab = false;
        this.showCreateLinkTab = true;
        this.showCoverTab = false;
        this.current_tab = 'createLinkTab'
      } else if (layout_type === 'news' || layout_type === 'flash') {
        this.showInformationTab = true;
        this.showCreateLinkTab = false;
        this.showCoverTab = false;
        this.current_tab = 'informationTab'
      } else if (['patternPic', 'flashPic', 'stylePic'].includes(layout_type)) {
        this.showInformationTab = false;
        this.showCreateLinkTab = false;
        this.showCoverTab = true;
        this.current_tab = "createCoverTab";
      }
      if (weight >= 0) {
        this.editForm.weight = weight;
      }
      //获取数据
      this.showConfigurationModal = true;
      this.fetchInfromation();
    },
    onTableRowChange(currentRow){
      this.currentRow = currentRow
    },
    tabChange(tab) {
      if (this.current_tab !== tab) {
        this.current_tab = tab;
        let weight = editForm.weight;
        let cover = editForm.cover;
        this.editForm = {};
        this.editForm.weight = editForm;
        this.editForm.cover = cover;
        this.currentRow = undefined;
        this.page = 1;
      }
    },
    pageChange(page_num){
      this.currentRow = undefined;
      this.page = page_num;
      this.fetchInfromation();
    }
  }
}
</script>


<style lang="scss">
@import "./home.scss";
</style>
