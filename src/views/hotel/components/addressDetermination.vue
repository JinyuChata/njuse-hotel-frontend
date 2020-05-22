<template>
    <div>
        选择所在城市
        <a-modal
                :visible="isNotSelectedCity"
                title="请选择城市"
                cancelText="取消"
                okText="进行查找"
                @cancel="cancelRegist"
                @ok="handleSubmit"
        >
            <a-tabs>
                <a-tab-pane key="1" tab="热门">
                    <a-button @click="selectedCity(item.city)" type="dashed" v-for="item in citys" :key='item.id' style="margin-left: 5px">
                       {{item.city}}
                    </a-button>
                </a-tab-pane>
                <a-tab-pane key="2" tab="ABCDEF">
                    Content of tab 2
                </a-tab-pane>
                <a-tab-pane key="3" tab="GHIJ">
                    Content of tab 3
                </a-tab-pane>
                <a-tab-pane key="4" tab="KLMN">
                    Content of tab 4
                </a-tab-pane>
                <a-tab-pane key="5" tab="PQRSTUVW">
                    Content of tab 5
                </a-tab-pane>
                <a-tab-pane key="6" tab="XYZ">
                    Content of tab 6
                </a-tab-pane>
            </a-tabs>
        </a-modal>
<!--        后期可以通过标签：；来标识 -->
<!--        <template>
  <div>
    <template v-for="(tag, index) in tags">
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: ['Unremovable', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
      inputVisible: false,
      inputValue: '',
    };
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },
  },
};
</script>-->
        <div v-if="!isNotSelectedCity">{{this.selectedcity}}</div>
        <div style="margin-top: 10px">酒店类型</div>
        <a-tabs type="card" @change="callback">
            <a-tab-pane key="1" tab="度假型酒店">
                <a-checkbox-group :options="plainOptions" :default-value="['Apple']" @change="onChange" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="中高端商旅型酒店">
                Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="商旅型酒店">
                Content of Tab Pane 3
            </a-tab-pane>
        </a-tabs>
        <a-menu v-model="current" mode="horizontal" style="margin-top: 20px" >
            <a-menu-item key="star"><a-icon type="star"/>星级</a-menu-item>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper"><a-icon type="fire"/>评分</span>
                <a-menu-item key="score:1">> 4.5</a-menu-item>
                <a-menu-item key="score:2">> 4.0</a-menu-item>
                <a-menu-item key="score:3">> 3.5</a-menu-item>
            </a-sub-menu>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper"><a-icon type="control"/>价格</span>
                <a-menu-item key="price:1">从高到低 </a-menu-item>
                <a-menu-item key="price:2">从低到高</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
    const plainOptions = ['如家商旅', '汉庭酒店', '如家精选','如家商旅', '汉庭酒店', '如家精选','如家商旅',];
    export default {
        name: "addressDetermination",
        data() {
            return {
                plainOptions,
                citys:[{
                    id:'0001',
                    city:"北京"
                },{
                    id:'0002',
                    city:"北京02"
                },{
                    id:'0003',
                    city:"北京03"
                },{
                    id:'0004',
                    city:"北京04"
                },{
                    id:'0005',
                    city:"北京05"
                },{
                    id:'0006',
                    city:"北京06"
                },{
                    id:'0007',
                    city:"北京07"
                },],
                isNotSelectedCity:true,//做成全局的这样就会能够保持选中。
                selectedcity:"",
            };
        },
        methods: {
            callback(key) {
                console.log(key);
            },
            //处理点击选中城市
            selectedCity( city){
                // this.isNotSelectedCity=false;
                this.selectedcity=city;
            },
            handleSubmit(){
                this.isNotSelectedCity=false;
            }
        },
    }

</script>
<style scoped>

</style>