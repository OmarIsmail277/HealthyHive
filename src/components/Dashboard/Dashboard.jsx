// Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import {
  FaFire,
  FaChartLine,
  FaPlus,
  FaTrash,
  FaWater,
  FaAppleAlt,
  FaWeight,
  FaDumbbell,
  FaHeartbeat,
  FaClock,
  FaTrophy,
  FaMoon,
  FaWalking,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

/** Dashboard (previously ProfileDashboard)
 *  - Fixed overflow in scrollable lists (added overflow-y-auto, min-w-0, pr-1)
 *  - Prevented horizontal scrolling (overflow-hidden on cards, min-w-0 on flex items)
 *  - Clamped/truncated long text safely
 */
export default function Dashboard() {
  // ---------- LocalStorage helpers ----------
  const getLS = (k, fallback) => {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  };
  const setLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // ---------- Utils ----------
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const toISO = (d) => new Date(d).toISOString().slice(0, 10);
  const addDays = (iso, delta) => {
    const d = new Date(iso);
    d.setDate(d.getDate() + delta);
    return toISO(d);
  };
  const lastNDates = (n, endISO = todayISO()) => {
    const arr = [];
    for (let i = n - 1; i >= 0; i--) arr.push(addDays(endISO, -i));
    return arr;
  };

  // ---------- Profile ----------
  const [profile, setProfile] = useState(
    getLS("hh_profile", {
      name: "Alex Green",
      email: "alex.green@example.com",
      location: "Cairo, EG",
      bio: "Fueling my body with real food, movement, and sunlight 🌿",
      heightCm: 178,
      weightKg: 76,
      goalWeightKg: 72,
      weeklyGoal: "Workout 4x / week",
      workoutFrequency: 4,
      notifications: true,
    })
  );
  const [workoutLogDay, setWorkoutLogDay] = useState(todayISO());
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(profile.bio);

  useEffect(() => setLS("hh_profile", profile), [profile]);

  // ---------- Weight logs ----------
  const [weights, setWeights] = useState(
    getLS("hh_weights", [
      { id: "w1", dateISO: addDays(todayISO(), -6), weightKg: 76.8 },
      { id: "w2", dateISO: addDays(todayISO(), -3), weightKg: 76.1 },
      { id: "w3", dateISO: todayISO(), weightKg: 76.0 },
    ])
  );
  useEffect(() => setLS("hh_weights", weights), [weights]);

  // ---------- Workouts ----------
  const [workouts, setWorkouts] = useState(getLS("hh_workouts", []));
  useEffect(() => setLS("hh_workouts", workouts), [workouts]);

  // ---------- Hydration ----------
  const [hydration, setHydration] = useState(
    getLS("hh_hydration", { goalGlasses: 8, byDate: {} })
  );

  // ---------- Nutrition ----------
  const [meals, setMeals] = useState(getLS("hh_meals", []));

  // ---------- Habits ----------
  const [habits, setHabits] = useState(
    getLS("hh_habits", {
      list: [
        { id: "h1", name: "Morning stretch", iconName: "FaWalking" },
        { id: "h2", name: "Meditation", iconName: "FaAppleAlt" },
        { id: "h3", name: "Sleep 7+ hours", iconName: "FaMoon" },
        { id: "h4", name: "Lights out by 11", iconName: "FaMoon" },
      ],
      byDate: {},
    })
  );

  // Reset all daily trackers when log day changes
  useEffect(() => {
    setWorkouts([]);
    setHydration((h) => ({ ...h, byDate: {} }));
    setMeals([]);
    setHabits((h) => ({ ...h, byDate: {} }));
  }, [workoutLogDay]);

  useEffect(() => setLS("hh_hydration", hydration), [hydration]);
  useEffect(() => setLS("hh_meals", meals), [meals]);
  useEffect(() => setLS("hh_habits", habits), [habits]);

  // ---------- Derived ----------
  const workoutDates = useMemo(
    () => Array.from(new Set(workouts.map((w) => w.dateISO))).sort(),
    [workouts]
  );

  const streak = useMemo(() => {
    if (workoutDates.length === 0) return 0;
    let count = 0;
    let cursor = workoutLogDay;
    if (
      !workoutDates.includes(cursor) &&
      workoutDates.includes(addDays(cursor, -1))
    ) {
      cursor = addDays(cursor, -1);
    }
    while (workoutDates.includes(cursor)) {
      count++;
      cursor = addDays(cursor, -1);
    }
    return count;
  }, [workoutDates, workoutLogDay]);

  const last7 = lastNDates(7, workoutLogDay);
  const workoutsLast7 = workouts.filter((w) => last7.includes(w.dateISO));
  const minutesLast7 = workoutsLast7.reduce(
    (a, b) => a + (b.durationMin || 0),
    0
  );
  const sessionsLast7 = workoutsLast7.length;

  const mets = {
    Run: 9.8,
    Lift: 6.0,
    Yoga: 3.0,
    Cycle: 7.5,
    HIIT: 10.0,
    Walk: 3.8,
  };
  const calBurnedLast7 = workoutsLast7.reduce((sum, w) => {
    const met = mets[w.type] || 5;
    const hours = (w.durationMin || 0) / 60;
    return sum + met * (profile.weightKg || 70) * hours;
  }, 0);

  const todayMeals = meals.filter((m) => m.dateISO === workoutLogDay);
  const totalsToday = todayMeals.reduce(
    (acc, m) => {
      acc.calories += Number(m.calories || 0);
      acc.protein += Number(m.protein || 0);
      acc.carbs += Number(m.carbs || 0);
      acc.fat += Number(m.fat || 0);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const waterToday = hydration.byDate[workoutLogDay]?.count || 0;

  const achievements = useMemo(() => {
    const arr = [];
    if (streak >= 3)
      arr.push({ key: "streak3", icon: <FaFire />, label: "3-Day Streak" });
    if (streak >= 7)
      arr.push({ key: "streak7", icon: <FaFire />, label: "7-Day Streak" });
    if (sessionsLast7 >= profile.workoutFrequency)
      arr.push({
        key: "consistency",
        icon: <FaTrophy />,
        label: "Weekly Consistency",
      });
    if (minutesLast7 >= 150)
      arr.push({
        key: "who150",
        icon: <FaHeartbeat />,
        label: "150+ min this week",
      });
    if (waterToday >= hydration.goalGlasses)
      arr.push({ key: "hydration", icon: <FaWater />, label: "Hydrated Hero" });
    if (totalsToday.protein >= 100)
      arr.push({
        key: "protein",
        icon: <FaAppleAlt />,
        label: "100g Protein Day",
      });
    return arr;
  }, [
    streak,
    sessionsLast7,
    minutesLast7,
    waterToday,
    hydration.goalGlasses,
    totalsToday,
    profile.workoutFrequency,
  ]);

  // ---------- Handlers ----------
  const [quick, setQuick] = useState({
    type: "Run",
    durationMin: 30,
    notes: "",
  });
  const addWorkout = () => {
    const id = crypto.randomUUID();
    setWorkouts((w) => [
      ...w,
      {
        id,
        dateISO: workoutLogDay,
        type: quick.type,
        durationMin: Number(quick.durationMin || 0),
        notes: quick.notes?.trim() || "",
      },
    ]);
    setQuick((q) => ({ ...q, notes: "" }));
  };
  const removeWorkout = (id) =>
    setWorkouts((w) => w.filter((x) => x.id !== id));

  const incWater = () =>
    setHydration((h) => {
      const by = { ...(h.byDate || {}) };
      const c = by[workoutLogDay]?.count || 0;
      by[workoutLogDay] = { count: c + 1 };
      return { ...h, byDate: by };
    });
  const decWater = () =>
    setHydration((h) => {
      const by = { ...(h.byDate || {}) };
      const c = by[workoutLogDay]?.count || 0;
      by[workoutLogDay] = { count: Math.max(0, c - 1) };
      return { ...h, byDate: by };
    });

  const [mealDraft, setMealDraft] = useState({
    name: "Chicken & rice",
    calories: 520,
    protein: 35,
    carbs: 55,
    fat: 16,
  });
  const addMeal = () => {
    const id = crypto.randomUUID();
    setMeals((m) => [
      ...m,
      {
        id,
        dateISO: workoutLogDay,
        name: String(mealDraft.name || "Meal"),
        calories: Number(mealDraft.calories || 0),
        protein: Number(mealDraft.protein || 0),
        carbs: Number(mealDraft.carbs || 0),
        fat: Number(mealDraft.fat || 0),
      },
    ]);
  };
  const removeMeal = (id) => setMeals((m) => m.filter((x) => x.id !== id));

  const toggleHabit = (habitId) =>
    setHabits((h) => {
      const by = { ...(h.byDate || {}) };
      const row = { ...(by[workoutLogDay] || {}) };
      row[habitId] = !row[habitId];
      by[workoutLogDay] = row;
      return { ...h, byDate: by };
    });

  const [weightInput, setWeightInput] = useState(profile.weightKg || 76);
  const addWeight = () => {
    const id = crypto.randomUUID();
    setWeights((ws) => [
      ...ws.filter((w) => w.dateISO !== todayISO()),
      { id, dateISO: todayISO(), weightKg: Number(weightInput) },
    ]);
    setProfile((p) => ({ ...p, weightKg: Number(weightInput) }));
  };
  const removeWeight = (id) =>
    setWeights((ws) => ws.filter((w) => w.id !== id));

  const startEditingBio = () => {
    setBioDraft(profile.bio);
    setIsEditingBio(true);
  };
  const saveBio = () => {
    setProfile((p) => ({ ...p, bio: bioDraft }));
    setIsEditingBio(false);
  };
  const cancelEditingBio = () => setIsEditingBio(false);

  const handleWorkoutFrequencyChange = (e) => {
    const frequency = parseInt(e.target.value);
    setProfile((p) => ({
      ...p,
      workoutFrequency: frequency,
      weeklyGoal: `Workout ${frequency}x / week`,
    }));
  };

  // ---------- Sparklines ----------
  const sparklinePath = (points, width = 160, height = 40, pad = 4) => {
    if (!points.length) return "";
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs);
    const minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const rx = maxX - minX || 1,
      ry = maxY - minY || 1;
    const sx = (x) => pad + ((x - minX) / rx) * (width - pad * 2);
    const sy = (y) => height - pad - ((y - minY) / ry) * (height - pad * 2);
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)},${sy(p.y)}`)
      .join(" ");
  };

  const last14 = lastNDates(14, workoutLogDay);
  const minByDay = last14.map((d, i) => ({
    x: i,
    y: workouts
      .filter((w) => w.dateISO === d)
      .reduce((a, b) => a + (b.durationMin || 0), 0),
  }));
  const weightSeries = useMemo(() => {
    const sorted = [...weights].sort((a, b) =>
      a.dateISO.localeCompare(b.dateISO)
    );
    return sorted.map((w, i) => ({ x: i, y: w.weightKg }));
  }, [weights]);

  // ---------- UI helpers ----------
  const card = "bg-white rounded-xl shadow-sm p-5 overflow-hidden";
  const pill = "px-3 py-1 rounded-full text-xs font-medium";
  const input =
    "w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500";
  const btnPrimary =
    "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2";
  const btnSecondary =
    "px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2";

  const HabitIcon = ({ name }) => {
    const map = {
      FaWalking: <FaWalking />,
      FaAppleAlt: <FaAppleAlt />,
      FaMoon: <FaMoon />,
    };
    return map[name] || <FaCheckCircle />;
  };

  return (
    <div className="space-y-5 min-w-0">
      {/* About Me */}
      <section className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 items-start min-w-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-md font-semibold text-gray-900">About Me</h2>
              {!isEditingBio ? (
                <button
                  onClick={startEditingBio}
                  className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1 px-2 py-1 rounded bg-green-50"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-1">
                  <button
                    onClick={saveBio}
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditingBio}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            {isEditingBio ? (
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm h-20"
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-700 line-clamp-3 break-words">
                {profile.bio || "No bio added yet"}
              </p>
            )}
          </div>

          <div className="w-full md:w-2/5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Workouts/week
              </label>
              <select
                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                value={profile.workoutFrequency}
                onChange={handleWorkoutFrequencyChange}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num}x
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Log day
              </label>
              <input
                type="date"
                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                value={workoutLogDay}
                onChange={(e) => setWorkoutLogDay(e.target.value)}
                max={todayISO()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-0">
        {/* Col 1 */}
        <div className="space-y-5 min-w-0">
          {/* Streak */}
          <div className={card}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaFire className="text-orange-500" /> Workout Streak
              </h2>
            </div>

            {/* Quick Log */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
              <div className="relative sm:col-span-2">
                <select
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-8"
                  value={quick.type}
                  onChange={(e) =>
                    setQuick((q) => ({ ...q, type: e.target.value }))
                  }
                >
                  {["Run", "Lift", "Yoga", "Cycle", "HIIT", "Walk"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <input
                type="number"
                className={`${input} sm:col-span-2 text-sm`}
                value={quick.durationMin}
                min={5}
                step={5}
                onChange={(e) =>
                  setQuick((q) => ({ ...q, durationMin: e.target.value }))
                }
                placeholder="Minutes"
              />
              <input
                type="text"
                className={`${input} sm:col-span-4 text-sm`}
                value={quick.notes}
                onChange={(e) =>
                  setQuick((q) => ({ ...q, notes: e.target.value }))
                }
                placeholder="Notes"
              />
              <button
                onClick={addWorkout}
                className={`${btnPrimary} sm:col-span-4 text-sm`}
              >
                <FaPlus size={14} /> Log Workout
              </button>
            </div>

            {/* Activity Graph */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <FaChartLine /> Minutes
                </div>
                <div className="text-sm text-gray-600">
                  {minutesLast7} min · {sessionsLast7} sessions
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-md">
                <svg
                  width="100%"
                  height="48"
                  viewBox="0 0 160 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d={sparklinePath(minByDay)}
                    fill="none"
                    stroke="currentColor"
                    className="text-emerald-500"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Recent Workouts
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 overscroll-contain">
                {[...workouts]
                  .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
                  .slice(0, 5)
                  .map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 min-w-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`${pill} bg-emerald-100 text-emerald-700 flex-shrink-0`}
                        >
                          {w.type}
                        </span>
                        <span className="text-sm text-gray-800 flex-shrink-0">
                          {w.durationMin} min
                        </span>
                        {w.notes && (
                          <span className="text-xs text-gray-600 truncate max-w-[140px]">
                            "{w.notes}"
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeWorkout(w.id)}
                        className="p-1 rounded hover:bg-red-50 text-red-500 flex-shrink-0"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Hydration */}
          <div className={card}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaWater className="text-blue-500" /> Hydration
              </h2>
              <span className={`${pill} bg-blue-100 text-blue-700`}>
                Goal: {hydration.goalGlasses} glasses
              </span>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {waterToday}
              </div>
              <div className="text-sm text-gray-600">glasses today</div>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
              {[4, 8, 12].map((goal) => (
                <button
                  key={goal}
                  onClick={() =>
                    setHydration((h) => ({ ...h, goalGlasses: goal }))
                  }
                  className={`px-3 py-1 rounded-full text-sm ${
                    hydration.goalGlasses === goal
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {goal} glasses
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={decWater}
                className={`${btnSecondary} px-3 py-2 text-sm`}
              >
                − Remove
              </button>
              <button
                onClick={incWater}
                className={`${btnPrimary} px-3 py-2 text-sm`}
              >
                + Add Glass
              </button>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-5 min-w-0">
          {/* Nutrition */}
          <div className={card}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaAppleAlt className="text-red-500" /> Nutrition
              </h2>
              <div className="flex items-center gap-2">
                <span className={`${pill} bg-orange-100 text-orange-700`}>
                  {totalsToday.calories} kcal
                </span>
              </div>
            </div>

            {/* Macro Bars */}
            <div className="space-y-3 mb-4">
              <MacroBar
                label="Protein"
                value={totalsToday.protein}
                goal={120}
                color="bg-blue-500"
              />
              <MacroBar
                label="Carbs"
                value={totalsToday.carbs}
                goal={200}
                color="bg-yellow-500"
              />
              <MacroBar
                label="Fat"
                value={totalsToday.fat}
                goal={70}
                color="bg-red-500"
              />
              <MacroBar
                label="Calories"
                value={totalsToday.calories}
                goal={2200}
                color="bg-orange-500"
              />
            </div>

            {/* Add Meal */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              {/* Meal name - full width */}
              <input
                className={`${input} text-sm`}
                placeholder="Meal name"
                value={mealDraft.name}
                onChange={(e) =>
                  setMealDraft((d) => ({ ...d, name: e.target.value }))
                }
              />

              {/* 4 nutrient inputs in 2 rows */}
              <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    className={`${input} text-sm`}
                    placeholder="Protein"
                    value={mealDraft.protein}
                    onChange={(e) =>
                      setMealDraft((d) => ({ ...d, protein: e.target.value }))
                    }
                  />
                <input
                  type="number"
                  className={`${input} text-sm`}
                  placeholder="Carbs"
                  value={mealDraft.carbs}
                  onChange={(e) =>
                    setMealDraft((d) => ({ ...d, carbs: e.target.value }))
                }
                />
                <input
                  type="number"
                  className={`${input} text-sm`}
                  placeholder="Fat"
                  value={mealDraft.fat}
                  onChange={(e) =>
                    setMealDraft((d) => ({ ...d, fat: e.target.value }))
                }
                />
                <input
                  type="number"
                  className={`${input} text-sm`}
                  placeholder="kcal"
                  value={mealDraft.calories}
                  onChange={(e) =>
                    setMealDraft((d) => ({ ...d, calories: e.target.value }))
                  }
                />
              </div>

              {/* Button - full width */}
              <button onClick={addMeal} className={`${btnPrimary} text-sm`}>
                <FaPlus size={14} /> Add Meal
              </button>
            </div>

            {/* Meals List */}
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Today's Meals
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 overscroll-contain">
                {todayMeals.length === 0 ? (
                  <div className="text-sm text-gray-500 p-3 text-center">
                    No meals logged today
                  </div>
                ) : (
                  [...todayMeals]
                    .sort((a, b) => b.calories - a.calories)
                    .map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 min-w-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                            {m.name}
                          </span>
                          <span className="text-xs text-gray-600 flex-shrink-0">
                            {m.calories} kcal
                          </span>
                          <span className="text-xs text-blue-600 flex-shrink-0">
                            {m.protein}P
                          </span>
                        </div>
                        <button
                          onClick={() => removeMeal(m.id)}
                          className="p-1 rounded hover:bg-red-50 text-red-500 flex-shrink-0"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>

          {/* Weight Tracking */}
          <div className={card}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaWeight className="text-purple-500" /> Weight Tracking
              </h2>
              <span className="text-sm text-gray-600">
                {weights.length} entries
              </span>
            </div>

            <div className="w-full overflow-hidden rounded-md mb-4">
              <svg
                width="100%"
                height="60"
                viewBox="0 0 160 60"
                preserveAspectRatio="none"
              >
                <path
                  d={sparklinePath(weightSeries, 160, 60)}
                  fill="none"
                  stroke="currentColor"
                  className="text-purple-500"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Add Weight */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="number"
                className={`${input} text-sm`}
                value={weightInput}
                min={20}
                max={400}
                step={0.1}
                onChange={(e) => setWeightInput(e.target.value)}
              />
              <button
                onClick={addWeight}
                className={`${btnPrimary} flex-1 text-sm`}
              >
                <FaPlus size={14} /> Log
              </button>
            </div>

            {/* Weight History */}
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Recent Weights
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 overscroll-contain">
                {weights.length === 0 ? (
                  <div className="text-sm text-gray-500 p-3 text-center">
                    No weight entries
                  </div>
                ) : (
                  [...weights]
                    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
                    .map((w) => (
                      <div
                        key={w.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 min-w-0"
                      >
                        <div className="text-sm text-gray-800 truncate">
                          {w.dateISO}:{" "}
                          <span className="font-medium">{w.weightKg} kg</span>
                        </div>
                        <button
                          onClick={() => removeWeight(w.id)}
                          className="p-1 rounded hover:bg-red-50 text-red-500 flex-shrink-0"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Col 3 */}
        <div className="space-y-5 min-w-0">
          {/* Weekly Stats */}
          <div className={card}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaBolt className="text-yellow-500" /> Daily Stats
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {/* Row 1: first two cards share the row equally */}
              <StatCard
                icon={<FaClock className="text-blue-500 text-3xl" />}
                label="Minutes"
                value={minutesLast7}
              />
              <StatCard
                icon={<FaDumbbell className="text-emerald-500 text-3xl" />}
                label="Sessions"
                value={sessionsLast7}
              />

              {/* Row 2: spans both columns */}
              <div className="col-span-2">
                <StatCard
                  icon={<FaHeartbeat className="text-red-500 text-3xl" />}
                  label="Calories Burned"
                  value={Math.round(calBurnedLast7)}
                />
              </div>
            </div>
          </div>

          {/* Habits */}
          <div className={card}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Daily Habits
              </h2>
              <span className={`${pill} bg-gray-100 text-gray-700`}>
                {
                  Object.values(habits.byDate[workoutLogDay] || {}).filter(
                    Boolean
                  ).length
                }
                /{habits.list.length}
              </span>
            </div>

            <div className="space-y-3">
              {habits.list.map((h) => {
                const checked = !!(
                  habits.byDate[workoutLogDay] &&
                  habits.byDate[workoutLogDay][h.id]
                );
                return (
                  <div
                    key={h.id}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      checked ? "bg-green-50" : "bg-gray-50"
                    } min-w-0`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          checked
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <HabitIcon name={h.iconName} />
                      </div>
                      <span className="text-sm font-medium text-gray-800 break-words">
                        {h.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleHabit(h.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        checked
                          ? "bg-green-600 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {checked ? "Done" : "Mark"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className={card}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaTrophy className="text-yellow-500" /> Achievements
              </h2>
            </div>

            {achievements.length === 0 ? (
              <div className="text-sm text-gray-500 p-4 text-center bg-gray-50 rounded-lg">
                Complete more activities to unlock achievements!
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a) => (
                  <div
                    key={a.key}
                    className="p-3 rounded-lg bg-gray-50  items-center "
                  >
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                      {a.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800 break-words">
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-1 rounded-lg bg-gray-50 flex items-center gap-1">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm text-gray-500 truncate">{label}</div>
        <div className="text-lg font-bold text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}

function MacroBar({ label, value, goal, color }) {
  const pct = Math.max(
    0,
    Math.min(100, Math.round((value / Math.max(1, goal)) * 100))
  );
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
        <span className="truncate">{label}</span>
        <span className="flex-shrink-0">
          {value}/{goal}
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-2 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
