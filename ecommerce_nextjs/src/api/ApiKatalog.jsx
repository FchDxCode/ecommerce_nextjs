export const fetchKatalogList = async (categoryId = null) => {
  try {
    let url = "http://localhost:1337/api/katalogs?populate=*";

    if (categoryId) {
      url += `&filters[kategori_katalog][id][$eq]=${categoryId}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data?.data) {
      return data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title_katalog,
        totalDownload: item.total_download || 0,
        image: `http://localhost:1337${item.image_katalog?.url}`,
        fileUrl: `http://localhost:1337${item.pdf_katalog?.url}`,
        categoryId: item.kategori_katalog?.id || null,
      }));
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching katalogs:", error);
    return [];
  }
};
  
  export const submitKatalogForm = async (name, email) => {
    try {
      const response = await fetch("http://localhost:1337/api/form-katalogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { name, email_katalog: email },
        }),
      });
  
      return response.ok;
    } catch (error) {
      console.error("❌ Error submitting katalog form:", error);
      return false;
    }
  };
  
  export const updateTotalDownload = async (id, newCount) => {
    try {
      const response = await fetch(`http://localhost:1337/api/katalogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { total_download: newCount },
        }),
      });
  
      return response.ok;
    } catch (error) {
      console.error("❌ Error updating total download:", error);
      return false;
    }
  };
  