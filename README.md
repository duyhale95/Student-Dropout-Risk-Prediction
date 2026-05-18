# Student Dropout Prediction App

## 🐳 Chạy với Docker (khuyến nghị)

### Yêu cầu: Docker Desktop đang chạy

```bash
# Từ thư mục gốc ML_website-main/
docker-compose up --build
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

Dừng app:
```bash
docker-compose down
```

---

## 💻 Chạy thủ công (Development)

### Backend (FastAPI)
```bash
cd FastAPI
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (React) — mở terminal mới
```bash
cd React/student-app
npm install
npm start
```

> Cần chạy cả 2 terminal cùng lúc.