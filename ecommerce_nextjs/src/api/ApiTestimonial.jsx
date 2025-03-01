export const fetchTestimonials = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/testimonials?populate=*");
      const data = await response.json();
  
      if (data?.data) {
        return data.data.map((item) => ({
          id: item.id,
          companyName: item.title_testimoni,
          feedback: item.pesan_testimoni,
          profileImage: item.image_profile?.url
            ? `http://localhost:1337${item.image_profile.url}`
            : "/placeholder-profile.png",
          brandImage: item.image_brand?.url
            ? `http://localhost:1337${item.image_brand.url}`
            : "/placeholder-brand.png",
        }));
      }
  
      return [];
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
      return [];
    }
  };
  