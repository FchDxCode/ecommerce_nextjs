export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const url = searchParams.get("url");
  
      if (!url) {
        return new Response(JSON.stringify({ error: "URL is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const response = await fetch(decodeURIComponent(url), {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const buffer = await response.arrayBuffer();
      return new Response(Buffer.from(buffer), {
        status: 200,
        headers: {
          "Content-Type": response.headers.get("Content-Type"),
          "Cache-Control": "max-age=3600, public",
        },
      });
    } catch (error) {
      console.error("❌ Proxy Error:", error.message || error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch image" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  