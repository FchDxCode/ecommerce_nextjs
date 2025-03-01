export const fetchSliderKatalog = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/slider-katalogs?populate=*");
      const data = await res.json();
  
      if (data?.data) {
        return data.data.map((item) => ({
          id: item.id,
          image: item.image_slider_katalog?.url
            ? `http://localhost:1337${item.image_slider_katalog.url}`
            : "https://via.placeholder.com/800x400?text=No+Image",
          alt: item.image_slider_katalog?.name || "Slide Image",
        }));
      }
  
      return [];
    } catch (error) {
      console.error("Error fetching slider katalog:", error);
      return [];
    }
  };
  