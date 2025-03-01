"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import WavesFooter from "./WavesFooter";

export default function Footer() {
  const [webConfig, setWebConfig] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil WebConfig
        const webConfigRes = await fetch("http://localhost:1337/api/webconfig?populate=*");
        const webConfigData = await webConfigRes.json();
        setWebConfig(webConfigData.data);

        // Ambil Contact Info
        const contactRes = await fetch("http://localhost:1337/api/contact/");
        const contactData = await contactRes.json();
        setContact(contactData.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="relative bg-blue-900 text-white pt-20 pb-10 overflow-hidden">
      {/* Wave Background Atas */}
      <div className="absolute top-0 left-0 w-full">
        <WavesFooter />
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            {webConfig?.logo_web?.url && (
              <img
                src={`http://localhost:1337${webConfig.logo_web.url}`}
                className="h-16 mb-4 rounded-full"
                alt="Logo"
              />
            )}
            <p className="text-gray-300">
              {webConfig?.title_web || "Perusahaan Terbaik untuk Solusi Anda"}
            </p>
            <div className="mt-4 space-y-2 text-gray-300">
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-yellow-400" />
                {webConfig?.location || "Alamat tidak tersedia"}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-green-400" />
                {contact?.no_tlpn ? `+62 ${contact.no_tlpn}` : "Nomor tidak tersedia"}
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-red-400" />
                {contact?.email || "Email tidak tersedia"}
              </p>
            </div>
          </div>

          {/* Kategori Produk */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Kategori Produk</h3>
            <ul className="space-y-2">
              {["Furniture Kantor", "Elektronik", "Alat Tulis", "Mesin Cetak", "Keamanan"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-200 hover:text-orange-300 transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Link Cepat</h3>
            <ul className="space-y-2">
              {["Tentang Kami", "Katalog", "Klien Kami", "FAQ", "Kontak"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-200 hover:text-orange-300 transition-all duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Maps Embed */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Lokasi Kami</h3>
            <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={webConfig?.embed_maps || "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4805.139900849896!2d106.78758254783688!3d-6.575749239712931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1738891169646!5m2!1sid!2sid"}
                  width="100%"
                  height="200"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          {contact && (
            <>
              <a
                href={contact.link_fb || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-orange-400 text-2xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href={contact.link_twiter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-orange-400 text-2xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href={contact.link_ig || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-orange-400 text-2xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href={contact.link_linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-orange-400 text-2xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-200">
            &copy; {new Date().getFullYear()} {webConfig?.title_web || "Company Name"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
