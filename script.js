 document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bmiForm");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const height = parseFloat(heightInput.value); // Centimeters (cm)
        const weight = parseFloat(weightInput.value); // Pounds (lbs)
        
        // 1. Get the selected gender value
        const genderInput = document.querySelector('input[name="gender"]:checked');

        // Validation Check
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            alert("Please enter valid positive numbers for Height (cm) and Weight (lb)!");
            return;
        }
        if (!genderInput) {
            alert("Please select your gender (Male or Female)!");
            return;
        }

        const gender = genderInput.value;

        // BMI Calculation (cm & lbs)
        const heightInMeters = height / 100; // cm to meters
        const weightInKg = weight * 0.453592; // lbs to kg
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        const finalBmi = bmi.toFixed(1);

        let status = "";
        let color = "#000";
        let imagePath = "";

        // 2. Determine status, layout colors, and pick the matching image
        if (bmi < 18.5) {
            status = "Underweight";
            color = "#b8860b";
            imagePath = gender === "male" ? "male_underweight.jpg" : "female_underweight.jpg";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = "Normal Weight";
            color = "#0b6b8a"; 
            imagePath = gender === "male" ? "male_normal.jpg" : "female_normal.jpg";
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = "Overweight";
            color = "#d97706"; 
            imagePath = gender === "male" ? "male_overweight.jpg" : "female_overweight.jpg";
        } else {
            status = "Obese";
            color = "#dc2626"; 
            imagePath = gender === "male" ? "male_obese.jpg" : "female_obese.jpg";
        }
// 3. Open a clean blank window tab
        const newTab = window.open("", "_blank");
        
        // 4. Inject the HTML document directly into the new tab
        newTab.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Neutrifit - BMI Report</title>
                <style>
                    body {
                        font-family: 'Courier New', Courier, monospace;
                        background-color: #0d0f17;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .report-card {
                        background-color: #e5e3d7;
                        padding: 40px;
                        border-radius: 8px;
                        border-color: #00e676;
                        box-shadow: 0 4px 10px #00e676;
                        text-align: center;
                        max-width: 400px;
                        width: 100%;
                    }
                    h1 { font-size: 2rem; margin-bottom: 20px; color: #111; }
                    .bmi-num { font-size: 3.5rem; font-weight: bold; margin: 10px 0; }
                    .status-text { font-size: 1.8rem; font-weight: bold; margin-bottom: 25px; }
                    img { max-width: 100%; height: 350px; object-fit: contain; border-radius: 4px; border: 3px solid #00e676; background: white; padding: 10px; box-sizing: border-box; }
                     .close-btn { 
                        margin-top: 25px; 
                        padding: 10px 24px; 
                        font-weight: bold; 
                        background-color: #3f4453; 
                        color: #00e676;
                        border: 2px solid #00e676; 
                        cursor: pointer; 
                        border-radius: 6px; 
                        transition: all 0.3s ease;
                    }
                    .close-btn:hover, .close-btn:active { 
                        background-color: #2b2e38; 
                        color: #00ff75; 
                        border-color: #00ff75; 
                        box-shadow: 0 0 15px #00e676, inset 0 0 5px #00e676; 
                    }
                </style>
            </head>
            <body>
                <div class="report-card">
                    <h1>YOUR BMI REPORT</h1>
                    <img src="${imagePath}" alt="${status}">
                    <div class="bmi-num">${finalBmi}</div>
                    <div class="status-text" style="color: ${color};">${status}</div>
                    <button class="close-btn" onclick="window.close()">Close Report</button>
                </div>
            </body>
            </html>
        `);
        
        newTab.document.close();
    });
});