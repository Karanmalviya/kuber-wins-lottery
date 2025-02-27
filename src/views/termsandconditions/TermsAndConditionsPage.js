import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import moment from "moment";
import jsPDF from "jspdf";
import LoadingSpinner from "../components/LoadingSpinner";
export default function TermsAndConditionsPage({ props }) {
  const [isLoad, setIsLoad] = useState(false);
  const handleDownLoadPDF = () => {
    setIsLoad(true);
    var doc = new jsPDF();
    var elementHTML = document.querySelector("#termsAndCondition");
    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save(moment().format("DDMMYYYYHHmmss") + ".pdf");
        setIsLoad(false);
      },
      autoPaging: "text",
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650,
      margin: [10, 5, 10, 5],
    });

    // const element = document.getElementById("termsAndCondition");
    // html2pdf().from(element).save();

    // var doc = new jsPDF("l", "mm", [1200, 1210]);
    // var pdfjs = document.querySelector("#temp-target");
    // // Convert HTML to PDF in JavaScript
    // doc.html(pdfjs, {
    //   callback: function (doc) {
    //     doc.save("output.pdf");
    //   },
    //   x: 10,
    //   y: 10,
    // });
  };

  return (
    <>
      {isLoad && <LoadingSpinner />}
      <title>General Terms &amp; Conditions - Kuber Wins</title>
      <Navbar props={"general-terms-and-conditions"} />

      <div id="termsAndCondition" className="mt-3">
        <section style={{ background: "#f5f5f5" }} className="sec-second">
          <div className="container d-flex justify-content-between align-items-center ">
            <h2 className=" sec-heading">
              GENERAL&nbsp;TERMS &amp; CONDITIONS
            </h2>
            <button
              className="btn btn-sm"
              style={{ width: "80px" }}
              onClick={handleDownLoadPDF}
            >
              Download
            </button>
          </div>
        </section>

        <section className="bg-white pb-4 pt-4 terms-content">
          <div className="container ">
            <p>
              The following General Terms and Conditions (hereinafter – the
              “General Terms”) stipulate the operation of kuberwins.com, a
              gaming website operated by Rockford Holdings B.V. – a private
              limited company duly registered under the Laws of Curaçao, bearing
              the company number 161827, with a registered address at
              Zuikertuintjeweg Z/N (Zuikertuin Tower), Curaçao (hereinafter
              referred to as "Company" or "Rockford Holdings"). This website is
              licensed and regulated by Curaçao eGaming (Curaçao license No.
              1668 JAZ issued to Cyberluck Curaçao N.V.).
              <br />
              <br />
              These General Terms define the rules and procedures for opening
              and maintaining player accounts, depositing and withdrawing funds,
              placing bets, paying out winnings and resolving disputes. By
              clicking “accept” or otherwise accessing and using the Website,
              the Customer acknowledges that they have read, understood, and
              agreed to be bound by these General Terms along with all other
              policies and procedures placed on the Website.
            </p>
            <p className="fw-bold">1. GENERAL TERMS AND DEFINITIONS</p>
            <p>1.1 DEFINITIONS USED IN THESE GENERAL TERMS:</p>
            <ul>
              <li>
                Ticket - is a lottery ticket for potential winnings entered into
                between the customer and the Company under the established
                Rules.
              </li>
              <li>
                Prize - is the result of the event (events) on which the bet was
                placed.
              </li>
              <li>
                Customer or Player - is an individual purchasing a kuber wins
                ticket.
              </li>
              <li>
                Customer or Player - is an individual purchasing a kuber wins
                ticket.
              </li>
              <li> “Website” is https://kuberwins.com</li>
            </ul>
            <p>
              1.2 CHANGES TO THE GENERAL TERMS:
              <br />
              <br />
              Due to changes in legislative and regulatory frameworks and as
              dictated by operating conditions, and when the need arises, the
              Company may from time to time be required to amend its General
              Terms. The Company will notify players of any updates and
              amendments.
            </p>
            <p>
              In the event that the General Terms are updated and amended (the
              “Amended Terms”), the Amended Terms shall become effective within
              two weeks from the notification and publication. Existing
              Customers shall have the aforementioned two weeks to accept, agree
              and therefore, be bound by the Amended Terms. Otherwise, existing
              Customers that do not accept and agree to the Amended Terms shall
              discontinue using the products and services of the Company before
              the Amended Terms become effective.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4  terms-content"
        >
          <div className="container">
            <p className="fw-bold">2. GENERAL TERMS</p>
            <p>
              2.1 The website is operated by Rockford Holdings B.V., a company
              registered and established under the laws of Curacao. The website
              is licensed and regulated by Curaçao eGaming (Curaçao license No.
              1668 JAZ issued to Cyberluck Curaçao N.V.). Rockford Holdings
              B.V.’s registration number is 161827 and its registered address is
              at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curaçao.
            </p>
            <p>
              2.2 These General Terms apply to the usage of the Games through{" "}
              <a href="https://www.kuberwins.com">kuberwins.com</a> through
              related enabling internet, mobile or other platforms by you (“You”
              or “the Player”).
            </p>
            <p>
              2.3 These General Terms constitute a binding agreement between You
              and kuberwins.com.
            </p>
            <p>
              2.4 These General Terms come into force as soon as you register an
              account, and by doing which you state to{" "}
              <a href="https://www.kuberwins.com/">kuberwins.com</a> that you
              have read these General Terms and accept them. By using any of the
              Website you signify that you agree with these General Terms.
            </p>
            <p>
              2.5 You must read these General Terms carefully in their entirety
              before registering an account. If you do not agree with any
              provision of these General Terms you must not use or continue to
              use the Website.
            </p>
            <p>
              2.6 You fully understand and agree to be bound by the terms and
              conditions contained herein and as may be amended by Us from time
              to time.
            </p>
            <p>
              2.7 <a href="https://www.kuberwins.com/"> kuberwins.com</a>{" "}
              reserves the right to modify and amend this Agreement at any time
              with or without notice.
            </p>
            <p>
              2.8 By accepting these Terms and Conditions you confirm that you
              know and understand the rules of the games offered on the Website.
              It is at your discretion to familiarise yourself with the
              theoretical payout percentage of each game.
            </p>
            <p>
              2.9 Certain games may be unavailable in certain jurisdictions, as
              required by policies of game providers which may change from time
              to time.
            </p>
            <p>2.9.1 Absolute Restriction</p>
            <p>
              Rockford Holdings will not permit Rockford Holdings Casino Games
              to be supplied to any entity that operates in any of the below
              jurisdictions (irrespective of whether or not Rockford Holdings
              Casino Games are being supplied by the entity in that
              jurisdiction) without the appropriate licenses:
            </p>
            <p className="text-danger">
              Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark,
              Estonia, France, Italy, Latvia, Lithuania, Mexico, Portugal,
              Romania, Spain, Sweden, Switzerland, United Kingdom, United States
              of America.
            </p>
            <p>2.9.2 Blacklisted Territories</p>
            <p>
              All Rockford Holdings Casino Games may not be offered in the
              following territories:
            </p>
            <p className="text-danger">
              Afghanistan, Albania, Algeria, Angola, Australia, Bahamas,
              Botswana, Belgium, Bulgaria, Colombia, Croatia, Czech Republic,
              Denmark, Estonia, Ecuador, Ethiopia, France, Ghana, Guyana, Hong
              Kong, Italy, Iran, Iraq, Israel, Kuwait, Latvia, Lithuania,
              Mexico, Namibia, Nicaragua, North Korea, Pakistan, Panama,
              Philippines, Portugal, Romania, Singapore, Spain, Sweden,
              Switzerland, Sudan, Syria, Taiwan, Trinidad and Tobago, Tunisia,
              Uganda, United Kingdom, United States of America, Yemen, Zimbabwe.
            </p>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4  terms-content">
          <div className="container">
            <p className="fw-bold">3. YOUR MEMBER ACCOUNT</p>
            <p>
              3.1 Rockford Holdings may choose at any point to collect personal
              and confidential information, from the moment that you accept the
              Terms and Agreement of our Privacy Policy onward. Should you
              choose to use our products, business services from Rockford
              Holdings’s partners, or any third parties delivering services that
              enable us to provide you with gaming services (including payment
              processors and data verifiers), Rockford Holdings can use this
              information. The purpose of collecting this information is not
              used for harmful purposes but rather as statistical information to
              help us improve our services. By accepting the Terms and
              Conditions along with our Privacy Policy, Rockford Holdings will
              be able to send you email to the email address proved for the sole
              purposes of marketing, promotions and other information related to
              its service. The frequency of email may vary. If on the contrary,
              you don’t wish to receive such emails, you have the right to
              contact our support team in order to opt out of this service.
            </p>
            <p>
              3.2 Upon registration, the customer will provide all relevant
              personal information. All information must be truthful and
              consistently be up to date. Failure to do so will result in the
              termination and closure of the customer's account and all money
              will be forfeited. Rockford Holdings reserves the right to refuse
              or deny potential customers to whom any information is perceived
              suspicious. Only once a customer is registered are they permitted
              to use company services and bet within limitations that are laid
              out for their account. Rockford Holdings reserves the right to
              demand personal documentation such as Passport copy, bank
              statement, credit card Photograph and/ or any other document that
              is necessary to proof the customer's identity. Refusing to provide
              the requested documents will cause the account to be blocked
              and/or rejection of any attempt to withdraw money.
            </p>
            <p>
              3.3 A Customer may open only one account on the Website and with
              the Company. Any additional accounts that are opened may be closed
              by the Company, withholding or declining all payments or in other
              cases, all such accounts may be treated as one joint account and
              merged together by the Company, in either case at the Company's
              sole and absolute discretion. The Customer agrees that the Company
              shall use any method it deems reasonable to determine if two or
              more accounts belong to the same Customer.
            </p>
            <p>
              3.4 Once a customer is considered a 'registered' customer, they
              will be presented with a username and password, which are used
              solely by the customer. It is the responsibility of the customer
              to ensure and maintain that all personal and confidential
              information persists to be disclosed. Should the customer feel
              that their account information security has been compromised the
              customer must notify Rockford Holdings immediately. Should any
              bets or requests be placed at that time the account access
              information is considered valid.
            </p>
            <p>
              3.5 If the customer suspects that their account has been misused,
              it is the customer's responsibility to inform Rockford Holdings as
              soon as possible so that the account can be suspended. Rockford
              Holdings is not liable or to be held responsible if there should
              be a delay in the suspension of the account. Bets or requests made
              online will be voided only after Rockford Holdings has been
              notified of а possible misuse. You can inform Rockford Holdings of
              any misuse of your account via the "contact us" section on the
              website.
            </p>
            <p>
              3.6 If Rockford Holdings believes there has been a breach of
              security or a misuse of the account, the customer may be required
              to change their password or account access information.
            </p>
            <p>
              3.7 Rockford Holdings holds the discretion to perform random
              security checks in order to maintain the highest level of security
              and make sure all measures to protect customer funds are in place.
              The customer, therefore, accepts that Rockford Holdings may
              require further or additional information to verify and maintain
              the highest level of security.
            </p>
            <p>
              3.7.1 The player’s account must be registered in his/her own,
              personal and correct, name and personal details. The individual
              has to ensure that all data given at registration stage is true,
              complete and free from error. Registration is allowed only once
              per person, family, household address, email address, payment
              account number, site cookies, IP address and shared computer, i.e.
              Public library or workplace and cannot share any of the
              aforementioned with a previously registered account. This
              therefore also means that the player has to register personally.
              Furthermore, a player can only have one account. Any other
              accounts which a player opens with the company, or which are
              beneficially owned by the player shall be considered as duplicate
              accounts. We shall close any duplicate account/s consequent to the
              identification of the main account. If we close a duplicate
              account, deposits will be refunded, and all bonuses, free bets and
              winnings acquired using that duplicate account will be void and
              forfeited. If the amount in the duplicate account does not cover
              the amount to be refunded to us, we shall seek to recover the loss
              incurred directly from any other of your accounts.
            </p>
            <p>
              3.7.2 A duplicate account is considered as such in any case where
              the account IP address, Personal details, payment account number,
              site cookies matches with an already existing account with the
              company.
            </p>
            <p>
              3.8 It is the customer's responsibility to check their account
              balance each time they access website. This way they will be able
              to identify any discrepancies that may have occurred. In the event
              of a discrepancy it is the customer's sole responsibility to
              inform Rockford Holdings at their earliest convenience. Should the
              customer fail to notify Rockford Holdings within 30 days of the
              discrepancy then the customer has forthwith forfeited the right to
              any adjustments and the account will remain at the stated balance.
              The customer can inform Rockford Holdings of any account
              discrepancies by using the "contact us" section of the website.
            </p>
            <p>
              3.9 Rockford Holdings reserves the right to close or terminate a
              customer's account, and refund or withhold a balance from that
              account without further explanation to the customer if foul play
              has been suspected. Outstanding bets will be honored, only if
              those were properly placed by the customer in accordance with the
              terms and conditions.
            </p>
            <p>
              3.10 A customer can withdraw money from his account only if and
              when Rockford Holdings has confirmed that the account is eligible
              for performing withdrawals.
            </p>
            <p>
              3.11 A customer may close their account at any point and time but
              this can only be done by the customer informing Rockford Holdings
              of their intention in writing. This must be done through the
              "contact us" section of the website. When a customer decides to
              close their account, the customer must immediately stop using the
              website. Only after Rockford Holdings has notified the customer of
              the closure of their account will the customer no longer be liable
              for any bets and they will be therefore voided and nulled.
            </p>
            <p>
              3.12 Accounts having no recorded activity for a period of 6 months
              are considered to be inactive. Should an account be inactive for 6
              consecutive months or longer (no deposit and betting/gaming
              activity), Rockford Holdings reserves all rights to terminate the
              customer's account and therefore; all outstanding balances are
              forfeited.
            </p>
            <p>
              3.13 Rockford Holdings reserves the right to review transaction
              records and logs whenever needed, for any reason.
            </p>
            <p>
              3.14 Rockford Holdings has the right to offer or terminate the VIP
              membership of any customer at any time at management discretion.
              In case that following these reviews the account is identified or
              suspected as a result of non-recreational play type or wager style
              or collaboration between parties, all winnings and/or bonuses will
              be revoked at the sole discretion of Rockford Holdings.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4  terms-content"
        >
          <div className="container">
            <p className="fw-bold">4. ACCEPTED CURRENCIES</p>
            <p>
              4.1 The website allows playing for the following currencies: USD,
              EUR, BTC(Bitcoin), ETH(Ethereum), Tether [USDT, ERC20], Tether
              [USDT, TRC20].
            </p>
            <p>
              4.2 ETH (Ethereum) deposits and cashouts are made through ERC-20
              blockchain technology, and other technologies are currently not
              supported. Smart Contract is not supported for deposits and
              cashouts made in ETH (Ethereum) and Tether [USDT, ERC20], and
              Tokens are not supported when sending ETH (Ethereum) transactions.
            </p>
            <p>
              4.3 Minimum deposit amounts for each currency are: 0.0005 for BTC,
              0.01 for ETH, 1.2 for Tether [USDT, ERC20], 1.2 for Tether [USDT,
              TRC20]. Please do NOT attempt to deposit below the mentioned
              amounts, as the funds will not reach your player account and will
              become permanently lost.
            </p>
            <p>
              4.4 Requesting a withdrawal towards your account's deposit address
              is strictly prohibited. If you attempt to request a withdrawal
              towards your account's deposit address, the transaction will be
              flagged and your account may be temporarily locked by the system.
            </p>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4  terms-content">
          <div className="container">
            <p className="fw-bold">5. DEPOSITS AND WITHDRAWALS</p>
            <p>
              5.1 To deposit funds into your Member Account, you can transfer
              funds from your personal cryptocurrency wallets or bank accounts
              to the corresponding wallets or bank accounts on your Deposit
              page. Please contact our support team at info@kuberwins.com or on
              live chat to inquire about the payment methods which are most
              favorable for your country of residence.
            </p>
            <p>
              5.2 Rockford Holdings does not accept third party payments. You
              must make deposits only from a supported wallet or bank account
              for your currency of choice which rightfully belongs to you. If we
              determine during the security checks that you have violated this
              condition your winnings will be confiscated and original deposit
              returned to the owner of the payment account. The casino is not
              responsible for the lost funds deposited from third party
              accounts.
            </p>
            <p>
              5.3 For cryptocurrency deposits, in the instance that a deposit is
              unable to be verified by the Blockchain within a reasonable
              period, it will be considered fraud. All play and winnings
              associated with that deposit will be null and void. Your account
              will be temporarily closed and all costs incurred by Rockford
              Holdings, including provider and platform fee retrieval, affiliate
              commissions, and administrative costs associated with these
              transactions will be noted on your account. A KYC is required to
              reopen a suspended or deactivated account. In the instance your
              account is reopened, all debts determined by Rockford Holdings
              must be satisfied before you may play Games or make a withdrawal
              in the future
            </p>
            <p>
              5.4 If we find a suspicious betting pattern upon review of your
              play, that includes but is not limited to betting with a deposit
              that was not confirmed at the moment of play, Rockford Holdings
              reserves the right to void all bets.
            </p>
            <p>
              5.5 When effecting deposits into your Account, Rockford Holdings
              reserves the right to use additional procedures and means to
              verify your identity.
            </p>
            <p>
              5.6 Withdrawals will be made to your stated wallet address or bank
              account.
            </p>
            <p>
              5.7 If we mistakenly credit your Member Account with winnings that
              do not belong to you, whether due to a technical error in the
              pay-tables, human error, or otherwise, the amount will remain
              property of us and the amount will be deducted from your Member
              Account. If you have withdrawn funds that do not belong to you
              prior to us becoming aware of the error, the mistakenly paid
              amount will (without prejudice to other remedies and actions that
              may be available at law) constitute a debt owed by you to us. In
              the event of an incorrect crediting, you are obliged to notify us
              immediately by email.
            </p>
            <p>
              5.8 The payment team at Rockford Holdings reserve the right to
              carry out additional verification procedures for any payout
              exceeding the equivalent of USD 5,000 or equivalent, and further
              reserves the right to carry out such verification procedures in
              case of lower payouts. Account Holders who wish to recover funds
              held in a closed, locked or excluded account, are advised to
              contact Customer Support.
            </p>
            <p>
              5.9 All transactions shall be checked in order to prevent money
              laundering. If the Member becomes aware of any suspicious activity
              relating to any of the Games of the Website, he must report this
              to the Company immediately. Rockford Holdings may suspend, block
              or close a Member Account and withhold funds if requested to do so
              in accordance with the Prevention of Money Laundering Act.
              Enhanced due diligence may be done in respect of withdrawals of
              funds not used for wagering.
            </p>
            <p>
              5.10 Please be advised that our products are consumed instantly
              when playing. Thus, we cannot provide returns of goods, refunds or
              cancellation of your service when playing. If you play a game with
              any currency available inside your account, the money will be
              drawn from your player account instantly.
            </p>
            <p>
              5.11 You will not get any interest on outstanding amounts and you
              shall not treat the Company as a financial institution.
            </p>
            <p>
              5.12 The Company reserves the right to check player’s identity
              (KYC procedure) prior to processing payouts and to hold
              withdrawals for the time needed to check the player’s identity.
              Failure or denial to pass the identity check will result in
              confiscation of winnings and refund of the last deposit.
            </p>
            <p>
              5.13 It is the responsibility of the player to ensure that all
              documents as a part of the KYC process are genuine. In case of
              false personal data provided by the players, the withdrawal will
              be refused and the user account will be terminated. The player
              will be informed thereof by email. In case of the faked or
              fraudulent documents provided will result in confiscation of
              deposits and potential winnings of the player.
            </p>
            <p>
              5.14 Player’s identity check may require a selfie, a selfie with a
              note to the casino, a phone call or verification of a player via
              live video call (Skype).
            </p>
            <p>
              5.15 We reserve the right to make a phone call to the number
              provided in your member account, which at your own discretion can
              be a necessary part of the KYC procedure. In case the provided
              number is incorrect, missing or false, or the player will not
              answer the phone call we reserve the right to confiscate your
              winnings or/and disable your member account. We'll make reasonable
              efforts trying to contact you regarding the withdrawal of the
              funds, but if we are not able to reach you (by email or phone) in
              two weeks, the funds will be retained by the casino.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4"
        >
          <div className="container  terms-content">
            <p className="fw-bold">6. FEES AND TAXES</p>
            <p>
              6.1 The player is fully responsible for paying all fees and taxes
              applied to their winnings according to the laws of the
              jurisdiction of player’s residence.
            </p>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4  terms-content">
          <div className="container">
            <p className="fw-bold">7. Use of the Website</p>
            <p>7.1 Website Content and Permitted and Prohibited Use</p>
            <p>
              7.1.1 Information or data accessed by you via the Website or any
              part of it (including, but not limited to, results, statistics,
              sporting data and fixture lists, odds and betting figures) is for
              your personal use only and the distribution or commercial
              exploitation of such information or data is strictly prohibited.
              No warranty is given as to the uninterrupted provision of such
              information or data, its accuracy or as to the results obtained
              through its use. The information is not intended to amount to
              advice or recommendations and is provided for information purposes
              only. It should not be relied upon when placing bets/wagers, which
              are made at your own risk and discretion.
            </p>
            <p>
              7.1.2 Any commercial use or exploitation of the whole or any part
              of the Website, the information or data on the Website (including,
              but not limited to, results, statistics, sporting data and fixture
              lists, odds and betting figures), any other information or data on
              the Website and/or its source code is strictly prohibited.
            </p>
            <p>
              7.1.3 The use of automated systems or software to copy and/or
              extract the whole or any part of, the Website, the information or
              data on the Website (including, but not limited to, results,
              statistics, sporting data and fixture lists, odds and betting
              figures), any other information or data on or contained within or
              as part of the Website and/or its source code for any purpose
              (known as "screen scraping") is strictly prohibited.
            </p>
            <p>7.2 Your Equipment</p>
            <p>
              7.2.1 Your computer equipment or mobile device and internet
              connection may affect the performance and/or operation of the
              Website. Rockford Holdings does not guarantee that the Website
              will operate without faults or errors or that the Rockford
              Holdings services will be provided without interruption. Rockford
              Holdings does not accept any liability for any failures or issues
              that arise due to your equipment, internet connection or internet
              or telecommunication service provider (including, for example, if
              you are unable to place bets or wagers or to view or receive
              certain information in relation to particular events).
            </p>
            <p>
              7.2.2 For customers using a mobile device (including downloadable
              applications) for the placing of bets/wagers, please note that
              Rockford Holdings will not be responsible for any damage to, or
              loss of data from the mobile device that the software is installed
              on and will also not be responsible for any call, data or other
              charges incurred whilst using the software.
            </p>
            <p>7.3 Fair Use</p>
            <p>
              7.3.1 The Website and Rockford Holdings products may only be used
              for the purposes of buying kuber wins lottery tickets, placing
              bets and wagers on events and/or gaming products.
            </p>
            <p>
              7.3.2 You must not use the Website for the benefit of a third
              party or for any purpose which (in Rockford Holdings’s opinion) is
              illegal, defamatory, abusive or obscene, or which Rockford
              Holdings considers discriminatory, fraudulent, dishonest or
              inappropriate. Rockford Holdings may report to the authorities any
              activity which it considers to be suspicious and/or in breach of
              this paragraph.
            </p>
            <p>
              7.3.3 Rockford Holdings will seek criminal and contractual
              sanctions against any customer involved in fraudulent, dishonest
              or criminal acts via or in connection with the Website or Rockford
              Holdings's products. Rockford Holdings will withhold payment to
              any customer where any of these are suspected or where the payment
              is suspected to be for the benefit of a third party. The customer
              shall indemnify and shall be liable to pay to Rockford Holdings,
              on demand, all Claims arising directly or indirectly from the
              customer’s fraudulent, dishonest or criminal act.
            </p>
            <p>7.4 Software and Technology Issues</p>
            <p>
              7.4.1 In order for you to use certain products offered on the
              Website you may need to download some software (for example,
              casino games that are made available via a flash player). Also,
              certain third party product providers may require you to agree to
              additional terms and conditions governing the use of their
              products. If you do not accept those third party terms and
              conditions, do not use the relevant third party software. Rockford
              Holdings does not accept any liability in respect of any third
              party software.
            </p>
            <p>
              7.4.2 You are only permitted to use any and all software made
              available to you via the Website for the purpose of using products
              on the Website and, save to the extent permitted by applicable
              law, for no other purposes whatsoever.
            </p>
            <p>
              7.4.3 We hereby grant to you a personal, non-exclusive,
              non-transferable right to use the relevant software, for the sole
              purpose of using/playing products on the Website, in accordance
              with the following provisions.
            </p>
            <p>7.4.3.1 You are not permitted to:</p>
            <ul>
              <li>
                install or load the software onto a server or other networked
                device or take other steps to make the software available via
                any form of "bulletin board", online service or remote dial-in
                or network to any other person;
              </li>
              <li>
                sub-license, assign, rent, lease, loan, transfer or copy (except
                as expressly provided elsewhere in these terms and conditions)
                your licence to use the software or make or distribute copies of
                the software;
              </li>
              <li>
                enter, access or attempt to enter or access or otherwise bypass
                Rockford Holdings’s security system or interfere in any way
                (including, but not limited to, robots, or similar devices) with
                the relevant products or the Website or attempt to make any
                changes to the software and/or any features or components
                thereof; or
              </li>
              <li>
                copy or translate any user documentation provided 'online' or in
                electronic format. In addition, and except to the minimum extent
                permitted by applicable law in relation to computer programs,
                you are not permitted to:
              </li>
            </ul>
            <p>
              - translate, reverse engineer, decompile, disassemble, modify,
              create derivative works based on, or otherwise modify the
              software; or
            </p>
            <p>
              - reverse engineer, decompile, disassemble, modify, adapt,
              translate, make any attempt to discover the source code of the
              software or to create derivative works based on the whole or on
              any part of the software.
            </p>
            <p />
            <p>
              7.4.3.2 You do not own the software. The software is owned and is
              the exclusive property of Rockford Holdings or a third party
              software provider company (the "Software Provider"). Any software
              and accompanying documentation which have been licensed to
              Rockford Holdings are proprietary products of the Software
              Provider and protected throughout the world by copyright law. Your
              use of the software does not give you ownership of any
              intellectual property rights in the software.
            </p>
            <p>
              7.4.3.3 The software is provided "as is" without any warranties,
              conditions, undertakings or representations. Rockford Holdings
              does not warrant that:
            </p>
            <ul>
              <li>the software will meet your requirements;</li>
              <li>
                the software will not infringe any third party’s intellectual
                property rights;
              </li>
              <li>
                the operation of the software will be error free or
                uninterrupted;
              </li>
              <li>any defects in the software will be corrected; or</li>
              <li>the software or the servers are virus-free.</li>
            </ul>
            <p>
              7.4.3.4 In the event of communications or system errors occurring
              in connection with the settlement of accounts or other features or
              components of the software, neither Rockford Holdings nor the
              Software Provider will have any liability to you or to any third
              party in respect of such errors. Rockford Holdings reserves the
              right in the event of such errors to remove all relevant products
              from the Website and take any other action to correct such errors.
            </p>
            <p>
              7.4.3.5 You hereby acknowledge that how you use the software is
              outside of Rockford Holdings’s control. Accordingly, you load and
              use the software at your own risk. Rockford Holdings will not have
              any liability to you or to any third party in respect of your
              receipt of and/or use of the software.
            </p>
            <p>
              7.4.3.5 The software may include confidential information which is
              secret and valuable to the Software Provider and/or Rockford
              Holdings. You are not entitled to use or disclose that
              confidential information other than strictly in accordance with
              these Terms and Conditions.
            </p>
            <p>
              7.4.4 While Rockford Holdings endeavours to ensure that the
              Website is available 24 hours a day, Rockford Holdings shall not
              be liable if for any reason the Website is unavailable at any time
              or for any period. We reserve the right to make changes or
              corrections to or to alter, suspend or discontinue any aspect of
              the Website and the content or services or products available
              through it, including your access to it.
            </p>
            <p>
              7.4.5 You must not misuse the Website by introducing viruses,
              Trojans, worms, logic bombs or other material which is malicious
              or technologically harmful. In particular, you must not access
              without authority, interfere with, damage or disrupt the Website
              or any part of it; any equipment or network on which the Website
              is stored; any software used in connection with the provision of
              the Website; or any equipment, software or website owned or used
              by a third party. You must not attack our Website via a
              denial-of-service attack. We will not be liable for any loss or
              damage caused by a distributed denial-of-service attack, viruses
              or other technologically harmful material that may infect your
              computer equipment, computer programs, data or other proprietary
              material due to your use of the Website, software or to your
              downloading of any material posted on it, or on any website linked
              to it.
            </p>

            <p>7.5 Third Party Content</p>
            <p>
              7.5.1 Rockford Holdings may receive feeds, commentaries and
              content from a number of suppliers. Certain third party product
              providers may require you to agree to additional terms and
              conditions governing the use of their feeds, commentaries and
              content. If you do not accept the relevant third party terms and
              conditions, do not use the relevant feeds, commentaries or
              content.
            </p>
            <p>
              7.5.2 Rockford Holdings does not accept any liability in respect
              of any third party feeds, commentaries and content.
            </p>
            <p>
              7.5.3 Rockford Holdings does not allow any employee, anyone else
              in any way connected to such employee or anyone otherwise
              connected to a third party service provider (to be determined in
              Rockford Holdings’s absolute discretion) to bet/wager on any
              market or event where the third party service provider is
              providing a service to Rockford Holdings. Rockford Holdings will
              void any bet/wager where it determines in its absolute discretion
              that such betting/wagering has taken place.
            </p>
            <p>
              7.5.4 Where the Website contains links to third party websites and
              resources, these links are provided for your information only.
              Rockford Holdings has no control over the content of these sites
              or resources, and accepts no liability for them or for any loss or
              damage that may arise from your use of them. The inclusion of a
              link to a third party website does not constitute an endorsement
              of that third party’s website, product or services (if
              applicable).
            </p>
            <p>7.6 Errors</p>
            <p>
              7.6.1 Rockford Holdings will not be liable for any errors in
              respect of bets or wagers including where:
            </p>
            <ul>
              <li>
                there is an Obvious Error in the relevant
                odds/spreads/handicap/totals/Cash Out/Edit Bet amount displayed
                by Rockford Holdings;
              </li>
              <li>
                Rockford Holdings continues to accept bets or wagers on closed
                or suspended markets;
              </li>
              <li>
                Rockford Holdings incorrectly calculates or pays a settlement
                amount, including where a bet is Cashed Out for the full
                settlement amount; or a bet is made void incorrectly, where
                ‘Void if player does not start’ was selected at bet placement;
                or
              </li>
              <li>
                any error occurs in a random number generator or pay tables
                included, incorporated or used in any game or product.
              </li>
            </ul>
            <p>7.7 Other</p>
            <p>
              7.7.1 Rockford Holdings actively monitors traffic to and from the
              Website. Rockford Holdings reserves the right in its sole
              discretion to block access where evidence indicative of automated
              or robotic activity is found.
            </p>
            <p>
              7.7.2 Rockford Holdings reserves the right to restrict access to
              all or certain parts of the Website in respect of certain
              jurisdictions.
            </p>
            <p>
              7.7.3 Rockford Holdings may alter or amend the products offered
              via the Website at any time and for any reason.
            </p>
            <p>
              7.7.4 From time to time, all or part of the Website may be
              unavailable for use by you because of our maintenance of the
              Website and/or alteration or amendment of any of the Website
              products.
            </p>
            <p>
              7.7.5 A malfunction or error in a gaming product will void all
              applicable stakes and returns.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4  terms-content"
        >
          <div className="container">
            <p className="fw-bold">8. BONUS AND PROMOTIONS</p>
            <p>8.1 The following terms govern the Website promotions.</p>
            <p>
              8.2 In the event of any discrepancy between the meanings of any
              translated versions of these promotion’s specific terms and
              conditions and the English language version, the meaning of the
              English language version shall prevail.
            </p>
            <p>
              8.3 When placing a bet during any promotion real money will be
              used first.
            </p>
            <p>
              8.4 Rockford Holdings may in its sole discretion limit the
              eligibility of its customers to participate in all or part of any
              promotion.
            </p>
            <p>
              8.5 Players who participate in one promotion cannot enter another
              promotion of the same type or win any free bets during the
              promotion period. Players can have only one active bonus at a
              time.
            </p>
            <p>
              8.6 In order to claim a free spins bonus a player must enter the
              respective bonus code when depositing. Free spins are not granted
              instantly, and will be available to eligible players within 48
              hours of the bonus code activation. A customer must use all
              acquired free spins within 7 days of acquisition or otherwise they
              will expire and will no longer be available. In order to use the
              free spins granted by Rockford Holdings a player must launch the
              game corresponding to the promotion on offer, and click on “Play
              free spins now”.
            </p>
            <p>
              8.7 Rockford Holdings may, at its sole discretion, decide to give
              free spins to its customers as a present. In that case, the
              customers will be required to perform a minimum deposit equal to
              the winnings gained as a consequence of the free spins, and to
              wager the deposit in question 5 times before any withdrawals of
              winnings are permitted.
            </p>
            <p>
              8.8 Rockford Holdings reserves the right to review transaction
              records and logs whenever it deems this to be necessary.
              Consequent to these reviews, it may become clear or suspicion may
              arise that the account is being:
            </p>
            <ul>
              <li>
                Used as a non-recreational play type or wager style account; or
              </li>
              <li>
                That players are colluding and thereby distorting the gameplay.
              </li>
              <li>
                Rockford Holdings reserves the right to deduct all winnings
                accumulated in case any of the above has been determined.
              </li>
              <li>8.8.1 Bonus manipulation amongst others, may consist of:</li>
              <li>
                Placing bets listed as restricted in the specific promotion’s
                rules
              </li>
              <li>
                Increasing the balance, then changing the gaming pattern
                significantly (bet, game type, bet structure, etc) in order to
                complete the wagering requirements for the bonus
              </li>
              <li>
                Making large bets leading to a substantial gain followed by a
                drop in bet size equal to or greater than 75% of the previous
                average bet size in order to complete the wagering requirements
                for that bonus.
              </li>
            </ul>
            <p>
              8.8.2. In case of bonus manipulation Rockford Holdings reserves
              the right to deduct all winnings accumulated.
            </p>
            <p>
              8.9 In cases where the customer chooses to leave a bonus campaign
              or fails to complete any other withdrawal requirements, listed in
              the specific promotion, all bonus money, and real money winnings
              will be forfeited.
            </p>
            <p>
              8.10 For each promotion registration and participation is allowed
              only once per person, family, household address, email address,
              payment account number, IP address, and shared computer, i.e.
              Public library or workplace. Bonus will be refused to players who
              do not comply with this term and multiple accounts will be closed.
              (Please, refer to General Terms and Conditions – Player
              Registration & Deregistration Process) We reserve the right to
              withdraw the availability of any offer and to redeem all bonuses
              and winnings money accumulated by any customer or group of
              customers at any time and at our sole and absolute discretion.
            </p>
            <p>
              8.11 All promotions are subject to change at any time. Rockford
              Holdings reserves the right to change, cancel or refuse bonus at
              its own discretion.
            </p>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4 terms-content">
          <div className="container">
            <p className="fw-bold">9. LIMITATION OF LIABILITY</p>
            <p>
              9.1 You enter the Website and participate in the Games at your own
              risk. The Website and the Games are provided without any warranty
              whatsoever, whether express or implied.
            </p>
            <p>
              9.2 Without prejudice to the generality of the preceding
              provision, kuberwins.com, its directors, employees, partners,
              service providers:
            </p>
            <p>
              9.2.1 do not warrant that the software or the Website is/are fit
              for their purpose;
            </p>
            <p>
              9.2.2 do not warrant that the software and Website are free from
              errors;
            </p>
            <p>
              9.2.3 do not warrant that the Website and/or Games will be
              accessible without interruptions;
            </p>
            <p>
              9.2.4 shall not be liable for any loss, costs, expenses or
              damages, whether direct, indirect, special, consequential,
              incidental or otherwise, arising in relation to Your use of the
              Website or Your participation in the Games.
            </p>
            <p>
              9.3 You hereby agree to fully indemnify and hold harmless
              <a href="https://www.kuberwins.com/">kuberwins.com</a>, its
              directors, employees, partners, and service providers for any
              cost, expense, loss, damages, claims and liabilities howsoever
              caused that may arise in relation to your use of the Website or
              participation in the Games.
            </p>
            <p>
              9.4 Nothing published by or on behalf of Rockford Holdings
              constitutes solicitation or recommendation to enter into any
              security or investment. Neither content nor data published by
              Rockford Holdings should be relied upon for investment, trading,
              or security purposes. Links to other sites do not constitute
              endorsement and should not be deemed as such, nor should such
              links be considered approval by Rockford Holdings of the linked
              site, its owner, or its content. It is strongly advised that
              anyone perform independent research prior to making financial or
              investment decisions, along with seeking the advice of a qualified
              professional.
            </p>
            <p>
              9.5 By accepting these Terms and Conditions you confirm your
              awareness of the fact that gambling may lead to losing money. The
              Casino is not liable for any possible financial damage arising
              from your use of the Website.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4  terms-content"
        >
          <div className="container">
            <p className="fw-bold">10. INTELLECTUAL PROPERTY RIGHTS</p>
            <p>
              10.1 All website design, text, graphics, music, sound,
              photographs, video, the selection and arrangement thereof,
              software compilations, underlying source code, software and all
              other material contained within the Website are subject to
              copyright and other proprietary rights which are either owned by
              us or used under licence from third party rights owners. To the
              extent that any material contained on the Website may be
              downloaded or printed then such material may be downloaded to a
              single personal computer only and hard copy portions may be
              printed solely for your own personal and non-commercial use.
            </p>
            <p>
              10.2 Under no circumstances shall the use of the Website grant to
              any user any interest in any intellectual property rights (for
              example copyright, know-how or trademarks) owned by us or by any
              third party whatsoever.
            </p>
            <p>
              10.3 No rights whatsoever are granted to use or reproduce any
              trade names, trademarks or logos which appear on the Website
              except as specifically permitted in accordance with the Terms of
              Use.
            </p>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4">
          <div className="container  terms-content">
            <p className="fw-bold">11. PRIVACY AND SECURITY</p>
            <p>
              11.1 You hereby acknowledge and accept that it is necessary for
              Rockford Holdings to collect and otherwise use Your personal data
              in order to allow You access and use of the Website and
              participation in the Games.
            </p>
            <p>
              11.2 Rockford Holdings hereby acknowledges that in collecting Your
              personal details as stated in the previous provision, We are bound
              by the Data Protection legislation. Rockford Holdings will protect
              your personal information and respect your privacy in accordance
              with best business practices and applicable laws.
            </p>
            <p>
              11.3 Rockford Holdings will only use Your personal data to allow
              you to participate in the Games and to carry out operations
              relevant to Your participation in the Games. All members of the
              staff shall have access to Your personal data for the purpose of
              performing their duties.
            </p>
            <p>
              11.4 Your personal data will not be disclosed to third parties,
              unless such disclosure is necessary for processing of your
              requests in relation to Your participation in the Games. You
              hereby consent to such disclosures.
            </p>
            <p>
              11.5 As an individual you may exercise your right to access the
              data held about you by Rockford Holdings by submitting your
              request in writing. Although all reasonable efforts will be made
              to keep your information updated, you are kindly requested to
              inform us of any change referring to the personal data held by
              Rockford Holdings. In any case if you consider that certain
              information about you is inaccurate, you may request rectification
              of such data. You also have the right to request the blocking or
              erasure of data which has been processed unlawfully.
            </p>
            <p>
              11.6 In order to make Your visit to the Website more
              user-friendly, to keep track of visits to the Website and to
              improve the service, Rockford Holdings collects a small piece of
              information sent from Your browser, called a cookie. You can, if
              you wish, turn off the collection of cookies (please refer to your
              browser instructions as to how to do this). You must note,
              however, that turning off cookies may restrict Your use of the
              Website.
            </p>
            <p>
              11.7 If, while playing at Rockford Holdings Casino, you win a sum
              regarded by Rockford Holdings Management as worthy of publicity,
              you agree to make yourself available for any event of such nature
              arranged by Rockford Holdings. While Rockford Holdings protects
              all personal data entrusted to us, we reserve the right to use
              first names and the first initial of the last name in any Rockford
              Holdings announcement about promotion results or on the website or
              lobby.
            </p>
            <p>
              11.8 We may also inform you of changes, new services and
              promotions We think that You may find interesting. If you do not
              wish to receive direct marketing data you may opt out of such
              service through the member account.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4  terms-content"
        >
          <div className="container">
            <p className="fw-bold">12. KYC AND VERIFICATION</p>
            <p>Provide your KYC procedures.</p>
            <p>12.1 All Players should be over the legal age (18+)</p>
            <p>
              12.2 List of required documents in order for players to pass
              verification process:
            </p>
            <ul>
              <li>Photo of an identity document</li>
              <li>Photo or screenshot of the payment system</li>
              <li>
                Photo or screenshot of a document confirming the current address
                of residence (not older than 3 months)
              </li>
            </ul>
            <p>
              12.3 In some cases we require additional proof - proof of funds
              (to make sure player uses his/her own money when gamble at our
              site).
            </p>
            <p>
              12.4 The documents quoted hereinabove can be requested when player
              reaches certain sum of deposit/withdrawal and when we suspect
              player in fraudulent activity.
            </p>
            <p>
              12.5 We also check player bets for to check on possible
              violations. In case we are not sure about the legality of the
              winning credited we contact provider and check those bets with
              them.
            </p>
            <p>
              12.6 Verification criteria for identity document: information that
              should be indicated on ID: name, photograph, date of birth,
              citizenship. These data completely coincide with the data in
              player’s profile; the document is valid.
            </p>
            <p>
              12.7 To prevent the possible fake/untrustful usage of the ID
              verification process.
            </p>
            <p>
              12.8 We check documents for any signs of editing, if necessary
              request selfie with ID to make sure the document belongs to the
              exact person who registered on the website. In case we have strong
              suspicions and unsure whether the document is valid or not we
              contact anti-fraud department via email.
            </p>
            <p>
              12.9 The player should upload documents to the “Documents” tab in
              his/her account.
            </p>
            <p>12.9.1 List of required documents:</p>
            <ul>
              <li>Photo of an identity document</li>
              <li>Photo or screenshot of the payment system</li>
              <li>
                Photo or screenshot of a document confirming the current address
                of residence (not older than 3 months)
              </li>
            </ul>
            <p>12.9.2 Additional documents:</p>
            <ul>
              <li>Selfies with an identity document</li>
              <li>Proof of wealth</li>
              <li>Proof of funds</li>
            </ul>
            <p>12.10 Document verification criteria:</p>
            <ul>
              <li>
                Photo of an identity document: all data (name, date of birth,
                citizenship) completely coincide with the data in Player’s
                details, the document is valid, with a photograph. As a rule, a
                passport, ID, driver’s license is suitable for identification.
              </li>
              <li>
                Photo or screenshot of the payment system: all data completely
                coincides with the data in Payment systems debts. Scanned copies
                are not accepted as confirmation.
              </li>
            </ul>
            <p>
              12.11 A photo or a screenshot of a document confirming the current
              address of residence: the data (name, address of residence + date
              of issue of the document) coincides with the data in Player’s
              details. To confirm the address, a utility bill / bank statement /
              payment for mobile services is acceptable / photo of registration
              from the passport is acceptable. The document must be no older
              than 90 days (3 months).
            </p>
            <p>
              12.12 Selfies with an identity document: it is desirable that the
              player’s hands are visible, a thorough check for editing /
              photoshop. Optionally, a selfie can be requested with an identity
              document + a sheet of paper on which the name of the casino and
              the current date are written. In this case, it is desirable that
              the inscription was not on a white sheet of paper, but, for
              example, in a cage.
            </p>
            <ul>
              <li>
                Proof of wealth: a document confirming the welfare of the
                player.
              </li>
              <li>
                Proof of funds: a document confirming the receipt of funds to
                the payment system.
              </li>
            </ul>
          </div>
        </section>

        <section className=" bg-white sec-second pb-4 pt-4  terms-content">
          <div className="container">
            <p className="fw-bold">13. RESPONSIBLE GAMBLING</p>
            <p>
              13.1 Gambling at an online casino should always be aimed at
              entertainment. However, there is a certain percentage of people
              who lose control over themselves while gambling. Before starting
              to play, it is important to realize that gambling shall never be
              viewed as a source of income or means of recovery from debts. It
              is useful to keep track of the time and the amount of money spent
              at an online casino daily.
            </p>
            <p>
              13.2 If you think that you start spending more money than you can
              afford, or in case gaming starts interfering with your normal
              daily routines, we strongly advise to consider several measures
              that can help, such as setting Personal Limits on your gaming
              activities, opting for Self-Exclusion, and seeking help and
              support from trusted independent bodies.
            </p>
          </div>
        </section>
        <section
          style={{ background: "#f5f5f5" }}
          className="sec-second pb-4 pt-4  terms-content"
        >
          <div className="container">
            <p className="fw-bold">14. COMPLAINTS AND DISPUTES</p>
            <p>
              14.1 Rockford Holdings is to acknowledge a complaint started by
              the account holder only. It is forbidden to hand over or sell your
              complaint to the third party. Casino will dismiss the complaint if
              the matter is handed over to be conducted by the third party and
              not the original account owner.
            </p>
            <p>
              14.2 Rockford Holdings will use best efforts to resolve a reported
              matter promptly.
            </p>
            <p>
              14.3 If, for some reason, you are not satisfied with the
              resolution of your complaint by Rockford Holdings, you may report
              a complaint to Rockford Holdings B.V. E-mail:
              complaints@kuberwins.com
            </p>
            <p>
              14.4 If You have any concern or dispute about the Service, You
              agree to first try to resolve the dispute informally by contacting
              the Company.
            </p>
          </div>
        </section>
        <section className=" bg-white sec-second pb-4 pt-4  terms-content">
          <div className="container">
            <p className="fw-bold">15. GOVERNING LAW AND JURISDICTION</p>
            <p>
              15.1 The laws of the Country (Curacao), excluding its conflicts of
              law rules, shall govern this Terms and Your use of the Service.
              Your use of the Application may also be subject to other local,
              state, national, or international laws.
            </p>
            <p>
              15.2 These services shall be provided, governed, and enforced in
              accordance with the laws of the state Curacao, without regard to
              its conflict of laws rules. It´s courts shall have exclusive
              jurisdiction.
            </p>
          </div>
        </section>
      </div>

      <Footer props={""} />
    </>
  );
}
