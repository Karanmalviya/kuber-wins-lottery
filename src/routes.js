import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/home/HomePage";
import LotteryPage from "./views/lottery/LotteryPage";
import LotteryDetailPage from "./views/lottery/LotteryDetailPage";
import ScratchCardPage from "./views/scratchcard/ScratchCardPage";
import FaqPage from "./views/faq/FaqPage";
import AboutPage from "./views/about/AboutPage";
import HelpPage from "./views/help/HelpPage";
import ContactPage from "./views/contact/ContactPage";
import LoginPage from "./views/login/LoginPage";
import ForgotPasswordPage from "./views/login/ForgotPassword";
import RegistrationPage from "./views/registration/RegistrationPage";
import TermsAndConditionsPage from "./views/termsandconditions/TermsAndConditionsPage";
import DashboardPage from "./views/dashboard/DashboardPage";
import DepositesPage from "./views/dashboard/DepositesPage";
import TransactionsPage from "./views/dashboard/TransactionsPage";
import TicketListPage from "./views/dashboard/TicketListPage";
import ProfilePage from "./views/dashboard/ProfilePage";
import WinnerPage from "./views/winners/WinnerPage";
import { config } from "./config";
import ProtectedRoute from "./ProtectedRoute";

import Error from "./views/404";
import AuthenticationPage from "./views/dashboard/AuthenticationPage";
import TotalWinsPage from "./views/dashboard/TotalWinsPage";
import ChangePasswordPage from "./views/dashboard/ChangePasswordPage";
import CommissionPage from "./views/dashboard/CommissionPage";
import ReferredUsersPage from "./views/dashboard/ReferredUsersPage";
import SupportTicketPage from "./views/dashboard/SupportTicketPage";
import NewSupportTicketPage from "./views/dashboard/NewSupportTicketPage";
import WithdrawalPage from "./views/dashboard/WithdrawalPage";
import WithdrawalHistoryPage from "./views/dashboard/WithdrawalHistoryPage";
import TicketDetailPage from "./views/dashboard/TicketDetailPage";
import SupportTicketReplyPage from "./views/dashboard/SupportTicketReplyPage";
import DepositesView from "./views/dashboard/DepositeView";
import WithdrawalForm from "./views/dashboard/WithdrawalForm";
import WithdrawalView from "./views/dashboard/WithdrawalView";
import WinnerListPage from "./views/winners/WinnerListPage";
import ScratchCardDetailPage from "./views/scratchcard/ScratchCardDetailPage";
import ScratchCardPlay from "./views/scratchcard/ScratchCardPlay";
import ScratchListPage from "./views/dashboard/ScratchListPage";
import ScratchCardWinner from "./views/winners/ScratchCardWinner";
import ScratchCardWinnerList from "./views/winners/ScratchCardWinnerList";
import ScratchCardBuyMore from "./views/scratchcard/ScratchCardBuyMore";
import Payment from "./views/components/Payment";
import KYC from "./views/dashboard/kyc";
import ResponsibleGaming from "./views/termsandconditions/ResponsibleGaming";
import SelfExclusion from "./views/termsandconditions/SelfExclusion";

const path = {
  baseUrl: config.mainUrl,
  assetsUrl: config.assetsUrl,
  apiUrl: config.apiUrl,
};

export default function RoutePath() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage props={path} />} />
      <Route exact path="/lotteries" element={<LotteryPage props={path} />} />
      <Route
        exact
        path="/lotteries/:id"
        element={<LotteryDetailPage props={path} />}
      />
      <Route
        exact
        path="/scratch-cards"
        element={<ScratchCardPage props={path} />}
      />
      <Route exact path="/faqs" element={<FaqPage props={path} />} />
      <Route exact path="/about-us" element={<AboutPage props={path} />} />
      <Route exact path="/help" element={<HelpPage props={path} />} />
      <Route exact path="/contact-us" element={<ContactPage props={path} />} />
      <Route exact path="/login" element={<LoginPage props={path} />} />
      <Route
        exact
        path="/forgot-password"
        element={<ForgotPasswordPage props={path} />}
      />
      <Route
        exact
        path="/registration"
        element={<RegistrationPage props={path} />}
      />
      <Route
        exact
        path="/general-terms-and-conditions"
        element={<TermsAndConditionsPage props={path} />}
      />
      <Route
        exact
        path="/responsible-gaming"
        element={<ResponsibleGaming props={path} />}
      />
      <Route
        exact
        path="/self-exclusion"
        element={<SelfExclusion props={path} />}
      />
      <Route
        path="/dashboard"
        exact
        element={
          <ProtectedRoute>
            <DashboardPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/ticket/:id/:number"
        element={
          <ProtectedRoute>
            <TicketDetailPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/deposit"
        element={
          <ProtectedRoute>
            <DepositesPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/ticketlist"
        element={
          <ProtectedRoute>
            <TicketListPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/withdrawal"
        element={
          <ProtectedRoute>
            <WithdrawalPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/withdrawal-history"
        element={
          <ProtectedRoute>
            <WithdrawalHistoryPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/changepassword"
        element={
          <ProtectedRoute>
            <ChangePasswordPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/authentication"
        element={
          <ProtectedRoute>
            <AuthenticationPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/total-wins"
        element={
          <ProtectedRoute>
            <TotalWinsPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/commission"
        element={
          <ProtectedRoute>
            <CommissionPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/referred-users"
        element={
          <ProtectedRoute>
            <ReferredUsersPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/support-ticket"
        element={
          <ProtectedRoute>
            <SupportTicketPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/new-support-ticket"
        element={
          <ProtectedRoute>
            <NewSupportTicketPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winners"
        element={
          <ProtectedRoute>
            <WinnerPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winnerlist/:id"
        element={
          <ProtectedRoute>
            <WinnerListPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winners/:id"
        element={
          <ProtectedRoute>
            <WinnerPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winners-scratch-card"
        element={
          <ProtectedRoute>
            <ScratchCardWinner props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winners-scratch-card/:id"
        element={
          <ProtectedRoute>
            <ScratchCardWinner props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/supportticketreplypage/:id"
        element={
          <ProtectedRoute>
            <SupportTicketReplyPage props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/deposit/:id"
        element={
          <ProtectedRoute>
            <DepositesView props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/withdrawal-form"
        element={
          <ProtectedRoute>
            <WithdrawalForm props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/withdrawal-form/:id"
        element={
          <ProtectedRoute>
            <WithdrawalForm props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/withdrawal-view/:id"
        element={
          <ProtectedRoute>
            <WithdrawalView props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/reference/:id"
        element={<RegistrationPage props={path} />}
      />
      <Route path="*" element={<Error />} />
      <Route
        // exact
        path="/scratch-cards/:name/:id"
        element={<ScratchCardDetailPage />}
      />
      <Route
        exact
        path="/scratch-cards-play/:name/:id"
        element={
          <ProtectedRoute>
            <ScratchCardPlay />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        exact
        path="/scratch-list"
        element={
          <ProtectedRoute>
            <ScratchListPage />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        exact
        path="/winners-scratch-card-list"
        element={
          <ProtectedRoute>
            <ScratchCardWinnerList />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/scratch-cards-buy/:name/:id"
        element={
          <ProtectedRoute>
            <ScratchCardBuyMore />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/payment/:id"
        element={
          <ProtectedRoute>
            <Payment props={path} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/kyc"
        element={
          <ProtectedRoute>
            <KYC props={path} />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        exact
        path="/total-wins/:id"
        element={
          <ProtectedRoute>
            <TotalWinsPage props={path} />
          </ProtectedRoute>
        }
      />
    </Routes>
    // </Suspense>
  );
}
