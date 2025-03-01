export const fetchHeaders = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/headers/");
      const data = await response.json();
  
      if (data?.data) {
        return data.data.map((item) => ({
          title: item.title_header,
          subtitle: item.subtitle_header,
          icon: item.icon_header, // Menggunakan icon dari API
        }));
      }
  
      return [];
    } catch (error) {
      console.error("Error fetching headers:", error);
      return [];
    }
  };
  