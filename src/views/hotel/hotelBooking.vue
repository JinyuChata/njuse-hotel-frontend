<template>
        <search-hotel id="search-hotel"></search-hotel>
</template>

<script>
    import searchHotel from "./components/searchHotel";
    export default {
        data() {
            return {

            };
        },
        name: "hotelBooking",
        components: {
            searchHotel
        },
        methods: {

        },


    }
</script>

<style scoped lang="less">
    #search-hotel {
        margin-top: 30px;
    }
</style>