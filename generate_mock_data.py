import random
from faker import Faker # pyright: ignore[reportMissingImports]
import mysql.connector # pyright: ignore[reportMissingImports]
from dotenv import load_dotenv # pyright: ignore[reportMissingImports]
import os

# Load .env
load_dotenv()

print("USER:", os.getenv("DB_USER"))
print("PASS:", os.getenv("DB_PASSWORD"))

# Connect to MySQL
conn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    use_pure=True
)
cursor = conn.cursor()
fake = Faker()

# Clear tables
cursor.execute("DELETE FROM students;")
cursor.execute("ALTER TABLE students AUTO_INCREMENT = 1;")

cursor.execute("DELETE FROM staff;")
cursor.execute("ALTER TABLE staff AUTO_INCREMENT = 1;")

cursor.execute("DELETE FROM subjects;")
cursor.execute("ALTER TABLE subjects AUTO_INCREMENT = 1;")
conn.commit()

 # --- Generate staff ---
roles = ["Teacher", "Admin", "Principal", "Deputy Principal"]
staff_list = []
for i in range(20):  # around 20 staff for 100 students is reasonable
    full_name = fake.name()
    role = random.choice(roles)
    email = fake.email()
    password = f"pass{i}{random.randint(100,999)}"  # mock simple passwords
    staff_list.append((full_name, role, email, password))

cursor.execute("DELETE FROM staff;")
cursor.execute("ALTER TABLE staff AUTO_INCREMENT = 1;")

cursor.executemany(
    "INSERT INTO staff (full_name, role, email, password) VALUES (%s,%s,%s,%s);",
    staff_list
)
conn.commit()


# --- CBC subjects by grade ---
used_codes = set()
cbc_subjects = {
    "Grade 1": ["Literacy", "Kiswahili", "English", "Mathematics", "Environmental Activities",
                "Hygiene & Nutrition", "Religious Education", "Art & Craft", "Music", "PE"],
    "Grade 2": ["Literacy", "Kiswahili", "English", "Mathematics", "Environmental Activities",
                "Hygiene & Nutrition", "Religious Education", "Art & Craft", "Music", "PE"],
    "Grade 3": ["Literacy", "Kiswahili", "English", "Mathematics", "Environmental Activities",
                "Hygiene & Nutrition", "Religious Education", "Art & Craft", "Music", "PE"],

    "Grade 4": ["English", "Kiswahili", "Mathematics", "Science & Technology", "Social Studies",
                "Agriculture", "Religious Education", "Visual Arts", "Performing Arts", "PE"],
    "Grade 5": ["English", "Kiswahili", "Mathematics", "Science & Technology", "Social Studies",
                "Agriculture", "Religious Education", "Visual Arts", "Performing Arts", "PE"],
    "Grade 6": ["English", "Kiswahili", "Mathematics", "Science & Technology", "Social Studies",
                "Agriculture", "Religious Education", "Visual Arts", "Performing Arts", "PE"],

    "Grade 7": ["English", "Kiswahili", "Mathematics", "Integrated Science", "Social Studies",
                "Business Studies", "Pre-technical Studies", "Agriculture", "Religious Education",
                "Visual Arts", "Performing Arts", "PE", "Life Skills"],
    "Grade 8": ["English", "Kiswahili", "Mathematics", "Integrated Science", "Social Studies",
                "Business Studies", "Pre-technical Studies", "Agriculture", "Religious Education",
                "Visual Arts", "Performing Arts", "PE", "Life Skills"],
    "Grade 9": ["English", "Kiswahili", "Mathematics", "Integrated Science", "Social Studies",
                "Business Studies", "Pre-technical Studies", "Agriculture", "Religious Education",
                "Visual Arts", "Performing Arts", "PE", "Life Skills"]
}

cbc_subjects_list = []
for grade, subj_list in cbc_subjects.items():
    for subj in subj_list:
        print(grade, subj)
        while True:
            code = subj[:3].upper() + str(random.randint(1,99))
            if code not in used_codes:
                used_codes.add(code)
                break
        description = f"{subj} for {grade} under CBC cirriculum"
        cbc_subjects_list.append((subj, code, description, grade))

cursor.executemany(
    "INSERT INTO subjects (name, code, description, grade) VALUES (%s,%s,%s,%s);",
    cbc_subjects_list
)
conn.commit()

# --- Generate students ---
grades = list(cbc_subjects.keys())
students_list = []
for i in range(100):
    reg_no = f"REG{1000+i}"
    first_name = fake.first_name()
    last_name = fake.last_name()
    gender = random.choice(["M", "F", "Other"])
    dob = fake.date_of_birth(minimum_age=6, maximum_age=14)
    class_name = random.choice(grades)
    guardian_name = fake.name()
    guardian_phone = fake.phone_number()
    students_list.append((
        reg_no, first_name, last_name, gender, dob,
        class_name, guardian_name, guardian_phone
    ))

cursor.executemany(
    """
    INSERT INTO students 
    (reg_no, first_name, last_name, gender, dob, class, guardian_name, guardian_phone) 
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s);
    """,
    students_list
)
conn.commit()

print("✅ Mock data inserted successfully!")

# Close connection
cursor.close()
conn.close()