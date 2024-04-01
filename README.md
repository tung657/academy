## PACKAGES QUAN TRỌNG

- [Mantine-UI](https://mantine.dev/).
- [NextJS](https://nextjs.org/docs).


## CÀI ĐẶT PACKAGE
```bash
yarn install

```

## CHẠY ỨNG DỤNG

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:9090](http://localhost:9090) với browser.

## LƯU Ý

- Các modules chính trong **app/[locale]** (code chủ yếu tại đây)
- Tạo các components (cần thiết để tái sử dụng) trong thư mục **/components**
- Ứng dụng viết đa ngôn ngữ trong thư mục **/locales**
- Thư mục **assets** để lưu tài nguyên tĩnh (ảnh, fonts)
- Thư mục **libs** để chứa tài nguyên cần cho render dữ liệu
- Thư mục **utils** để xử lý các tác vụ liên quan đến validation, string...
- Thư mục **types** để tạo các types hoặc interfaces
- Thư mục **store** để khai báo các global states