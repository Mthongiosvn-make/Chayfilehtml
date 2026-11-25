# HTML Live Editor & Previewer

Ứng dụng web tĩnh giúp mở, chỉnh sửa và xem trước trực tiếp các tệp `.html` ngay trên trình duyệt.

## Tính năng chính
- **Mở & Kéo thả file `.html`**: Tải tệp từ máy tính hoặc kéo thả trực tiếp vào trình duyệt để xem ngay.
- **Xem trước trực tiếp (Live Preview)**: Tự động cập nhật kết quả ngay khi gõ code.
- **Giả lập màn hình thiết bị**: Chuyển đổi nhanh giữa chế độ Tự do, Tablet (`768px`) và Mobile (`375px`).
- **Tùy chỉnh không gian làm việc**: Kéo thanh chia tỷ lệ, đổi bố cục ngang/dọc hoặc phóng to toàn màn hình.
- **Xuất file nhanh**: Tải mã nguồn đã chỉnh sửa về máy dưới dạng `.html`.

## Cấu trúc thư mục
```text
html-live-previewer/
├── index.html      # Giao diện chính của ứng dụng
├── css/
│   └── style.css   # Giao diện Dark Mode & Responsive
├── js/
│   └── app.js      # Xử lý đọc file, render iframe & kéo thả
└── README.md       # Tài liệu hướng dẫn
```

## Hướng dẫn đưa lên GitHub & bật GitHub Pages
1. Tạo một Repository mới trên [GitHub](https://github.com/new) (ví dụ: `html-live-previewer`).
2. Tải toàn bộ các file trong thư mục này lên Repository (bấm **Add file** -> **Upload files** -> kéo thả toàn bộ file và thư mục bên trong `html-live-previewer/` vào).
3. Vào tab **Settings** -> chọn mục **Pages** ở cột bên trái.
4. Tại phần **Build and deployment > Branch**, chọn nhánh `main` và thư mục `/ (root)`, sau đó bấm **Save**.
5. Đợi khoảng 1 phút, GitHub sẽ cấp đường dẫn trang web hoạt động trực tuyến (dạng `https://ten-tai-khoan.github.io/html-live-previewer/`).
