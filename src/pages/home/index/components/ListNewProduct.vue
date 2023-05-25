<template>
  <div class="owl-carousel">
    <div v-for="product in products" :key="product._id">
      <!-- Your carousel item content -->
      <the-product :product="product" />
    </div>
  </div>
</template>

<script>
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import TheProduct from "./Product.vue";
import { BASE_URL } from "../../../../configs";

export default {
  components: {
    TheProduct,
  },
  data() {
    return {
      products: [
        {
          rates: [],
          _id: "646a3a0e11b49416499ab32f",
          name: "Điềm Tĩnh Và Nóng Giận",
          photos: [
            "http://res.cloudinary.com/huyennhat/image/upload/v1684683274/images/products/qcs88ok0xt1oovguhdss.png",
            "http://res.cloudinary.com/huyennhat/image/upload/v1684683276/images/products/bzgpxfjz2r52ttjbjbpd.png",
            "http://res.cloudinary.com/huyennhat/image/upload/v1684683278/images/products/xvw0edmqk8gjzgovaelr.png",
            "http://res.cloudinary.com/huyennhat/image/upload/v1684697548/images/products/rdkwgxmoq7nmv9q5rbxx.png",
            "http://res.cloudinary.com/huyennhat/image/upload/v1684697551/images/products/zzlxxgrodmvqayle7lbn.png",
            "http://res.cloudinary.com/huyennhat/image/upload/v1684697553/images/products/zyok0wuk8ult0lprcwva.png",
          ],
          author: "Giang Lê",
          price: 96000,
          quantity: 100,
          purchases: 0,
          sale: 0.27,
          categories: "646a399911b49416499ab328",
          status: "645d30d2eb6f40e2906325fa",
          createdAt: "2023-05-21T15:34:38.746Z",
          updatedAt: "2023-05-21T19:32:34.120Z",
          __v: 0,
          star: 5,
          description:
            "<p>Trong cuộc sống thường ngày, chúng ta thường nổi giận vì nhiều nguyên do: công việc không suôn sẻ, chúng ta tức giận; bị người khác hiểu nhầm, chúng ta tức giận; thấy việc chướng tai gai mắt, chúng ta tức giận; không thể chấp nhận được dư luận xã hội, chúng ta tức giận. Thậm chí, chúng ta bực tức, cáu gắt, hờn dỗi, nhỏ nhen, uất ức vì thời tiết xấu, vì tiền lương thấp, vì nhà cửa bừa bộn, vì thái độ của người khác, vì những chuyện không may mà mình gặp phải. Dường như cuộc đời chúng ta là một chuỗi tức giận không hồi kết. Hãy thử tự hỏi bản thân: sau khi tức giận thì phiền não sẽ tan biến ư?</p><p>Dân gian vốn có câu “cả giận mất khôn”, Đức Phật cũng đã dạy “một ngọn lửa sân đốt cháy rừng công đức”. Cơn nóng giận có thể hủy diệt sức khỏe, sự nghiệp, tình cảm và hạnh phúc của chúng ta. Cơn giận khiến đầu óc ta bốc hỏa, kích động và lỗ mãng để rồi phạm phải những sai lầm không thể bù đắp. Nóng giận là trừng phạt bản thân bằng lỗi lầm của người khác, đánh cược hạnh phúc cả đời bằng một phút thiếu kiềm chế. Hầu hết những bất hạnh trong đời đều từ đó mà ra. Bởi thế, mỗi người chúng ta sống trong xã hội này đều cần rèn giũa cho mình một thái độ sống điềm tĩnh trước mọi điều.</p><p>Tiếp nối sự thành công sau cuốn sách “Thuận cho người lợi cho mình”, tác giả Tạ Quốc Kế tái ngộ với chúng ta qua cuốn sách Điềm tĩnh &amp; nóng giận, tiếp tục truyền cảm hứng sống đẹp, sống có ích cho mọi người. Thông qua những câu chuyện cụ thể và thực tế, lời lẽ chân thành và đầy sức thuyết phục, độc giả sẽ có những phút giây đủ tĩnh lặng để nhìn nhận lại cảm xúc của bản thân, hiểu hơn về tác hại của nóng giận và học được cách làm sao để kiểm soát tâm trạng.</p><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....</p>",
        },
      ],
    };
  },
  mounted() {
    this.getRecommentProduct();
  },
  created() {},
  methods: {
    async getRecommentProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/home/index/recommend-product`);
        if (res.status == 200) {
          this.products = res.data.products;
          this.$nextTick(() => {
            $(".owl-carousel").owlCarousel({});
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
