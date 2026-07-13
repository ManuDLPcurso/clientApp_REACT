import { useState } from "react";
import { Router } from "react-router";
import { ClientService } from "../services/ClientService";
import { useHistory } from 'react-router-dom';


export default function AddPage() {
  const [getClient, setClient] = useState({ name: "", email: "", phone: "" });
  const save = async() => await ClientService.addClient(getClient);  
  const navigate = useHistory();

  return (
    <div>
      <h2>Nuevo cliente</h2>

      <input
        onChange={(e) => setClient({ ...getClient, name: e.target.value })}
      />
      <input
        onChange={(e) => setClient({ ...getClient, email: e.target.value })}
      />
      <input
        onChange={(e) => setClient({ ...getClient, phone: e.target.value })}
      />
      <button onClick={save}>Guardar</button>

    </div>
  );
}
