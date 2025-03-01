export const fetchStoryCompany = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/story-companies?populate=*");
      const json = await response.json();
  
      console.log("📌 API Story Company:", json);
  
      return json.data.map((story) => ({
        id: story.id,
        year: story.tahun,
        title: story.preview_detail,
        description: story.detail,
      }));
    } catch (error) {
      console.error("❌ Error fetching story company:", error);
      return [];
    }
  };
  