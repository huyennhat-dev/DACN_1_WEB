<template>
  <div class="side-bar w-100 py-3 pe-3">
    <div class="side-bar_body">
      <div class="side-bar_header mb-3">Danh mục sách</div>
      <div class="side-bar_content">
        <div
          v-for="category in categories"
          :key="category.id"
          class="side-bar_item mb-1"
        >
          <div class="side-bar_item_body">
            <tag-outlined class="me-2" />
            {{ category.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { TagOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    TagOutlined,
  },
  setup() {
    const categories = [
      { id: 1, name: "Điềm Đạm", tag_type_id: "1" },
      { id: 2, name: "Nhiệt Huyết", tag_type_id: "1" },
      { id: 3, name: "Vô Sỉ", tag_type_id: "1" },
      { id: 4, name: "Thiết Huyết", tag_type_id: "1" },
      { id: 5, name: "Nhẹ Nhàng", tag_type_id: "1" },
      { id: 6, name: "Cơ Trí", tag_type_id: "1" },
      { id: 7, name: "Lãnh Khốc", tag_type_id: "1" },
      { id: 8, name: "Kiêu Ngạo", tag_type_id: "1" },
      { id: 9, name: "Ngu Ngốc", tag_type_id: "1" },
      { id: 10, name: "Giảo Hoạt", tag_type_id: "1" },
      {
        id: 11,
        name: "Đông Phương Huyền Huyễn",
        tag_type_id: "2",
      },
      { id: 12, name: "Dị Thế Đại Lục", tag_type_id: "2" },
      { id: 13, name: "Vương Triều Tranh Bá", tag_type_id: "2" },
      { id: 14, name: "Cao Võ Thế Giới", tag_type_id: "2" },
      { id: 15, name: "Tây Phương Kỳ Huyễn", tag_type_id: "2" },
      { id: 16, name: "Hiện Đại Ma Pháp", tag_type_id: "2" },
      { id: 17, name: "Hắc Ám Huyễn Tưởng", tag_type_id: "2" },
      { id: 18, name: "Lịch Sử Thần Thoại", tag_type_id: "2" },
      { id: 19, name: "Võ Hiệp Huyễn Tưởng", tag_type_id: "2" },
      { id: 20, name: "Cổ Võ Tương Lai", tag_type_id: "2" },
      { id: 21, name: "Tu Chân Văn Minh", tag_type_id: "2" },
      { id: 22, name: "Huyễn Tưởng Tu Tiên", tag_type_id: "2" },
      { id: 23, name: "Hiện Đại Tu Chân", tag_type_id: "2" },
      { id: 24, name: "Thần Thoại Tu Chân", tag_type_id: "2" },
      { id: 25, name: "Cổ Điển Tiên Hiệp", tag_type_id: "2" },
      { id: 26, name: "Viễn Cổ Hồng Hoang", tag_type_id: "2" },
      { id: 27, name: "Đô Thị Sinh Hoạt", tag_type_id: "2" },
      { id: 28, name: "Đô Thị Dị Năng", tag_type_id: "2" },
      { id: 29, name: "Thanh Xuân Vườn Trường", tag_type_id: "2" },
      { id: 30, name: "Ngu Nhạc Minh Tinh", tag_type_id: "2" },
      { id: 31, name: "Thương Chiến Chức Tràng", tag_type_id: "2" },
      { id: 32, name: "Giá Không Lịch Sử", tag_type_id: "2" },
      { id: 33, name: "Lịch Sử Quân Sự", tag_type_id: "2" },
      { id: 34, name: "Dân Gian Truyền Thuyết", tag_type_id: "2" },
      { id: 35, name: "Lịch Sử Quan Trường", tag_type_id: "2" },
      { id: 36, name: "Hư Nghĩ Võng Du", tag_type_id: "2" },
      { id: 37, name: "Du Hí Dị Giới", tag_type_id: "2" },
      { id: 38, name: "Điện Tử Cạnh Kỹ", tag_type_id: "2" },
      { id: 39, name: "Thể Dục Cạnh Kỹ", tag_type_id: "2" },
      { id: 40, name: "Cổ Võ Cơ Giáp", tag_type_id: "2" },
      { id: 41, name: "Thế Giới Tương Lai", tag_type_id: "2" },
      { id: 42, name: "Tinh Tế Văn Minh", tag_type_id: "2" },
      { id: 43, name: "Tiến Hóa Biến Dị", tag_type_id: "2" },
      { id: 44, name: "Mạt Thế Nguy Cơ", tag_type_id: "2" },
      { id: 45, name: "Thời Không Xuyên Toa", tag_type_id: "2" },
      { id: 46, name: "Quỷ Bí Huyền Nghi", tag_type_id: "2" },
      { id: 47, name: "Kỳ Diệu Thế Giới", tag_type_id: "2" },
      { id: 48, name: "Trinh Tham Thôi Lý", tag_type_id: "2" },
      { id: 49, name: "Thám Hiểm Sinh Tồn", tag_type_id: "2" },
      { id: 50, name: "Cung Vi Trạch Đấu", tag_type_id: "2" },
      { id: 51, name: "Kinh Thương Chủng Điền", tag_type_id: "2" },
      { id: 52, name: "Tiên Lữ Kỳ Duyên", tag_type_id: "2" },
      { id: 53, name: "Hào Môn Thế Gia", tag_type_id: "2" },
      { id: 54, name: "Dị Tộc Luyến Tình", tag_type_id: "2" },
      { id: 55, name: "Ma Pháp Huyễn Tình", tag_type_id: "2" },
      { id: 56, name: "Tinh Tế Luyến Ca", tag_type_id: "2" },
      { id: 57, name: "Hệ Thống", tag_type_id: "3" },
      { id: 58, name: "Lão Gia", tag_type_id: "3" },
      { id: 59, name: "Bàn Thờ", tag_type_id: "3" },
      { id: 60, name: "Tùy Thân", tag_type_id: "3" },
      { id: 61, name: "Phàm Nhân", tag_type_id: "3" },
      { id: 62, name: "Vô Địch", tag_type_id: "3" },
      { id: 63, name: "Xuyên Qua", tag_type_id: "3" },
      { id: 64, name: "Nữ Cường", tag_type_id: "3" },
      { id: 65, name: "Khế Ước", tag_type_id: "3" },
      { id: 66, name: "Trọng Sinh", tag_type_id: "3" },
      { id: 67, name: "Hồng Lâu", tag_type_id: "3" },
      { id: 68, name: "Học Viện", tag_type_id: "3" },
      { id: 69, name: "Biến Thân", tag_type_id: "3" },
      { id: 70, name: "Cổ Ngu", tag_type_id: "3" },
      { id: 71, name: "Chuyển Thế", tag_type_id: "3" },
      { id: 72, name: "Xuyên Sách", tag_type_id: "3" },
      { id: 73, name: "Đàn Xuyên", tag_type_id: "3" },
      { id: 74, name: "Phế Tài", tag_type_id: "3" },
      { id: 75, name: "Dưỡng Thành", tag_type_id: "3" },
      { id: 76, name: "Cơm Mềm", tag_type_id: "3" },
      { id: 77, name: "Vô Hạn", tag_type_id: "3" },
      { id: 78, name: "Mary Sue", tag_type_id: "3" },
      { id: 79, name: "Cá Mặn", tag_type_id: "3" },
      { id: 80, name: "Xây Dựng Thế Lực", tag_type_id: "3" },
      { id: 81, name: "Xuyên Nhanh", tag_type_id: "3" },
      { id: 82, name: "Nữ Phụ", tag_type_id: "3" },
      { id: 83, name: "Vả Mặt", tag_type_id: "3" },
      { id: 84, name: "Sảng Văn", tag_type_id: "3" },
      { id: 85, name: "Xuyên Không", tag_type_id: "3" },
      { id: 86, name: "Góc Nhìn Nam", tag_type_id: "4" },
      { id: 87, name: "Góc Nhìn Nữ", tag_type_id: "4" },
      { id: 88, name: "Ngôi Thứ Nhất", tag_type_id: "4" },
      { id: 89, name: "Ngọt Sủng", tag_type_id: "3" },
      { id: 90, name: "Ngự Thú", tag_type_id: "3" },
      { id: 91, name: "Điền Viên", tag_type_id: "3" },
      { id: 92, name: "Toàn Dân", tag_type_id: "3" },
      { id: 93, name: "Linh Khí Khôi Phục", tag_type_id: "2" },
      { id: 94, name: "Chư Thiên Vạn Giới", tag_type_id: "2" },
      { id: 95, name: "Mỹ Thực", tag_type_id: "3" },
      { id: 96, name: "Phản Phái", tag_type_id: "3" },
      { id: 97, name: "Sau Màn", tag_type_id: "3" },
    ];

    return { categories };
  },
});
</script>

<style>
.side-bar {
  height: calc(100vh - var(--header-height));

}
.side-bar .side-bar_body {
  height: 100%;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: #fff;
}

.side-bar .side-bar_header {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}
.side-bar .side-bar_content {
  max-height: 90%;
  padding: 10px 5px;
  overflow-y: scroll;
}
.side-bar .side-bar_content::-webkit-scrollbar {
  width: 0;
}

.side-bar .side-bar_item {
  height: 40px;
  width: 100%;
  display: flex;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.side-bar .side-bar_item_body {
  padding: 8px;
  font-size: 15px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  color: #000;
  display: flex;
  border-radius: 8px;
  justify-content: start;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  transition: all 0.2s;

}
.side-bar .side-bar_item_body:hover {
  box-shadow: 0px 0px 5px 2px rgba(101, 101, 101, 0.15) !important;
  transition: all 0.2s;

}

.side-bar .side-bar_item_body:active {
  width: 98%;
  height: 95%;
  transition: all 0.2s;
}
</style>
