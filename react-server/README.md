# react-server

`react-server` 是一个 cli 工具，基于[webpack5](https://webpack.js.org/api/) ，提供 create、dev、build 两个命令，分别用于创建项目及本地开发和构建，并且基于 [@bike/api-mocker](https://npm.sankuai.com/v2/pkg/detail?name=%40bike%2Fapi-mocker) 提供本地 `mock` 功能

## 安装

全局安装

```shell
mnpm i -g @bike/react-server
```

项目中安装

```shell
mnpm i -D @bike/react-server
```

## 使用

| 命令                                 | 环境 |
| ------------------------------------ | ---- |
| `react-server create <project-name>` | 创建 |
| `react-server dev`                   | 开发 |
| `react-server build`                 | 构建 |

## 配置文件

`react-server` 默认会读取本地的 **.serverrc** 配置文件

如果没有该文件，启动 `react-server dev`会询问是否创建该配置文件

### 基本配置

| 选项       | 含义                                          | 是否必填 | 类型             | 默认值 |
| ---------- | --------------------------------------------- | -------- | ---------------- | ------ |
| entry      | 入口文件                                      | 是       | string           |
| html       | 模版文件                                      | 是       | string           |
| cssModules | 是否使用 cssModules                           | 否       | boolean          | false  |
| publicPath | 配置生产环境的 `publicPath`，开发环境下为 `/` | 否       | string           | /      |
| outputPath | 打包文件存放目录                              | 否       | string           | build  |
| typescript | 是否启用 typescript                           | 否       | boolean          | false  |
| port       | 端口号                                        | 否       | number \| string | 8888   |

### proxy

`proxy` 用于本地服务代理，进行 `api` 接口转发

默认配置如下：

```js
{
  "proxy": {
    "/api": {
      "target": "http://api.bike.test.sankuai.com",
      "pathRewrite": {
        "^/api": "/api"
      },
      "router": {
        'a.local.sankuai.com:8888': 'http://testa-sl-api.bike.test.sankuai.com',
        'b.local.sankuai.com:8888': 'http://testb-sl-api.bike.test.sankuai.com',
        'c.local.sankuai.com:8888': 'http://testc-sl-api.bike.test.sankuai.com',
        'd.local.sankuai.com:8888': 'http://testd-sl-api.bike.test.sankuai.com',
        'e.local.sankuai.com:8888': 'http://teste-sl-api.bike.test.sankuai.com',
        'st.local.sankuai.com:8888': 'http://api.bike.st.sankuai.com',
      }
    }
  }
}
```

如上使用自定义的域名，需要配置本机 `host` 文件，mac 配置 `/etc/hosts` 文件如下：

```shell
127.0.0.1    a.local.sankuai.com
127.0.0.1    b.local.sankuai.com
127.0.0.1    c.local.sankuai.com
127.0.0.1    d.local.sankuai.com
127.0.0.1    e.local.sankuai.com
127.0.0.1    st.local.sankuai.com
```

当访问例如 `a.local.sankuai.com` ，会代理到 `http://testa-sl-api.bike.test.sankuai.com`，如果需要代理到自定义泳道，可在 `.serverrc` 中进行配置：

.serverrc

```shell
{
  ...
  "proxy": {
    "/api": {
      "router": {
        "a.local.sankuai.com:8888": "http://11433-xrgap-sl-api.bike.test.sankuai.com",
      }
    }
  },
}
```

`proxy` 的其他配置可以参考 [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)、[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#router-objectfunction)

### mock

mock 方案是基于 [@bike/api-mocker](https://npm.sankuai.com/v2/pkg/detail?name=%40bike%2Fapi-mocker)，提供本地 mock 服务

使用 `localhost` 访问，将会代理到本地服务，读取本地的 `mock` 文件夹下的文件，因此使用该 `mock` 服务只需要在 `mock`文件夹下建立对应的文件即可

### typescript

此配置是否开启 `typescript` 能力，该配置默认关闭，在 `.serverrc`文件中可以将此配置打开，`react-server`会自动在项目中创建 `tsconfig.json`文件，并重启服务

## 特性

### 智能重启

配置文件修改的修改会触发 react-server 的自动重启，会触发重启的文件有：

- `.serverrc`
- `.serverrc.js`
