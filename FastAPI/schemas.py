from pydantic import BaseModel

class StudentPredictionBase(BaseModel):
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


class StudentPredictionResponse(StudentPredictionBase):
    id: int
    prediction: str

    class Config:
        orm_mode = True
