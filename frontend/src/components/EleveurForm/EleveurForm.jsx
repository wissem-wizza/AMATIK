import {
  useGetEleveurByIdQuery,
  //   useCreateEleveurMutation,
} from "../../features/eleveur/eleveurApi";
import { useState } from "react";
import { MODE_REGLEMENT } from "../../data/constants";
// import {
//   StyledButton,
//   StyledSlidingDiv,
//   StyledContainer,
//   Second,
// } from "./EleveurForm.style";

const EleveurForm = ({ eleveur_id }) => {
  const [isShown, setIsShown] = useState(false);
  // console.log(isShown);
  // const eleveur_id = props.eleveur_id;
  // console.log("eleveurForm", eleveur_id);
  const { data: eleveur } = useGetEleveurByIdQuery(eleveur_id);
  // console.log(eleveur);
  // console.log(MODE_REGLEMENT);
  // console.log(eleveur.REGLEMENT);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleClick = () => {
    setIsShown(!isShown);
  };

  //   const [centre, setCentre] = useState("");
  //   const [quantity, setQuantity] = useState(0);
  //   const [nature, setNature] = useState("");
  //   const [poids, setPoids] = useState(0);
  //   const [createEleveur, { isLoading }] = useCreateEleveurMutation();

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // const eleveur = { centre, quantity, nature, poids };
  //     createEleveur({
  //       client_id: "63f671728d63429e7d6df20c", //provisoire
  //       centre_ramassage: centre,
  //       quantite_animeaux: quantity,
  //       nature: nature,
  //       poids: poids,
  //     });
  //     // createEleveur(eleveur);
  //     // createEleveur({ centre, quantity, nature, poids }).then(() => {
  //     setCentre("");
  //     setQuantity(0);
  //     setNature("");
  //     setPoids(0);
  //     // });
  //   };

  //   const canSave = poids && quantity && Boolean(centre) && Boolean(nature); //for strings not numbers

  return (
    <div className="StyledContainer">
      <div className="StyledButton" onChange={handleClick}>
        a
      </div>
      <div className="StyledSlidingDiv">
        {/* className={isShown ? "show" : ""} */}
        <form className={eleveur_id} onSubmit={handleSubmit}>
          <label htmlFor="compt">
            Adresse comptable
            <input
              type="text"
              defaultValue={eleveur && eleveur.ADRESSES[0]}
              id="compt"
            />
            <input
              type="text"
              defaultValue={eleveur && eleveur.ADRESSES[1]}
              id="compt"
            />
            <input
              type="text"
              defaultValue={eleveur && eleveur.ADRESSES[2]}
              id="compt"
            />
          </label>
          <br />
          <label htmlFor="livr">
            Adresse de livraison
            <input
              type="text"
              defaultValue={eleveur && eleveur.ADRESSES_LIVRAISON[0]}
              id="livr"
            />
            <input
              type="text"
              defaultValue={eleveur && eleveur.ADRESSES_LIVRAISON[1]}
              id="livr"
            />
            <input
              type="text"
              defaultValue={eleveur && eleveur.ADRESSES_LIVRAISON[2]}
              id="livr"
            />
          </label>
          <br />
          <label htmlFor="comm">Commercial </label>
          <input
            id="comm"
            type="text"
            defaultValue={eleveur && eleveur.COMM_TECHN}
          />
          <br />
          <label htmlFor="group">Groupement </label>
          <input
            id="group"
            type="text"
            defaultValue={eleveur && eleveur.GROUPEMENT}
          />
          <br />
          <label htmlFor="int">Integrateur </label>
          <input
            type="text"
            defaultValue={eleveur && eleveur.INTEGRATEUR}
            id="int"
          />
          <br />
          <input
            type="checkbox"
            id="ngc"
            checked={eleveur && eleveur.NEGOCIANT}
          />
          <label htmlFor="ngc">Négociant</label>
          <br />
          <label htmlFor="adage">Adage </label>
          <input
            type="text"
            defaultValue={eleveur && eleveur.ADAGE}
            id="adage"
          />
          <br />
          <label htmlFor="dprt">Département </label>
          <input
            type="text"
            defaultValue={eleveur && eleveur.DEPARTEMENT}
            id="dprt"
          />
          <br />
          <label htmlFor="cant">Canton </label>
          <input
            id="cant"
            type="text"
            defaultValue={eleveur && eleveur.CODECANTON}
          />
          <br />
          <label htmlFor="comm">Code INSEE </label>
          <input
            id="comm"
            type="text"
            defaultValue={eleveur && eleveur.INSEE}
          />
          <br />
          <label htmlFor="RTVA">Régime TVA </label>
          <input
            id="RTVA"
            type="text"
            defaultValue={eleveur && eleveur.REGIME_TVA}
          />
          <br />
          <label htmlFor="DEV">Devise </label>
          <input
            id="DEV"
            type="text"
            defaultValue={eleveur && eleveur.DEVISE}
          />
          <br />
          <label htmlFor="TVAE">TVA export</label>
          <input
            id="TVAE"
            type="text"
            defaultValue={eleveur && eleveur.TVA_EXPORT}
          />
          <br />
          <label htmlFor="marq">Indicatif de marquage (IMOC)</label>
          <input
            id="marq"
            type="text"
            defaultValue={eleveur && eleveur.marquage}
          />
          <br />
          <label htmlFor="breb">Effectif brebis</label>
          <input
            id="breb"
            type="text"
            defaultValue={eleveur && eleveur.BREBM}
          />
          <br />
          <label htmlFor="tech">Technicien</label>
          <input
            id="tech"
            type="text"
            defaultValue={eleveur && eleveur.COMM_TECHN}
          />
          <br />
          <label htmlFor="tel">Télephone</label>
          <input id="tel" type="tel" defaultValue={eleveur && eleveur.TELEP} />
          <br />
          <label htmlFor="port">Portable</label>
          <input
            id="port"
            type="text"
            defaultValue={eleveur && eleveur.PORTABLE}
          />
          <br />
          <label htmlFor="fax">Fax</label>
          <input id="fax" type="text" defaultValue={eleveur && eleveur.FAX} />
          <br />
          <label htmlFor="mail">E-mail</label>
          <input
            id="mail"
            type="mail"
            defaultValue={eleveur && eleveur.email}
          />
          <br />
          {/* <label htmlFor="chf">Chauffeur</label>
      <input id="chf" type="text" defaultValue={eleveur && eleveur.CODE_CHAUFFEUR} />
      <br />
      <label htmlFor="vif">Centre VIF</label>
      <input id="vif" type="text" defaultValue={eleveur && eleveur.CODE_SITE} />
      <br />
      <label htmlFor="lain">Centre L</label>
      <input id="lain" type="text" defaultValue={eleveur && eleveur.site_laine} />
      <br />
      <label htmlFor="liv">Mode de livraison</label>
      <input id="liv" type="text" defaultValue={eleveur && eleveur.LIVRAISON} />
      <br /> */}
          <label htmlFor="rmq">Remarque</label>
          <textarea name="" id="rmq" cols="30" rows="5">
            {eleveur && eleveur.REMARQUE}
          </textarea>
          <br />
          {/* <input
            type="radio"
            id="laine"
            name="lv"
            checked={eleveur && eleveur.laine === "laine"}
          /> */}
          <label htmlFor="laine">Laine</label>
          <br />
          {/* <input
            type="radio"
            id="viande"
            name="lv"
            checked={eleveur && eleveur.laine === "viande"}
          /> */}
          <label htmlFor="viande">Viande</label>
          <br />
          {/* <input
            type="radio"
            id="deux"
            name="lv"
            checked={eleveur && eleveur.laine === "Les_deux"}
          /> */}
          <label htmlFor="deux">Les deux</label>
          <br />
          <input
            type="checkbox"
            id="pbloq"
            checked={eleveur && eleveur.paiem_bloque}
          />
          <label htmlFor="pbloq">Paiement bloqué</label>
          {/* <input
            type="checkbox"
            id="actif"
            checked={eleveur && eleveur.ACTIF}
            // onChange={(e) => {}}
          /> */}
          <label htmlFor="actif">Actif</label>
          {/* <input
            type="checkbox"
            id="simoc"
            checked={eleveur && !eleveur.pas_envoi_simoc}
            onChange={(e) => {}}
          /> */}
          <label htmlFor="simoc">envoi SIMOC</label>
          <br />
        </form>
      </div>
      <div className="Second">
        <label htmlFor="regl">Mode réglement</label>
        <select id="regl" defaultValue={eleveur && eleveur.REGLEMENT}>
          {MODE_REGLEMENT.map((modreg) => (
            <option key={modreg}>{modreg}</option>
          ))}
        </select>
        <br />
        <label htmlFor="RIB">RIB</label>
        <br />
        <label htmlFor="bank">Banque</label>
        <input id="bank" type="text" defaultValue={eleveur && eleveur.CBANK} />
        <label htmlFor="agc">Agence</label>
        <input id="agc" type="text" defaultValue={eleveur && eleveur.GUICH} />
        <label htmlFor="acc">Compte</label>
        <input id="acc" type="text" defaultValue={eleveur && eleveur.COMPTE} />
        <label htmlFor="cle">Clé</label>
        <input id="cle" type="text" defaultValue={eleveur && eleveur.RIB} />
        <br />
        <label htmlFor="cle">DOMICILIATION</label>
        <input
          id="cle"
          type="text"
          defaultValue={eleveur && eleveur.DOMICILIATION}
        />
        <br />
        <label htmlFor="cle">IBAN</label>
        <input id="cle" type="text" defaultValue={eleveur && eleveur.IBAN} />
        <br />
        <label htmlFor="cle">BIC</label>
        <input id="cle" type="text" defaultValue={eleveur && eleveur.BIC} />
        <br />
        <label htmlFor="cle">N° de compte comptable</label>
        <input id="cle" type="text" defaultValue={eleveur && eleveur.CPT} />
        <br />
        <label htmlFor="cle">N° de compte analytique</label>
        <input id="cle" type="text" defaultValue={eleveur && eleveur.CPTA} />
        <br />
        <label htmlFor="adh">Type</label>
        <br />
        {/* <input
          type="radio"
          id="F"
          name="adh"
          checked={eleveur && eleveur.TYPADH === "F"}
        /> */}
        <label htmlFor="laine">F</label>
        <br />
        {/* <input
          type="radio"
          id="A"
          name="adh"
          checked={eleveur && eleveur.TYPADH === "A"}
        /> */}
        <label htmlFor="viande">A</label>
        <br />
        <label htmlFor="SRT">SIRET</label>
        <input id="SRT" type="text" defaultValue={eleveur && eleveur.SIRET} />
        <br />
        <label htmlFor="TVAI">TVA intra</label>
        <input
          id="TVAI"
          type="text"
          defaultValue={eleveur && eleveur.TVA_intra}
        />
        <br />
        <hr />
        <label htmlFor="chpt">Cheptels</label>
        <input
          id="chpt"
          type="text"
          defaultValue={eleveur && eleveur.CHEPTEL}
        />
        <input
          id="chpt"
          type="text"
          defaultValue={eleveur && eleveur.CHEPTEL2}
        />
        <br />
        <label htmlFor="etb">Type établissement</label>
        <input
          id="etb"
          type="text"
          defaultValue={eleveur && eleveur.CHEPTEL3}
        />
        <br />
        {/* <input
          type="checkbox"
          id="fnc"
          checked={eleveur && eleveur.FINANCEMENT}
        /> */}
        <label htmlFor="fnc">Financement</label>
        <br />
        {/* <label htmlFor="fam">Famille Période 1</label>
      <input id="fam" type="text" defaultValue={eleveur && eleveur.famille} />
      <br />
      <label htmlFor="famd">Famille Période 2</label>
      <input id="famd" type="text" defaultValue={eleveur && eleveur.famille2} />
      <br />
      <label htmlFor="lab">Label</label>
      <input id="lab" type="text" defaultValue={eleveur && eleveur.label} />
    <br /> */}
        <hr />
        <label htmlFor="CAm">CA maximum</label>
        <input type="text" id="CAm" defaultValue={eleveur && eleveur.CAMAX} />
        <br />
        <label htmlFor="plf">Plafond</label>
        <input type="text" id="plf" defaultValue={eleveur && eleveur.CAMAX} />
        <br />
        <label htmlFor="adh">Date adhésion</label>
        <input type="text" id="adh" defaultValue={eleveur && eleveur.DATADH} />
        <br />
        <label htmlFor="ref">Année réf</label>
        <input type="text" id="ref" defaultValue={eleveur && eleveur.CAAP} />
        <br />
        <label htmlFor="KSA">KS année en cours</label>
        <input type="text" id="KSA" defaultValue={eleveur && eleveur.CAPITAL} />
        <br />
        <label htmlFor="apr">Droits d'entrée</label>
        {/* <input
          type="checkbox"
          id="apr"
          checked={eleveur && eleveur.DROITS_ENTREE}
        /> */}
        <br />
        <label htmlFor="dre">Arrêt des prélèvement</label>
        {/* <input
          type="checkbox"
          id="dre"
          checked={eleveur && eleveur.PRELEVEMENTS}
        /> */}
        <br />

        {/* <label>
        centre de ramassage:
        <input
        type="text"
        value={centre}
        onChange={(event) => setCentre(event.target.value)}
        />
      </label> */}
        {/* <button type="submit" disabled={isLoading || !canSave}>
        {isLoading ? "Creating..." : "Create"}
      </button> */}
        {/* </form> */}
      </div>
    </div>
  );
};

export default EleveurForm;
