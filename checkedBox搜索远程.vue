<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-12 14:48:02
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-20 22:04:16
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
          :infinite-scroll-disabled="disableScrollBool"
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
                `${goods.priceId}${index}${goods.priceName}${
                  goods.productCode
                }${new Date().getTime()}`
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

          <div class="loading-text" v-if="loadingTextBool">
            加载中<span class="dot">...</span>
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
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { signature } from '@/utils/signature.js'
let cookie = JSON.parse(getToken())
// 创建axios实例
const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 20000, // 请求超时时间
  withCredentials: true
})
let cancel
const CancelToken = axios.CancelToken
function postAddRuleProductListSearch(data) {
  return service({
    url: '/qzd-bff-operation/innovationFund/mmsUsedRuleConfig/queryIpsProduct',
    method: 'post',
    data,
    cancelToken: new CancelToken(c => {
      cancel = c
    }),
    headers: {
      accessToken: cookie.token,
      signature: signature(cookie.token, cookie.paramSig)
    }
  })
}

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
      firstRenderLoading: false,

      loadingTextBool: false,
      firstRender: true
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
    disableScrollBool() {
      return this.disableBool || this.loadingTextBool
    },
    computedText() {
      return goods => {
        // “【”+SKU编码+“】”+SKU名称+“/”+售价名称（售价类型为办事处售价时，需要拼接分公司信息）+“/”+标准付款方案
        const priceTypeOptions = {
          0: '办事处报价',
          1: '自定义报价',
          2: '统一报价',
          3: '集团报价'
        }
        const {
          skuName = '',
          skuCode = '',
          productName = '',
          priceType = 3,
          standardPaymentScheme = '',
          companyName = ''
        } = goods
        let str = `【${skuCode}】${skuName} / ${productName} / ${
          priceTypeOptions[priceType]
        }${priceType === 0 ? `${companyName ? ` / ${companyName}` : ''}` : ''}${
          standardPaymentScheme ? ` / ${standardPaymentScheme}` : ''
        }`
        return str
      }
    }
  },
  methods: {
    async fetchAddRuleProductList(filter = false) {
      if (filter && cancel) {
        cancel()
      }
      let params = {
        current: this.filterStr ? this.filterCurrent : this.current,
        pageSize: 20,
        searchKey: this.filterStr
      }
      if (
        (this.filterStr && this.filterCurrent === 1) ||
        (!this.filterStr && this.current === 1)
      ) {
        this.firstRenderLoading = true
      } else {
        this.loadingTextBool = true
      }
      const {
        data: { data = {} }
      } = await (filter
        ? postAddRuleProductListSearch(params)
        : postAddRuleProductList(params))
      const { records = [] } = data
      if (
        (this.filterStr && this.filterCurrent === 1) ||
        (!this.filterStr && this.current === 1)
      ) {
        this.firstRenderLoading = false
      } else {
        this.loadingTextBool = false
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
      if (this.firstRender) {
        this.sumCheckData = this.concatDefaultFetch(
          this.defaultChecked,
          records
        )
      } else {
        this.sumCheckData = this.concatDefaultFetch(this.sumCheckData, records)
      }
      this.goodsList = this.goodsList.concat(records)
      this.firstRender = false
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
      if (!str) {
        this.goodsList = this.saveNoFilterGoodsListSum
        setTimeout(() => {
          // 切换数据的时候滚动条触底会自动触发load
          let containor = document.querySelector('#contentscroll')
          let scrollTop = containor.scrollTop
          containor.scrollTop = scrollTop - 10
        }, 0)
        return
      }
      this.disableBool = true
      this.filterCurrent = 1
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
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
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
        .loading-text {
          display: flex;
          justify-content: center;
        }
        .dot {
          /*让点垂直居中*/
          height: 1em;
          line-height: 1;
          /*让点垂直排列*/
          display: flex;
          flex-direction: column;
          /*溢出部分的点隐藏*/
          overflow: hidden;
        }
        .dot::before {
          /*三行三种点，需要搭配white-space:pre使用才能识别\A字符*/
          content: '...\A..\A.';
          white-space: pre-wrap;
          animation: dot 3s infinite step-end; /*step-end确保一次动画结束后直接跳到下一帧而没有过渡*/
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
