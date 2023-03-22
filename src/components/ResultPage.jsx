import React, { useEffect, useState } from "react";
import LogoOne from "../assets/images/logo.png";
// import ResultImg from "../assets/images/result.jpg";
import bkash_account_open from "../assets/images/testImages/bkash_account_open.jpg";
import bkash_bill from "../assets/images/testImages/bkash_bill.jpg";
import bkash_qr_code from "../assets/images/testImages/bkash_qr_code.jpg";
import nagad_bill_pay from "../assets/images/testImages/nagad_bill_pay.jpg";
import nagad_cash_out_charge from "../assets/images/testImages/nagad_cash_out_charge.jpg";
import nagad_islamic from "../assets/images/testImages/nagad_islamic.jpg";

const { REACT_APP_SERVER_ROOT: SERVER_ROOT } = process.env;

const area = {
  nagad_bill_pay: 40,
  nagad_cash_out_charge: 40,
  nagad_islamic: 40,
  bkash_account_open: 40,
  bkash_bill: 40,
  bkash_qr_code: 40,
};

const ResultPage = ({ setCurrentScene, result }) => {
  // const [image, setImage] = useState();
  // const [structuredResult, setStructuredResult] = useState([]);
  // const [total, setTotal] = useState();

  return (
    <div className="result_cal px-2">
      <div className="last_scene">
        <div className="logo_two">
          <img src={LogoOne} alt="logo" />
        </div>
        <div className="data_table mt-5">
          <h2>Feet Size</h2>
          <div className="inner_data_table">
            {result.Show_size && result.feet_size_cm ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Shoe Size</th>
                    <th scope="col">Feet Size(Cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.Show_size}</td>
                    <td>{result.feet_size_cm.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <>
                <h1>Sorry. No Size Found. Take your picture again</h1>
                <h1> No Size Found. </h1>
                <h1> Take your picture again</h1>
              </>
            )}
          </div>
        </div>

        <div className="scene_three_btn mt-5 text-center pb-5">
          <button className="global_btn" onClick={() => setCurrentScene(0)}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
