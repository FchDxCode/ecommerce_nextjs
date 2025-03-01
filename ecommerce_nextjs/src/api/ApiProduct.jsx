export const fetchProducts = async (categoryId = null, searchQuery = "", sortOption = "", page = 1, pageSize = 6) => {
  try {
    let url = `http://localhost:1337/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    // Filter kategori
    if (categoryId) {
      url += `&filters[kategori_product][id][$eq]=${categoryId}`;
    }

    // Filter pencarian
    if (searchQuery) {
      url += `&filters[title_product][$containsi]=${searchQuery}`;
    }

    // Sorting
    if (sortOption === "newest") {
      url += "&sort=createdAt:desc";
    } else if (sortOption === "highest") {
      url += "&sort=price_product:desc";
    } else if (sortOption === "lowest") {
      url += "&sort=price_product:asc";
    } else if (sortOption === "az") {
      url += "&sort=title_product:asc";
    } else if (sortOption === "za") {
      url += "&sort=title_product:desc";
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data?.data) {
      return {
        products: data.data.map((item) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title_product,
          price: item.price_product,
          description: item.description_product,
          diskon_product: item.diskon_product,
          categoryId: item.kategori_product?.id || null,
          categoryName: item.kategori_product?.title_kategori || '',
          image: item.image_product && item.image_product.length > 0 
            ? `http://localhost:1337${item.image_product[0].url}`
            : '',
        })),
        pagination: data.meta.pagination,
      };
    }

    return { products: [], pagination: { page: 1, pageSize, pageCount: 1, total: 0 } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], pagination: { page: 1, pageSize, pageCount: 1, total: 0 } };
  }
};

export const fetchProductDetail = async (documentId) => {
  try {
    if (!documentId) {
      throw new Error("Product ID is required");
    }

    const url = `http://localhost:1337/api/products/${documentId}?populate=*`;
    console.log("Fetching URL:", url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response:", data);

    if (!data?.data) {
      throw new Error("Product not found");
    }

    const productData = data.data;
    return {
      id: productData.id,
      documentId: productData.documentId,
      title: productData.title_product,
      price: productData.price_product,
      diskon_product : productData.diskon_product,
      description: productData.description_product,
      keunggulan: productData.keunggulan_product,
      images: productData.image_product?.map(img => {
        if (img.formats?.large) {
          return `http://localhost:1337${img.formats.large.url}`;
        }
        return `http://localhost:1337${img.url}`;
      }) || [],
      category: productData.kategori_product ? {
        id: productData.kategori_product.id,
        documentId: productData.kategori_product.documentId,
        title: productData.kategori_product.title_kategori
      } : null
    };
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};
