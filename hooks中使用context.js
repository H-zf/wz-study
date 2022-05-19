import React from 'react';
import ThemeContext from '../../../context'

class Footer extends React.Component<{},{
  value: string,
}> {
    static contextType = ThemeContext // 重点
    constructor(props:any) {
      super(props);
      this.state = {
        value: '123',
      };
    }
    render() {
      const user = this.context;
      return (
        <div className="shopping-list">
          <div>contextVlaue----{user.username}</div>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }
export default Footer

const { username } = useContext(ThemeContext);

hooks中在数据变化的时候会重新刷新界面数据，
class 组件中会会执行componentWillReceiveProps====componentWillUpdate====render====foocomponentDidUpdate 所以在render中将context中将值取出最为适合
