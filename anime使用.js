

import React, { useState, useEffect, useRef, useCallback } from 'react'
import headerStyles from '../styles/header.module.css'
import anime from 'animejs';
interface IAnimeData {
    charged: string,
    cycles: number
}
const HeaderComponent = () => {
    const refsss= useRef<any>(null);
    const [firstRender, setFirstRender] = useState<boolean>(false);
    const [animeData, setAnimeData] = useState<IAnimeData>({
        charged: '0%',
        cycles: 0
    });
    const battery = {
        charged: '0%',
        cycles: 0
    }
    const clickChange = () => {
        if(firstRender)return;
        setAnimeData({
            charged: '100%',
            cycles: 100
        });
        setFirstRender(true);
    };
    useEffect(() => {
        const animation = anime({
            targets: battery, // 这个初始值  感觉这个里面就是动态的在改变这个值，然后执行update函数，直到到达最终值
            charged: animeData.charged, // 这个是数据变化之后再变换到这个值的最终值
            cycles: animeData.cycles, // 这个是数据变化之后再变换到这个值的最终值
            round: 1,
            easing: 'linear',
            update: function() {
                refsss.current.innerHTML = battery.charged; // 写法就是这样 
            }
          })
    }, [animeData])
    return (<div>
        <div ref={ refsss } className={headerStyles.anime}></div>
        <div onClick={ clickChange }>click</div>
    </div>)
}

export default HeaderComponent
