import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  UilSave,
  UilPlus,
  UilTrashAlt,
  UilImageUpload,
} from "@iconscout/react-unicons";
import "../../styles/addProduct.css";

import { useSelector } from "react-redux";
import { updateProduct } from "../../redux/api/user-zero-api";
import LoadingCard from "../../components/globals/LoadingCard";
import { publicReq } from "../../reqMethods";
import { clearAllSetItems } from "../../utils/addItemUtils";
import { useMemo } from "react";

export default function EditProductFn() {
  const [loadingState, setLoadingState] = useState(true);
  const [initialProd, setInitialProd] = useState({
    brand: "",
    category: "",
    colorway: "",
    desc: "",
    gen: "",
    hot_rel: false,
    images: [],
    in_stock: false,
    led_wall: false,
    led_wall_slug: "",
    model: "",
    pid: "",
    png: "",
    price: 0,
    priceRetail: 0,
    sizes: [],
    sku: "",
    slug: "",
    tags: [],
  });

  const [showMod, setShowMod] = useState(false);
  const [onSucc, setOnSucc] = useState();

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
  const [ledWallSlug, setLedWallSlug] = useState("");
  const [file, setFile] = useState();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  let navigate = useNavigate();

  //console.log(id);

  useMemo(() => {
    setLoadingState(true);
    const getProduct = async () => {
      try {
        const res = await publicReq.get("/prods/" + id);
        setInitialProd(res.data);

        setRows(initialProd.sizes);

        /* setRows((prev) => {
          return { ...prev, ...initialProd.sizes };
        });
        console.log(rows); */

        /* if (res) {
          setInitialProd({
            ...initialProd,
            brand: res.data.brand,
            category: res.data.category,
            colorway: res.data.colorway,
            desc: res.data.desc,
            gen: res.data.gen,
            hot_rel: res.data.hot_rel,
            images: res.data.images,
            in_stock: res.data.in_stock,
            led_wall: res.data.led_wall,
            led_wall_slug: res.data.led_wall_slug,
            model: res.data.model,
            pid: res.data.pid,
            png: res.data.png,
            price: res.data.price,
            priceRetail: res.data.priceRetail,
            sizes: res.data.sizes,
            sku: res.data.sku,
            slug: res.data.slug,
            tags: res.data.tags,
          });
        } */

        if (initialProd !== undefined || initialProd !== null) {
          setTimeout(() => {
            setLoadingState(false);
          }, 1000);
        }
      } catch (err) {
        return console.log(err);
      }
    };

    getProduct();
  }, []);

  console.log(initialProd);

  /*  useEffect(() => {
    if (initialProd.led_wall !== true) {
      console.log("SUCA");
      setLedWall(true);
    }
  }, []); */

  /* useEffect(() => {
    if (initialProd.led_wall === true) {
      console.log("SUCA");
      setLedWall(true);
    }
    if (initialProd.hot_rel === true) {
      setHotRel(true);
    }
    const setInitialValues = () => {
      if (initialProd !== null || initialProd !== undefined) {
        if (initialProd.sizes !== null || initialProd.sizes !== undefined) {
          const initialArrSizes = initialProd.sizes;
          console.log("ROWS" + rows);

          console.log("prod rows: " + initialProd.sizes);
          setRows((prev) => {
            return { ...prev, ...initialProd.sizes };
          });
        }
      }
    };

    setInitialValues();
  }, []); */

  const onChangeFile = (e) => {
    if (e.target.files.length < 8) {
      let nPngUp = 0;
      let nJpgUp = 0;
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].name.split(".")[1] === "png" || "PNG") {
          nPngUp += 1;
        } else {
          nJpgUp += 1;
        }
      }

      if (nPngUp === 1 && nJpgUp <= 6) {
        setFile(e.target.files);
      } else if (nPngUp > 1 && nJpgUp <= 6) {
        //err sotto il form
        console.log(
          "Numero massimo di PNG consentito (1) superato!" + nPngUp.length
        );
      } else if (nPngUp === 1 && nJpgUp > 6) {
        console.log(
          "Numero massimo di JPEG consentito (6) superato!" + nJpgUp.length
        );
      } else if (nPngUp === 0 && nJpgUp > 6) {
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

  const handleUpdate = (e) => {
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
    formData.append("led_wall_slug", ledWallSlug);
    for (let i = 0; i < file.length; i++) {
      formData.append("images", file[i]);
    }

    if (typeof sizes === "object") {
      const sizesJson = JSON.stringify(sizes);
      formData.append("sizes", sizesJson);
    }

    try {
      updateProduct(id, prodInput, dispatch);

      if (succState === true) {
        setOnSucc(true);
        console.log("PIGGHIALU!");
        setTimeout(afterUpdating, 2000);
      } else {
        setOnSucc(false);
        //SOSTITUIRE CON PULSANTE RETRY IN MODAL
        setTimeout(setShowMod(false), 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const afterUpdating = () => {
    navigate("/warehouse");
    console.log("SUCA dopo 3 sec");
    setOnSucc(false);
  };

  /*  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }; */

  const handleChangeChkLedW = (chkValue) => {
    setLedWall(chkValue.target.checked);
  };

  const handleChangeChkHotRel = (chkValue) => {
    setHotRel(chkValue.target.checked);
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

  /* if(loadingState === true) */
  return (
    <>
      {loadingState ? (
        <h1>LOADING...</h1>
      ) : (
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
                      //required
                      id="sku"
                      name="sku"
                      value={initialProd.sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">PID</lable>
                    <input
                      type="text"
                      placeholder="PID"
                      //required
                      id="pid"
                      name="pid"
                      value={initialProd.pid}
                      onChange={(e) => setPid(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">SLUG</lable>
                    <input
                      type="text"
                      placeholder="SLUG"
                      //required
                      id="slug"
                      name="slug"
                      value={initialProd.slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Brand</lable>
                    <input
                      type="text"
                      placeholder="Brand"
                      //required
                      id="brand"
                      name="brand"
                      value={initialProd.brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Modello</lable>
                    <input
                      type="text"
                      placeholder="Modello"
                      //required
                      id="model"
                      name="model"
                      value={initialProd.model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Colorway</lable>
                    <input
                      type="text"
                      placeholder="Colorway"
                      //required
                      id="colorway"
                      name="colorway"
                      value={initialProd.colorway}
                      onChange={(e) => setColorway(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Genere</lable>
                    <input
                      type="text"
                      placeholder="F/M"
                      //required
                      id="gen"
                      name="gen"
                      value={initialProd.gen}
                      onChange={(e) => setGen(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Categoria</lable>
                    <input
                      type="text"
                      placeholder="Scarpe"
                      //required
                      id="category"
                      name="category"
                      value={initialProd.category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Prezzo Retail</lable>
                    <input
                      type="number"
                      placeholder="Prezzo Retail"
                      //required
                      id="priceRetail"
                      name="priceRetail"
                      value={initialProd.priceRetail}
                      onChange={(e) => setPriceRetail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Prezzo</lable>
                    <input
                      type="number"
                      placeholder="Prezzo"
                      //required
                      id="price"
                      name="price"
                      value={initialProd.price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_field_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Led Wall Name</lable>
                    <input
                      type="text"
                      placeholder="Led Wall Name"
                      //required
                      id="ledWallSlug"
                      name="ledWallSlug"
                      value={initialProd.led_wall_slug}
                      onChange={(e) => setLedWallSlug(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form_field_cont">
                  <div className="form_check">
                    <input
                      type="checkbox"
                      id="hot-rel"
                      name="hot_rel"
                      checked={initialProd?.hot_rel === true ? true : false}
                      onChange={(event) => {
                        handleChangeChkHotRel(event);
                      }}
                    />
                    <label htmlFor="hot-rel" className="form_input_details">
                      <lable className="checkbox">
                        <lable className="check"></lable>
                      </lable>
                      🧱Hot Brick
                    </label>
                  </div>

                  <div className="form_check">
                    <input
                      type="checkbox"
                      id="ledWall"
                      name="ledWall"
                      checked={initialProd?.led_wall === true ? true : false}
                      onChange={(event) => {
                        handleChangeChkLedW(event);
                      }}
                    />
                    <label htmlFor="ledWall" className="form_input_details">
                      <lable className="checkbox">
                        <lable className="check"></lable>
                      </lable>
                      📌Led Wall
                    </label>
                  </div>
                </div>
              </div>

              <div className="add-prod-form-middle">
                <div className="form_field_text_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details" htmlFor="desc">
                      Descrizione
                    </lable>
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder="Add description.."
                      id="desc"
                      name="desc"
                      value={initialProd.desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form_field_text_cont">
                  <div className="form_input_cont">
                    <lable className="form_input_details">Tags</lable>
                    <textarea
                      cols="30"
                      rows="10"
                      type="text"
                      placeholder="Add tags.."
                      id="tags"
                      name="tags"
                      value={initialProd.tags}
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
                  </label>
                  <input
                    type="file"
                    placeholder="images"
                    multiple
                    id="image"
                    name="images"
                    onChange={onChangeFile}
                  />
                </div>

                <div className="form_imgup_initial">
                  <p>current imgs</p>
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
                    {rows?.map((item, idx) => (
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

                {/* RIMUOVERE QUANDO NON SERVE PIU'!!! */}
                <a onClick={postResults} className="sizetablebtn">
                  Debug Sizes
                </a>
              </div>

              <div className="form_btn_cont">
                <button
                  type="submit"
                  className="form__btn"
                  onSubmit={handleUpdate}
                  encType="multipart/form-data"
                >
                  <lable className="btn__text">Salva</lable>
                  <lable className="btn__icon">
                    <UilSave />
                  </lable>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMod ? <LoadingCard /> : null}
    </>
  );
}
