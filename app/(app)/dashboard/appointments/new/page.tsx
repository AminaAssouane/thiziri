import { addAppointment } from "../actions";

export default async function NewAppointmentPage() {
  return (
    <form action={addAppointment}>
      <h1>Add new appointment</h1>
      <label>
        Doctor name : <input type="text" name="doctorName" required />
      </label>
      <label>
        Specialty : <input type="text" name="specialty" required />
      </label>
      <label>
        Date : <input type="date" name="date" required />
      </label>
      <label>
        Location : <input type="text" name="location" required />
      </label>
      <label>
        Reason : <input type="text" name="reason" required />
      </label>
      <label>
        Notes : <textarea name="notes"></textarea>
      </label>
      <label>
        Status :{" "}
        <select name="status">
          <option value="UPCOMING">Upcoming</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
