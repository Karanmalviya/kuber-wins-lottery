import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function AmlPolicy({props}) {
  return (
    <>
      <title>Terms &amp; Conditions - Kuber Wins</title>

      <Navbar props={"general-terms-and-conditions"} />

      <div>
        <section style={{background: "#f5f5f5"}} className="sec-second ">
          <div className="container">
            <h2 className="mt-4 sec-heading">AML POLICY</h2>
          </div>
        </section>
        <section className="bg-white pb-4 pt-4 terms-content">
          <div className="container">
            <h5 className="mb-3">
              POLICIES AND PROCEDURES TO DETECT AND PREVENT MONEY LAUNDERING,
              TERRORIST FINANCING AND CORRUPTION
            </h5>
            <p>
              All capitalized terms not otherwise defined in this document shall
              have the meanings ascribed to them in the Terms and Conditions.
            </p>
            <p>
              Money Laundering is the process of disguising the origin of the
              proceeds of crime. Terrorist financing provides funds for
              terrorist activity. The use of products and services by money
              launderers and terrorists exposes Rockford Holdings to significant
              criminal, regulatory and reputational risk.
            </p>
            <p>
              This policy is designed to provide direction to staff on the
              approach and management of Anti-Money Laundering (AML) and
              Counter-Terrorist Financing (CTF) within Rockford Holdings. This
              policy supports management’s objective of mitigating the following
              risks:
            </p>

            <ul>
              <li>Money laundering</li>
              <li>Terrorist financing</li> <li> Sanctions</li>{" "}
              <li>Politically exposed persons (PEPs)</li>
              <li>Legal and regulatory risk.</li>
            </ul>
            <p>
              This policy applies to all individuals working at all levels of
              Rockford Holdings, including senior managers, officers, directors,
              employees, consultants, contractors, trainees, homeworkers,
              part-time and fixed-term workers, casual and agency staff, all of
              whom are collectively referred to as ‘staff’ in this document.
            </p>
            <p>
              Senior management of Rockford Holdings will provide direction to,
              and oversight of, the AML and CTF strategy as well as apply a
              risk-based approach across the business.
            </p>
            <p>
              Rockford Holdings has put in place Know-Your-Customer (KYC)
              programs as an essential element for service, risk management and
              control procedures.
            </p>
            <p>Such programs include:</p>
            <ul>
              <li>Customer Registration/Acceptance</li>
              <li>Customer Identification/Verification</li>
              <li>On-going Monitoring of customers’ activity</li>
              <li>Risk Management</li>
              <li>
                Reporting of suspicious activities to respective authorities.
              </li>
            </ul>
            <p>
              Rockford Holdings is obliged not only to establish the identity of
              its customers, but also to monitor account activity to determine
              those transactions that do not conform with the normal or expected
              transactions for that customer or type of account. KYC constitutes
              a core feature of services’ risk management and control
              procedures. The intensity of KYC programs beyond these essential
              elements is tailored to the degree of risk.
            </p>
            <p>
              All Rockford Holdings clients will acknowledge, undertake and
              agree to the following terms regarding their use of the website,
              entering into trading activities with Rockford Holdings as a
              Rockford Holdings client:
            </p>

            <ol>
              <li>
                The client will comply (throughout the time as a Rockford
                Holdings client) with all relevant statutes pertaining to money
                laundering and proceeds from criminal activities
              </li>
              <li>
                Rockford Holdings will operate under certain obligations known
                as “know-your-customer” obligations which grant Rockford
                Holdings the right to implement anti money laundering procedures
                to help detect and prevent money laundering activities where
                money laundering may mean to handle any funds associated with
                any illegal activity regardless of the location of such activity
              </li>
              <li>
                The client agrees to lend full cooperation to Rockford Holdings
                with respect to anti money laundering efforts. This involves
                providing information that Rockford Holdings requests regarding
                account, website usage etc. to help Rockford Holdings perform
                its duties as dictated by applicable laws, regardless of
                jurisdiction
              </li>
              <li>
                Rockford Holdings reserves the right to delay or stop any funds
                transfer if there is reason to believe that completing such a
                transaction may result in the violation of any applicable law or
                is contrary to acceptable practices
              </li>
              <li>
                Rockford Holdings reserves the right to suspend or terminate any
                trading activity if there is reason to believe that services are
                used for activities that are deemed unlawful or fraudulent
              </li>
              <li>
                Rockford Holdings has the right to use client information for
                the investigation and/or prevention of fraudulent or otherwise
                illegal activities
              </li>
              <li>
                Rockford Holdings has the right to share client information
                with:
              </li>
              <li>
                <ul style={{listStyleType: "initial"}}>
                  <li>
                    Investigative agencies or any authorized officers who are
                    helping Rockford Holdings to comply with applicable law,
                    including anti-money laundering laws and know-your-customer
                    obligations
                  </li>
                  <li>
                    Organizations that help Rockford Holdings provide the
                    services it offers to its clients;
                  </li>
                  <li>Government, law enforcement agencies and courts</li>
                  <li>Regulatory bodies and financial institutions.</li>
                </ul>
              </li>
            </ol>
            <p>SUSPICIOUS ACTIVITY REPORTING</p>
            <p>
              When any member of staff either knows, suspects or has reasonable
              grounds for knowing or suspecting that a money laundering offence
              has been or is being committed they must make a suspicious
              activity report.
            </p>
            <p>
              Staff are not required to actively search for indications that
              money laundering offences are occurring. However if they become
              aware of, or suspect that, such offences are occurring during the
              course of their normal duties then they shall make a SAR.
            </p>
          </div>
        </section>
      </div>

      <Footer props={""} />
    </>
  );
}
