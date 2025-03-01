export const fetchCtaBanner = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/cta-banner?populate=*");
      const data = await response.json();
  
      if (data?.data) {
        return {
          title: data.data.title_cta,
          subtitle: data.data.subtitle_cta,
          link: data.data.link_cta,
          image: `http://localhost:1337${data.data.image_banner_cta?.url}`,
        };
      }
  
      return null;
    } catch (error) {
      console.error("❌ Error fetching CTA Banner:", error);
      return null;
    }
  };
  