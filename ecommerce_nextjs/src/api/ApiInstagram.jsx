export const getInstagramPosts = async () => {
  try {
    const response = await fetch('http://localhost:1337/api/instagram-post');
    const data = await response.json();
    
    if (!data || !data.data) {
      throw new Error('Invalid data structure from Strapi');
    }

    // Get the configuration from Strapi
    const config = data.data;
    
    // Now use this config to fetch from the third-party API
    const root = "https://ensembledata.com/apis";
    const endpoint = config.end_point_instagram;
    const token = config.token_api_pihak3;
    const userId = config.instagram_account_id;
    const totalPosts = parseInt(config.total_data) || 5; // Mengambil total_data dari config, default 5 jika tidak ada

    const params = {
      user_id: userId,
      depth: 1,
      chunk_size: Math.max(totalPosts, 1), 
      token: token,
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${root}${endpoint}?${queryString}`;

    const instagramResponse = await fetch(url);
    const instagramData = await instagramResponse.json();

    if (instagramData?.data?.posts?.length > 0) {
      // Mengambil post sesuai total_data dari config
      const posts = instagramData.data.posts.slice(0, totalPosts).map(item => ({
        media_url: item.node.display_url,
        caption: item.node.edge_media_to_caption.edges.length > 0
          ? item.node.edge_media_to_caption.edges[0].node.text
          : "Instagram Post",
        permalink: `https://www.instagram.com/p/${item.node.shortcode}/`,
      }));
      
      return posts;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
