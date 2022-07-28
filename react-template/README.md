# EDC云组件-polaris-gov

## 文档结构
```
├── README.md         // 开发文档
├── __babelrc
├── __gitignore
├── app
│   ├── App.jsx       // 组件文件
│   ├── App.less
│   └── index.jsx
├── edc.yml           // EDC配置文件
├── index.js          // 主入口文件
└── package.json
```

### edc.yml
```
# 更多配置 https://km.sankuai.com/page/390148772
version: v2
meta:
  title: the best component for you
  description: the best component for you
dev: true
build: {
  framework: react,
  babelTypescript: false,
  typescript: false
  # eslint: false,
  # tslint: true,
  # css: [],
  # externals: {},
  # extraBabelPlugins: [],
  # loaderOptions: {}
  # profile: true,
  # monitor: true,
}
component:
  edcId: ***	 	// 组件id，与 https://edc.sankuai.com/#/create 创建的组件id一致
  type: Component	// 组件类型，可选Components和Service，Service可提供给EDC组件引用
  secret: ***    	// 组件secret，创建完组件后可以在 组件管理>发布秘钥 看到secret，用来发布时使用 
  input: './index.js'
  output: 'build'
```

### App.vue
```
<!-- 与普通React组件一致，参数通过props传入 -->
import * as React from 'react'
import './App.less'

class App extends React.Component {
  render () {
    const message = this.props.message || 'no-message'
    return <div>
      <h2>Hello :)</h2>
      <span>这里是 React EDC 组件</span>
      <p>
        {message}
      </p>
    </div>
  }
}

export default App


```

### index.jsx

[如何复用项目提供的依赖](https://km.sankuai.com/page/574658363)

```
// 简版配置
import * as React from 'react'
import App from './App'

export default (props) => {
  return class Index extends React.Component{
    render() {
      return <App {...props} />
    }
  }
}
```

## 如何发布组件？
- 方式一：通过命令行npm build打包，再通过npm publish发布
- 方式二：[使用talos/plus发布](https://km.sankuai.com/page/414771821)


## 如何编写用户文档？
- 打开 [组件列表](https://edc.sankuai.com/#/component?order=used) -> 组件详情 -> 文档 进行在线编辑修改
- [完善使用文档](https://km.sankuai.com/page/414794983)


## 常用链接
- [EDC介绍](https://km.sankuai.com/page/220792941)
- [常见问题](https://km.sankuai.com/page/284094738)
- [EDC平台](https://edc.sankuai.com/#/project/list)
- [如何开发一个EDC组件](https://km.sankuai.com/page/236483905)
- [如何在项目中使用 EDC 组件](https://km.sankuai.com/page/236557236)
- [高级开发指引](https://km.sankuai.com/page/618666947)
- [TT链接](https://tt.sankuai.com/ticket/create?category=%E9%87%91%E8%9E%8D%E6%9C%8D%E5%8A%A1%E5%B9%B3%E5%8F%B0&type=%E6%8A%80%E6%9C%AF%E5%B9%B3%E5%8F%B0-%E5%A4%A7%E5%89%8D%E7%AB%AF&item=EDC%E4%BA%91%E7%BB%84%E4%BB%B6)