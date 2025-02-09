import React, {useEffect, useState} from "react";
import {ProtectedRoute} from "./shared/protected.route";
import {Routes, Route} from "react-router-dom";
import {LoginPageContainer} from "./views/login/login.container";
import {DashboardPageContainer} from "./views/dashboard/dashboard.container";
import {ScratchListPageContainer} from "./views/scratchList/scratchList.container";
import {AddScratchPageContainer} from "./views/addScratch/addScratch.container";
import {LotteriesPageContainer} from "./views/lotteries/lotteries.container";
import {LotteryPhasePageContainer} from "./views/lotteryphases/lotteryphases.container";
import {AddLotteriesPageContainer} from "./views/addLotteries/addLotteries.container";
import {ViewLotteriesPageContainer} from "./views/viewLotteries/viewLotteries.container";
import {AddLotteryPhasePageContainer} from "./views/addlotteryPhase/addlotteryPhase.container";
import {ViewLotteriesPhasePageContainer} from "./views/viewLotteriesPhase/viewLotteriesPhase.container";
import {ActiveUsersPageContainer} from "./views/activeusers/activeusers.container";
import {InActiveUsersPageContainer} from "./views/inactiveusers/inactiveusers.container";
import {EmailUnvarifiedPageContainer} from "./views/emailunvarified/emailunvarified.container";
import {MobileUnvarifiedPageContainer} from "./views/mobileunvarified/mobileunvarified.container";
import {KycUnvarifiedPageContainer} from "./views/kycunvarified/kycunvarified.container";
import {KycPendingPageContainer} from "./views/kycpending/kycpending.container";
import {WithBalancePageContainer} from "./views/withbalance/withbalance.container";
import {AllusersPageContainer} from "./views/allusers/allusers.container";
import {NotificationToAllPageContainer} from "./views/notificationtoall/notificationtoall.container";
import {AllTicketPageContainer} from "./views/allTicket/allTicket.container";
import {TicketDetailPageContainer} from "./views/ticketDetail/ticketDetail.container";
import {UserDetailPageContainer} from "./views/allUserDetail/allUserDetail.container";
import {UserTransactionPageContainer} from "./views/usertransaction/usertransaction.container";
import {UserWithdrawPageContainer} from "./views/userwithdraw/userwithdraw.container";
import {UserDepositPageContainer} from "./views/userdeposit/userdeposit.container";
import {LoginLogsPageContainer} from "./views/loginlogs/loginlogs.container";
import {SendEmailPageContainer} from "./views/sendemail/sendemail.container";
import {WinnerPageContainer} from "./views/winners/winners.container";
import {ReferalPageContainer} from "./views/referal/referal.container";
import {SubscriberDetailsPageContainer} from "./views/subscriberDetails/subscriberDetails.container";
import {SubscriberListPageContainer} from "./views/subscriberList/subscriberList.container";
import Error from "./views/404";
import {DepositeListPageContainer} from "./views/depositList/depositList.container";
import {TransactionLogPageContainer} from "./views/transactionLog/transactionLog.container";
import {AllTicketPageReplyContainer} from "./views/allTicketReply/allTicketReply.container";
import {WithdrawalsPageContainer} from "./views/withdrawl/withdrawal.container";
import {WithdrawalsDetailsPageContainer} from "./views/withDrawDetails/withDrawDetails.container";
import {EmailHistoryPageContainer} from "./views/emailHistory/emailHistory.container";
import {SoldTicketsPageContainer} from "./views/soldTickets/soldTickets.container";
import {DepositCommissionLogPageContainer} from "./views/depositcommissionLog/depositCommissionLog.container";
import {BuyCommissionLogPageContainer} from "./views/buycommissionlog/buyCommissionLog.container";
import {WinCommissionLogPageContainer} from "./views/wincommissionLog/winCommissionLog.container";
import {GameReportPageContainer} from "./views/gameReport/gameReport.container";
import {ViewScratchCardPageContainer} from "./views/viewScratchCards/viewScratchCard.container";
import {SoldScratchCardsPageContainer} from "./views/soldScratchCards/soldScratchCards.container";
import {ScratchCardWinnerPageContainer} from "./views/scratchCardWinner/scratchCardWinner.container";
import {UserReferalPageContainer} from "./views/userreferal/userreferal.container";
import {WinnerHistoryPageContainer} from "./views/winnerhistory/winnerHistory.container";
import {StaffListPageContainer} from "./views/staffList/staffList.container";
import {AddStaffPageContainer} from "./views/addStaff/addStaff.container";
import {fetchSubAdminById} from "./api/staff/stafftAction";
import {useSelector} from "react-redux";
import {ChangePasswordPageContainer} from "./views/change_Password/changePassword.container";
import {ProfilePageContainer} from "./views/profile/profile.container";
import {TwofaPageContainer} from "./views/2FA/2fa.container";
import {Protected2FARoute} from "./shared/protected2FA.route";
import {StaffForgetPasswordPageContainer} from "./views/staffForgetPassword/staffForgetPassword.container";
import {fetchAdminData} from "./api/user/userAction";
import {decrypt} from "./utils/encryptdecrypt";
import {AddBankAccountPageContainer} from "./views/addBankAccount/addBankAccount.container";
import {BankAccountsPageContainer} from "./views/bankAccounts/bankAccounts.container";
import {LotteryRewardsPageContainer} from "./views/lotteryRewards/lotteryRewards.container";
import {DepositsDetailsPageContainer} from "./views/depositsDetails/depositsDetails.container";
import {LotteryRewardsLogPageContainer} from "./views/lotteryRewardsLog/lotteryRewardsLog.container";
import {ManualLotteriesPageContainer} from "./views/manualLotteries/manualLotteries.container";
import {ManualLotteriesHistoryPageContainer} from "./views/manualLotteriesHistory/manualLotteriesHistory.container";

