import React, { useEffect, useState } from "react";
import LogoOne from "../assets/images/logo_1.png";
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
  const [image, setImage] = useState();
  const [structuredResult, setStructuredResult] = useState([]);
  const [total, setTotal] = useState();

  const percentageCalculator = (value, sum) => {
    console.log(value, sum);
    return (value * 100) / sum;
  };

  const findImage = (title) => {
    switch (title) {
      case "nagad_bill_pay":
        return <img src={nagad_bill_pay} alt="result " height={40} />;
      case "nagad_cash_out_charge":
        return <img src={nagad_cash_out_charge} alt="result " height={40} />;
      case "nagad_islamic":
        return <img src={nagad_islamic} alt="result " height={40} />;
      case "bkash_account_open":
        return <img src={bkash_account_open} alt="result " height={40} />;
      case "bkash_bill":
        return <img src={bkash_bill} alt="result " height={40} />;
      case "bkash_qr_code":
        return <img src={bkash_qr_code} alt="result " height={40} />;

      default:
        return <img src={bkash_account_open} alt="result " height={40} />;
    }
  };
  const CountTable = () => {
    return (
      <div className="data_table">
        <h2>Count</h2>
        <div className="inner_data_table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">POSM Image</th>
                <th scope="col">POSM Name</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>
              {structuredResult?.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                  {findImage(e.title)}
                  </td>
                  <td>{e.posm}</td>
                  <td>{e.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const RatioTable = () => {
    let sumBkash = 0;
    let sumNagad = 0;

    structuredResult?.map((e, i) => {
      if (e.mfs === "bkash") {
        sumBkash += parseFloat(
          percentageCalculator(e.area * e.count, total).toFixed(1)
        );
      } else {
        sumNagad += parseFloat(
          percentageCalculator(e.area * e.count, total).toFixed(1)
        );
      }
    });

    return (
      <div className="data_table mt-5">
        <h2>Ratio</h2>
        <div className="inner_data_table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">MFS</th>
                <th scope="col">Percentage (%)</th>
              </tr>
            </thead>
            <tbody>
              {sumBkash > 0 && (
                <tr>
                  <td>1</td>

                  <td>Bkash</td>
                  <td>{sumBkash.toFixed(1)}%</td>
                </tr>
              )}
              {sumNagad > 0 && (
                <tr>
                  <td>{sumNagad>0 && sumBkash>0?"2":"1" }</td>
                  <td>Nagad</td>
                  <td>{sumNagad.toFixed(1)}%</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const IndividualPOSMRatioTable = () => {
    return (
      <div className="data_table mt-5">
        <h2>Individual POSM Ratio</h2>
        <div className="inner_data_table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">POSM Image</th>
                <th scope="col">POSM Name</th>
                <th scope="col">
                  Percentage
                  <br />
                  (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {structuredResult.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{findImage(e.title)}</td>
                  <td>{e.posm}</td>
                  <td>
                    {percentageCalculator(e.area * e.count, total).toFixed(1)} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const { out } = result;

    let tempArray = [];
    let ratio = [];
    let total = 0;
    setImage(`${SERVER_ROOT}/${out.path.preview}`);

    Object.keys(out).map((e, i) => {
      if (e !== "path") {
        let title = e.split("_");
        total = total + area[e] * out[e];
        let obj = {
          title: e,
          img: `${SERVER_ROOT}/${out.path.preview}`,
          area: area[e],
          posm: title.join(" "),
          mfs: title[0],
          count: out[e],
        };
        tempArray.push(obj);
      }
    });

    setTotal(total);
    setStructuredResult(tempArray);
  }, [result]);
  console.log("structuredResult", structuredResult);
  return (
    <div className="result_cal px-2">
      <div className="last_scene">
        <div className="logo_two">
          <img src={LogoOne} alt="logo" />
        </div>
        <div className="scene_three_picture">
          {/* <h2>Result</h2> */}
          {/* <img src={image} alt="result " height={400} /> */}
        </div>
        <CountTable />
        <RatioTable />
        <IndividualPOSMRatioTable />
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
