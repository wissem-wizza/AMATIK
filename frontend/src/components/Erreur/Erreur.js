import React from "react";
import BlackSheep404 from "./BlackSheep404.jpg";

const Error404 = () => {
  return (
    <div style={styles.container}>
      <h1>Erreur 404 - Page non trouvée</h1>
      <img src={BlackSheep404} alt="Erreur 404" style={styles.image} />
      <p>
        La page que vous recherchez n'a pas pu être trouvée. Il se peut qu'elle
        ait été déplacée, renommée ou supprimée. Veuillez vérifier l'URL que
        vous avez saisie et réessayer.
      </p>
      <a href="/" style={styles.link}>
        Retourner à la page d'accueil
      </a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20vh", // Centrer verticalement
  },
  image: {
    maxWidth: "100%",
    maxHeight: "500px", // Limiter la hauteur de l'image
    margin: "20px 0",
    borderRadius: "10px",
  },
  link: {
    color: "green", // Changer la couleur du texte en vert
    textDecoration: "none", // Enlever la décoration du lien (soulignement)
    fontSize: "30px",
  },
};

export default Error404;
