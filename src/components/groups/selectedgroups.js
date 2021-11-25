import React, { useState, useEffect } from "react";
import removeimage from "../../images/x-circle.svg";
import info from "../../images/info.svg";

const SelectedGroups = ({
    groupdata,
    pagechange,
    Addgroup,
    viewexclude
}) => {

    const [group, setGroup] = useState([]);
    useEffect(() => {
        setGroup(groupdata);
    }, [pagechange, groupdata]);


    function removeselectedgroup(event, data, index) {
        Addgroup(event, data, index);
    }

    return (

        <div>
            <div className="table-responsive" style={{ width: "99%" }}>
                <table className="table" cellSpacing="0">
                    <tbody>
                        <tr className="rowstyle">
                            <td className="gridheader">Group Name</td>
                            <td className="gridheader">Total</td>
                            <td className="gridheader">Selected</td>
                            <td className="gridheader">Excluded</td>
                            <td className="gridheader">Remove</td>
                        </tr>
                        {group.map((tdata, i) => (
                            <tr className="rowstyle" key={i}>
                                <td className="gridrow">{tdata.groupname}</td>
                                <td className="gridrow">{tdata.totalmembers}</td>
                                <td className="gridrow">{tdata.selected}</td>
                                <td className="gridrow" align="right">
                                    <span>{tdata.excluded}</span>
                                    {tdata.excluded > 0 ? <img src={info} alt='Remove' style={{ cursor: 'pointer', float: 'right', marginRight: '33px' }} onClick={(e) => viewexclude(e, tdata, i)} /> : ''} </td>
                                <td className="gridrow">
                                    <img src={removeimage} alt='Remove' style={{ cursor: 'pointer' }} onClick={(e) => removeselectedgroup(e, tdata, i)} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default (SelectedGroups);