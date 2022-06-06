// 使用tinymce富文本编辑器的时候 在页面中添加图片的功能
setup(editor) {
  // 添加图片按钮
  editor.addButton('mybutton', {
    text: '',
    icon: 'image',
    onclick: function() {
      // 触发事件的回调
      _this.dialogVisible = true
    }
  })
}

// 首先是添加一个my-button然后再编辑器中配置好toolbar
// 然后再选择图片之后，使用tinymce实例来插入你选择的文本
imageSuccessCBK(arr) {
  const _this = this
  arr.forEach(v => {
    window.tinymce
      .get(_this.tinymceId)
      .insertContent(
        `<img class="wscnph" src="${v.url}" ${
          this.imageType === '1' ? 'draggable="false"' : ''
        } >`
      )
  })
}
// tinymceId是初始化tinymce的textArea组件id

