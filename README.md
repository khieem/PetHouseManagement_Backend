# Hệ thống quản lý nhà cứu trợ thú cưng bị bỏ rơi

Bài tập môn Phát triển ứng dụng Web học kỳ hè 2020-2021.

Đây mới là một nửa của toàn bộ ứng dụng (phía backend), nửa còn lại có tại [đây]().

# Bắt đầu

Hệ thống được viết hoàn toàn bằng TypeScript và sử dụng [NestJS](https://github.com/nestjs/nest) - một framework hướng đến xây dựng ứng dụng Node.js phía máy chủ, do đó ta sẽ dùng `npm` như thông thường.

## Cài đặt

```
> npm install
```

## Khởi chạy

```
> npm run start
```

hoặc tự động chạy khi phát hiện thay đổi:

```
> npm run start:dev
```

## Tạo module mới thế nào?

Sử dụng lần lượt 3 lệnh sau theo bất kỳ thứ tự nào:

```
> nest g module [tên module] --no-spec
> nest g controller [tên controller] --no-spec
> nest g service [tên service] --no-spec
```

`--no-spec` chỉ định không tạo thêm file test _\*.spec.ts_

NestJS sẽ tự động liên kết tất cả lại, không cần import bằng tay nữa :D

# Thành viên

- [Nguyễn Quốc Khánh]()
- [Nguyễn Văn Khiêm]()
- [Nguyễn Thăng Long]()
