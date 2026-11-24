import { useState } from "react";
import { TicketPriority } from "../types/TicketPriority";

interface TicketFormProps {
  onCreate: (
    title: string,
    description: string,
    priority: TicketPriority,
  ) => Promise<boolean>;
}

function TicketForm({ onCreate }: TicketFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TicketPriority>(
    TicketPriority.Low,
  );

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const success = await onCreate(title, description, priority);

    if (success) {
      setTitle("");
      setDescription("");
      setPriority(TicketPriority.Low);
    }
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(Number(e.target.value) as TicketPriority)
        }
      >
        <option value={TicketPriority.Low}>Low</option>
        <option value={TicketPriority.Medium}>Medium</option>
        <option value={TicketPriority.High}>High</option>
      </select>

      <button type="submit">Create</button>
    </form>
  );
}

export default TicketForm;