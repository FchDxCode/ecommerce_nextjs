export const fetchFaqData = async () => {
    try {
      const [faqResponse, kategoriResponse] = await Promise.all([
        fetch("http://localhost:1337/api/faqs?populate=*"),
        fetch("http://localhost:1337/api/kategori-faqs?populate=*"),
      ]);
  
      if (!faqResponse.ok || !kategoriResponse.ok) {
        throw new Error("Gagal mengambil data FAQ atau kategori.");
      }
  
      const faqData = await faqResponse.json();
      const kategoriData = await kategoriResponse.json();
  
      console.log('FAQ Data:', faqData.data);
      console.log('Kategori Data:', kategoriData.data);
  
      return { faqs: faqData.data, categories: kategoriData.data };
    } catch (error) {
      console.error("❌ Error fetching FAQ:", error);
      return { faqs: [], categories: [] };
    }
  };
  