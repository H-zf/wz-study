<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-04 17:35:09
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-23 15:32:13
 * @FilePath: \qzd-website-pc\src\components\views\innovate\NoPermission.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="avator-container" v-if="showPop">
    <div class="avator-content">
      <div class="title"><span>上传头像</span> <i class="el-icon-close" @click="handleClose"></i></div>
      <div class="content">
        <vue-cropper
          v-if="toggleImgShow"
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :full="option.full"
          :fixedBox="option.fixedBox"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :centerBox="option.centerBox"
          :height="option.height"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @realTime="realTime"
          @imgLoad="imgLoad"
        >
        </vue-cropper>
        <label class="select-upload" for="uploads" v-if="!toggleImgShow">
          <div>
            <div class="upload-icon">
              <UploadIcon />
            </div>
            <div class="upload-title">添加图片</div>
            <div class="desc">仅支持jpg/png/jpeg</div>
            <div class="desc">大小不超过2M</div>
          </div>
        </label>
        <input
          type="file"
          id="uploads"
          ref="uploads"
          style="position:absolute; clip:rect(0 0 0 0);"
          accept="image/png, image/jpeg, image/jpg"
          @change="selectImg($event)"
        />
        <div v-if="toggleImgShow && previews" class="show-preview">
          <div class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <div class="preview-text">头像预览</div>
        </div>
        <div v-if="!toggleImgShow" class="show-preview">
          <div class="preview">
            <img :src="previewAvator" :style="{ height: '98px', width: '98px' }" />
          </div>
          <div class="preview-text">头像预览</div>
        </div>
      </div>
      <div class="btn-row">
        <div class="reset-btn" v-if="toggleImgShow" @click="handleUploadAgain">重新上传</div>
        <div class="operate-btn" v-if="toggleImgShow">
          <i @click="rotateLeft" class="el-icon-refresh-right" /><i
            class="el-icon-remove-outline"
            @click="changeScale(-1)"
          ></i
          ><i class="el-icon-circle-plus-outline" @click="changeScale(1)"></i>
        </div>
      </div>

      <div class="footer">
        <div class="cancel" @click="handleCancel">取消</div>
        <div class="submit" @click="handleSubmitCropBlob">
          确定
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { aliyunFilesUp } from '~/utils/common'
  import { postSubmitUserInfo } from '@/api/mine/personInfo'
  import UploadIcon from './Upload.vue'
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      previewAvator: {
        type: String,
        default: ''
      }
    },
    components: {
      UploadIcon
    },
    data() {
      return {
        toggleImgShow: false,
        previews: null,
        option: {
          img: '', // 裁剪图片的地址
          outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
          outputType: 'jpeg', // 裁剪生成图片的格式（jpeg || png || webp）
          info: false, // 图片大小信息
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 98, // 默认生成截图框宽度
          autoCropHeight: 98, // 默认生成截图框高度
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          full: false, // false按原比例裁切图片，不失真
          fixedBox: true, // 固定截图框大小，不允许改变
          canMove: true, // 上传图片是否可以移动
          canMoveBox: false, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          height: true, // 是否按照设备的dpr 输出等比例图片
          infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
          maxImgSize: 3000, // 限制图片最大宽度和高度
          enlarge: 1, // 图片根据截图框输出比例倍数
          mode: 'auto 240px' // 图片默认渲染方式

          //   img: "",
          // outputSize: 1, // 剪切后的图片质量（0.1-1）
          // full: false, // 输出原图比例截图 props名full
          // outputType: "png", // 裁剪生成图片的格式
          // canMove: true, // 上传图片是否可以移动
          // original: false, // 上传图片按照原始比例渲染
          // canMoveBox: false, // 截图框是否可以拖动
          // autoCrop: true, // 是否默认生成截图框
          // autoCropWidth: 200, // 默认截图框宽度
          // autoCropHeight: 200, // 默认生成截图框高度
          // fixedBox: false, // 固定截图框大小
          // fixedNumber: [1, 1], // 截图框的宽高比例
          // mode: "auto 200px", // 图片默认渲染方式
          // info: true, // 裁剪框的大小信息
          // canScale: true, // 图片是否允许滚轮缩放
          // fixed: true, // 是否开启截图框宽高固定比例
          // centerBox: true, // 截图框是否被限制在图片里面
          // high: true, // 是否按照设备的dpr 输出等比例图片
        }
      }
    },
    computed: {
      showPop: {
        get() {
          return this.value
        },
        set() {
          this.handleResetImg()
          this.$emit('input', false)
        }
      }
    },
    methods: {
      async fetchSubmitUserInfo(fileUrl) {
        let params = {
          headPortrait: fileUrl
        }
        await this.$axios(postSubmitUserInfo(params))
      },
      handleBlobToFile(blob) {
        return new window.File([blob], `${new Date().getTime()}`, { type: blob.type })
      },
      // 确认剪裁并上传图片
      handleSubmitCropBlob() {
        if (!this.toggleImgShow || !this.previews) {
          this.handleCancel()
          this.$emit('handleSubmit', {}, 2)
          return
        }
        this.$refs.cropper.getCropBlob(async (imgres) => {
          const fileObject = this.handleBlobToFile(imgres)
          const {
            data: { downloadLocation }
          } = await aliyunFilesUp(this.$axios, fileObject)
          await this.fetchSubmitUserInfo(downloadLocation)
          this.$emit('handleSubmit', { fileUrl: downloadLocation }, 1)
          this.handleCancel()
          this.$message.success('头像修改完成')
        })
      },
      handleCancel() {
        this.showPop = false
      },
      // 图片缩放
      changeScale(num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      // 向左旋转
      rotateLeft() {
        this.$refs.cropper.rotate = this.$refs.cropper.rotate + 45 / 90
        // this.$refs.cropper.rotateLeft()
      },
      // 向右旋转
      rotateRight() {
        this.$refs.cropper.rotateRight()
      },
      handleUploadAgain() {
        this.$refs.uploads.click()
      },
      handleResetImg() {
        this.toggleImgShow = false
        this.previews = null
      },
      // 选择图片
      selectImg(e) {
        let file = e.target.files[0]
        if (!/.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
          this.$message({
            message: '图片类型要求：jpeg、jpg、png',
            type: 'error'
          })
          return false
        }
        const fileMaxSize = 1024 * 1024 * 2
        if (file.size >= fileMaxSize) {
          this.$message({
            message: '图片大小不能超过2M',
            type: 'error'
          })
          return false
        }
        // 转化为blob
        let reader = new FileReader()
        reader.onload = (e) => {
          let data
          this.toggleImgShow = true
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.option.img = data
        }
        // 转化为base64
        reader.readAsDataURL(file)
      },
      // 初始化函数
      imgLoad(msg) {
        console.log('工具初始化函数=====' + msg)
      },
      realTime(data) {
        this.previews = data
      },
      handleClose() {
        this.showPop = false
      }
    },
    watch: {
      showPop(val) {
        if (!val) {
          let body = document.body
          body.style.position = ''
          let top = body.style.top
          document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
          body.style.top = ''
        } else {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px'
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        const body = document.querySelector('body')
        // 将匹配DOM添加到body中
        if (body.append) {
          // 在IE11中 document.appendChild会报错: javascript runtime error:HierarchyRequestError
          body.append(this.$el)
        } else {
          body.appendChild(this.$el)
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .avator-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .avator-content {
      position: absolute;
      left: 50%;
      top: 188px;
      transform: translateX(-50%);
      width: 406px;
      height: 441px;
      background-color: #fff;
      border-radius: 8px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 58px;
        padding: 0 24px;
        font-weight: 500;
        font-size: 18px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        color: #292a2d;
        line-height: 58px;
        i {
          cursor: pointer;
        }
      }
      .content {
        width: 100%;
        height: 272px;
        padding: 24px;
        padding-bottom: 8px;
        display: flex;
        .select-upload {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 240px;
          height: 240px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          .upload-icon {
          }
          .upload-title {
            margin-bottom: 16px;
            font-weight: 500;
            font-size: 14px;
            color: #3981f4;
            line-height: 22px;
          }
          .desc {
            font-size: 14px;
            color: #b3b3b3;
            line-height: 20px;
          }
        }
        .show-preview {
          position: relative;
          display: flex;
          display: -webkit-flex;
          margin-left: 20px;
          .preview {
            overflow: hidden;
            background: #cccccc;
            border-radius: 8px;
            width: 98px;
            height: 98px;
          }
          .preview-text {
            position: absolute;
            top: 105px;
            left: 21px;
            font-size: 14px;
            color: #b3b3b3;
            user-select: none;
          }
        }
      }
      .btn-row {
        display: flex;
        justify-content: space-between;
        width: 264px;
        height: 20px;
        padding-left: 24px;
        margin-bottom: 24px;
        .reset-btn {
          font-size: 14px;
          color: #3981f4;
          cursor: pointer;
        }
        .operate-btn {
          i {
            margin-left: 8px;
            cursor: pointer;
          }
        }
      }
      .footer {
        height: 68px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border: 1px solid rgba(0, 0, 0, 0.06);
        .cancel,
        .submit {
          width: 60px;
          height: 36px;
          font-size: 14px;
          text-align: center;
          border: 1px solid #dae4ec;
          border-radius: 4px;
          line-height: 34px;
          cursor: pointer;
          user-select: none;
        }
        .cancel {
          margin-right: 16px;
          color: #666;
          background: #ffffff;
        }
        .submit {
          margin-right: 24px;
          color: #fff;
          background: #3981f4;
          &:hover {
            background: #1864dc;
          }
          &.disabled {
            color: #fff;
            background-color: #a0cfff;
            border-color: #a0cfff;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  .vue-cropper {
    height: 240px;
    width: 240px;
  }
  .cropper {
    width: auto;
    height: 300px;
  }

  .cropper-box {
    flex: 1;
    width: 100%;
  }

  .cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
  }

  .scope-btn {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-right: 10px;
  }

  .upload-btn {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }

  .footer-btn {
    margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
  }

  /deep/ .cropper-view-box {
    outline: 1px solid #fff;
    outline-color: #fff;
  }
  /deep/ .cropper-crop-box {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      width: 16px;
      height: 16px;
      border-left: 2px solid #fff;
      border-top: 2px solid #fff;
    }
    &::after {
      content: '';
      position: absolute;
      right: -2px;
      top: -2px;
      width: 16px;
      height: 16px;
      border-right: 2px solid #fff;
      border-top: 2px solid #fff;
    }
  }
  /deep/ .cropper-view-box {
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      bottom: -2px;
      width: 16px;
      height: 16px;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
    }
    &::after {
      content: '';
      position: absolute;
      right: -2px;
      bottom: -2px;
      width: 16px;
      height: 16px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
    }
  }
  /deep/ .cropper-modal {
    background: rgba(0, 0, 0, 0.56);
  }
</style>
