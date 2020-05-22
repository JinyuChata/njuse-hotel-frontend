const getters = {
  //user
  token: state => state.user.token,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  userOrderList: state => state.user.userOrderList,
  registeredMemberVisible: state => state.user.registeredMemberVisible,
  //为了显示出来注册组件
  hotelListLoading: state => state.hotel.hotelListLoading,
  hotelList: state => state.hotel.hotelList,
  currentHotelInfo: state => state.hotel.currentHotelInfo,
  currentHotelId: state => state.hotel.currentHotelId,
  orderModalVisible: state => state.hotel.orderModalVisible,
  currentOrderRoom: state => state.hotel.currentOrderRoom,
  orderMatchCouponList: state => state.hotel.orderMatchCouponList,
  //admin
  unusualOrderList: state => state.admin.unusualOrderList,
  managerList: state => state.admin.managerList,
  clientList: state => state.admin.clientList,
  addManagerModalVisible: state => state.admin.addManagerModalVisible,
  updateAccountVisible: state => state.admin.updateAccountVisible,
  addManagerParams: state => state.admin.addManagerParams,
  updateAccountParams: state => state.admin.updateAccountParams,
  //hotelManager
  managedOrders:state => state.hotelManager.managedOrders,
  mgrHotelList: state => state.hotelManager.mgrHotelList,
  orderList: state => state.hotelManager.orderList,
  addHotelModalVisible: state => state.hotelManager.addHotelModalVisible,
  addRoomModalVisible: state => state.hotelManager.addRoomModalVisible,
  couponVisible: state => state.hotelManager.couponVisible,
  addCouponVisible: state => state.hotelManager.addCouponVisible,
  activeHotelId: state => state.hotelManager.activeHotelId,
  couponList: state => state.hotelManager.couponList,
  }

  export default getters
