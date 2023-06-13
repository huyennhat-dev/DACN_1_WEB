<template>
  <div class="main container detail" style="">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 py-4">
            <div class="px-3 py-5 bg-white brr-10">
              <div class="row justify-content-center">
                <div class="col-12 col-sm-10">
                  <a-result
                    status="error"
                    title="Thanh toán thất bại!"
                    sub-title="Đã có lỗi xảy ra trong quá trình thanh toán, liên hệ quản trị viên để được hỗ trợ!"
                  >
                    <template #extra>
                      <router-link :to="{ name: 'index' }">
                        <a-button key="buy" class="brr-5" size="large">
                          Tiếp tục mua hàng
                        </a-button>
                      </router-link>
                    </template>
                  </a-result>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

