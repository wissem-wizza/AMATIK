import { useCreateAnnonceMutation } from "../../features/product/annonceApi";
import { useState } from "react";

function AnnonceForm({ className }) {
  const [centre, setCentre] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [nature, setNature] = useState("");
  const [poids, setPoids] = useState(0);
  const [createAnnonce, { isLoading }] = useCreateAnnonceMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const annonce = { centre, quantity, nature, poids };
    createAnnonce({
      client_id: "63f671728d63429e7d6df20c", //provisoire
      centre_ramassage: centre,
      quantite_animeaux: quantity,
      nature: nature,
      poids: poids,
    });
    // createAnnonce(annonce);
    // createAnnonce({ centre, quantity, nature, poids }).then(() => {
    setCentre("");
    setQuantity(0);
    setNature("");
    setPoids(0);
    // });
  };

  const canSave = poids && quantity && Boolean(centre) && Boolean(nature); //for strings not numbers

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label>
        centre de ramassage:
        <input
          type="text"
          value={centre}
          onChange={(event) => setCentre(event.target.value)}
        />
      </label>
      <label>
        quantite animeaux:
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </label>
      <label>
        nature:
        <input
          type="text"
          value={nature}
          onChange={(event) => setNature(event.target.value)}
        />
      </label>
      <label>
        Poids:
        <input
          type="number"
          value={poids}
          onChange={(event) => setPoids(event.target.value)}
        />
      </label>
      <button type="submit" disabled={isLoading || !canSave}>
        {isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

export default AnnonceForm;
