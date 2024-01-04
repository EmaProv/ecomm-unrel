import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "../../redux/reducers/ProductRedux";
import LoadingCard from "../../components/globals/LoadingCard";
import { userReq, publicReq } from "../../reqMethods";

import {
  UilSave,
  UilPlus,
  UilTrashAlt,
  UilImageUpload,
  UilFileUploadAlt,
  UilEye,
  UilFile,
} from "@iconscout/react-unicons";

import "../../styles/addProduct.css";

function utilsUseHooksCls(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingState: true,
      showMod: false,
      onSucc: false,
      resApi: { resStatus: 0, msg: "" },
      reqState: "LOAD",
      columnsArray: ["size", "size_q"],
      rows: [
        {
          size: "",
          size_q: "",
        },
      ],
      initialTest: {},
      initialProd: {
        brand: "",
        category: "",
        colorway: "",
        desc: "",
        gen: "",
        hot_rel: false,
        images: [],
        tmpFiles: [],
        in_stock: false,
        led_wall: false,
        led_wall_slug: "",
        model: "",
        pid: "",
        png: "",
        pdf: "",
        price: 0,
        priceRetail: 0,
        sizes: [],
        sku: "",
        slug: "",
        tags: [],
      },
    };

    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.id;
    try {
      publicReq
        .get("prods/" + id)
        .then((res) => {
          this.setState({ initialProd: res.data });
          this.setState({ rows: res.data.sizes });
          console.log("RES");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (res !== undefined || res !== null) {
            setTimeout(() => {
              this.setState({ loadingState: false });
            }, 1000);
          }
        });
    } catch (err) {
      return console.log(err);
    }
  }

  componentWillUnmount() {
    //che metto qui?
  }

  handleChangeInput = (e) => {
    this.setState((prev) => {
      return {
        initialProd: {
          ...prev.initialProd,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  onChangeFile = (e) => {
    let maxImgConsent = 7;
    let maxJpgConsent = 6;
    let totCurrentImgs = 0;
    let remainTotImgToUp = 0;
    let remainJpgToUp = 0;

    console.log("CHANGE FILE----------");
    console.log(this.state.initialProd);

    let currentJpg = this.state.initialProd.images.length;

    let currentPng = this.state.initialProd.png !== null ? true : false;

    if (currentPng) {
      totCurrentImgs = currentJpg + 1;
    } else {
      totCurrentImgs = currentJpg;
    }

    remainTotImgToUp = maxImgConsent - totCurrentImgs;
    remainJpgToUp = maxJpgConsent - currentJpg;

    console.log(e.target.files.length);

    if (e.target.files.length <= remainTotImgToUp) {
      let nPngUp = 0;
      let nJpgUp = 0;
      console.log(e.target.files);
      for (let i = 0; i < e.target.files.length; i++) {
        let fileExt = e.target.files[i].name.split(".")[1];
        let fileSize = e.target.files[i].size;

        if (fileSize < 1000001) {
          if (fileExt.toLowerCase() === "png") {
            if (currentPng === false) {
              nPngUp += 1;
            } else {
              console.log("Png già inserito.");
            }
          } else {
            if (remainJpgToUp > 0) {
              nJpgUp += 1;
            } else {
              console.log("Numero massimo di JPEG consentito (6) superato!");
            }
          }
        } else {
          console.log(
            "Dimensione file supera quella consentita (1MB) ~ fileName: " +
              e.target.files[i].name
          );
        }
      }

      if (
        (nPngUp === 1 && nJpgUp <= remainJpgToUp) ||
        (currentPng === true && nJpgUp <= remainJpgToUp)
      ) {
        let cacheImgs = [];
        if (
          this.state.initialProd.tmpFiles &&
          this.state.initialProd.tmpFiles.length > 0
        ) {
          for (let i = 0; i < this.state.initialProd.tmpFiles.length; i++) {
            cacheImgs.push(this.state.initialProd.tmpFiles[i]);
          }
        }
        for (let i = 0; i < e.target.files.length; i++) {
          cacheImgs.push(e.target.files[i]);
        }

        this.setState((prev) => {
          return {
            prev,
            initialProd: {
              ...prev.initialProd,
              tmpFiles: cacheImgs,
            },
          };
        });
      } else if (nPngUp > 1 && nJpgUp <= 6) {
        //err sotto il form
        console.log(
          "Numero massimo di PNG consentito (1) superato!" + nPngUp.length
        );
      } else if (nPngUp === 1 && nJpgUp > 6) {
        console.log(
          "Numero massimo di JPEG consentito (6) superato!" + nJpgUp.length
        );
      } else if (nPngUp === 0 && nJpgUp <= 6) {
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

  onChangePdfFile = (e) => {
    let currentPdf = this.state.initialProd.pdf !== "null" ? true : false;
    let cacheFiles = [];
    if (
      this.state.initialProd.tmpFiles &&
      this.state.initialProd.tmpFiles.length > 0
    ) {
      for (let i = 0; i < this.state.initialProd.tmpFiles.length; i++) {
        cacheFiles.push(this.state.initialProd.tmpFiles[i]);
      }
    }

    for (let i = 0; i < e.target.files.length; i++) {
      cacheFiles.push(e.target.files[i]);
    }

    if (currentPdf === false) {
      this.setState((prev) => {
        return {
          prev,
          initialProd: {
            ...prev.initialProd,
            tmpFiles: cacheFiles,
          },
        };
      });
    } else {
      console.log("Cancellare prima il vecchio pdf per cambiarlo.");
    }
  };

  handleRemovePng() {
    let tempProd = { ...this.state.initialProd };
    tempProd.png = null;
    console.log(tempProd);
    this.setState((prev) => {
      return {
        prev,
        initialProd: {
          ...prev.initialProd,
          png: null,
        },
      };
    });
  }

  handleRemovePdf() {
    let tempProd = { ...this.state.initialProd };
    tempProd.pdf = null;
    this.setState((prev) => {
      return {
        prev,
        initialProd: {
          ...prev.initialProd,
          pdf: null,
        },
      };
    });
  }

  handleRemoveSpecificImg = (index) => {
    const tempImages = this.state.initialProd.images;
    tempImages.splice(index, 1);
    this.setState((prev) => {
      return {
        prev,
        tempImages,
      };
    });
  };

  handleChangeInputChkLedW(chkValueEv) {
    const initialProdTmp = this.state.initialProd;
    initialProdTmp.led_wall = chkValueEv.target.checked;
    this.setState({ initialProd: initialProdTmp });
  }

  handleChangeInputChkHotRel(chkValueEv) {
    const initialProdTmp = this.state.initialProd;
    initialProdTmp.hot_rel = chkValueEv.target.checked;
    this.setState({ initialProd: initialProdTmp });
  }

  /* SIZE TABLE ---- */
  // pass columns here dynamically
  handleAddRow() {
    const tempRows = this.state.rows;
    const emptyItemToAdd = { size: "", size_q: "" };
    tempRows.push(emptyItemToAdd);
    this.setState((prev) => {
      return {
        prev,
        tempRows,
      };
    });
  }

  handleRemoveSpecificRow = (idx) => {
    const tempRows = this.state.rows;
    tempRows.splice(idx, 1);
    this.setState((prev) => {
      return {
        prev,
        tempRows,
      };
    });
  };

  updateState = (e) => {
    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...this.state.rows]; // avoid direct state mutation
    const tempObj = this.state.rows[index]; // copy state object at index to a temporary object
    tempObj[prope] = prope === "size_q" ? Number(fieldValue) : fieldValue; // modify temporary object

    // return object to rows` clone
    tempRows[index] = tempObj;

    this.setState((prev) => {
      return {
        prev,
        tempRows,
      };
    }); // update state
  };

  //debug table
  debugLogTable = () => {
    const sizesJson = JSON.stringify(this.state.initialProd.sizes);

    console.log(this.state.initialProd.sizes);
    console.log(sizesJson);
    console.log(Object(JSON.parse(sizesJson)));
  };
  /* ---- */

  updateProduct = async (id, updProduct) => {
    this.props.updateProductStart();

    try {
      const res = await userReq.put(`/prods/${id}`, updProduct);
      if (res && res.response) {
        this.setState(
          (prev) => {
            return {
              prev,
              resApi: {
                resStatus: res.response.status,
                msg: res.response.data.msg,
              },
            };
          },
          () => {
            setTimeout(this.updStatus(this.state.resApi), 3000);
          }
        );
      } else {
        this.setState(
          (prev) => {
            return {
              prev,
              resApi: {
                resStatus: res.status,
                msg: res.statusText,
              },
            };
          },
          () => {
            setTimeout(this.updStatus(this.state.resApi), 3000);
          }
        );
      }

      this.props.updateProductSuccess();
    } catch (err) {
      if (err && err.response) {
        this.setState((prev) => {
          return {
            prev,
            resApi: {
              resStatus: err.response.status,
              msg: err.response.data.msg,
            },
          };
        }, this.updStatus(this.state.resApi));
      } else {
        this.setState((prev) => {
          return {
            prev,
            resApi: {
              resStatus: err.status,
              msg: err.statusText,
            },
          };
        }, this.updStatus(this.state.resApi));
      }
      console.log(err);
      this.props.updateProductFailure();
    }
  };

  handleUpdate(e) {
    const id = this.props.params.id;
    this.setState((prev) => {
      return {
        prev,
        showMod: true,
      };
    });

    e.preventDefault();
    const formData = new FormData();

    formData.append("sku", this.state.initialProd.sku);
    formData.append("pid", this.state.initialProd.pid);
    formData.append("slug", this.state.initialProd.slug);
    formData.append("model", this.state.initialProd.model);
    formData.append("colorway", this.state.initialProd.colorway);
    formData.append("category", this.state.initialProd.category);
    formData.append("brand", this.state.initialProd.brand);
    formData.append("gen", this.state.initialProd.gen);
    formData.append("priceRetail", this.state.initialProd.priceRetail);
    formData.append("price", this.state.initialProd.price);
    formData.append("desc", this.state.initialProd.desc);
    formData.append("tags", this.state.initialProd.tags);
    formData.append("hot_rel", this.state.initialProd.hot_rel);
    formData.append("led_wall", this.state.initialProd.led_wall);
    formData.append("led_wall_slug", this.state.initialProd.led_wall_slug);
    formData.append("png", this.state.initialProd.png);
    formData.append("pdf", this.state.initialProd.pdf);

    if (this.state.initialProd.images) {
      for (let i = 0; i < this.state.initialProd.images.length; i++) {
        formData.append("images", this.state.initialProd.images[i]);
      }
    }

    if (this.state.initialProd.tmpFiles) {
      this.state.initialProd.tmpFiles.forEach((file) => {
        formData.append("tmpFiles", file);
      });
    }

    if (typeof this.state.initialProd.sizes === "object") {
      const sizesJson = JSON.stringify(this.state.initialProd.sizes);
      formData.append("sizes", sizesJson);
    }
    //console.log(...formData);

    try {
      this.updateProduct(id, formData);
      /* if (this.state.onSucc) {
        setTimeout(afterUpdating(), 2000);
      } */
    } catch (err) {
      console.log(err);
    }
  }

  updStatus = (resApi) => {
    if (
      resApi.resStatus === 200 ||
      resApi.resStatus === 201 ||
      resApi.resStatus === 209
    ) {
      this.setState((prev) => {
        return {
          prev,
          reqState: "PASS_EDTPR",
          onSucc: true,
        };
      });
    } else {
      this.setState((prev) => {
        return {
          prev,
          reqState: "FAIL",
          onSucc: false,
        };
      });
    }
  };

  closeMod = (childData) => {
    this.setState((prev) => {
      return {
        ...prev,
        showMod: childData,
      };
    });
  };

  render() {
    const initialProd = this.state.initialProd;
    console.log("AFTER RENDER");
    console.log(initialProd);
    return (
      <>
        {this.state.loadingState ? (
          <h1>LOADING...</h1>
        ) : (
          <div className="add-prod-layout">
            <div className="add-prod-form-cont">
              <form
                encType="multipart/form-data"
                className="add-prod-form"
                onSubmit={(e) => this.handleUpdate(e)}
              >
                <div className="add-prod-form-top">
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable htmlFor="" className="form_input_details">
                        SKU
                      </lable>
                      <input
                        type="text"
                        placeholder="SKU"
                        disabled
                        id="sku"
                        name="sku"
                        defaultValue={initialProd.sku}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>

                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        PID
                      </lable>
                      <input
                        type="text"
                        placeholder="PID"
                        disabled
                        id="pid"
                        name="pid"
                        defaultValue={initialProd.pid}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>

                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        SLUG
                      </lable>
                      <input
                        type="text"
                        placeholder="SLUG"
                        required
                        id="slug"
                        name="slug"
                        defaultValue={initialProd.slug}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Brand
                      </lable>
                      <input
                        type="text"
                        placeholder="Brand"
                        required
                        id="brand"
                        name="brand"
                        defaultValue={initialProd.brand}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Modello
                      </lable>
                      <input
                        type="text"
                        placeholder="Modello"
                        required
                        id="model"
                        name="model"
                        defaultValue={initialProd.model}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Colorway
                      </lable>
                      <input
                        type="text"
                        placeholder="Colorway"
                        required
                        id="colorway"
                        name="colorway"
                        defaultValue={initialProd.colorway}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Genere
                      </lable>
                      <input
                        type="text"
                        placeholder="F/M"
                        required
                        id="gen"
                        name="gen"
                        defaultValue={initialProd.gen}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Categoria
                      </lable>
                      <input
                        type="text"
                        placeholder="Scarpe"
                        required
                        id="category"
                        name="category"
                        defaultValue={initialProd.category}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Prezzo Retail
                      </lable>
                      <input
                        type="number"
                        placeholder="Prezzo Retail"
                        required
                        id="priceRetail"
                        name="priceRetail"
                        defaultValue={initialProd.priceRetail}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Prezzo
                      </lable>
                      <input
                        type="number"
                        placeholder="Prezzo"
                        required
                        id="price"
                        name="price"
                        defaultValue={initialProd.price}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form_field_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Led Wall Name
                      </lable>
                      <input
                        type="text"
                        placeholder="Led Wall Name"
                        required
                        id="ledWallSlug"
                        name="led_wall_slug"
                        defaultValue={initialProd.led_wall_slug}
                        onChange={(e) => this.handleChangeInput(e)}
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
                          this.handleChangeInputChkHotRel(event);
                        }}
                      />
                      <lable
                        htmFor=""
                        htmlFor="hot-rel"
                        className="form_input_details"
                      >
                        <lable htmlFor="" className="checkbox">
                          <lable
                            htmFor=""
                            htmlFor="lable"
                            className="check"
                          ></lable>
                        </lable>
                        🧱Hot Brick
                      </lable>
                    </div>

                    <div className="form_check">
                      <input
                        type="checkbox"
                        id="ledWall"
                        name="ledWall"
                        checked={initialProd?.led_wall === true ? true : false}
                        onChange={(event) => {
                          this.handleChangeInputChkLedW(event);
                        }}
                      />
                      <lable
                        htmFor=""
                        htmlFor="ledWall"
                        className="form_input_details"
                      >
                        <lable htmlFor="" className="checkbox">
                          <lable
                            htmFor=""
                            htmlFor="lable"
                            className="check"
                          ></lable>
                        </lable>
                        📌Led Wall
                      </lable>
                    </div>
                  </div>
                </div>

                <div className="add-prod-form-middle">
                  <div className="form_field_text_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Descrizione
                      </lable>
                      <textarea
                        cols="30"
                        rows="10"
                        placeholder="Add description.."
                        id="desc"
                        name="desc"
                        required
                        defaultValue={initialProd.desc}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>

                  <div className="form_field_text_cont">
                    <div className="form_input_cont">
                      <lable
                        htmFor=""
                        htmlFor="lable"
                        className="form_input_details"
                      >
                        Tags
                      </lable>
                      <textarea
                        cols="30"
                        rows="10"
                        type="text"
                        placeholder="Add tags.."
                        id="tags"
                        name="tags"
                        required
                        defaultValue={initialProd.tags}
                        onChange={(e) => this.handleChangeInput(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form_imgup_cont">
                  <div className="form_imgup">
                    <lable htmlFor="" className="form_imgup_ico">
                      <UilImageUpload size="40" />
                      Upload Images
                      <input
                        type="file"
                        accept="image/*"
                        placeholder="images"
                        multiple
                        id="image"
                        name="images"
                        onChange={this.onChangeFile}
                      />
                    </lable>
                  </div>

                  <div className="form_imgup_initial">
                    {initialProd.png &&
                      initialProd.png !== "null" &&
                      initialProd.png !== "undefined" && (
                        <div className="form_imgup_initial_img_cont">
                          <img
                            className="form_imgup_initial_img"
                            src={
                              "https://d296ypy9nm1p85.cloudfront.net/" +
                              initialProd.png
                            }
                            alt={initialProd.name}
                          />
                          <div className="form_imgup_initial_img_overlay">
                            <UilEye className="form_imgup_initial_img_overlay_ico" />
                            <button
                              className="form_imgup_initial_img_overlay_ico"
                              type="button"
                              onClick={() => this.handleRemovePng()}
                            >
                              <UilTrashAlt />
                            </button>
                          </div>
                        </div>
                      )}

                    {initialProd.images.length > 0 &&
                      initialProd.images.map((img, index) => (
                        <div
                          className="form_imgup_initial_img_cont"
                          key={index}
                        >
                          <img
                            className="form_imgup_initial_img"
                            src={"https://d296ypy9nm1p85.cloudfront.net/" + img}
                            alt={initialProd.name}
                          />
                          <div className="form_imgup_initial_img_overlay">
                            <UilEye className="form_imgup_initial_img_overlay_ico" />
                            <button
                              className="form_imgup_initial_img_overlay_ico"
                              type="button"
                              onClick={() =>
                                this.handleRemoveSpecificImg(index)
                              }
                            >
                              <UilTrashAlt />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="form_imgup_cont">
                  <div className="form_imgup">
                    <lable htmlFor="" className="form_imgup_ico">
                      <UilFileUploadAlt size="40" />
                      Upload Receipt
                      <input
                        type="file"
                        accept="application/pdf"
                        placeholder="pdf"
                        id="pdf"
                        name="pdf"
                        onChange={this.onChangePdfFile}
                      />
                    </lable>
                  </div>

                  <div className="form_imgup_initial">
                    {initialProd.pdf &&
                      initialProd.pdf !== "null" &&
                      initialProd.pdf !== "undefined" && (
                        <div className="form_imgup_initial_img_cont">
                          <UilFile size="40" />
                          <div className="form_imgup_initial_img_overlay">
                            <UilEye className="form_imgup_initial_img_overlay_ico" />
                            <button
                              className="form_imgup_initial_img_overlay_ico"
                              type="button"
                              onClick={() => this.handleRemovePdf()}
                            >
                              <UilTrashAlt />
                            </button>
                          </div>
                        </div>
                      )}{" "}
                  </div>
                </div>

                <div className="add-prod-size-table-cont">
                  <table className="add-prod-size-table" id="tab_logic">
                    <thead>
                      <tr>
                        <th> # </th>
                        {this.state.columnsArray.map((column, index) => (
                          <th key={index}>
                            {column === "size" ? "Misura" : "Quantità"}
                          </th>
                        ))}
                        <th>
                          <button
                            className="form_table_add_row_btn"
                            onClick={this.handleAddRow}
                            type="button"
                          >
                            <UilPlus />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows?.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          {this.state.columnsArray.map((column, index) => (
                            <td key={index}>
                              {column === "size_q" ? (
                                <div className="form_field_cont">
                                  <div className="form_input_cont">
                                    <input
                                      type="number"
                                      placeholder="Quantity"
                                      column={column}
                                      value={this.state.rows[idx][column]}
                                      index={idx}
                                      className="input_table"
                                      onChange={(e) => this.updateState(e)}
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
                                      value={this.state.rows[idx][column]}
                                      index={idx}
                                      className="input_table"
                                      onChange={(e) => this.updateState(e)}
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
                              onClick={() => this.handleRemoveSpecificRow(idx)}
                            >
                              <UilTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* DEBUG SIZE FORMS */}
                  {/* <a onClick={this.debugLogTable} className="sizetablebtn">
                    Debug Sizes
                  </a> */}
                </div>

                <div className="form_btn_cont">
                  <button type="submit" className="form__btn">
                    <lable htmlFor="" className="btn__text">
                      Salva
                    </lable>
                    <lable htmlFor="" className="btn__icon">
                      <UilSave />
                    </lable>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {this.state.showMod ? (
          <LoadingCard
            res={this.state.resApi}
            reqState={this.state.reqState}
            showMod={this.closeMod}
          />
        ) : null}
      </>
    );
  }
}

export default utilsUseHooksCls(
  connect(null, {
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    getProductSuccess,
  })(EditProduct)
);
