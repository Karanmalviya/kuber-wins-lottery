import AppRoot from './app-root.component';
import { connect } from 'react-redux';

// const mapStateToProps = state => ({
//     loggedUser: state.userPage.loggedUser,
//     isLoggedIn: state.userPage.isLoggedIn,
// });

export const AppRootContainer = connect(null)(AppRoot);
// export const AppRootContainer = connect(mapStateToProps, {})(AppRoot);