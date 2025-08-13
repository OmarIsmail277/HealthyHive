import { useState } from "react";
import {
  FaWeight,
  FaRulerVertical,
  FaBirthdayCake,
  FaRunning,
  FaInfoCircle,
} from "react-icons/fa";

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    workoutHours: 0,
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const inputBaseClasses =
    "mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 transition";

  const validate = () => {
    const newErrors = {};
    if (!formData.weight) newErrors.weight = "Weight is required";
    else if (formData.weight < 40)
      newErrors.weight = "Weight must be at least 40 kg";

    if (!formData.height) newErrors.height = "Height is required";
    else if (formData.height < 120)
      newErrors.height = "Height must be at least 120 cm";

    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age < 11) newErrors.age = "Age must be at least 11 years";

    if (formData.workoutHours === "" || formData.workoutHours < 0)
      newErrors.workoutHours = "Please enter valid workout hours";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateResults = () => {
    const weight = parseFloat(formData.weight);
    const heightCm = parseFloat(formData.height);
    const heightM = heightCm / 100;
    const age = parseInt(formData.age);
    const workoutHoursInput = parseFloat(formData.workoutHours);

    if (!validate()) {
      setResults(null);
      return;
    }

    const bmi = weight / (heightM * heightM);

    let weightStatus = "";
    let bmiExplanation = "";
    let workoutSuggestion = "";
    let suggestedWorkoutHours = workoutHoursInput;

    if (bmi < 18.5) {
      weightStatus = "Underweight";
      bmiExplanation =
        "You are below the ideal weight range. Consider a nutritious calorie surplus.";
      workoutSuggestion =
        "Suggested workout: Focus on strength training about 2 hours per week.";
    } else if (bmi < 25) {
      weightStatus = "Ideal weight";
      bmiExplanation =
        "Your weight is within the ideal range. Maintain your healthy lifestyle.";
      workoutSuggestion =
        workoutHoursInput > 0
          ? `Suggested workout: Maintain your current activity level of ${workoutHoursInput} hours per week.`
          : "Suggested workout: Aim for at least 3 hours of moderate exercise per week.";
    } else {
      weightStatus = "Overweight";
      bmiExplanation =
        "You are above the ideal weight range. Consider regular exercise and balanced diet.";
      if (workoutHoursInput > 0) {
        workoutSuggestion = `Suggested workout: Maintain your current activity level of ${workoutHoursInput} hours per week.`;
      } else {
        suggestedWorkoutHours = 5;
        workoutSuggestion =
          "Suggested workout: Aim for about 5 hours of moderate exercise per week to improve your health.";
      }
    }

    const minIdealWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxIdealWeight = (24.9 * heightM * heightM).toFixed(1);

    let activityFactor = 1.2;
    if (suggestedWorkoutHours >= 8) activityFactor = 1.55;
    else if (suggestedWorkoutHours >= 4) activityFactor = 1.375;

    const bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    const calories = Math.round(bmr * activityFactor);

    setResults({
      bmi: bmi.toFixed(1),
      weightStatus,
      bmiExplanation,
      calories,
      workoutSuggestion,
      minIdealWeight,
      maxIdealWeight,
      workoutHours: suggestedWorkoutHours,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResults();
  };

  const handleReset = () => {
    setFormData({
      weight: "",
      height: "",
      age: "",
      workoutHours: 0,
    });
    setErrors({});
    setResults(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div
          className="w-full md:w-1/2 p-8 flex flex-col"
          style={{ height: "600px" }}
        >
          {!results && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full justify-between"
              noValidate
            >
              <div>
                <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
                  Calorie Calculator
                </h2>

                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <FaWeight className="text-green-600" /> Weight (kg)
                    <FaInfoCircle
                      title="Enter your weight in kilograms."
                      className="text-gray-400 cursor-help"
                    />
                  </label>
                  <input
                    type="number"
                    min="40"
                    step="any"
                    placeholder="e.g. 70"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className={`${inputBaseClasses} border-gray-300 ${
                      errors.weight ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.weight ? "true" : "false"}
                  />
                  <p className="text-red-600 text-sm min-h-[1.25rem] mt-1">
                    {errors.weight || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <FaRulerVertical className="text-green-600" /> Height (cm)
                    <FaInfoCircle
                      title="Enter your height in centimeters."
                      className="text-gray-400 cursor-help"
                    />
                  </label>
                  <input
                    type="number"
                    min="120"
                    max="300"
                    step="any"
                    placeholder="e.g. 175"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    className={`${inputBaseClasses} border-gray-300 ${
                      errors.height ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.height ? "true" : "false"}
                  />
                  <p className="text-red-600 text-sm min-h-[1.25rem] mt-1">
                    {errors.height || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <FaBirthdayCake className="text-green-600" /> Age
                    <FaInfoCircle
                      title="Enter your age in years."
                      className="text-gray-400 cursor-help"
                    />
                  </label>
                  <input
                    type="number"
                    min="11"
                    max="120"
                    placeholder="e.g. 30"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className={`${inputBaseClasses} border-gray-300 ${
                      errors.age ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.age ? "true" : "false"}
                  />
                  <p className="text-red-600 text-sm min-h-[1.25rem] mt-1">
                    {errors.age || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="workoutHours"
                    className="flex items-center gap-2 font-medium text-gray-700 mb-2"
                  >
                    <FaRunning className="text-green-600" /> Workout Hours per Week:{" "}
                    <span className="font-semibold">{formData.workoutHours}</span>
                    <FaInfoCircle
                      title="Select the number of hours you work out per week."
                      className="text-gray-400 cursor-help"
                    />
                  </label>
                  <input
                    id="workoutHours"
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={formData.workoutHours}
                    onChange={(e) =>
                      setFormData({ ...formData, workoutHours: e.target.value })
                    }
                    className="w-full"
                  />
                  {errors.workoutHours && (
                    <p className="text-red-600 text-sm min-h-[1.25rem] mt-1">
                      {errors.workoutHours}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-button text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                Calculate
              </button>
            </form>
          )}

          {results && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
                  Your Results
                </h2>

                <div className="bg-green-50 p-4 rounded-lg space-y-3 border border-green-200 shadow-md text-sm">
                  <p className="text-green-800 font-bold">
                    BMI:{" "}
                    <span className="font-normal">
                      {results.bmi} ({results.weightStatus})
                    </span>
                  </p>
                  <p className="text-green-900 font-normal">{results.bmiExplanation}</p>

                  <p className="text-green-800 font-bold">
                    Daily Calorie Intake:{" "}
                    <span className="font-normal">{results.calories} kcal</span>
                  </p>

                  <p className="text-green-800 font-bold">Workout Suggestion:</p>
                  <p className="text-green-900 font-normal">{results.workoutSuggestion}</p>

                  <p className="text-green-800 font-bold">Ideal Weight Range for your height:</p>
                  <p className="text-green-900 font-normal">
                    {results.minIdealWeight} kg - {results.maxIdealWeight} kg
                  </p>

                  <p className="text-green-800 font-bold">Workout Hours per Week:</p>
                  <p className="text-green-900 font-normal">{results.workoutHours}</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 w-full bg-button text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                Calculate Again
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-green-50 flex items-center justify-center p-8">
          <img
            src="/images/Consultations/workout.svg"
            alt="Fitness Illustration"
            className="w-3/4 md:w-full max-w-sm transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
