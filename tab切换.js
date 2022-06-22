/*
 * @Author: your name
 * @Date: 2022-04-07 14:00:04
 * @LastEditTime: 2022-06-22 14:18:29
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-demo\src\App.tsx
 */
import { useState, useEffect, useRef } from "react";
import "./App.scss";
let touchStart: number;
let touchEnd: number;
function App() {
  const ulRef = useRef<any>();
  const [distance, setDistance] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [offsetVal, setOffsetVal] = useState<number>(0);
  const [offsetNavVal, setOffsetNavVal] = useState<number>(0);
  const [widthU, setWidthU] = useState<number>(0);
  const [direction, setDirection] = useState<string>("");
  const onTouchStart = (e: any) => {
    e.stopPropagation();
    if (e.targetTouches.length === 1) {
      touchStart = e.targetTouches[0].screenX;
    }
  };
  const onTouchMove = (e: any) => {
    e.stopPropagation();
    if (e.targetTouches.length === 1) {
      touchEnd = e.targetTouches[0].screenX;
    }
  };
  const onTouchEnd = (e: any) => {
    e.stopPropagation();
    if (e.changedTouches.length === 1) {
      let distance = touchEnd - touchStart;
      if (currentIndex <= 3 && distance < 0) {
        (document.querySelector(".ul-style") as Element).scrollLeft = 0;
      }

      if (currentIndex >= 5 && distance > 0) {
        (document.querySelector(".ul-style") as Element).scrollLeft = 4 * 88;
      }
      setDistance(distance);
    }
  };
  useEffect(() => {
    console.log("ulRef", ulRef.current);
  }, []);

  useEffect(() => {
    if (distance > 0) {
      console.log("右");
      setDirection("right");
      setCurrentIndex((current) => {
        return current ? current - 1 : 0;
      });
    }
    if (distance < 0) {
      console.log("左");
      setDirection("left");
      setCurrentIndex((current) => {
        return current === 8 ? 8 : current + 1;
      });
    }
  }, [distance]);

  useEffect(() => {
    console.log("currentIndex", currentIndex);
    // offsetVal 获取width * 第几个就能计算出要移动多少
    let ele: HTMLDivElement | null = document.querySelector(".ul-container");
    let eleEle: HTMLDivElement | null = document.querySelector(".item");
    let widthI = ele?.offsetWidth || 0;
    let widthU = eleEle?.offsetWidth || 0;
    console.log("widthU==", widthU);
    const scWidth = ulRef.current.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const shouldScrollWidth = scWidth - clientWidth;
    setOffsetVal(-widthI * currentIndex);
    if (direction === "left") {
      if (currentIndex > 3) {
        (document.querySelector(".ul-style") as Element).scrollLeft =
          (document.querySelector(".ul-style") as Element).scrollLeft + widthU;
      }
    }
    if (direction === "right") {
      if (currentIndex < 5) {
        (document.querySelector(".ul-style") as Element).scrollLeft =
          (document.querySelector(".ul-style") as Element).scrollLeft - widthU;
      }
    }
  }, [currentIndex, widthU]);
  const handleScroll = () => {
    console.log("handleScroll");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
  }, []);
  return (
    <div className="box-containor">
      <div className="ul-style">
        <div ref={ulRef} className="ul-style-containor">
          <div className="item">
            <div>选项1</div>
            <div className={currentIndex === 0 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项2
            <div className={currentIndex === 1 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项3
            <div className={currentIndex === 2 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项4
            <div className={currentIndex === 3 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项5
            <div className={currentIndex === 4 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项6
            <div className={currentIndex === 5 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项7
            <div className={currentIndex === 6 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项8
            <div className={currentIndex === 7 ? "line active" : "line"}></div>
          </div>
          <div className="item">
            选项9
            <div className={currentIndex === 8 ? "line active" : "line"}></div>
          </div>
        </div>
      </div>

      <div
        className="content"
        onTouchStart={(e) => onTouchStart(e)}
        onTouchMove={(e) => onTouchMove(e)}
        onTouchEnd={(e) => onTouchEnd(e)}
      >
        <ul
          className="ul-container"
          style={{ transform: `translateX(${offsetVal}px)` }}
        >
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给1
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给2
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给3
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给4
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给5
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给6
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给7
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给8
          </li>
          <li>
            暗杀是德国啊傻大个傻瓜蛋爱上当个傻瓜的阿斯顿好噶似的感觉阿桑的歌哈师大啊啥的干啥高大上大师的干啥的爱是感动撒海关大厦达是大厦的感觉杀个地煞给大家仨大使馆的撒感到骄傲是个大大静安寺大哥撒娇的给9
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
