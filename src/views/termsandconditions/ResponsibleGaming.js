import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function ResponsibleGaming({props}) {
  return (
    <>
      <title>Terms &amp; Conditions - Kuber Wins</title>

      <Navbar props={"general-terms-and-conditions"} />

      <div>
        <section style={{background: "#f5f5f5"}} className="sec-second">
          <div className="container">
            <h2 className="mt-4 sec-heading">RESPONSIBLE GAMING</h2>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4 terms-content">
          <div className="container">
            <h5>RESPONSIBLE GAMING</h5>
            <p>
              {" "}
              All capitalized terms not otherwise defined in this document shall
              have the meanings ascribed to them in the Terms and Conditions.
            </p>
            <p>FOREWORD</p>
            <p>
              Playing with Rockford Holdings can be an enjoyable form of
              entertainment and You might even win some money. But You cannot
              win every time. Losing is a part of the game and You have to be
              ready for it. Therefore, You should play responsibly, and not risk
              money that You cannot afford to lose. We want all Your gaming
              experiences to be positive, regardless of whether You win or not.
              Knowing when to stop is one of the most important aspects of
              gambling responsibly. For that reason, We are offering a number of
              tools, and give regular feedback about Your gambling habits to
              make it easier for You to keep track and stay in control.
            </p>
            <p>NO UNDERAGE PLAY</p>
            <p>
              It is illegal for anyone under the age of 18 to open a Member
              Account and/or to gamble at Our online gaming platform. We reserve
              the right to request proof of identity from You and may suspend
              Your Member Account until adequate age verification has been
              conducted. Please note that local legislation might differ from
              the general rules that apply at Our online casino. If You are
              unsure whether You are allowed, or at a legal age, to play with
              Us, please contact a local solicitor or legal counsel.
            </p>
            <p>QUICK TIPS</p>
            <p>
              We want to encourage a culture of positive play where gambling is
              something fun and happens within each player’s personal limits.
              Here are a few tips for playing responsibly:
            </p>
            <ul>
              <li>Set a personal budget and make sure You stick to it.</li>
              <li>Only play for the fun of it, not to make money.</li>
              <li>Only gamble when sober and in a clear state of mind.</li>
              <li>Make sure You take regular breaks.</li>
            </ul>
            <p>
              If the fun is overshadowed by negative emotions, it may be time to
              take a break or to start using the tools and support services We
              offer.
            </p>
            <p>PARENTAL CONTROL</p>
            <p>
              Do You share a computer with a child? Always remember to keep Your
              account information and passwords secret. There is free software
              that You can download that will help protect Your children from
              online gambling, two well-recognised options include Net Nanny and
              CYBERsitter. Our customer support team is always happy to answer
              any questions You may have about safety and the use of Our site.
            </p>
            <p>YOUR FAMILY AND FRIENDS</p>
            <p>
              Consequences of excessive gambling do not only affect the player,
              but can also have an impact on family and friends. As an affected
              other, it can be reassuring to know that there is support for both
              You and Your loved one. If You are worried about a relative or a
              friend, We recommend that You reach out to one of the support
              organizations available. Please do not hesitate to contact Our
              customer support team who will help guide You in the right
              direction.
            </p>
          </div>
        </section>
      </div>

      <Footer props={""} />
    </>
  );
}
