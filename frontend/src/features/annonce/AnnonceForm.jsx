import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyButton } from "./Annonce.style";
// import styled from "styled-components";

import { annoncePost } from "./annonceSlice";
import { selectAllEspeces } from "../especes/especeSlice";
// import { currentUser } from "./usersSlice";

const AnnonceForm = () => {
  const dispatch = useDispatch();

  const [poids, setPoids] = useState(0);
  const [quantite, setQuantite] = useState(0);
  const [commentaire, setCommentaire] = useState(0);
  const [especeID, setEspeceID] = useState(0);

  const especes = useSelector(selectAllEspeces);

  const onPoidsChange = (e) => setPoids(e.target.value);
  const onQuantiteChange = (e) => setQuantite(e.target.value);
  const onCommentChange = (e) => setCommentaire(e.target.value);
  const onEspecesChange = (e) => setEspeceID(e.target.value);

  const canSave = Boolean(poids) && Boolean(quantite) && Boolean(especeID);

  const EspecesOptions = especes.map((espece) => (
    <option key={espece.id} value={espece.id}>
      {espece.espece}
    </option>
  ));

  const handleValider = () => {
    dispatch(annoncePost(especeID, poids, quantite, commentaire));
    //select combo ""
    setPoids(0);
    setQuantite(0);
    setCommentaire(0);
  };

  return (
    <div>
      <form>
        <label htmlFor="Espece">Espece:</label>
        <select id="Espece" value={especeID} onChange={onEspecesChange}>
          <option value=""></option>
          {EspecesOptions}
        </select>
        <label htmlFor="Poids">Poids:</label>
        <input
          type="number"
          id="Poids"
          name="poids"
          value={poids}
          onChange={onPoidsChange}
        />
        <label htmlFor="Quantite"></label>
        <input
          type="tel"
          id="Quantite"
          name="quantite"
          value={quantite}
          onChange={onQuantiteChange}
        />
        <label htmlFor="Commentaire">Commentaire logistique</label>
        <textarea
          id="Commentaire"
          name="commentaire"
          value={commentaire}
          onChange={onCommentChange}
        />
        <button type="button" onClick={handleValider} disabled={!canSave}>
          Valider
        </button>
      </form>
      <MyButton>test</MyButton>
    </div>
  );
};

export default AnnonceForm;
