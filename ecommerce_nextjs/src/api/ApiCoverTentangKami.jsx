export const fetchCoverTentangKami = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/cover-tentangkami?populate=*");
      const data = await response.json();
      
      // Langsung return data.data karena tidak ada attributes
      return data.data;
      
    } catch (error) {
      console.error("❌ Error fetching cover data:", error);
      return null;
    }
  };
  