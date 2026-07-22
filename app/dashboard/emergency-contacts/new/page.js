import { createEmergencyContact } from "../actions";

export default function NewEmergencyContact() {
  return (
    <form action={createEmergencyContact}>
      <h1>Add new emergency contact</h1>
      <label>
        Name : <input name="name" type="text" required />
      </label>
      <label>
        Phone number : <input name="phone" type="tel" required />
      </label>
      <label>
        Email : <input name="email" type="email"></input>
      </label>
      <label>
        Relationship : <input name="relationship" type="text" />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
