export const fetchSliders = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/sliders?populate=*");
      const data = await response.json();
  
      if (data?.data) {
        return data.data.map((item) => ({
          title: item.title,
          description: item.subtitle,
          image: item.image_slider
            ? `http://localhost:1337${item.image_slider.url}` // Ambil URL gambar dari API
            : "https://via.placeholder.com/1000x600.png?text=No+Image", // Fallback jika tidak ada gambar
        }));
      }
  
      return [];
    } catch (error) {
      console.error("Error fetching sliders:", error);
      return [];
    }
  };
  