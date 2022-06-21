<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-11 16:09:48
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-21 21:37:12
 * @FilePath: \qzd-web-service\src\views\innovationFundMgr\marketingConfiguration\DetailMarketingConfiguration.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="marketing-config-detail">
    <el-form ref="marketingForm" :model="formData" :rules="marketingRules">
      <div class="back-title" @click="handleBackList">
        <i class="el-icon-back"></i> 返回列表
      </div>
      <div class="base-info">
        <div class="title">
          <el-form-item
            label="基础信息"
            class="weight_style"
            label-width="120px"
          >
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item
            label="营销活动名称"
            label-width="120px"
            prop="mmsUsedRuleConfigParams.activityName"
          >
            <el-input
              v-model="formData.mmsUsedRuleConfigParams.activityName"
              maxlength="20"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="活动时间"
            label-width="120px"
            prop="mmsUsedRuleConfigParams.marketingTime"
          >
            <el-date-picker
              clearable
              v-model="formData.mmsUsedRuleConfigParams.marketingTime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="yyyy/mm/日"
              end-placeholder="yyyy/mm/日"
              :disabled="formData.mmsUsedRuleConfigParams.timeUnlimited"
            >
            </el-date-picker>
            <el-checkbox
              @change="handleCheckedTimeLimit"
              v-model="formData.mmsUsedRuleConfigParams.timeUnlimited"
              >不限</el-checkbox
            >
          </el-form-item>
          <el-form-item
            label="活动分公司"
            label-width="120px"
            prop="mmsUsedRuleConfigParams.officeModels"
          >
            <el-select
              v-model="formData.mmsUsedRuleConfigParams.officeModels"
              filterable
              multiple
              collapse-tags
              :disabled="formData.mmsUsedRuleConfigParams.companyListLimit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in companyList"
                :key="item.code"
                :label="item.value"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-checkbox
              @change="handleCheckedCompanyListLimit"
              v-model="formData.mmsUsedRuleConfigParams.companyListLimit"
              >全部</el-checkbox
            >
          </el-form-item>
          <el-form-item
            label="总库存"
            label-width="120px"
            prop="mmsUsedRuleConfigParams.totalInventory"
          >
            <el-input
              v-model="formData.mmsUsedRuleConfigParams.totalInventory"
              placeholder="请输入"
              maxlength="5"
              @input="handleInventoryInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠形式" label-width="120px">
            <el-checkbox-group
              v-model="formData.mmsUsedRuleConfigParams.offerType"
            >
              <el-checkbox :label="1" disabled>创新金</el-checkbox>
              <el-checkbox :label="2" disabled>优惠券</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="可否叠加优惠" label-width="120px">
            <el-radio
              disabled
              v-model="formData.mmsUsedRuleConfigParams.superpositionType"
              :label="1"
              >否</el-radio
            >
            <el-radio
              disabled
              v-model="formData.mmsUsedRuleConfigParams.superpositionType"
              :label="2"
              >是</el-radio
            >
          </el-form-item>
        </div>
      </div>
      <div class="goods-service">
        <div class="title">
          <el-form-item
            label="商品范围"
            class="weight_style"
            label-width="120px"
            required
          >
            <div class="goods-btn">
              <el-button
                type="primary"
                :disabled="formData.mmsUsedRuleConfigParams.activityUnlimited"
                @click="handleAddGoods"
                >添加</el-button
              >
              <el-button
                type="primary"
                :disabled="formData.mmsUsedRuleConfigParams.activityUnlimited"
                @click="handleImportFile"
                >导入</el-button
              >
              <el-button
                :disabled="formData.mmsUsedRuleConfigParams.activityUnlimited"
                @click="handleBatchDelete"
                >删除</el-button
              >
              <el-checkbox
                v-model="formData.mmsUsedRuleConfigParams.activityUnlimited"
                @change="handleChangeLimit"
                >不限</el-checkbox
              >
            </div>
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label-width="120px" class="marketing_rule_item">
            <el-table
              :data="formData.mmsUsedRuleProductAddParams.tableList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="tableHeader"
              :header-cell-class-name="cellClass"
              @selection-change="handleGoodsSelectChange"
            >
              <el-table-column
                type="selection"
                width="55"
                :selectable="selectableFunc"
              >
              </el-table-column>
              <el-table-column
                prop="productCode"
                label="服务产品编码"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="productName"
                label="服务产品名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="skuCode"
                label="SKU编码"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="skuName"
                label="SKU名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="priceName"
                label="售价名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="price" label="售价" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="standardPaymentScheme"
                label="标准付款方案"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    :disabled="
                      formData.mmsUsedRuleConfigParams.activityUnlimited
                    "
                    @click.native="handleRowDelete(row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label-width="120px" prop="goodsRangeS"></el-form-item>
        </div>
      </div>
      <div class="marketing-rule">
        <div class="title">
          <el-form-item
            label="营销规则"
            class="weight_style"
            label-width="120px"
            required
          >
            <div class="goods-btn">
              <el-button type="primary" @click="handleAddMarketingRule"
                >添加</el-button
              >
              <el-button @click="handleDeleteMarketingRule">删除</el-button>
            </div>
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label-width="120px" class="marketing_rule_item">
            <el-table
              :data="formData.mmsUsedRuleItemAddParams.tableList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="tableHeader"
              @selection-change="handleMarketingSelectChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="marketingMethod" label="营销方式">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="
                      'mmsUsedRuleItemAddParams.tableList.' +
                        $index +
                        '.marketingMethod'
                    "
                    :rules="
                      marketingRules.mmsUsedRuleItemAddParams.marketingMethod
                    "
                  >
                    <el-select
                      v-model="row.marketingMethod"
                      placeholder="请选择营销方式"
                    >
                      <el-option
                        v-for="item in marketingMethodOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="thresholdAmount" label="门槛条件">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="
                      'mmsUsedRuleItemAddParams.tableList.' +
                        $index +
                        '.thresholdAmount'
                    "
                    :rules="
                      marketingRules.mmsUsedRuleItemAddParams.thresholdAmount
                    "
                  >
                    <el-input
                      v-model="row.thresholdAmount"
                      placeholder="请输入门槛条件"
                      maxlength="8"
                      @input="handleThresholdConditionInput(row)"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="discountAmount" label="抵扣创新金">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="
                      'mmsUsedRuleItemAddParams.tableList.' +
                        $index +
                        '.discountAmount'
                    "
                    :rules="[
                      {
                        required: true,
                        trigger: 'blur',
                        validator: validateDiscountAmount(row)
                      }
                    ]"
                  >
                    <el-input
                      v-model="row.discountAmount"
                      placeholder="请输入抵扣创新金"
                      maxlength="8"
                      @input="handleFundInput(row)"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="discountAmountRmb" label="抵扣金额（元）">
                <template slot-scope="{ row }">
                  <div style="marginBottom: 12px">
                    {{ row.discountAmountRmb || '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="描述">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="
                      'mmsUsedRuleItemAddParams.tableList.' +
                        $index +
                        '.description'
                    "
                    :rules="marketingRules.mmsUsedRuleItemAddParams.description"
                  >
                    <el-input
                      v-model="row.description"
                      placeholder="请输入描述"
                      maxlength="100"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <span class="delete-btn" @click="handleRuleDelete(row)"
                    >删除</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label-width="120px" prop="goodsRuleS"></el-form-item>
        </div>
      </div>

      <div class="remark">
        <el-form-item label="备注" class="special" label-width="120px">
          <el-input
            placeholder="请输入备注"
            type="textarea"
            rows="2"
            v-model="formData.mmsUsedRuleConfigParams.description"
            maxlength="200"
          ></el-input>
        </el-form-item>
      </div>

      <div class="upload">
        <el-form-item label="附件" label-width="120px">
          <div class="goods-btn">
            <el-upload
              class="upload-demo"
              action="/api/qzd-bff-operation/qzd/v1/common/uploadFiles"
              multiple
              :limit="9"
              accept=".JPG,.JPEG,.PNG,.pdf,.xls,.xlsx,.doc,.docx,.ppt,.pptx"
              :file-list="fileList"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </div>

      <div class="oprate-btn">
        <el-button
          type="primary"
          @click.prevent.native="handleSave('marketingForm')"
          >保存</el-button
        >
        <el-button
          type="primary"
          @click.prevent.native="handleSubmit('marketingForm')"
          >提交</el-button
        >
        <el-button @click.prevent.native="handleCancel">取消</el-button>
      </div>
    </el-form>

    <!-- 导入弹窗 -->
    <el-dialog
      width="600px"
      title="导入数据"
      :visible.sync="dlgImportVs"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @closed="dlgImportClose"
    >
      <BatchImport
        ref="batchImport"
        :download-url="importTplUrl"
        :errorReportTitle="`下载错误报告${localeDate}`"
        @cancel="dlgImportCancel"
        :use-blob="false"
        :import-method="importExcel"
        :handleNeedGetUpload="handleNeedGetUpload"
        :tplname="importTplname"
        fileFormat="xlsx"
        :importTotal="1000"
        :needGetUploadData="true"
        @successUploadMethod="successUploadMethod"
      />
    </el-dialog>

    <AddGoods
      v-model="showAddGoods"
      v-if="showAddGoods"
      :defaultChecked="formData.mmsUsedRuleProductAddParams.tableList"
      @handleConfirmGoods="handleConfirmGoods"
    />
  </div>
</template>

<script>
import BatchImport from './components/import-file'
import {
  importExcel,
  fetchOfficeList,
  postQueryexportData
} from '@/api/marketingConfig/index.js'
import AddGoods from './components/AddGoods.vue'
import {
  postAddEditMarketing,
  getMarketingDetail,
  getInnovationFund
} from '@/api/marketingConfig/index.js'
export default {
  components: {
    AddGoods,
    BatchImport
  },
  data() {
    return {
      formData: {
        mmsUsedRuleConfigParams: {
          superpositionType: 1,
          activityName: '',
          marketingTime: [],
          officeModels: [],
          totalInventory: null,
          offerType: [1],
          timeUnlimited: false,
          description: '',
          activityUnlimited: false,
          companyListLimit: false
          // docAttachment: []  这个是需要转换的
        },
        mmsUsedRuleProductAddParams: {
          tableList: []
        },
        mmsUsedRuleItemAddParams: {
          tableList: []
        }
      },

      companyList: [],
      showAddGoods: false,

      addGoodsList: [], // 这份数据是添加里面进行回显的
      goodsSelectList: [], // 商品范围选中的集合
      marketingRuleSelectList: [], // 营销规则选中集合

      marketingRules: {
        mmsUsedRuleConfigParams: {
          activityName: [
            {
              required: true,
              message: '请输入活动名称',
              trigger: ['blur', 'change']
            }
          ],
          marketingTime: [
            {
              required: true,
              trigger: ['change'],
              validator: this.validateMarketingTime
            }
          ],
          totalInventory: [
            {
              required: true,
              message: '请输入总库存',
              trigger: ['blur', 'change']
            }
          ],
          officeModels: [
            {
              required: true,
              trigger: 'change',
              validator: this.validateOfficeModels
            }
          ]
        },
        mmsUsedRuleItemAddParams: {
          marketingMethod: [
            { required: true, message: '请选择营销方式', trigger: 'change' }
          ],
          thresholdAmount: [
            { required: true, message: '请输入门槛条件', trigger: 'blur' }
          ],
          // discountAmount: [
          //   {
          //     required: true,
          //     message: '请输入抵扣创新金',
          //     trigger: 'blur',
          //     validator: this.validateDiscountAmount
          //   }
          // ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
        goodsRuleS: [
          {
            required: true,
            validator: this.validateGoods,
            trigger: 'change'
          }
        ],
        goodsRangeS: [
          {
            required: true,
            validator: this.validateGoodsRange
          }
        ]
      },

      marketingMethodOption: [
        {
          value: 1,
          label: '满减'
        }
      ],

      // 导入模块
      dlgImportVs: false,
      importTplUrl:
        'https://public-oss.qizhidao.com/APP/202206/5f8ae3226f484804b2c651ab914ae1b6.xlsx',
      localeDate: '',
      importTplname: '《商品范围导入模板》',

      // 上传附件
      fileList: [],
      saveFileList: [
        // {
        //   name: 'food.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/10'
        // },
      ],
      detailData: null,
      discountProportion: 100
    }
  },
  methods: {
    fetchInnovationFund() {
      return new Promise(async (resolve, reject) => {
        const {
          data: { data }
        } = await getInnovationFund()
        this.discountProportion = data
        resolve()
      })
    },
    handleOffcials(officeModels = []) {
      if (officeModels.length === 1 && officeModels[0].value === '全国') {
        return null
      }
      return officeModels
    },
    handleCompanyListLimit(officeModels = []) {
      if (officeModels.length === 1 && officeModels[0].value === '全国') {
        return true
      }
      return false
    },
    handleMarketingDetail(detailData) {
      this.detailData = detailData
      const {
        mmsUsedRuleConfigParams,
        mmsUsedRuleItemModelList,
        mmsUsedRuleProductModelList
      } = detailData
      const {
        activityName,
        activityUnlimited,
        description,
        docAttachment,
        endActivityTime,
        offerType,
        officeModels,
        startActivityTime,
        superpositionType,
        timeUnlimited,
        totalInventory
      } = mmsUsedRuleConfigParams

      // 附件数据回填
      this.fileList = docAttachment
      this.saveFileList = docAttachment
      this.formData = {
        mmsUsedRuleConfigParams: {
          activityName,
          activityUnlimited,
          description,
          offerType: [offerType],
          officeModels: this.handleOffcials(officeModels),
          companyListLimit: this.handleCompanyListLimit(officeModels),
          superpositionType,
          timeUnlimited,
          totalInventory,
          marketingTime:
            endActivityTime && startActivityTime
              ? [startActivityTime, endActivityTime]
              : []
        },
        mmsUsedRuleItemAddParams: {
          tableList:
            mmsUsedRuleItemModelList.map(item => {
              return {
                ...item,
                discountAmountRmb: item.discountAmountRmb.toFixed(1)
              }
            }) || []
        },
        mmsUsedRuleProductAddParams: {
          tableList: mmsUsedRuleProductModelList || []
        }
      }
    },
    async fetchMarketingDetail() {
      let params = {
        id: this.$route.params.id
      }
      const {
        data: { data }
      } = await getMarketingDetail(params)
      this.handleMarketingDetail(data)
    },
    fetchActivityBranchList() {
      return new Promise(async (resolve, reject) => {
        const { data: { data = [] } = {} } = await fetchOfficeList()
        const newData = data.filter(item => item.code)
        this.companyList = newData
        resolve()
      })
    },
    selectableFunc() {
      return !this.formData.mmsUsedRuleConfigParams.activityUnlimited
    },
    async successUploadMethod({ rightNumber, errorNumber, key }) {
      // 通过key来获取数据来回显
      this.dlgImportVs = false
      let params = {
        rightNumber,
        errorNumber,
        key
      }
      const {
        data: { data }
      } = await postQueryexportData(params)
      this.formData.mmsUsedRuleProductAddParams.tableList = data
    },
    importExcel(file) {
      return importExcel({ file })
    },
    handleNeedGetUpload({ rightNumber, errorNumber, key }) {
      let params = {
        rightNumber,
        errorNumber,
        key
      }
      return postQueryexportData(params, 'blob')
    },
    dlgImportCancel() {
      this.dlgImportVs = false
    },
    dlgImportClose() {
      this.$refs['batchImport'].reset()
    },
    handleImportFile() {
      this.dlgImportVs = true
      this.localeDate = new Date()
        .toLocaleDateString()
        .split('/')
        .join('')
      setTimeout(() => {
        this.$refs['batchImport'].reset()
      }, 1)
    },
    handleCheckedCompanyListLimit() {
      this.formData.mmsUsedRuleConfigParams.officeModels = null
    },
    handleCheckedTimeLimit() {
      this.formData.mmsUsedRuleConfigParams.marketingTime = []
    },
    validateDiscountAmount(row) {
      const { thresholdAmount = null } = row
      return (rule, value, callback) => {
        if (!thresholdAmount) {
          callback(new Error('请输入门槛条件'))
        } else {
          if (!value) {
            callback(new Error('请输入抵扣创新金'))
          }
          if (Number(value) > Number(thresholdAmount)) {
            callback(new Error('抵扣创新金不能大于门槛条件'))
          }
          callback()
        }
      }
    },
    validateMarketingTime(rule, value, callback) {
      let isValida = this.formData.mmsUsedRuleConfigParams.timeUnlimited
      if (isValida) {
        callback()
      } else {
        if (!value || (value && !value.length)) {
          callback(new Error('请选择活动时间'))
        } else {
          callback()
        }
      }
    },
    validateOfficeModels(rule, value, callback) {
      let isValida = this.formData.mmsUsedRuleConfigParams.companyListLimit
      if (isValida) {
        callback()
      } else {
        if (!value || (value && !value.length)) {
          callback(new Error('请选择活动分公司'))
        } else {
          callback()
        }
      }
    },
    handleValidateGoodsRange() {
      this.$refs.marketingForm.validateField(['goodsRangeS'])
    },
    handleValidateGoods() {
      this.$refs.marketingForm.validateField(['goodsRuleS'])
    },
    handleChangeLimit() {
      this.handleValidateGoodsRange()
    },
    validateGoodsRange(rule, value, callback) {
      let tableList = this.formData.mmsUsedRuleProductAddParams.tableList
      let bool = this.formData.mmsUsedRuleConfigParams.activityUnlimited
      if (!bool && !tableList.length) {
        return callback(new Error('请添加商品范围'))
      } else {
        callback()
      }
    },
    validateGoods(rule, value, callback) {
      let goodsRuleList = this.formData.mmsUsedRuleItemAddParams.tableList
      if (!goodsRuleList.length) {
        return callback(new Error('请添加营销规则'))
      } else {
        callback()
      }
    },
    handleAddGoods() {
      this.showAddGoods = true
    },
    handleAddMarketingRule() {
      if (this.formData.mmsUsedRuleItemAddParams.tableList.length >= 10) return
      this.formData.mmsUsedRuleItemAddParams.tableList.push({
        id: new Date().getTime(),
        marketingMethod: null,
        thresholdAmount: null,
        discountAmount: null,
        description: ''
      })

      this.handleValidateGoods()
    },
    handleRemove(file, fileList) {
      const { url, response: { data = [] } = {} } = file
      let deleteUrl = url || (data.length && data[0].fileUrl)
      this.saveFileList = this.saveFileList.filter(
        item => item.url !== deleteUrl
      )
    },
    handleImgPreview(name, downloadUrl) {
      let el = document.createElement('a')
      el.target = '_blank'
      el.href = `${downloadUrl}?fname=${name}`
      document.body.append(el)
      el.click()
      el.remove()
    },
    handlePreview(file, fileList) {
      const { url, name, response: { data = [] } = {} } = file
      const downloadUrl = url || (data.length && data[0].fileUrl)
      let lastIndex = name.lastIndexOf('.')
      let suffix = name.substring(lastIndex, name.length)
      if (
        ['.JPG', '.JPEG', '.PNG', '.pdf', '.jpg', '.jpeg', '.png'].includes(
          suffix
        )
      ) {
        this.handleImgPreview(name, downloadUrl)
      } else {
        this.handleLinkDownload({
          fileName: name,
          fileUrl: downloadUrl
        })
      }
    },
    handleSuccess(response, file, fileList) {
      const { data } = response

      data.forEach(element => {
        const { fileName, fileUrl } = element
        this.saveFileList.push({
          name: fileName,
          url: fileUrl
        })
      })
    },
    handleLinkDownload({ fileName, fileUrl }) {
      const x = new window.XMLHttpRequest()
      x.open('GET', fileUrl, true)
      x.responseType = 'blob'
      x.onload = () => {
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
      }
      x.send()
    },
    submitPramasAssemble(form) {
      const { type } = this.$route.query
      let {
        mmsUsedRuleConfigParams,
        mmsUsedRuleItemAddParams,
        mmsUsedRuleProductAddParams
      } = form
      let {
        superpositionType,
        activityName,
        marketingTime,
        officeModels,
        totalInventory,
        offerType,
        timeUnlimited,
        description,
        activityUnlimited,
        companyListLimit
      } = mmsUsedRuleConfigParams
      let { tableList } = mmsUsedRuleProductAddParams
      let { tableList: ruleTable } = mmsUsedRuleItemAddParams
      const [startActivityTime = '', endActivityTime = ''] = marketingTime || []
      const docAttachment = this.saveFileList || []
      const addReturn = {
        mmsUsedRuleConfigParams: {
          superpositionType,
          activityName,
          officeModels: companyListLimit
            ? [
                {
                  code: '-1',
                  treecode: '-1',
                  value: '全国'
                }
              ]
            : officeModels,
          totalInventory,
          offerType: Number(offerType + ''),
          timeUnlimited,
          description,
          activityUnlimited,
          startActivityTime,
          endActivityTime,
          docAttachment
        },
        mmsUsedRuleProductAddParams: tableList,
        mmsUsedRuleItemAddParams: ruleTable
      }

      if (type !== 'add') {
        addReturn.mmsUsedRuleConfigParams.id = this.detailData.mmsUsedRuleConfigParams.id
        addReturn.mmsUsedRuleConfigParams.status = this.detailData.mmsUsedRuleConfigParams.status
      }

      return addReturn
    },
    onSave(formName, submitType) {
      const { type } = this.$route.query
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = this.submitPramasAssemble(this.formData)
          let addParams = {
            operationType: type === 'add' ? 1 : 2,
            saveOrSubmit: submitType === 'save' ? 0 : 1
          }

          const {
            data: { code, success, data }
          } = await postAddEditMarketing({
            ...params,
            ...addParams
          })

          if (success && code === 0 && type === 'add') {
            this.$router.push({
              name: 'EditMarketingConfiguration',
              params: {
                id: data
              },
              query: {
                type: 'edit'
              }
            })
          }
          if (success && code === 0 && type === 'edit') {
            this.$message.success(
              submitType === 'save' ? '保存成功' : '提交成功'
            )
          }
        } else {
          return false
        }
      })
    },
    handleSave(formName) {
      this.onSave(formName, 'save')
    },
    handleSubmit(formName) {
      this.onSave(formName, 'submit')
    },
    handleInventoryInput(value) {
      if (value) {
        this.formData.mmsUsedRuleConfigParams.totalInventory = value
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+[0-9]*$/gi, '')
      } else {
        this.formData.mmsUsedRuleConfigParams.totalInventory = null
      }
    },
    handleFundInput(row) {
      if (row.discountAmount) {
        row.discountAmount = row.discountAmount
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+[0-9]*$/gi, '')
        if (row.discountAmount) {
          row.discountAmountRmb = (
            Number(row.discountAmount) *
            (this.discountProportion / 100)
          ).toFixed(1)
        }
      } else {
        row.discountAmount = null
        row.discountAmountRmb = null
      }
    },
    handleThresholdConditionInput(row) {
      if (row.thresholdAmount) {
        row.thresholdAmount = row.thresholdAmount
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+[0-9]*$/gi, '')
      } else {
        row.thresholdAmount = null
      }
    },
    handleGoodsSelectChange(list) {
      this.goodsSelectList = list
    },
    handleDeleteMarketingRule() {
      if (!this.marketingRuleSelectList.length) {
        return this.$message.error('请选择待删除的记录')
      }
      this.$confirm(`删除后的数据不能恢复，你确定要删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // formData.mmsUsedRuleItemAddParams.tableList 中删除 marketingRuleSelectList
          this.formData.mmsUsedRuleItemAddParams.tableList = this.formData.mmsUsedRuleItemAddParams.tableList.filter(
            item =>
              !this.marketingRuleSelectList.map(key => key.id).includes(item.id)
          )
          if (!this.formData.mmsUsedRuleItemAddParams.tableList.length) {
            this.handleValidateGoods()
          }
        })
        .catch(() => {})
    },
    handleMarketingSelectChange(list) {
      this.marketingRuleSelectList = list
    },
    handleRuleDelete(row) {
      this.$confirm(`删除后的数据不能恢复，你确定要删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.formData.mmsUsedRuleItemAddParams.tableList = this.formData.mmsUsedRuleItemAddParams.tableList.filter(
            item => item.id !== row.id
          )
          if (!this.formData.mmsUsedRuleItemAddParams.tableList.length) {
            this.handleValidateGoods()
          }
        })
        .catch(() => {})
    },
    handleRowDelete(row) {
      this.$confirm(`删除后的数据不能恢复，你确定要删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除某一行
          this.formData.mmsUsedRuleProductAddParams.tableList = this.formData.mmsUsedRuleProductAddParams.tableList.filter(
            item => item.priceId !== row.priceId
          )
          if (!this.formData.mmsUsedRuleProductAddParams.tableList.length) {
            this.handleValidateGoodsRange()
          }
        })
        .catch(() => {})
    },
    handleBatchDelete() {
      if (!this.goodsSelectList.length) {
        return this.$message.error('请选择待删除的记录')
      }
      this.$confirm(`删除后的数据不能恢复，你确定要删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.formData.mmsUsedRuleProductAddParams.tableList = this.formData.mmsUsedRuleProductAddParams.tableList.filter(
            item =>
              !this.goodsSelectList
                .map(key => key.priceId)
                .includes(item.priceId)
          )
          if (!this.formData.mmsUsedRuleProductAddParams.tableList.length) {
            this.handleValidateGoodsRange()
          }
          // this.goodsSelectList 这份数据需要在this.mmsUsedRuleProductAddParams.tableList数据中删除
        })
        .catch(() => {})
    },
    handleConfirmGoods(goodsList) {
      this.addGoodsList = goodsList
      this.formData.mmsUsedRuleProductAddParams.tableList = goodsList
      this.handleValidateGoodsRange()
    },
    handleCancel() {
      this.handleBackList()
    },
    handleBackList() {
      this.$router.push({
        name: 'marketingConfiguration'
      })
    }
  },
  computed: {
    cellClass() {
      return row => {
        if (
          !this.formData.mmsUsedRuleConfigParams.activityUnlimited &&
          row.columnIndex === 0
        ) {
          return 'showSelection'
        } else if (
          this.formData.mmsUsedRuleConfigParams.activityUnlimited &&
          row.columnIndex === 0
        ) {
          return 'disableSelection'
        }
      }
    }
  },
  watch: {
    'formData.mmsUsedRuleConfigParams.activityUnlimited'(newVal, oldVal) {
      if (!this.formData.mmsUsedRuleProductAddParams.tableList.length) return
      this.$nextTick(() => {
        if (newVal) {
          let inputEle = document
            .querySelector('.disableSelection')
            .querySelector('.el-checkbox__original')
          inputEle.setAttribute('disabled', 'disabled')
        } else {
          let inputEle = document
            .querySelector('.showSelection')
            .querySelector('.el-checkbox__original')
          inputEle.removeAttribute('disabled')
        }
      })
    }
  },
  mounted() {
    Promise.all([
      this.fetchInnovationFund(),
      this.fetchActivityBranchList()
    ]).then(() => {
      // 请求详情接口之后 需要重置的数据是 时间 附件
      const { type } = this.$route.query
      type !== 'add' && this.fetchMarketingDetail()
    })
  }
}
</script>

