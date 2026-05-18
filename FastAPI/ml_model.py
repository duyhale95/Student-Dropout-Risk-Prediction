import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel

# Định nghĩa input từ người dùng theo feature_names.txt
class PredictionInput(BaseModel):
    Application_mode: int
    Application_order: int
    Course: int
    Mother_qualification: int
    Father_qualification: int
    Mother_occupation: int
    Father_occupation: int
    Debtor: int
    Tuition_fees_up_to_date: int
    Gender: int
    Scholarship_holder: int
    Age: int
    GDP: float
    avg_enrolled: float
    avg_approved: float
    avg_grade: float

class PredictionOutput(BaseModel):
    prediction: str

class StudentRetentionModel:
    def __init__(self):
        with open('xgb_b16.pkl', 'rb') as f:
            self.model = pickle.load(f)

        self.target_mapping = {0: 'Graduate', 1: 'Dropout'}

    def preprocess_input(self, input_data: PredictionInput):
        ordered_columns = [
            'Application_mode', 'Application_order', 'Course',
            'Mother_qualification', 'Father_qualification',
            'Mother_occupation', 'Father_occupation',
            'Debtor', 'Tuition_fees_up_to_date', 'Gender',
            'Scholarship_holder', 'Age', 'GDP',
            'avg_enrolled', 'avg_approved', 'avg_grade'
        ]

        data_dict = input_data.dict()
        X = pd.DataFrame([[data_dict[col] for col in ordered_columns]], columns=ordered_columns)

        print("Input đưa vào model:", X.values.tolist())
        return X.values

    def predict(self, input_data: PredictionInput):
        X_processed = self.preprocess_input(input_data)
        prediction = self.model.predict(X_processed)[0]
        print("Prediction raw:", prediction)
        return {"prediction": self.target_mapping[int(prediction)]}


# Khởi tạo mô hình để dùng trong FastAPI
model = StudentRetentionModel()
