import { createHealthStatus } from "../actions";

export default function NewHealthStatusPage() {
  return (
    <form action={createHealthStatus}>
      <h1>Log Health Status</h1>

      <label>
        Weight (kg)
        <input type="number" step="0.1" name="weight" />
      </label>

      <label>
        Blood Pressure
        <input type="text" name="bloodPressure" placeholder="e.g. 120/80" />
      </label>

      <label>
        Blood Sugar
        <input type="number" step="0.1" name="bloodSugar" />
      </label>

      <label>
        Temperature (°C)
        <input type="number" step="0.1" name="temperature" />
      </label>

      <label>
        Condition / Notes
        <textarea name="condition"></textarea>
      </label>

      <button type="submit">Save Entry</button>
    </form>
  );
}
