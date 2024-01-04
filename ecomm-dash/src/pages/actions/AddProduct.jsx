import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addProduct } from "../../redux/api/user-zero-api";

import {
  UilSave,
  UilPlus,
  UilTrashAlt,
  UilImageUpload,
  UilFileUploadAlt,
} from "@iconscout/react-unicons";
import LoadingCard from "../../components/globals/LoadingCard";
import "../../styles/addProduct.css";

export default function AddProduct() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [resApi, setResApi] = useState({ resStatus: 0, msg: "" });
  const [reqState, setReqState] = useState("LOAD");
  const [showMod, setShowMod] = useState(false);
  const [onSucc, setOnSucc] = useState(false);

  const [errInputMsg, setErrInputMsg] = useState("");
  const [showErrInput, setShowErrInput] = useState(false);

  const [sku, setSku] = useState("");
  const [pid, setPid] = useState("");
  const [slug, setSlug] = useState("");
  const [model, setModel] = useState("");
  const [colorway, setColorway] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [gen, setGen] = useState("");
  const [sizes, setSizes] = useState([]);
  const [priceRetail, setPriceRetail] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [hotRel, setHotRel] = useState(false);
  const [ledWall, setLedWall] = useState(false);
  const [ledWalSlug, setLedWalSlug] = useState("");
  const [file, setFile] = useState([]);

  const [numPng, setNumPng] = useState(0);
  const [numJpg, setNumJpg] = useState(0);
  const [numPdf, setNumPdf] = useState(0);

  const onChangeFile = (e) => {
    let maxImgConsent = 7;
    let maxJpgConsent = 6;
    if (e.target.files.length <= maxImgConsent) {
      let nPngUp = 0;
      let nJpgUp = 0;
      for (let i = 0; i < e.target.files.length; i++) {
        let fileExt = e.target.files[i].name.split(".")[1];
        let fileSize = e.target.files[i].size;

        if (fileSize < 1000001) {
          if (fileExt.toLowerCase() === "png") {
            nPngUp += 1;
          } else {
            nJpgUp += 1;
          }
        } else {
          console.log(
            "Dimensione file supera quella consentita (1MB) ~ fileName: " +
              e.target.files[i].name
          );
        }
      }
      setNumPng(nPngUp);
      setNumJpg(nJpgUp);

      console.log(nPngUp);
      console.log(nJpgUp);

      if (nPngUp === 1 && nJpgUp <= maxJpgConsent) {
        console.log("qui prende");
        const prevFiles = [...file];

        for (let i = 0; i < e.target.files.length; i++) {
          prevFiles.push(e.target.files[i]);
        }
        setFile(prevFiles);
        console.log(file);
      } else if (nPngUp > 1 && nJpgUp <= maxJpgConsent) {
        //err sotto il form
        console.log(
          "Numero massimo di PNG consentito (1) superato!" + nPngUp.length
        );
      } else if (nPngUp === 1 && nJpgUp > maxJpgConsent) {
        console.log(
          "Numero massimo di JPEG consentito (6) superato!" + nJpgUp.length
        );
      } else if (nPngUp === 0 && nJpgUp <= maxJpgConsent) {
        console.log("Necessario l'inserimento di un PNG!");
      }
    } else {
      //err sotto il form - troppe foto
      console.log(
        "Numero massimo di foto consentito (7) superato!" +
          e.target.files.length
      );
    }
  };

  const onChangePdfFile = (e) => {
    let prevFiles = [...file];

    for (let i = 0; i < e.target.files.length; i++) {
      prevFiles.push(e.target.files[i]);
    }
    setNumPdf(Number(e.target.files.length));
    setFile(prevFiles);
  };

  const handleChangeHotRel = (chkValue) => {
    setHotRel(chkValue.target.checked);
  };

  const handleChangeLedWall = (chkValue) => {
    setLedWall(chkValue.target.checked);
  };

  /* SIZE TABLE ---- */
  const [rows, setRows] = useState([{ size: "", size_q: "" }]);
  const columnsArray = ["size", "size_q"]; // pass columns here dynamically

  const handleAddRow = () => {
    const item = {};
    setRows([...rows, item]);
  };

  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  const updateState = (e) => {
    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[index]; // copy state object at index to a temporary object
    tempObj[prope] = prope === "size_q" ? Number(fieldValue) : fieldValue; // modify temporary object

    // return object to rows` clone
    tempRows[index] = tempObj;
    setRows(tempRows); // update state
    setSizes(rows);
  };

  //debug table
  const postResults = () => {
    const sizesJson = JSON.stringify(sizes);

    console.log(sizes);
    console.log(sizesJson);
    console.log(Object(JSON.parse(sizesJson)));
  };
  /* ---- */

  useEffect(() => {
    if (showMod) {
      setTimeout(updStatus(resApi), 3000);
    }

    if (onSucc) {
      setTimeout(onSuccActions, 2000);
    }
  }, [resApi, onSucc]);

  const handleSave = (e) => {
    setShowMod(true);

    e.preventDefault();

    const formData = new FormData();

    formData.append("sku", sku);
    formData.append("pid", pid);
    formData.append("slug", slug);
    formData.append("model", model);
    formData.append("colorway", colorway);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("gen", gen);
    formData.append("priceRetail", priceRetail);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("tags", tags);
    formData.append("hot_rel", hotRel);
    formData.append("led_wall", ledWall);
    formData.append("led_wall_slug", ledWalSlug);

    if (file && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("files", file[i]);
      }
    }

    if (typeof sizes === "object") {
      const sizesJson = JSON.stringify(sizes);
      formData.append("sizes", sizesJson);
    }
    console.log(...formData);

    try {
      addProduct({ setResApi }, formData, dispatch);
      if (onSucc) {
        setTimeout(onSuccActions(), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(resApi);

  const updStatus = (resApi) => {
    if (
      resApi.resStatus === 200 ||
      resApi.resStatus === 201 ||
      resApi.resStatus === 209
    ) {
      setReqState("PASS");
      setOnSucc(true);
    } else {
      setReqState("FAIL");
      setOnSucc(false);
    }
  };

  const onSuccActions = () => {
    setShowMod(false);
    navigate("/warehouse");
  };

  return (
    <>
      <div className="add-prod-layout">
        <div className="add-prod-form-cont">
          <form className="add-prod-form">
            <div className="add-prod-form-top">
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label className="form_input_details">SKU</label>
                  <input
                    type="text"
                    placeholder="SKU"
                    required
                    id="sku"
                    name="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
              </div>

              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    PID
                  </label>
                  <input
                    type="text"
                    placeholder="PID"
                    required
                    id="pid"
                    name="pid"
                    value={pid}
                    onChange={(e) => setPid(e.target.value)}
                  />
                </div>
              </div>

              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    SLUG
                  </label>
                  <input
                    type="text"
                    placeholder="SLUG"
                    required
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="Brand"
                    required
                    id="brand"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Modello
                  </label>
                  <input
                    type="text"
                    placeholder="Modello"
                    required
                    id="model"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Colorway
                  </label>
                  <input
                    type="text"
                    placeholder="Colorway"
                    required
                    id="colorway"
                    name="colorway"
                    value={colorway}
                    onChange={(e) => setColorway(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Genere
                  </label>
                  <input
                    type="text"
                    placeholder="F/M"
                    required
                    id="gen"
                    name="gen"
                    value={gen}
                    onChange={(e) => setGen(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Scarpe"
                    required
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Prezzo Retail
                  </label>
                  <input
                    type="number"
                    placeholder="Prezzo Retail"
                    required
                    id="priceRetail"
                    name="priceRetail"
                    value={priceRetail}
                    onChange={(e) => setPriceRetail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Prezzo
                  </label>
                  <input
                    type="number"
                    placeholder="Prezzo"
                    required
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Led Wall Name
                  </label>
                  <input
                    type="text"
                    placeholder="Led Wall Name"
                    required
                    id="ledWalSlug"
                    name="ledWalSlug"
                    value={ledWalSlug}
                    onChange={(e) => setLedWalSlug(e.target.value)}
                  />
                </div>
              </div>

              <div className="form_field_cont">
                <div className="form_check">
                  <input
                    type="checkbox"
                    id="hot-rel"
                    name="hot_rel"
                    checked={hotRel}
                    onChange={(event) => {
                      handleChangeHotRel(event);
                    }}
                  />
                  <label htmlFor="hot-rel" className="form_input_details">
                    <label htmlFor="label" className="checkbox">
                      <label htmlFor="label" className="check"></label>
                    </label>
                    🧱Hot Brick
                  </label>
                </div>

                <div className="form_check">
                  <input
                    type="checkbox"
                    id="ledWall"
                    name="ledWall"
                    checked={ledWall}
                    onChange={(event) => {
                      handleChangeLedWall(event);
                    }}
                  />
                  <label htmlFor="ledWall" className="form_input_details">
                    <label htmlFor="label" className="checkbox">
                      <label htmlFor="label" className="check"></label>
                    </label>
                    📌Led Wall
                  </label>
                </div>
              </div>
            </div>

            <div className="add-prod-form-middle">
              <div className="form_field_text_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Descrizione
                  </label>
                  <textarea
                    cols="30"
                    rows="10"
                    placeholder="Add description.."
                    id="desc"
                    name="desc"
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="form_field_text_cont">
                <div className="form_input_cont">
                  <label htmlFor="label" className="form_input_details">
                    Tags
                  </label>
                  <textarea
                    cols="30"
                    rows="10"
                    type="text"
                    placeholder="Add tags separated by ','"
                    id="tags"
                    name="tags"
                    required
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form_imgup_cont">
              <div className="form_imgup">
                <label className="form_imgup_ico" htmlFor="image">
                  <UilImageUpload size="40" />
                  Upload Images
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="images"
                    multiple
                    id="image"
                    name="images"
                    required
                    onChange={onChangeFile}
                  />
                </label>
              </div>
              <div className="form_imgup_initial">
                <b>Jpg caircati: {numJpg} </b>
                <b>Png caircati: {numPng} </b>
              </div>
            </div>

            <div className="form_imgup_cont">
              <div className="form_imgup">
                <label className="form_imgup_ico">
                  <UilFileUploadAlt size="40" />
                  Upload Receipt
                  <input
                    type="file"
                    accept="application/pdf"
                    placeholder="pdf"
                    id="pdf"
                    name="pdf"
                    required
                    onChange={onChangePdfFile}
                  />
                </label>
              </div>
              <div className="form_imgup_initial">
                <b>Pdf caircati: {numPdf} </b>
              </div>
            </div>

            <div className="add-prod-size-table-cont">
              <table className="add-prod-size-table" id="tab_logic">
                <thead>
                  <tr>
                    <th> # </th>
                    {columnsArray.map((column, index) => (
                      <th key={index}>
                        {column === "size" ? "Misura" : "Quantità"}
                      </th>
                    ))}
                    <th>
                      <button
                        className="form_table_add_row_btn"
                        onClick={handleAddRow}
                        type="button"
                      >
                        <UilPlus />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      {columnsArray.map((column, index) => (
                        <td key={index}>
                          {column === "size_q" ? (
                            <div className="form_field_cont">
                              <div className="form_input_cont">
                                <input
                                  type="number"
                                  placeholder="Quantity"
                                  column={column}
                                  value={rows[idx][column]}
                                  index={idx}
                                  className="input_table"
                                  onChange={(e) => updateState(e)}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="form_field_cont">
                              <div className="form_input_cont">
                                <input
                                  type="text"
                                  placeholder="Size"
                                  column={column}
                                  value={rows[idx][column]}
                                  index={idx}
                                  className="input_table"
                                  onChange={(e) => updateState(e)}
                                />
                              </div>
                            </div>
                          )}
                        </td>
                      ))}

                      <td>
                        <button
                          className="form_table_delete_row_btn"
                          type="button"
                          onClick={() => handleRemoveSpecificRow(idx)}
                        >
                          <UilTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* DEBUG SIZE FORMS */}
              {/* <a onClick={postResults} className="sizetablebtn">
                Debug Sizes
              </a> */}
            </div>

            <div className="form_btn_cont">
              <button
                //type="submit"
                type="button"
                className="form__btn"
                //onSubmit={handleSave}
                onClick={handleSave}
                encType="multipart/form-data"
              >
                <label htmlFor="label" className="btn__text">
                  Salva
                </label>
                <label htmlFor="label" className="btn__icon">
                  <UilSave />
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
      {showMod ? (
        <LoadingCard res={resApi} reqState={reqState} showMod={setShowMod} />
      ) : null}
    </>
  );
}
