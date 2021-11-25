import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/sidebar.css";
import $ from "jquery";
import { connect } from "react-redux";
/*Images*/
import imgdb from "../images/dashboard.svg";
import imgcg from "../images/down.svg";
import imgcontact from "../images/contacts.svg";
import imggroup from "../images/Groups.svg";
import imglivemonitor from "../images/livemonitor.svg";
import imgchannel from "../images/down.svg";
import imgsubchannel from "../images/hash.svg";
import imgadhoccalls from "../images/adhoccalls.svg";
import imgcampaigns from "../images/campaigns.svg";
import imgmanagedls from "../images/managedls.svg";
import imgcallsmmary from "../images/callsummary.svg";
import imgfaqs from "../images/faq.svg";

import imgdbact from "../images/dashboardactive.svg";
import imgcontactact from "../images/contactsactive.svg";
import imggroupact from "../images/Groupsactive.svg";
import imglivemonitoract from "../images/livemonitor.svg";
import imgchannelact from "../images/down.svg";
import imgsubchannelact from "../images/hash.svg";
import imgadhoccallsact from "../images/adhoccalls.svg";
import imgcampaignsact from "../images/campaigns.svg";
import imgmanagedlsact from "../images/managedls.svg";
import imgcallsmmaryact from "../images/callsummary.svg";
import imgfaqsact from "../images/faq.svg";

/*End*/

let pathname = "";
class sidebar extends Component {
  constructor(props) {
    super(props);
    this.props.state.contactbooks.search = "";
  }

