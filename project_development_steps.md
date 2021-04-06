# 第一步：初始化工作
### 1、划分目录结构
  * assets：资源目录，一般包含img和css。
      normalize.css：是一种CSS reset的替代方案，支持包括手机浏览器在内的超多浏览器，同时对HTML5元素、排版、列表、嵌入的内容、表单和表格都进行了一般化。
  
  * common：存放公共的.js文件，比如第三方库之类的

  * components：公共组件，下面可在细分为两个文件夹
      一个是common：指完全公共的组件，随便放到哪个项目中就能立即使用，不需要做任何修改
      一个是content：指对于该项目来说是公共的组件

  * network：网络请求相关

  * router：路由相关

  * store：状态管理相关

  * views：视图页面，用于存放该项目的不同模块中的视图

### 2、引入css文件
  * 创建最基本的base.css文件，在其中引入noamalize.css文件，然后在App.vue中导入base.css文件

### 3、配置别名
  * 对于脚手架2来说，需要在build文件夹中的 webpack.base.conf.js 文件中配置：
    ```
    resolve: {
      alias: {
        '@': resolve('src');
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'views': resolve('src/views'),
      }
    }
    ```

  * 对于脚手架3来说，需要在最外层目录中创建一个 vue.config.js 文件，在里面配置：
    ```
    module.exports = {
      configureWebpack: {
        resolve: {
          // extensions: ['.js', '.vue', '.json'],  // 对于脚手架3来说，不用在配置这个选项，默认创建时就已经配置好了(.js,.vue,.json)
          alias: {
            // '@': resolve('src'),   // 默认已经配置好了
            'assets': '@/assets',
            'common': '@/common',
            'components': '@/components',
            'network': '@/network',
            'views': '@/views',
          }
        }
      }
    }
    ```

### 4、为了便于项目中的样式的统一，需要在最外层目录中添加一个 .editorconfig 文件，用来限制样式
    ```
    root = true

    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
    ```

# 第二步：导入之前创建好的tabbar组件
### 1.添加组件
  * 在components文件夹中创建目录，common/tabbar，里面包含两个组件(TabBar.vue和TabBarItem.vue)
  * 在components文件夹中创建目录，content/maintabbar，里面包含一个组件(MainTabBar.vue)

### 2.导入组件
  * 在App.vue中导入tabbar的最外层组件 MainTabBar (import MainTabBar from 'components/content/maintabbar/MainTabBar')
  * 将MainTabBar组件在components中注册一下，在template模板中加入<main-tab-bar></main-tab-bar>标签

### 3.在views文件夹中创建多个视图目录，主要由tabbar里面包含的模块决定
  * 比如此项目就包含4个模块，分别是home(首页),category(分类),cart(购物车),profile(我的)

### 4.创建路由
  + 在router文件夹中创建index.js文件
    + 基本步骤
      - 1.先导入基本的vue和vue-router 
      - 2.安装插件(Vue.use(VueRouter))
      - 3.定义路由，配置路由映射
          ```
          const routes= [
            {
              path: '',
              redirect: '/home' // 路由重定向，目的是为了使网页一打开就能显示首页内容
            },
            {
              path: '/home',
              component: Home
            },
            ...
          ]
          ```
      - 4.定义路由对象
          ```
          const router = new VueRouter({
            routes,
            mode: 'history',
          })
          ```
      - 5.导出路由对象
    + 将views中的视图模块(路由懒加载方式)导入，以便在定义路由时使用
      ```
      const Home = () => import('views/home/Home')
      const Category = () => import('views/category/Category')
      ...
      ```

### 5.导入路由
  + 在main.js文件中导入路由并且将它添加到全局的Vue实例中
  + 在App.vue的template中添加标签<router-view></router-view>

# 第三步：制作首页视图
### 1.创建导航栏组件
  + 由于大多数的移动端的导航栏组件基本类似，都大致可划分为3块，即左右两个固定宽度的标签以及中间剩余部分的文字标签。所以可以将它封装成一个完全独立的组件。
  + 在components/common目录下创建一个navbar文件夹，创建组件NavBar.vue
  + 由于要做到可以随意设置导航栏里的内容，所以采用插槽的方式设置
  + 由于直接对插槽进行样式设置不太合理，所以在每个插槽外面单独封装一个div给它包裹起来，对div进行样式设置
  + 对导航栏采用flex布局
    ```
    .nav-bar {
      display: flex;
      height: 44px;   // 导航栏的高度一般都为44px
      line-height: 44px;
      text-align: center;
      box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1); // 给div设置阴影
    }

    .left,
    .right {
      width: 60px;
    }

    .middle {
      flex: 1;
    }
    ```
