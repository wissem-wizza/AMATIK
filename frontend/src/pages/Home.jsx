// import Home from "../components/Home/Home";

// const HomePage = () => {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// };

// export default HomePage;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import {
//   selectCurrentUser,
//   selectCurrentToken,
// } from "../features/auth/authSlice";
import Home from "../components/Home/Home";

const HomePage = () => {
  // const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);

  // const welcome = user ? `Welcome ${user}!` : "Welcome!";
  // const tokenAbbr = `${token.slice(0, 9)}...`;
  // console.log("WELCOME", welcome);
  // console.log("TOKEN", tokenAbbr);
  const content = (
    <div>
      <Home />
    </div>
    // <section className="home">
    //   <h1>{welcome}</h1>
    //   <p>Token: {tokenAbbr}</p>
    //   <p>
    //     <Link to="/">Go to the Users List</Link>
    //   </p>
    // </section>
  );

  return content;
};
export default HomePage;