  render() {
    pathname = window.location.pathname;
    const dashboard = pathname.match(/^\/dashboard/) ? "active" : "";
    const conacts = pathname.match(/^\/contact/) ? "active" : "";
    const groups = pathname.match(/^\/groups/) ? "active" : "";
    const lm = pathname.match(/^\/livemonitor/) ? "active" : "";
    const adcall = pathname.match(/^\/achoccalls/) ? "active" : "";
    const camp = pathname.match(/^\/campaigns/) ? "active" : "";
    const mdls = pathname.match(/^\/managedls/) ? "active" : "";
    const csar = pathname.match(/^\/summaryandreports/) ? "active" : "";
    const faq = pathname.match(/^\/faqs/) ? "active" : "";

    return (
      <div className="wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li className={dashboard}>
              <Link
                to="dashboard"
                aria-expanded="false"
                className=""
                id="lnkdb"
              >
                <div className="isactive"></div>
                <img
                  src={imgdb}
                  alt="Dashboard"
                  className="imgicon"
                  id="imgdb"
                />
                <i className="metismenu-icon lnr-layers" /> Dashboard
              </Link>
            </li>
            <li>
              <span
                href="#contactsgrpups"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <div className="isactive"></div>
                <img src={imgcg} alt="Contacts & Groups" className="imgicon" />
                <i className="metismenu-icon lnr-layers" />
                Contacts and Groups
                <ul className="collapse list-unstyled" id="contactsgrpups">
                  <li className={conacts}>
                    <Link
                      to="contacts"
                      aria-expanded="false"
                      className=""
                      id="lnkcont"
                    >
                      <div className="isactive"></div>
                      <img
                        src={imgcontact}
                        alt="Contacts"
                        className="imgicon"
                        id="imgcont"
                      />
                      <i className="metismenu-icon lnr-layers" /> Contacts
                    </Link>
                  </li>
                  <li className={groups}>
                    <Link
                      to="groups"
                      aria-expanded="false"
                      className=""
                      id="lnkgroup"
                    >
                      <div className="isactive"></div>
                      <img
                        src={imggroup}
                        alt="Groups"
                        className="imgicon"
                        id="imggroup"
                      />
                      <i className="metismenu-icon lnr-layers" /> Groups
                    </Link>
                  </li>
                </ul>
              </span>
            </li>
            <li className={lm}>
              <Link
                to="dashboard"
                aria-expanded="false"
                className=""
                id="lnklm"
              >
                <div className="isactive"></div>
                <img
                  src={imglivemonitor}
                  alt="Live Monitor"
                  className="imgicon"
                  id="imglm"
                />
                <i className="metismenu-icon lnr-layers" /> Live monitor
              </Link>
            </li>
            <li>
              <h4 className="addchannels">Add</h4>
              <span
                href="#channels"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <div className="isactive"></div>
                <img src={imgchannel} alt="Channels" className="imgicon" />
                <i className="metismenu-icon lnr-layers" />
                Channels
                <ul className="collapse list-unstyled" id="channels">
                  <li>
                    <Link
                      to="dashboard"
                      aria-expanded="false"
                      className=""
                      id="lnklm"
                    >
                      <div className="isactive"></div>
                      <img src={imgsubchannel} className="imgicon" />
                      <i className="metismenu-icon lnr-layers" /> HR_team
                    </Link>
                  </li>
                </ul>
              </span>
            </li>
            <li className={adcall}>
              <Link
                to="dashboard"
                aria-expanded="false"
                className=""
                id="lnkadcall"
              >
                <div className="isactive"></div>
                <img
                  src={imgadhoccalls}
                  alt="Adhoc Calls"
                  className="imgicon"
                  id="imgadcall"
                />
                <i className="metismenu-icon lnr-layers" /> Adhoc calls
              </Link>
            </li>
            <li className={camp}>
              <Link
                to="dashboard"
                aria-expanded="false"
                className=""
                id="lnkcamp"
              >
                <div className="isactive"></div>
                <img
                  src={imgcampaigns}
                  alt="Campaigns"
                  className="imgicon"
                  id="imgcamp"
                />
                <i className="metismenu-icon lnr-layers" /> Campaigns
              </Link>
            </li>
            <li className={mdls}>
              <Link
                to="manageDls"
                aria-expanded="false"
                className=""
                id="lnkmdls"
              >
                <div className="isactive"></div>
                <img
                  src={imgmanagedls}
                  alt="Manage DLs"
                  className="imgicon"
                  id="lnkmdls"
                />
                <i className="metismenu-icon lnr-layers" />
                Manage DLs
              </Link>
            </li>
            <li className={csar}>
              <Link
                to="dashboard"
                aria-expanded="false"
                className=""
                id="lnkcsar"
              >
                <div className="isactive"></div>
                <img
                  src={imgcallsmmary}
                  alt="Call Summary and Reoprts"
                  title="vs"
                  className="imgicon"
                  id="imgcsar"
                />
                <i className="metismenu-icon lnr-layers" /> Call summary and
                reports
              </Link>
            </li>
            <li className={faq}>
              <Link
                to="dashboard"
                aria-expanded="false"
                className=""
                id="lnkfaq"
              >
                <div className="isactive"></div>
                <img src={imgfaqs} alt="FAQs" className="imgicon" id="imgfaq" />
                <i className="metismenu-icon lnr-layers" /> FAQs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  componentDidMount() {
    // $("#sidebar").mCustomScrollbar({
    //   theme: "minimal",
    // });

    $("#sidebarCollapse").on("click", function () {
      // open or close navbar
      $("#sidebar").toggleClass("active");
      // close dropdowns
      $(".collapse.in").toggleClass("in");
      // and also adjust aria-expanded attributes we use for the open/closed arrows
      // in our CSS
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    /*Set Active  */
    if (pathname === "/dashboard") {
      $("#lnkdb").children(":first")[0].classList.add("activebar");
      $("#imgdb").attr("src", imgdbact);
    }

    if (pathname === "/contacts") {
      $("#lnkcont").children(":first")[0].classList.add("activebar");
      $("#imgcont").attr("src", imgcontactact);
    }
    if (pathname === "/groups") {
      $("#lnkgroup").children(":first")[0].classList.add("activebar");
      $("#imggroup").attr("src", imggroupact);
    }
    if (pathname === "/lm") {
      $("#lnklm").children(":first")[0].classList.add("activebar");
      $("#imglm").attr("src", imglivemonitoract);
    }
    if (pathname === "/adcall") {
      $("#lnkadcall").children(":first")[0].classList.add("activebar");
      $("#imgadcall").attr("src", imgadhoccallsact);
    }
    if (pathname === "/camp") {
      $("#lnkcamp").children(":first")[0].classList.add("activebar");
      $("#imgcamp").attr("src", imgcampaignsact);
    }
    if (pathname === "/mdls") {
      $("#lnkmdls").children(":first")[0].classList.add("activebar");
      $("#imgmdls").attr("src", imgmanagedlsact);
    }
    if (pathname === "/csar") {
      $("#lnkcsar").children(":first")[0].classList.add("activebar");
      $("#imgcsar").attr("src", imgcallsmmaryact);
    }
    if (pathname === "/faq") {
      $("#lnkfaq").children(":first")[0].classList.add("activebar");
      $("#imgfaq").attr("src", imgfaqsact);
    }
    // if (pathname === "/dashboard")
    //   $("#lnkdb").children(":first")[0].classList.add("activebar");
    /*End */
  }
}
const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps)(sidebar);
//export default sidebar;
