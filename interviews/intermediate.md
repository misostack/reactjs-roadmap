# Intermediate Interview Questions

1. What is hook in ReactJS?

2. Design props, states for an upload file component

- Support upload multiple files
- Support file preview: image-preview as image, other file types: filename
- Support deleting file

## ReactJS State Management

Các khái niệm cần nắm trước khi đọc bài viết này:

1. Khái niệm cơ bản về React State
2. Khái niệm cơ bản về React Hook

Về mặt định nghĩa, thì State trong ReactJS là 1 Javascript Object phản ánh phần dữ liệu của component và có thể bị thay đổi giá trị do các tác nhân trong ứng dụng ( người dùng, web worker, web socket, ...)

Trong phạm vi của bài viết này, toàn bộ ví dụ sẽ được viết theo dạng functional và react hooks.

Khi ứng dụng càng lớn, hoặc trong cùng 1 màn hình lại có rất nhiều tính năng và chúng lại có liên quan mật thiết với nhau. Thì việc thiết kế và tổ chức cấu trúc dữ liệu cho state là điều tối quan trọng.

Để dễ dàng nắm bắt được các phương pháp khi làm việc với state, chúng ta sẽ đi qua lần lượt các trường hợp sau:

1. Internal UI states: phần state được sử dụng để hiển thị hoặc thay đổi về mặt giao diện người dùng như disabled, đổi màu sắc, hiển thị thông báo thành công/lỗi
2. Interal data states: phần state được sử dụng để chứa dữ liệu chính hiển thị cho người dùng
3. Shared UI states: phần state chung được sử dụng thay đổi về mặt UI ở toàn bộ ứng dụng hoặc các cụm màn hình chung
4. Shared data states: phần state được sử dụng để chứa các dữ liệu chung của toàn bộ ứng dụng hoặc 1 cụm các màn hình chung
