/*
 * @Author: your name
 * @Date: 2022-04-07 14:00:04
 * @LastEditTime: 2022-06-10 20:44:20
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-demo\src\App.tsx
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './component/home/components/header';
import './App.scss';
function App() {
  const [percent, setPercent] = useState('0px');
  const handleSetPercent = () => {
    setPercent("295.31px");
  };
  return <div>
      <div className='el-progress-circle'>
      <svg viewBox="0 0 100 100">
        <linearGradient id="linearGradient" x1="37.5%" y1="0" x2="75%" y2="100%">
          <stop offset="0%" style={{stopColor:"#89D2FA"}}/>
          <stop offset="12.5%" style={{stopColor:"#6CAFF6"}}/>
          <stop offset="37.5%" style={{stopColor:"#4F8CF2"}}/>
          <stop offset="62.5%" style={{stopColor:"#4F8CF2"}}/>
          <stop offset="87.5%" style={{stopColor:"#89D2FA"}}/>
          <stop offset="100%" style={{stopColor:"#89D2FA"}}/>
      </linearGradient>
        <path d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        " stroke="#e5e9f2" stroke-width="4.8" fill="none" className='el-progress-circle__track' style={{strokeDasharray: "295.31px, 295.31px" ,strokeDashoffset: "0px"}}></path>
        <path d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        " stroke="url(#linearGradient)" fill="none" stroke-linecap="round" stroke-width="4.8" className="el-progress-circle__path" style={{strokeDasharray: `${percent}, 295.31px`, strokeDashoffset: "0px"}}></path>
        </svg>
      </div>


      <div onClick={() => handleSetPercent()}>click</div>
  </div>
}

export default App;
