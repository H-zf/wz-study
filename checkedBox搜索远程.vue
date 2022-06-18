<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-12 14:48:02
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-18 10:34:26
 * @FilePath: \qzd-web-service\src\views\innovationFundMgr\marketingConfiguration\components\GoodsDetail.vues
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="660px"
    custom-class="marketing-add-goods"
    :append-to-body="true"
    :before-close="handleClose"
  >
    <div class="transfor">
      <div class="left">
        <el-input
          v-model.trim="filterStr"
          @input="handleFilterInput"
          placeholder="请输入产品名称/编码"
        ></el-input>
        <div
          class="content"
          id="contentscroll"
          v-infinite-scroll="load"
          :infinite-scroll-disabled="disableBool"
          v-loading="firstRenderLoading"
        >
          <el-checkbox-group
            v-model="checkedGoodsList"
            @change="handleCheckedChange"
          >
            <el-checkbox
              v-for="(goods, index) in goodsList"
              :label="goods.priceId"
              :key="
                goods.priceId +
                  index +
                  goods.priceName +
                  goods.productCode +
                  new Date().getTime()
              "
            >
              <div>
                {{ computedText(goods) }}
              </div>
            </el-checkbox>
          </el-checkbox-group>
          <div class="no-data" v-if="!firstRenderLoading && !goodsList.length">
            暂无数据
          </div>
        </div>
      </div>
      <div class="right">
        <div class="content">
          <div
            class="content-item"
            v-for="item in rightCheckedGoodsList"
            :key="item.priceId"
          >
            <el-tooltip
              class="item"
              effect="dark"
              placement="top"
              v-if="closeTooltip"
            >
              <div slot="content">
                {{ computedText(item) }}
              </div>
              <div class="text" @mouseleave="handleLeavePlay">
                {{ computedText(item) }}
              </div>
            </el-tooltip>
            <div
              class="text"
              v-if="!closeTooltip"
              @mouseenter="handleEnterPurse"
            >
              {{ computedText(item) }}
            </div>
            <i class="el-icon-close" @click="handleDeleteItem(item)"></i>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postAddRuleProductList } from '@/api/marketingConfig/index.js'
let firstRender = true
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    defaultChecked: {
      type: Array,
      default: () => []
    }
  },
  name: 'add-goods',
  data() {
    return {
      filterStr: '',
      // 请求回来的数据
      saveNoFilterGoodsListSum: [],
      checkedGoodsList: [],
      rightCheckedGoodsList: [],
      goodsList: [],
      closeTooltip: false,

      sumCheckData: [],
      current: 1,
      pageSize: 20,
      disableBool: true,

      filterCurrent: 0,
      firstRenderLoading: false
    }
  },
  created() {
    // 初始化goods 回显手动添加的数据
    this.checkedGoodsList = this.defaultChecked.map(item => item.priceId)
    this.rightCheckedGoodsList = this.defaultChecked
  },
  computed: {
    dialogVisible: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    computedText() {
      return goods => {
        // “【”+SKU编码+“】”+SKU名称+“/”+售价名称（售价类型为办事处售价时，需要拼接分公司信息）+“/”+标准付款方案
        const { skuName = '', skuCode = '', productName = '' } = goods
        let str = `【${skuCode}】${skuName}/${productName}`
        return str
      }
    }
  },
  methods: {
    async fetchAddRuleProductList(filter = false) {
      let params = {
        current: this.filterStr ? this.filterCurrent : this.current,
        pageSize: 20,
        searchKey: this.filterStr
      }
      if (filter || this.current === 1) {
        this.firstRenderLoading = true
      }
      const {
        data: { data = {} }
      } = await postAddRuleProductList(params)
      const { records = [] } = data
      if (filter || this.current === 1) {
        this.firstRenderLoading = false
      }
      if (!this.filterStr) {
        this.saveNoFilterGoodsListSum = this.saveNoFilterGoodsListSum.concat(
          records
        )
      }
      if (records.length < 20) {
        this.disableBool = true
      } else {
        this.disableBool = false
      }
      if (firstRender) {
        this.sumCheckData = this.concatDefaultFetch(
          this.defaultChecked,
          records
        )
      } else {
        this.sumCheckData = this.concatDefaultFetch(this.sumCheckData, records)
      }
      console.log('this.sumCheckData', this.sumCheckData.length)
      this.goodsList = this.goodsList.concat(records)
      firstRender = false
    },
    handleEnterPurse(e) {
      if (e.target.offsetWidth < e.target.scrollWidth) {
        this.closeTooltip = true
      } else {
        this.closeTooltip = false
      }
    },
    handleLeavePlay() {
      this.closeTooltip = false
    },
    handleFilterInput(str) {
      if (!str) return (this.goodsList = this.saveNoFilterGoodsListSum)
      this.filterCurrent = 1
      this.disableBool = true
      this.goodsList = []
      this.fetchAddRuleProductList(true)
    },
    handleCheckedChange() {
      if (!this.checkedGoodsList.length) {
        this.rightCheckedGoodsList = []
        return
      }
      this.rightCheckedGoodsList = this.checkedGoodsList.map(priceId => {
        let findItem = this.sumCheckData.find(item => item.priceId === priceId)
        return findItem
      })
    },
    handleDeleteItem({ priceId }) {
      this.rightCheckedGoodsList = this.rightCheckedGoodsList.filter(
        item => item.priceId !== priceId
      )
      this.checkedGoodsList = this.checkedGoodsList.filter(
        checkedId => checkedId !== priceId
      )
    },
    handleConfirm() {
      // 判断是不是手动添加还是导入的数据 isImport 是否导入
      this.$emit('handleConfirmGoods', this.rightCheckedGoodsList)
      this.handleClose()
    },
    handleClose() {
      this.dialogVisible = false
    },
    concatDefaultFetch(defaultData = [], fetchData = []) {
      let d = JSON.parse(JSON.stringify(defaultData))
      let f = JSON.parse(JSON.stringify(fetchData))

      let concatDF = [...d, ...f]
      let newSumData = []
      concatDF.forEach(key => {
        let sumIds = newSumData.map(item => item.priceId)
        if (!sumIds.includes(key.priceId)) {
          newSumData.push(key)
        }
      })

      return newSumData
    },
    load() {
      if (!this.filterStr) {
        this.current++
      } else {
        this.filterCurrent++
      }

      this.fetchAddRuleProductList()
    }
  },
  mounted() {
    this.fetchAddRuleProductList()
  }
}
</script>

<style lang="scss">
.marketing-add-goods.el-dialog {
  .transfor {
    display: flex;
    .left {
      width: 300px;
      margin-right: 10px;
      .content {
        height: 400px;
        margin-top: 10px;
        border: 1px solid #ccc;
        overflow: auto;
        .no-data {
          width: 100%;
          text-align: center;
          color: #dddddd;
          line-height: 112px;
        }
        .el-checkbox {
          display: block;
          line-height: 28px;
          margin-right: 0;
        }
        .el-checkbox__label {
          padding-left: 4px;
          vertical-align: middle;
        }
        .el-checkbox-group {
          padding-left: 10px;
        }
      }
    }
    .right {
      width: 300px;
      .content {
        height: 446px;
        border: 1px solid #ccc;
        overflow: auto;
        overflow-x: auto;
        .content-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          line-height: 28px;
          .text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          i {
            flex-shrink: 0;
            cursor: pointer;
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