const emptyData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  AdminId: "",
  role: "admin",
  manage_lottery: {
    lottery: false,
    lottery_phase: false,
  },
  manage_scratchCard: {
    scratchCard: false,
    add_scratchCard: false,
  },
  manage_reports: {
    game_report: false,
    transaction_log: false,
    commission_log: false,
    login_history: false,
    email_history: false,
    lottery_winners: false,
    scratchCard_winners: false,
    sold_lottery: false,
    sold_scratchCard: false,
  },
  manage_referrals: false,
  manage_users: false,
  manage_deposits: false,
  manage_withdrawals: false,
  manage_supportTickets: false,
  manage_subscribers: false,
};

export const RoutePath = () => {
  const isLoggedIn = useSelector((state) => state.userPage.isLoggedIn);
  const subAdminById = useSelector((state) => state.staffPage.subAdminById);
  const adminDataById = useSelector((state) => state.userPage.adminDataById);
  const adminData = localStorage.getItem("user");
  const admin = isLoggedIn && adminData && JSON.parse(adminData);
  const [selected, setSelected] = useState(emptyData);

  useEffect(() => {
    if (isLoggedIn) {
      if (admin.role === "sub-admin") {
        fetchSubAdminById(admin.id);
      } else {
        fetchAdminData(admin.id);
      }
    }
  }, [admin, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      if (admin.role === "sub-admin" && Object.keys(subAdminById).length) {
        setSelected(subAdminById);
      }
      if (admin.role === "admin" && Object.keys(adminDataById).length) {
        setSelected(adminDataById);
      }
    }
  }, [subAdminById, adminDataById]);

  // console.log(selected);

  const isVerifiedForChangePassword =
    localStorage.getItem("isVerifiedPassword");
  const isRequired2FA = (role, isVerifed) => {
    if (decrypt(isVerifiedForChangePassword) === "true") {
      return <ChangePasswordPageContainer />;
    }
    if (role === "admin") {
      if (isVerifed) {
        return <TwofaPageContainer />;
      } else {
        return <ProfilePageContainer />;
      }
    } else {
      return <ChangePasswordPageContainer />;
    }
  };
  // console.log(isRequired2FA(selected.role, selected.twofa_verification));

  console.log(isVerifiedForChangePassword);
  return (
    <Routes>
      <Route exact path="/login" element={<LoginPageContainer />} />
      <Route
        exact
        path="/two-factor"
        element={
          <Protected2FARoute
            permission={selected.role === "admin" ? true : false}
          >
            <TwofaPageContainer />
          </Protected2FARoute>
        }
      />{" "}
      <Route
        exact
        path={"/change-password"}
        element={
          <ProtectedRoute permission={true}>
            {isRequired2FA(selected.role, selected.twofa_verification)}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/forget-password"
        element={
          // <ProtectedRoute permission={selected.role === "admin" ? false : true}>
          <StaffForgetPasswordPageContainer />
          // </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute permission={true}>
            <DashboardPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lotteries"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <LotteriesPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/manual-draw"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ManualLotteriesPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/manual-draw-history"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ManualLotteriesHistoryPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/scratch-list"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_scratchCard.scratchCard
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ScratchListPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/add-scratch"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_scratchCard.add_scratchCard
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AddScratchPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/add-scratch/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_scratchCard.add_scratchCard
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AddScratchPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/view-scratch/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_scratchCard.scratchCard
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ViewScratchCardPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lottery"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AddLotteriesPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/add-lotteries/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AddLotteriesPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/view-lotteries/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ViewLotteriesPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lottery-phases"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery_phase
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <LotteryPhasePageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lottery-phase"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery_phase
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AddLotteryPhasePageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/view-lottery-phase/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery_phase
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ViewLotteriesPhasePageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lottery-phase/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_lottery.lottery_phase
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AddLotteryPhasePageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/active-users"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ActiveUsersPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/inactive-users"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <InActiveUsersPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/email-unverified"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <EmailUnvarifiedPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/mobile-unverified"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <MobileUnvarifiedPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/kyc-unverified"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <KycUnvarifiedPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/kyc-pending"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <KycPendingPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/with-balance"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <WithBalancePageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/all-users"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AllusersPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/all-user-detail/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <UserDetailPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/notification-to-all"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <NotificationToAllPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/all-tickets"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_supportTickets
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AllTicketPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/all-ticket-detail/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_supportTickets
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <TicketDetailPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/user/all/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <UserTransactionPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/user/withdraw/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <UserWithdrawPageContainer />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        exact
        path="/user/referal/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <UserReferalPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/user/deposit/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <UserDepositPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/login-logs/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <LoginLogsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/login-logs"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.login_history
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <LoginLogsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/send-mail/:id?"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <SendEmailPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winners/:id?"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_users
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <WinnerPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/all-ticket-page-reply/:id"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_supportTickets
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <AllTicketPageReplyContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/referal"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_referrals
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ReferalPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/subscriber-details"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_subscribers
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <SubscriberDetailsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/subscriber-list"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_subscribers
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <SubscriberListPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Error />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/deposit-list"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_deposits
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<DepositeListPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/transaction-log"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.transaction_log
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<TransactionLogPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/sold-tickets"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.sold_lottery
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<SoldTicketsPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/deposit-commission"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.commission_log
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<DepositCommissionLogPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/buy-commission"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.commission_log
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<BuyCommissionLogPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/win-commission"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.commission_log
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<WinCommissionLogPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/email-history"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.email_history
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<EmailHistoryPageContainer />}
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/winner-history"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.lottery_winners
                : selected.role === "admin"
                ? true
                : false
            }
          >
            {<WinnerHistoryPageContainer />}
          </ProtectedRoute>
        }
      />{" "}
      <Route
        exact
        path="/sold-scratch-cards"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.sold_scratchCard
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <SoldScratchCardsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/scratch-cards-winner"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_reports.scratchCard_winners
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <ScratchCardWinnerPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/game-report"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin" &&
              (Object.values(selected.manage_scratchCard).some(
                (value) => value === true
              ) ||
                Object.values(selected.manage_lottery).some(
                  (value) => value === true
                ))
                ? selected.manage_reports.game_report
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <GameReportPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/all-withdrawals"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_withdrawals
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <WithdrawalsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/withdrawals-details"
        element={
          <ProtectedRoute
            permission={
              selected.role === "sub-admin"
                ? selected.manage_withdrawals
                : selected.role === "admin"
                ? true
                : false
            }
          >
            <WithdrawalsDetailsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/staffs"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <StaffListPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/add-staff"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <AddStaffPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/add-staff/:id"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <AddStaffPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/add-bank-account"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <AddBankAccountPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/bank-accounts"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <BankAccountsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/bank-accounts/:id"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <AddBankAccountPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/deposit/:id"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <DepositsDetailsPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lottery-rewards"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <LotteryRewardsPageContainer />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        exact
        path="/lottery-rewards-log"
        element={
          <ProtectedRoute permission={admin.role === "admin" ? true : false}>
            <LotteryRewardsLogPageContainer />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute permission={true}>
            <ProfilePageContainer />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
