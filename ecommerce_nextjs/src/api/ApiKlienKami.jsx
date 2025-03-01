export const fetchKlien = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/klien-kamis?populate=*");
      const data = await response.json();
  
      if (data?.data) {
        return data.data.map((item) => ({
          id: item.id,
          image: item.image_klien?.url ? `http://localhost:1337${item.image_klien.url}` : null,
        }));
      }
  
      return [];
    } catch (error) {
      console.error("❌ Error fetching Klien:", error);
      return [];
    }
  };
  