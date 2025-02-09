import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function FairnessRngTestMethod({props}) {
  return (
    <>
      <title>Terms &amp; Conditions - Kuber Wins</title>

      <Navbar props={"general-terms-and-conditions"} />

      <div>
        <section style={{background: "#f5f5f5"}} className="sec-second ">
          <div className="container">
            <h2 className="mt-4 sec-heading">
              FAIRNESS & RNG TESTING METHODSFAIRNESS & RNG TESTING METHODS
            </h2>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4 terms-content">
          <div className="container">
            <h5 className="mb-3">FAIRNESS & RNG TESTING METHODS</h5>
            <p>
              All capitalized terms not otherwise defined in this document shall
              have the meanings ascribed to them in the Terms and Conditions.
            </p>

            <p>
              In order to ensure the integrity of the games, a Random Number
              Generator (RNG) is used where applicable to determine the random
              outcome of such games. This is a standard industry system which
              ensures consistently random results which has also been
              extensively tested by running and analyzing thousands of game
              rounds. The randomness of the RNG provides a credible and fair
              gaming environment.
            </p>
            <p>
              The Theoretical Return to Player (RTP) value is a theoretical
              calculation of the expected percentage of wagers that a specific
              game will return to player after a significant amount of plays
              (e.g. hundred of million game plays). While every single game play
              is unpredictable and it is possible to win a big amount or lose
              your bet, the average return of a specific game in the long run
              will approach the Theoretical RTP value. The RTP value is
              calculated via either a theoretical or simulated approach with the
              method used depending on the game type.
            </p>
            <p>
              Gaming providers conduct compliance testing to verify elements
              such as Functionality, Display, Transaction, Rules, Mathematics
              (RNG, RTP) etc. to ensure the compliance of overall product to
              applicable regulatory requirements. Subsequently, Rockford
              Holdings makes testing including Integration Testing and User
              Acceptance testing, thus guaranteeing the game integrated into our
              gaming platform performs as it was expected in terms of user
              experience.
            </p>
          </div>
        </section>
      </div>

      <Footer props={""} />
    </>
  );
}
