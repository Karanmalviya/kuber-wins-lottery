import FooterPage from './footer.component';
import { connect } from 'react-redux';
// import { pdfStart, pdfUpload, pdfProcess, pdfDownload, setConvertType } from './../../api/user/userAction';

// const mapDispatchToProps = {
//     pdfStart,
//     pdfUpload,
//     pdfProcess,
//     pdfDownload,
//     setConvertType
// }

// const mapStateToProps = state => ({
//     isStart: state.userPage.isStart,
//     isUpload: state.userPage.isUpload,
//     isProcess: state.userPage.isProcess,
//     isDownload: state.userPage.isDownload,
//     isError: state.userPage.isError,
//     reviews: state.userPage.reviews,
//     pdfResponse: state.userPage.pdfResponse,
//     uploaded: state.userPage.uploaded,
//     processed: state.userPage.processed,
//     download: state.userPage.download,
//     convertType: state.userPage.convertType,
// });

export const FooterPageContainer = connect(null)(FooterPage); 
// export const CompresserPageContainer = connect(mapStateToProps, mapDispatchToProps)(CompresserPage); 