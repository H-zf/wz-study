// 引入阿里云的写法
export function getPlayer(params) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js';
    script.onerror = reject;
    script.onload = function () {
      resolve({
        player: window.Aliplayer,
        params,
      });
    };
    document.head.appendChild(script);
  });
}
