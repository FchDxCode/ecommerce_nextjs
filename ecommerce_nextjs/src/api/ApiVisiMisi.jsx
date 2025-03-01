export const fetchVisiMisi = async () => {
    try {
      const [visiRes, misiRes] = await Promise.all([
        fetch("http://localhost:1337/api/visi?populate=*"),
        fetch("http://localhost:1337/api/misi?populate=*"),
      ]);
  
      const visiJson = await visiRes.json();
      const misiJson = await misiRes.json();
  
      console.log("📌 API Visi:", visiJson);
      console.log("📌 API Misi:", misiJson);
  
      return {
        visi: visiJson.data?.content || "Visi belum tersedia",
        misi: misiJson.data?.content ? misiJson.data.content.split("\n") : [],
      };
    } catch (error) {
      console.error("❌ Error fetching Visi & Misi:", error);
      return { visi: "Visi tidak dapat dimuat", misi: [] };
    }
  };
  