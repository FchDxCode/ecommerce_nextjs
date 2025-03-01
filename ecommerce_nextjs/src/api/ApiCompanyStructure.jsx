export const fetchCompanyStructure = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/company-structures?populate=*");
      const json = await response.json();
  
      console.log("📌 API Response:", json); // Debug response
  
      if (json.data) {
        return json.data; // Pastikan data ada
      }
      return [];
    } catch (error) {
      console.error("❌ Error fetching company structure:", error);
      return [];
    }
  };
  