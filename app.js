 // --- Full CBC Competency Map by Subject & Grade ---
const competencies = {
  "Mathematics": {
    "Grade 1": ["Counting & Numbers", "Shapes", "Simple Addition"],
    "Grade 2": ["Subtraction", "Measurement", "Patterns"],
    "Grade 3": ["Fractions", "Multiplication", "Division", "Geometry"],
    "Grade 4": ["Decimals", "Area & Perimeter", "Data Handling"],
    "Grade 5": ["Ratios", "Volume", "Algebra Basics"],
    "Grade 6": ["Integers", "Probability", "Equations"]
  },
  "English": {
    "Grade 1": ["Alphabet", "Simple Words", "Listening Skills"],
    "Grade 2": ["Reading Short Stories", "Grammar Basics", "Writing Sentences"],
    "Grade 3": ["Comprehension", "Vocabulary", "Creative Writing"],
    "Grade 4": ["Narrative Writing", "Grammar", "Summarizing"],
    "Grade 5": ["Debates", "Essay Writing", "Poetry"],
    "Grade 6": ["Critical Reading", "Formal Writing", "Speech Presentation"]
  },
  "Kiswahili": {
    "Grade 1": ["Herufi", "Maneno Rahisi", "Kusikiliza"],
    "Grade 2": ["Kusoma Hadithi", "Msamiati", "Kuandika Sentensi"],
    "Grade 3": ["Ufahamu", "Sarufi", "Kuandika Hadithi"],
    "Grade 4": ["Mashairi", "Barua", "Sarufi"],
    "Grade 5": ["Hotuba", "Insha", "Methali"],
    "Grade 6": ["Mijadala", "Hadithi za Kifasihi", "Sarufi ya Juu"]
  },
  "Environmental Activities": {
    "Grade 1": ["Our Surroundings", "Weather", "Animals"],
    "Grade 2": ["Plants", "Water", "Soil"],
    "Grade 3": ["Conservation", "Weather Patterns", "Habitats"],
    "Grade 4": ["Ecosystems", "Natural Resources", "Waste Management"],
    "Grade 5": ["Climate", "Forests", "Wildlife Protection"],
    "Grade 6": ["Sustainability", "Energy Use", "Human Impact"]
  },
  "Science and Technology": {
    "Grade 1": ["Living & Non-Living Things", "The Body", "Objects"],
    "Grade 2": ["Forces", "Health & Safety", "Weather"],
    "Grade 3": ["Matter", "Energy", "Human Body", "Technology in Life"],
    "Grade 4": ["Simple Machines", "Light & Sound", "Plants"],
    "Grade 5": ["Electricity", "Magnets", "Environment"],
    "Grade 6": ["Cells", "Human Systems", "ICT Integration"]
  },
  "Social Studies": {
    "Grade 1": ["Family & Community", "People Around Us"],
    "Grade 2": ["Maps", "Neighbours", "Culture"],
    "Grade 3": ["Civic Responsibility", "Kenya’s History", "Places"],
    "Grade 4": ["Government", "Rights & Duties", "Regions of Kenya"],
    "Grade 5": ["Trade", "Colonial History", "Democracy"],
    "Grade 6": ["Citizenship", "Leadership", "African Heritage"]
  },
  "Religious Education": {
    "Grade 1": ["Values", "Respect", "Sharing"],
    "Grade 2": ["Prayer", "Good Behavior", "Stories"],
    "Grade 3": ["Christian Values", "Islamic Values", "Moral Choices"],
    "Grade 4": ["Faith Practices", "Forgiveness", "Helping Others"],
    "Grade 5": ["Scripture Lessons", "Religious Festivals", "Peace"],
    "Grade 6": ["Faith & Society", "Ethics", "Religious Responsibility"]
  },
  "Creative Arts": {
    "Grade 1": ["Drawing", "Coloring", "Crafts"],
    "Grade 2": ["Painting", "Simple Weaving", "Cut & Paste"],
    "Grade 3": ["Collage", "Clay Modeling", "Patterns"],
    "Grade 4": ["Perspective Drawing", "Advanced Crafts", "Design"],
    "Grade 5": ["Creative Expression", "Sculpture", "Cultural Art"],
    "Grade 6": ["Art Appreciation", "Innovation in Art", "Mixed Media"]
  },
  "Music": {
    "Grade 1": ["Singing Simple Songs", "Clapping Rhythm"],
    "Grade 2": ["Playing Instruments", "Dancing"],
    "Grade 3": ["Harmony", "Music Notation", "Cultural Songs"],
    "Grade 4": ["Improvisation", "Group Performance", "Melody"],
    "Grade 5": ["Composing Music", "African Music", "Drumming"],
    "Grade 6": ["Advanced Notation", "Choral Singing", "Instrumental Performance"]
  },
  "Physical Education": {
    "Grade 1": ["Running", "Jumping", "Games"],
    "Grade 2": ["Throwing & Catching", "Dance", "Movement"],
    "Grade 3": ["Team Games", "Athletics", "Balance"],
    "Grade 4": ["Ball Games", "Fitness Routines", "Coordination"],
    "Grade 5": ["Sportsmanship", "Endurance", "Gymnastics"],
    "Grade 6": ["Athletics Training", "Outdoor Activities", "Sports Rules"]
  },
  "Home Science": {
    "Grade 1": ["Healthy Eating", "Cleanliness"],
    "Grade 2": ["Clothing Care", "Simple Cooking"],
    "Grade 3": ["Nutrition", "Home Safety", "Personal Hygiene"],
    "Grade 4": ["Food Preservation", "Sewing Basics", "Housekeeping"],
    "Grade 5": ["Balanced Diets", "First Aid", "Child Care"],
    "Grade 6": ["Advanced Cooking", "Family Care", "Health Education"]
  }
};

