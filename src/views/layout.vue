<template>
    <div id="layout">
        <Header></Header>
<!--        引入了一个全局父样式，通过router view进行局部内容切换-->
        <transition name="fade-transform" mode="out-in">
<!--            transition其实是动画组件的内容-->
            <router-view/>
<!--            因为子组件要在框架样式内局部刷新，因此index.js路由里面要全写在这个children里面-->
        </transition>
    </div>
</template>
<script>
import Header from '@/components/header'
export default {
    name: 'layout',
    components: {
        Header
    }
}
</script>