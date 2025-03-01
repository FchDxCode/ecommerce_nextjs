export const fetchWebConfig = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/webconfig?populate=*");
      const data = await response.json();
  
      if (data?.data) {
        return {
          title: data.data.title_web,
          location: data.data.location,
          logoUrl: data.data.logo_web?.url
            ? `http://localhost:1337${data.data.logo_web.url}`
            : null, // Tambahkan domain Strapi jika ada logo
        };
      }
  
      return null;
    } catch (error) {
      console.error("❌ Error fetching WebConfig:", error);
      return null;
    }
  };
  