// --- Dynamic Competencies ---
document.getElementById("subject").addEventListener("change", updateCompetencies);
document.getElementById("grade").addEventListener("change", updateCompetencies);
function updateCompetencies() {
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;
  const competencySelect = document.getElementById("competency");
  competencySelect.innerHTML = `<option value="">-- Select a competency --</option>`;
  if (competencies[subject] && competencies[subject][grade]) {
    competencies[subject][grade].forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      competencySelect.appendChild(option);
    });
  }
}

// --- Lesson Plan Form ---
document.getElementById("lessonForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;
  const competency = document.getElementById("competency").value;
  const duration = document.getElementById("duration").value;
  const output = document.getElementById("output");

  output.innerHTML = `<div class="loading-message"><div class="spinner"></div> Generating Lesson Plan...</div>`;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/ai/lesson_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, grade, competency, duration })
    });
    const data = await response.json();
    if (data.status === "success") {
      const formattedPlan = data.plan.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>").replace(/^(\d+\.\s.+)$/gm, "<strong>$1</strong>");
      output.style.color = "black";
      output.innerHTML = `
        <h3>Lesson Plan</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Grade:</strong> ${data.grade}</p>
        <p><strong>Competency:</strong> ${data.competency}</p>
        <p><strong>Duration:</strong> ${data.duration}</p>
        <div class="lesson-plan">${formattedPlan}</div>
      `;
    } else {
      output.style.color = "orange";
      output.textContent = "❌ Error: " + (data.message || "Something went wrong");
    }
  } catch (err) {
    output.style.color = "orange";
    output.textContent = "⚠️ Network error: " + err.message;
  }
});

// --- Parent Note Form ---
document.getElementById("parentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const student_name = document.getElementById("student_name").value;
  const progress = document.getElementById("progress").value;
  const lang = document.getElementById("lang").value;
  const output = document.getElementById("output");

  output.innerHTML = `<div class="loading-message"><div class="spinner"></div> Generating Parent Note...</div>`;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/ai/parent_note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_name, progress, lang })
    });
    const data = await response.json();
    if (data.status === "success") {
      output.style.color = "black";
      output.innerHTML = `
        <h3>Parent Note</h3>
        <p><strong>Student:</strong> ${data.student_name}</p>
        <div class="lesson-plan">${data.note}</div>
      `;
    } else {
      output.style.color = "orange";
      output.textContent = "❌ Error: " + (data.message || "Something went wrong");
    }
  } catch (err) {
    output.style.color = "orange";
    output.textContent = "⚠️ Network error: " + err.message;
  }
});

// --- Export Files ---
async function exportFile(type) {
  const output = document.getElementById("output");
  output.innerHTML = `<div class="loading-message"><div class="spinner"></div>Generating ${type.toUpperCase()} file...</div>`;
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/export/${type}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student_report.${type === 'excel' ? 'xlsx' : type}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    output.innerHTML = `✅ ${type.toUpperCase()} file downloaded!`;
  } catch (err) {
    output.style.color = "orange";
    output.textContent = "⚠️ Error downloading file: " + err.message;
  }
}

// --- School Fees Payment (IntaSend) ---
document.getElementById("paymentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const student_name = document.getElementById("pay_student_name").value;
  const email = document.getElementById("pay_email").value;
  const amount = document.getElementById("pay_amount").value;
  const output = document.getElementById("output");

  output.innerHTML = `<div class="loading-message"><div class="spinner"></div> Redirecting to payment...</div>`;

  // IntaSend Inline Checkout
  const checkout = new window.IntaSendCheckout({
    publicAPIKey: "ISPubKey_test_1bc2cb8a-8094-4ebe-85b8-f85f3f243c6c", // Replace with your IntaSend test/live key
    amount: amount,
    currency: "KES",
    email: email,
    first_name: student_name.split(" ")[0] || student_name,
    last_name: student_name.split(" ")[1] || "",
    api_ref: "SAINTCBC_" + Date.now(),
    onSuccess: function (response) {
      console.log("Payment Success:", response);
      output.style.color = "green";
      output.textContent = "✅ Payment completed! Ref: " + response.invoice_id;
    },
    onError: function (error) {
      console.error("Payment Error:", error);
      output.style.color = "orange";
      output.textContent = "❌ Payment failed: " + error.message;
    },
    onClose: function () {
      output.style.color = "orange";
      output.textContent = "⚠️ Payment popup closed.";
    },
  });

  checkout.open();
});
