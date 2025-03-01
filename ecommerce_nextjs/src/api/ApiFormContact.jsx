export const submitContactForm = async (nama, email, phone, pesan) => {
    try {
      const response = await fetch("http://localhost:1337/api/form-contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            nama_lengkap: nama,
            email: email,
            no_tlpn: phone,
            pesan: pesan,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error("Gagal mengirim pesan, coba lagi.");
      }
  
      return true;
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      return false;
    }
  };
  