from sqlalchemy import Column, Integer, Float, String
from database import Base

class StudentPrediction(Base):
    __tablename__ = "student_predictions"

    id = Column(Integer, primary_key=True, index=True)
    Application_mode = Column(Integer)
    Application_order = Column(Integer)
    Course = Column(Integer)
    Mother_qualification = Column(Integer)
    Father_qualification = Column(Integer)
    Mother_occupation = Column(Integer)
    Father_occupation = Column(Integer)
    Debtor = Column(Integer)
    Tuition_fees_up_to_date = Column(Integer)
    Gender = Column(Integer)
    Scholarship_holder = Column(Integer)
    Age = Column(Integer)
    GDP = Column(Float)
    avg_enrolled = Column(Float)
    avg_approved = Column(Float)
    avg_grade = Column(Float)

    # Dự đoán đầu ra
    prediction = Column(String)
