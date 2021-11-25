import { connect } from "react-redux";
import Header from "./header";
import Sidebar from "./sidebar";
import ReactNotification from "react-notifications-component";
import "../stylesheets/dashboard.css";
import Recentcalls from "./home/recentcalls";
import Upcomingcalls from "./home/upcomingcalls";


const Home = () => {


    return (
        <div>
            <Header />
            <Sidebar />
            <div id="content">
                <ReactNotification />
                <nav
                    className="navbar navbar-expand-lg navbar-light bg-light nav-bar-istudio"
                    style={{ paddingTop: "15px", boxShadow: "none" }}
                >
                    <div className="container-fluid container-fluid-istudio">
                        <i className="fas fa-align-left"></i>
                        <span className="title">Dashboard</span>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success macall btncommon"
                                    >
                                        Make Adhoc Call
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger schcall btncommon"
                                    >
                                        Schedule
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="btn btn-outline-info blastcall btncommon"
                                    >
                                        <div className="dropdown-toggle" data-toggle="dropdown">
                                            Blast <b className="caret" />
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav>
                    <div
                        className="nav nav-tabs nav-tabs-istuido"
                        id="nav-tab"
                        role="tablist"
                    >
                        <a
                            className="nav-item nav-link active"
                            id="nav-upcoming-tab"
                            data-toggle="tab"
                            href="#nav-upcoming"
                            role="tab"
                            aria-controls="nav-upcoming"
                            aria-selected="true"
                        >
                            Upcoming activity
                        </a>
                        <a
                            className="nav-item nav-link"
                            id="nav-recent-tab"
                            data-toggle="tab"
                            href="#nav-recent"
                            role="tab"
                            aria-controls="nav-recent"
                            aria-selected="false"
                        >
                            Recent activity
                        </a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="nav-upcoming"
                        role="tabpanel"
                        aria-labelledby="nav-upcoming-tab"
                    >
                        <Upcomingcalls />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-recent"
                        role="tabpanel"
                        aria-labelledby="nav-recent-tab"
                    >
                        <Recentcalls />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    state: state,
});

export default connect(mapStateToProps)(Home);
