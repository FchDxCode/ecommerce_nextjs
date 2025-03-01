export const fetchKategoriProducts = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/kategori-products?populate=*");
      const data = await response.json();
  
      if (data?.data) {
        return data.data.map((item) => ({
          id: item.id,
          title: item.title_kategori,
          image: `http://localhost:1337${item.image_kategori[0]?.url}`, // Ambil gambar kategori pertama
        }));
      }
  
      return [];
    } catch (error) {
      console.error("Error fetching kategori products:", error);
      return [];
    }
  };
  