import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function DisputeResolution({props}) {
  return (
    <>
      <title>Terms &amp; Conditions - Kuber Wins</title>

      <Navbar props={"general-terms-and-conditions"} />

      <div>
        <section style={{background: "#f5f5f5"}} className="sec-second ">
          <div className="container">
            <h2 className="mt-4 sec-heading">DISPUTE RESOLUTION</h2>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4 terms-content">
          <div className="container">
            <h5 className="mb-3">DISPUTE RESOLUTION</h5>
            <p>
              All capitalized terms not otherwise defined in this document shall
              have the meanings ascribed to them in the Terms and Conditions.
            </p>
            <p className="py-2">COMPLAINTS</p>
            <p>
              If You have a complaint, You can email Our customer support via
              email at{" "}
              <a href="mailto:complaints@kuberwins.com">
                complaints@kuberwins.com
              </a>{" "}
              and we will reply to You within 10 days, unless there are external
              factors causing delays.
            </p>
            <p>
              Rockford Holdings will use its reasonable efforts to resolve a
              reported matter promptly.
            </p>
            <p>
              If You have a query with regard to any transaction or the Website,
              You may also contact Our customer support via email at{" "}
              <a href="mailto:complaints@kuberwins.com">
                complaints@kuberwins.com
              </a>{" "}
              with details of the query. We will review any queried or disputed
              transactions.
            </p>
            <p>
              Please note that while Rockford Holdings is the operator offering
              the Games to You, Rockford Holdings has not supplied or developed
              the games and therefore does not have ownership of, or
              responsibility for, such games. Any queries or complaints relating
              to the functioning of the Games should be addressed to and managed
              by the relevant licensing authority in relation to that specific
              Game.
            </p>
            <p>
              For Your protection and to ensure the best possible service to You
              by Rockford Holdings, telephone conversations and other relevant
              communication between You and Rockford Holdings may be recorded
              and/or monitored.
            </p>
            <p>
              Rockford Holdings will not tolerate derogatory, abusive or violent
              behavior or statements that are threatening, vulgar, defamatory or
              otherwise offensive. Should You behave in any such manner towards
              Rockford Holdings’s employees, (as determined in Rockford
              Holdings’s sole opinion), Rockford Holdings reserves the right to
              suspend and/or close Your Member Account and stop all
              communication and/or replies from Rockford Holdings, and/or take
              any further measures as may be deemed appropriate, including
              reporting to relevant local authorities and law enforcement
              agencies.
            </p>
            <p>
              Also, if you are not satisfied with the resolution offered by
              Rockford Holdings you can send a complaint to the licensing
              authority.
            </p>
            <p className="py-2">APPLICABLE LAW</p>
            <p>
              Your participation in the Game, shall be governed by the laws of
              Curacao. Collection and processing of payments (deposits and
              withdrawals) shall be governed by the laws of Curacao.
            </p>
            <p>
              You acknowledge that, unless stated otherwise, the Games are
              organized from Curaçao and Your participation therein takes place
              within the aforementioned territory. Any contractual relationships
              between You and Rockford Holdings shall be deemed to have been
              entered into and performed by the parties in Curacao, at the
              registered address of Rockford Holdings.
            </p>
            <p>
              The parties agree that any dispute, controversy or claim arising
              out of or in connection with these T&Cs, or the breach,
              termination or invalidity thereof, shall be submitted to the
              exclusive jurisdiction of courts of Curacao.
            </p>
          </div>
        </section>
      </div>

      <Footer props={""} />
    </>
  );
}
