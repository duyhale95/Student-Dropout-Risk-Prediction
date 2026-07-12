# 🎓 Student Dropout Prediction App

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-v0.110.0-emerald.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-v18.2.0-blue.svg)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-cyan.svg)](https://www.docker.com/)

Ứng dụng web dự đoán khả năng thôi học (dropout) của sinh viên dựa trên mô hình học máy (Machine Learning) và quản lý lịch sử dự đoán qua cơ sở dữ liệu SQLite.

---

## 🌟 Tính Năng Nổi Bật (Key Features)

- **Dự Đoán Chính Xác:** Sử dụng mô hình **XGBoost Classifier** ([xgb_b16.pkl](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/xgb_b16.pkl)) để phân loại trạng thái sinh viên thành **Tốt nghiệp (Graduate)** hoặc **Thôi học (Dropout)**.
- **Phân Tích Đa Chiều:** Đánh giá dựa trên 16 đặc trưng (features) bao gồm thông tin nhân khẩu học, điều kiện kinh tế xã hội và kết quả học tập của sinh viên.
- **Lưu Trữ Lịch Sử:** Tự động lưu trữ mọi lượt dự đoán vào cơ sở dữ liệu SQLite thông qua model [StudentPrediction](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/models.py#L4).
- **Quản Lý Kết Quả:** Cung cấp giao diện trực quan cho phép xem danh sách lịch sử dự đoán và xóa các bản ghi cũ khi cần thiết.
- **Giao Diện Hiện Đại:** Frontend React sử dụng Material UI (MUI), TailwindCSS và Framer Motion cho các hiệu ứng giao diện mượt mà và trực quan.
- **Đóng Gói Docker:** Hỗ trợ [docker-compose.yml](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/docker-compose.yml) giúp khởi chạy toàn bộ hệ thống (Frontend, Backend, Database) chỉ với một câu lệnh duy nhất.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

### Backend (API & Machine Learning)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) - Hiệu năng cao, tự động sinh tài liệu API (Swagger/ReDoc).
- **Machine Learning Library:** [XGBoost](https://xgboost.readthedocs.io/), [Scikit-learn](https://scikit-learn.org/), [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/).
- **Database ORM:** [SQLAlchemy](https://www.sqlalchemy.org/) kết nối với SQLite database qua [database.py](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/database.py).
- **Data Validation:** [Pydantic](https://docs.pydantic.dev/) với class [PredictionInput](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/ml_model.py#L7) và class [StudentPredictionResponse](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/schemas.py#L22) để kiểm tra tính hợp lệ của dữ liệu đầu vào và đầu ra.

### Frontend (User Interface)
- **Framework:** [ReactJS](https://react.dev/) (Single Page Application) - Quản lý cấu hình tại [package.json](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/React/student-app/package.json).
- **Styling & Components:** [TailwindCSS](https://tailwindcss.com/) & [Material-UI (MUI)](https://mui.com/).
- **Animation:** [Framer Motion](https://www.framer.com/motion/) tạo chuyển động mượt mà.
- **HTTP Client:** [Axios](https://axios-http.com/) để gọi API từ Backend.

### DevOps & Deployment
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/).
- **Web Server:** [Nginx](https://www.nginx.com/) dùng để làm Reverse Proxy và phục vụ React static build qua [nginx.conf](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/React/student-app/nginx.conf).

---

## 📁 Cấu Trúc Dự Án (Project Structure)

Dưới đây là sơ đồ tổ chức thư mục của dự án:

```text
ML_website-main/
├── FastAPI/                 # Thư mục chứa mã nguồn Backend & Machine Learning API
│   ├── database.py          # Cấu hình kết nối cơ sở dữ liệu SQLite
│   ├── Dockerfile           # File build Docker image cho Backend
│   ├── main.py              # Định nghĩa API endpoints (predict, history, delete)
│   ├── ml_model.py          # Wrapper load mô hình XGBoost và dự đoán dữ liệu
│   ├── models.py            # Định nghĩa cấu trúc bảng cơ sở dữ liệu SQLAlchemy
│   ├── schemas.py           # Khai báo schema Pydantic cho Request/Response Validation
│   ├── requirements.txt     # Các thư viện Python cần thiết để chạy Backend
│   └── xgb_b16.pkl          # File mô hình XGBoost đã huấn luyện (.pkl)
│
├── React/                   # Thư mục chứa mã nguồn Frontend
│   └── student-app/         # Thư mục dự án React chính
│       ├── Dockerfile       # File build Docker image cho Frontend (Multi-stage build)
│       ├── nginx.conf       # Cấu hình Nginx phục vụ ứng dụng SPA (React Router)
│       ├── package.json     # Quản lý thư viện và script chạy React
│       └── ...              # Các thành phần giao diện người dùng
│
└── docker-compose.yml       # Cấu hình Docker Compose chạy đồng bộ cả 2 dịch vụ
```

Chi tiết các file quan trọng trong dự án:
- [FastAPI/main.py](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/main.py): Điểm khởi chạy của FastAPI, thiết lập CORS và định nghĩa routes.
- [FastAPI/ml_model.py](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/ml_model.py): Quản lý tiến trình load mô hình từ file [xgb_b16.pkl](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/xgb_b16.pkl) và chuyển đổi dữ liệu đầu vào.
- [FastAPI/models.py](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/models.py): Định nghĩa ORM Model đại diện cho bảng lưu trữ thông tin dự đoán.
- [FastAPI/database.py](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/database.py): Khởi tạo cơ sở dữ liệu cục bộ SQLite `todosapp.db` hoặc lấy qua biến môi trường `DATABASE_URL`.
- [React/student-app/package.json](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/React/student-app/package.json): Chứa các dependencies chính của giao diện người dùng.

---

## 📊 Các Đặc Trưng Đầu Vào Của Mô Hình (Model Features Input)

Để thực hiện dự đoán học sinh có tốt nghiệp hay thôi học, đối tượng [PredictionInput](file:///c:/Users/haled/OneDrive/Desktop/ML_website-main/FastAPI/ml_model.py#L7) cần truyền vào các thông số sau:

| Đặc Trưng | Kiểu Dữ Liệu | Mô Tả |
| :--- | :--- | :--- |
| `Application_mode` | Integer | Phương thức tuyển sinh đăng ký đầu vào |
| `Application_order` | Integer | Thứ tự ưu tiên của nguyện vọng (ví dụ: nguyện vọng 1, 2) |
| `Course` | Integer | Mã chuyên ngành học |
| `Mother_qualification` | Integer | Trình độ học vấn cao nhất của Mẹ |
| `Father_qualification` | Integer | Trình độ học vấn cao nhất của Bố |
| `Mother_occupation` | Integer | Ngành nghề làm việc của Mẹ |
| `Father_occupation` | Integer | Ngành nghề làm việc của Bố |
| `Debtor` | Integer (0/1) | Sinh viên đang có nợ học phí hay không (1: Có, 0: Không) |
| `Tuition_fees_up_to_date`| Integer (0/1) | Sinh viên đã hoàn thành học phí đúng hạn (1: Đúng hạn, 0: Trễ hạn) |
| `Gender` | Integer (0/1) | Giới tính sinh viên (1: Nam, 0: Nữ) |
| `Scholarship_holder` | Integer (0/1) | Sinh viên đang nhận học bổng hay không (1: Có, 0: Không) |
| `Age` | Integer | Tuổi của sinh viên lúc bắt đầu nhập học |
| `GDP` | Float | Chỉ số tăng trưởng GDP quốc gia lúc nhập học |
| `avg_enrolled` | Float | Số lượng tín chỉ/môn học đăng ký trung bình trong kỳ |
| `avg_approved` | Float | Số lượng môn học đã thi qua trung bình trong kỳ |
| `avg_grade` | Float | Điểm trung bình của sinh viên đạt được trong kỳ |

---

## 🚀 Hướng Dẫn Khởi Chạy (Getting Started)

### Cách 1: Sử Dụng Docker Compose (🐳 Khuyến Nghị)

Yêu cầu máy tính đã cài đặt và đang bật **Docker Desktop**.

1. **Khởi chạy hệ thống:**
   Mở terminal tại thư mục gốc của dự án (`ML_website-main/`) và thực thi lệnh:
   ```bash
   docker-compose up --build
   ```

2. **Truy cập dịch vụ:**
   - **Frontend Web UI:** [http://localhost:3000](http://localhost:3000)
   - **Backend API Server:** [http://localhost:8000](http://localhost:8000)
   - **Interactive API Documentation (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

3. **Dừng ứng dụng:**
   ```bash
   docker-compose down
   ```

---

### Cách 2: Chạy Thủ Công Dưới Môi Trường Local (💻 Development)

Bạn cần mở **2 terminal song song** để chạy đồng thời cả Frontend và Backend:

#### Bước 1: Khởi chạy Backend (FastAPI)
1. Mở Terminal thứ nhất và di chuyển vào thư mục Backend:
   ```bash
   cd FastAPI
   ```
2. Cài đặt các thư viện cần thiết:
   ```bash
   pip install -r requirements.txt
   ```
3. Khởi chạy uvicorn server:
   ```bash
   uvicorn main:app --reload
   ```
   *Backend API sẽ chạy tại: [http://localhost:8000](http://localhost:8000)*

#### Bước 2: Khởi chạy Frontend (React)
1. Mở Terminal thứ hai và di chuyển vào thư mục Frontend:
   ```bash
   cd React/student-app
   ```
2. Cài đặt các gói thư viện node:
   ```bash
   npm install
   ```
3. Khởi động ứng dụng giao diện:
   ```bash
   npm start
   ```
   *Frontend React sẽ tự động mở trên trình duyệt tại địa chỉ: [http://localhost:3000](http://localhost:3000)*

---

## 🔌 API Endpoints chính

Backend cung cấp các API endpoints phục vụ cho ứng dụng:

- `POST /predict/`: Nhận thông số sinh viên, trả về kết quả dự đoán (`Graduate`/`Dropout`) và tự động lưu vào Database SQLite.
- `GET /predictions/`: Lấy danh sách toàn bộ lịch sử các lượt dự đoán đã thực hiện.
- `DELETE /predictions/{prediction_id}`: Xóa bản ghi lịch sử tương ứng theo `id`.