<style lang="scss" scoped>
.marketing-config-detail {
  /deep/ .el-table__header-wrapper .el-checkbox__inner {
    display: inline-block;
  }
  padding: 20px;
  .base-info {
    .content {
      padding-left: 50px;
    }
  }
  .back-title {
    width: 108px;
    text-align: right;
    font-weight: 600;
    cursor: pointer;
    i {
      width: 18px;
      height: 18px;
      background: #000;
      border-radius: 50%;
      color: #fff;
    }
  }
  /deep/ .el-form-item {
    margin-bottom: 12px;
    .el-form-item__content {
      color: #ccc;
      line-height: 36px;
      .el-input {
        width: 350px;
        .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
        &.is-disabled {
          .el-input__inner {
            background-color: #f5f7fa;
          }
        }
      }
      .el-input__inner.el-range-editor {
        height: 28px;
        padding: 0 10px;
      }
      .el-checkbox-group {
        .el-checkbox {
          width: 76px;
          margin-right: 0;
        }
      }
      .el-radio {
        width: 76px;
        margin-left: 10px;
        margin-right: 0;
        &:last-of-type {
          margin-left: 6px;
        }
      }
    }
    .el-table {
      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 32px;
      }
      .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 32px;
      }
      .el-table__body-wrapper {
        position: relative;
        max-height: 160px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .tableHeader {
        th {
          background-color: #ccc;
        }
      }
    }
    &.weight_style {
      margin-bottom: 4px;
      .el-form-item__label {
        font-weight: 600;
        color: #000;
      }
    }
    &.special {
      .el-form-item__label {
        line-height: inherit;
      }
      textarea {
        resize: none;
      }
    }
    &.marketing_rule_item {
      margin-bottom: 6px;
    }
  }
  .marketing-rule {
    /deep/ .el-table .el-table__body td {
      padding: 6px 0;
    }
    /deep/ .el-form-item__content {
      .el-select {
        width: 100%;
      }
      .el-input {
        width: 100%;
      }
    }
  }
  .oprate-btn {
    width: 100%;
    padding-left: 80px;
    background-color: #fff;
    line-height: 54px;
  }
  .goods-btn {
    .el-button {
      padding: 4px 14px;
    }
  }
  /deep/ .el-checkbox {
    margin-left: 10px;
    .el-checkbox__label {
      padding-left: 6px;
    }
  }
  /deep/ .el-tag--small {
    height: 20px;
    line-height: 18px;
  }
  /deep/ .el-form-item__error {
    padding-top: 0;
  }
  /deep/ .el-upload-list {
    width: 300px;
    .el-upload-list__item-name {
      color: #409eff;
    }
  }
  .remark {
    margin-top: 16px;
  }
  .delete-btn {
    color: #409eff;
    cursor: pointer;
  }

  .el-table /deep/ .disableSelection > .cell {
    .el-checkbox__inner {
      background: #edf2fc;
      cursor: not-allowed;
      border-color: #dcdfe6;
      &::after {
        border-color: #c0c4cc;
      }
      &::before {
        background-color: #c0c4cc;
      }
    }
  }
  .el-table /deep/ .showSelection > .cell {
    .el-checkbox__inner {
      cursor: 'pointer';
    }
  }
}
</style>
