export const formatDate = (dateToFormat) => {
  var d = new Date(dateToFormat);
  var day = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();

  var formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
};

//DEPRECATED - TESTS - TO CLEAN
/* const handleSave2 = (e) => {
    e.preventDefault();

    const formData = new FormData();

    //formData.append("images", file);

    for (let i = 0; i < file.length; i++) {
      formData.append("images", file[i]);
    }

    console.log(...formData);
  };

  const handleSave1 = (e) => {
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
    formData.append("sizes", sizes);
    formData.append("priceRetail", priceRetail);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("tags", tags);
    formData.append("hot_rel", hotRel);
    formData.append("led_wall", ledWall);
    formData.append("led_wall_slug", ledWalSlug);
    //formData.append("images", file);

    for (let i = 0; i < file.length; i++) {
      formData.append("images", file[i]);
    }

    if (typeof sizes === "object") {
      const sizesJson = JSON.stringify(sizes);
      formData.append("sizes", sizesJson);
      return sizesJson;
    }

    console.log(sizes);
    console.log(JSON.parse(sizeJson));

    console.log(...formData);
  }; */
