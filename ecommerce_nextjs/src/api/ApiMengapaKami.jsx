import { faMedal, faTruckFast, faHeadphones } from "@fortawesome/free-solid-svg-icons";

export const fetchMengapaKami = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/mengapa-kamis/");
    const data = await response.json();

    if (data?.data) {
      return data.data.map((item) => ({
        id: item.id,
        title: item.title_mengapakami,
        description: item.subtitle_mengapakami,
        icon: getFontAwesomeIcon(item.icon_mengapakami), // Convert string to FontAwesome icon
      }));
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching Mengapa Kami:", error);
    return [];
  }
};

// Fungsi untuk mencocokkan string dengan ikon FontAwesome
const getFontAwesomeIcon = (iconName) => {
  const icons = {
    "fa-sharp fa-solid fa-medal": faMedal,
    "fa-sharp fa-solid fa-truck-fast": faTruckFast,
    "fa-sharp fa-solid fa-headphones": faHeadphones,
  };

  return icons[iconName] || faMedal; // Default jika tidak ditemukan
};
