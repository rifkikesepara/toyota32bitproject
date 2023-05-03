import React from "react";
import "../Pages/Terminal.css";
import useGetData from "../Hooks/GetData";
import API from "../Resources/api.json";

export default function Terminals() {
  const terminals = useGetData(API.link + "/terminals", 1000, () => {}); //fetching the terminal's data from the api

  return (
    <div className="container">
      <table>
        <tr>
          <th colSpan={3}>Tüm Terminaller</th>
        </tr>
        <tr>
          <th>Bölüm Bazında</th>
          <th colSpan={2} style={{ width: "80%" }}>
            Filtre Bazında
          </th>
        </tr>

        {terminals.data &&
          //iterating through every department's data in order to render rows of terminal table
          terminals.data.map((Data, _index) => {
            return (
              <tr>
                <td style={_index % 2 == 1 ? { background: "#d8aa36" } : {}}>
                  ({Data.shopCode}) {Data.depName}
                </td>
                <td
                  className="filters"
                  style={_index % 2 == 1 ? { background: "#d8aa36" } : {}}
                >
                  {
                    //iterating through every terminal according to their department and rendering them into suitable columns
                    Data.filterBaseds.map((filterData) => (
                      <a
                        href={`terminal/${Data.depCode}/${filterData.filterCode}`} //navigating to the exclusive login page according to the selected department and terminal
                      >
                        {filterData.linkCount != 1 && (
                          <b>{filterData.linkCount}</b>
                        )}
                        <td>{filterData.filterCode}</td>
                      </a>
                    ))
                  }
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