### 2.在首页视图中使用导航栏组件
  + 在views/home目录下的Home.vue组件中导入导航栏组件
    import NavBar from 'components/common/navbar/NavBar';
  + 将该组件在components中注册
  + 给该导航栏插入对应的内容
    - 由于该首页导航栏只有中间部分有内容，所以只需要一个标签插入即可,将它绑定到对应的插槽上
      <nav-bar class="home-nav">
        <div slot="middle">购物街</div>
      </nav-bar>
  + 为了保证导航栏组件的独立性，不选择直接在导航栏组件中设置背景颜色样式，而是在引入nav-bar组件的地方，给组件添加一个class属性，用来单独设置
    ```
    .home-nav {
      background-color: var(--color-tint);
      color: #fff;
    }
    ```
### 3.首页视图向服务器请求数据
  + 知识点：函数调用过程
    - 函数调用 -> 压入函数栈（保存函数调用过程中的所有变量）
    - 函数调用结束 -> 弹出函数栈（释放函数所有的变量，即内存会被回收掉）
  + 1.先将之前封装好的request.js文件拷贝到network目录下
  + 2.为了保证每个页面请求的数据不会混乱，所以可以选择为每个页面单独建立请求文件
  + 3.建立home.js文件，在里面封装一个用来请求首页所有数据的函数接口（getHomeMultidata）
  + 4.在Home.vue中导入封装好的home.js
  + 5.因为我们需要在页面一打开就有数据出来，所以可以在生命周期钩子created()中调用数据请求接口，
    即保证在页面一加载就执行程序获得数据
  + 6.由于getHomeMultidata返回的是一个Promise，所以可以在.then()中获取到请求的数据
  + 7.为了能够保证数据一直存在，所以用一个变量来保存它（在data中声明一个变量）
  + 8.为了能使首页中的各模块数据好区分开来，所以可以用多个变量分别来保存
  
### 4.首页轮播图的展示
  + 1.因为轮播图算是一个公共组件，所以在components下common目录下创建swiper文件夹
  + 2.创建一个Swiper.vue组件：该组件表示轮播图最外层的容器；
      创建一个SwiperItem.vue组件：该组件表示轮播图中的每个元素，这里指图片
  + 3.在Home组件中导入Swiper，SwiperItem组件并在components中注册组件
    ```
    // import Swiper from "components/common/swiper/Swiper";
    // import SwiperItem from "components/common/swiper/SwiperItem";
    import { Swiper, SwiperItem } from "components/common/swiper"; // 这里导入的其实是index.js文件中export出来的模块
    ```
  + 4.由于需要动态更新元素，所以采用插槽的方式传值
    - 在Swiper组件中有两个插槽，第一个插槽是用来传入图片的插槽，这里我们会在Home组件中调用Swiper时给它传入SwiperItem组件，在SwiperItem组件中会传入一个超链接a，确保在点击图片后能够跳转到对应界面，然后在a标签中添加一个img标签，用来显示图片;另一个插槽“indicator”是用来动态更新图片中间下方的白色小圆点，它会根据有几张图片加载进来来动态创建小圆点并将小圆点与对应的图片进行绑定
    - 由于需要做到动态更新，不能写死，所以采用v-for来遍历之前请求到的轮播图数据,动态创建<swiper-item>组件
    - ```
      <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" />
          </a>
        </swiper-item>
      </swiper>
      ```
  + 5.为了避免Home组件中的代码逻辑变得更复杂，便于后期维护与阅读，所以可以将swiper组件在进行一次封装，封装成HomeSwiper组件。由于封装的HomeSwiper组件只是为了在home中使用，所以可以直接在views/home目录下在创建一个文件夹childComponents用来存放只属于home页面中的组件，没必要到最外层的components目录下创建
  + 6.在HomeSwiper组件中调用Swiper组件和SwiperItem组件
    ```
    <template>
      <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" />
          </a>
        </swiper-item>
      </swiper>
    </template>

    <script>
    // import Swiper from "components/common/swiper/Swiper";
    // import SwiperItem from "components/common/swiper/SwiperItem";
    import { Swiper, SwiperItem } from "components/common/swiper";

    export default {
      name: "HomeSwiper",
      props: {  // 由于本身是没有banners参数的，所以需要靠父组件给它传递
        banners:  {
          type: Array,
          default() {
            return []
          }
        }
      },
      components: {
        Swiper,
        SwiperItem,
      }
    };
    </script>

    <style>
    </style>
    ```
  + 7.在Home组件中调用HomeSwiper组件，并将请求到的轮播图数据传递给子组件HomeSwiper
    ```
    <template>
      <div id="home">
        <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
        <home-swiper :banners="banners"></home-swiper>
      </div>
    </template>
    ```
    