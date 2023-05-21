<template>
  <div class="items">
    <div class="item">
      <div class="left">
        <img src="http://res.cloudinary.com/huyennhat/image/upload/v1684683502/images/products/gbpcybctohctifa1jbtc.png" alt="">
      </div>
      <div class="right">
        <div class="name">
          <p>Hành Trình Về Phương Đông (Tái Bản 2021)</p>
        </div>
        <div class="subInfo">
          <p>Số lượng: 10</p>
          <p>Giá: 50.000đ</p>
        </div>
      </div>
      <img class="icon-delete" src="../../assets/images/delete.png" alt="" />
    </div>
    <div class="item">
      <div class="left">
        <img src="http://res.cloudinary.com/huyennhat/image/upload/v1684683502/images/products/gbpcybctohctifa1jbtc.png" alt="">
      </div>
      <div class="right">
        <div class="name">
          <p>Điềm Tĩnh Và Nóng Giận</p>
        </div>
        <div class="subInfo">
          <p>Số lượng: 10</p>
          <p>Giá: 50.000đ</p>
        </div>
      </div>
      <img class="icon-delete" src="../../assets/images/delete.png" alt="" />
    </div>
    <div class="item">
      <div class="left">
        <img src="http://res.cloudinary.com/huyennhat/image/upload/v1684683502/images/products/gbpcybctohctifa1jbtc.png" alt="">
      </div>
      <div class="right">
        <div class="name">
          <p>Hoa Vẫn Nở Mỗi Ngày</p>
        </div>
        <div class="subInfo">
          <p>Số lượng: 10</p>
          <p>Giá: 50.000đ</p>
        </div>
      </div>
      <img class="icon-delete" src="../../assets/images/delete.png" alt="" />
    </div>
    <div class="item">
      <div class="left">
        <img src="http://res.cloudinary.com/huyennhat/image/upload/v1684683502/images/products/gbpcybctohctifa1jbtc.png" alt="">
      </div>
      <div class="right">
        <div class="name">
          <p>Hoa Vẫn Nở Mỗi Ngày</p>
        </div>
        <div class="subInfo">
          <!-- <p>Số lượng: 10</p> -->
          <div class="buttons_added">
            <p>Số lượng:</p>
            <input aria-label="quantity" class="input-qty" max="10" min="1" name="" type="number" value="1">
          </div>
          <p class="price">Giá: 50.000đ</p>
        </div>
      </div>
      <img class="icon-delete" src="../../assets/images/delete.png" alt="" />
    </div>
    <div class="item">
      <div class="left">
        <img src="http://res.cloudinary.com/huyennhat/image/upload/v1684683502/images/products/gbpcybctohctifa1jbtc.png" alt="">
      </div>
      <div class="right">
        <div class="name">
          <p>Hoa Vẫn Nở Mỗi Ngày</p>
        </div>
        <div class="subInfo">
          <p>Số lượng: 10</p>
          <p>Giá: 50.000đ</p>
        </div>
      </div>
      <img class="icon-delete" src="../../assets/images/delete.png" alt="" />
    </div>
    <div class="item">
      <div class="left">
        <img src="http://res.cloudinary.com/huyennhat/image/upload/v1684683502/images/products/gbpcybctohctifa1jbtc.png" alt="">
      </div>
      <div class="right">
        <div class="name">
          <p>Hoa Vẫn Nở Mỗi Ngày</p>
        </div>
        <div class="subInfo">
          <p>Số lượng: 10</p>
          <p>Giá: 50.000đ</p>
        </div>
      </div>
      <img class="icon-delete" src="../../assets/images/delete.png" alt="" />
    </div>
    <div class="button">
      <button>Tiến hành đặt mua</button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({

});
</script>
<style>
  .items .item{
    display: flex;
    margin-bottom: 12px;
  }
  .items .item .icon-delete{
    height: 25px;
    display: block;
    margin: auto 0;
    cursor: pointer;
  }

  .items .item .left {
    width: 30%;
  }
  .items .item .left img{
    max-width: 100%;
    max-height: 100%;
  }
  .items .item .right {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .items .item .right .name p{
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 600;
    color: black;
  }
  .items .item .right .subInfo p{
    margin-bottom: -2px;
    font-size: 14px;
    font-weight: 400;
    color: #555;
  }
  .items .item .right .subInfo .price{
    margin-top: 5px;
  }
  .items .item .right .subInfo .buttons_added{
   display: flex;
   align-items: center;
  }
  .items .item .right .subInfo .buttons_added p{
    width: fit-content;
    margin-right: 10px;
  }
  .items .item .right .subInfo .buttons_added input{
    border: 1px solid #b3b2b2;
    color: black;
  }

  .items .button {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .items .button button{
    background: green;
    border: none;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
  }
</style>