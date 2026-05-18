from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from schemas import StudentPredictionBase, StudentPredictionResponse
from ml_model import PredictionInput, model as ml_model
from typing import List

app = FastAPI()

# Tạo bảng nếu chưa có
models.Base.metadata.create_all(bind=engine)

# Cho phép kết nối từ React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency lấy session database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Student retention prediction API is active."}

@app.post("/predict/", response_model=StudentPredictionResponse)
async def predict(input_data: PredictionInput, db: Session = Depends(get_db)):
    result = ml_model.predict(input_data)

    db_record = models.StudentPrediction(
        **input_data.dict(),
        prediction=result["prediction"],
         # Giá trị mặc định vì không còn tính xác suất
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return db_record

@app.get("/predictions/", response_model=List[StudentPredictionResponse])
async def get_predictions(db: Session = Depends(get_db)):
    return db.query(models.StudentPrediction).all()

@app.delete("/predictions/{prediction_id}")
async def delete_prediction(prediction_id: int, db: Session = Depends(get_db)):
    prediction = db.query(models.StudentPrediction).filter(models.StudentPrediction.id == prediction_id).first()
    if prediction is None:
        return {"message": "Prediction not found"}
    
    db.delete(prediction)
    db.commit()
    return {"message": "Prediction deleted successfully"}
