export const fetchKategoriKatalog = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/kategori-katalogs");
    const data = await response.json();

    if (data?.data) {
      return data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title_kategori_katalog,
        icon: item.icon_kategori_katalog,
      }));
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching kategori katalog:", error);
    return [];
  }
};