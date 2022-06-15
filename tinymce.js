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
// insertContent是在光标前添加插入的内容
// 富文本是可以通过正则来处理成自己需要的文本内容 在判断点击到哪个div上的时候 我们可以绑定事件判断e.target.className来判断点击到哪个元素上了
export function handleContent(val, products, createType) {
  //更改时间
  let add0 = function (m) {
    return m < 10 ? '0' + m : m;
  };
  let format = function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '.' + add0(m) + '.' + add0(d);
  };
  let _val = !val ? '' : val;
  // 过滤a标签
  if (/<a\b[^>]*>/.test(_val)) {
    _val = _val.replace(/target="([^"]*)"[^>]*([\s\S]*?)/g, '');
  }
  // 过滤换行标签
  _val = _val.replace(/<br\/>|<br>/g, '');
  // 过滤类 (会过滤锚文本，不可过滤)
  // _val = _val.replace(/class\s*?=\s*?([‘"])[\s\S]*?\1/, "");
  // 过滤空行
  _val = _val
    .replace(/<p>(&nbsp;|[\s])*<\/p>/g, '')
    .replace(
      /<p[\u4E00-\u9FFF\w:;,"\-= ]+>(<[\w]+>)*<span[\u4E00-\u9FFF\w:;,"\-= ]+>&nbsp;<\/span>(<\/[\w]+>)*<\/p>/g,
      ''
    );
  // 处理表单
  _val = _val
    .replace(/<table/g, '<div class="table_blk"><table border="1" cellpadding="0" cellspacing="1" ')
    .replace(/<\/table>/g, '</table></div>');
  // 离线包图片处理
  if (PACKAGE_TYPE === 'local' && QZDSchemeName()) {
    _val = _val.replace(/src="https/g, `src="${QZDSchemeName()}`);
    _val = _val.replace(/src="http/g, `src="${QZDSchemeName()}`);
  }
  //处理商品模块
  if (createType === 0 && products?.length > 0) {
    {
      /* productTypeCode 1000002专利服务 1000004政策服务 */
    }
    products.forEach((i, n) => {
      _val = _val.replace(
        new RegExp(i.businessCode, 'g'),
        i.status === 2
          ? i.productTypeCode === '1000001' ||
            i.productTypeCode === '1000002' ||
            i.productTypeCode === '1000003' ||
            i.productTypeCode === '1000004'
            ? `<div class="goods-card">
          <div class="goods-card-top">
          <div class="card-image">
          <img src="${i.images}" alt=""/>
          </div>
          <div  class="card-main">
          <div  class="card-productName">
          ${i.productName}
          </div>
          <div  class="card-mid">
          ${
            i.productTypeCode === '1000004'
              ? `<div  class="title">
          补贴方式：
        </div>
        <div  class="content">
        ${policySubsidyType(i.policyInfo)}
        </div>`
              : `
              ${
                i.priceType == 1 || i.priceType == 5
                  ? `<div class="price">免费咨询</div>`
                  : `<div class="price"><span>￥</span>${transformPrice(i.beginPrice).prefix}${
                      transformPrice(i.beginPrice).suffix
                    }<span>${i.priceType == 3 || i.priceType == 4 ? '起' : ''}</span></div>`
              }
              `
          }
          
          </div>
          <div  class="card-last">
          ${
            i.productTypeCode === '1000004'
              ? `
              ${
                i?.policyInfo?.subsidizedNum
                  ? `<div  class="title">
              已获批企业：
            </div>
            <div  class="content">
            ${i?.policyInfo?.subsidizedNum || ''}家
            </div>`
                  : ''
              }
              `
              : `<div class="title">${i.productDesc}</div>`
          }
          
          </div>
          </div>
          </div>
          <div  class="goods-card-bottom">
          <div  class="bt card-goDetail" data-url="${i.detailUrl}" data-productId="${i.productId}">
            查看详情
          </div>
          <div  class="bt card-goExpert" data-url="${
            i.detailUrl
          }" data-subsidy="${policySubsidyText(i.policyInfo)}" data-desc="${
                i.productDesc
              }" data-product="${i.productName}" data-image="${i.images}" data-typecode="${
                i.productTypeCode
              }">
            咨询申报
          </div>
          </div>
    </div>`
            : `<div class="specialAll" data-url="${i.detailUrl}" data-productId="${i.productId}">
            <img class="specialBoxLeft" src="${i.images}" alt=""/>
            <div class="specialBoxRight">
              <div class="boxRightTop">
                ${i.productName}
              </div>
              <div class="boxRightMiddle">
              ${i.productDesc}
              </div>
              <div class="boxRightBottom">
                查看详情
              </div>
        </div>
    </div>
`
          : null
      );
    });
  }
  return _val;
}
