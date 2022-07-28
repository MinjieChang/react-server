import React from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import locale from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'

import App from './App'
import store from '../redux/store'

moment.locale('zh-cn')

export default props => {
  return class Index extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <ConfigProvider locale={locale}>
            <App {...props} />
          </ConfigProvider>
        </Provider>
      )
    }
  }
}
