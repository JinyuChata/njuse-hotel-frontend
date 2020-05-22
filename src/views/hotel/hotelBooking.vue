<template>
    <div class="hotelBooking">
        <a-layout>

            <!--下面搁置了：：思路明确：单独写一个确定地址的组件页：然后精确到地址和商圈即可！！  下面这种下拉选择框类型的太难了-->
            <!--下面尝试列表显示酒店信息-->
            <address-determination style="padding: 50px 200px 0px 200px">
            </address-determination>
            <a-layout-content style="padding:20px 200px">


<!--                    下面是列表化酒店详情页面！只需要一个card，其他的就单纯的for渲染就行-->
<!--                组件上绑定一个这个可以达到点击跳转功能（hotellist） @click.native="jumpToDetails(item.id)-->
                    <booking-hotel-card>
                    </booking-hotel-card>


            </a-layout-content>

        </a-layout>
    </div>
</template>


<!--初步想法，上面有城市选择页面（选中城市后）选中城市后给一个url，返回城市里面所有的酒店

然后下面的搜索框，和给定的选择框，选择后，点击搜索or确定（给一个判断，如果没有选中城市，提示一下！！），产生一个search的带参数url，交给后端处理搜索，并返回符合条件的酒店

前端做：首先把数据分开：通过axios获取，，再去渲染渲染，，然后再去做动作交互和重新渲染的问题
-->


<script>

    import addressDetermination from "./components/addressDetermination";
    import bookingHotelCard from "./components/bookingHotelCard";
    export default {
        data() {
            return {

            };
        },
        name: "hotelBooking",
        components: {
            addressDetermination,
            bookingHotelCard
        },
        methods: {

        },


    }
</script>

<style scoped lang="less">

</style>