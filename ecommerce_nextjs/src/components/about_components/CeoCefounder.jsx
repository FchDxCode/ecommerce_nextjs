export default function CeoCefounder() {
    return (
      <div>
        <section className="py-20 bg-gradient-to-r from-blue-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-16">
              Tim Pendiri Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Founder 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww"
                    alt="Founder 1"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <p className="italic">"Inovasi adalah jantung dari pertumbuhan."</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Budi Santoso</h3>
                  <p className="text-md font-medium text-blue-600 mt-1">Co-Founder & CEO</p>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    Memiliki pengalaman lebih dari 15 tahun di industri teknologi dan ecommerce. Alumni ITB 
                    dengan gelar MBA dari NUS Business School.
                  </p>
                  <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Lihat Profil
                  </button>
                </div>
              </div>
  
              {/* Founder 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Founder 2"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <p className="italic">"Detail kecil menciptakan kesempurnaan."</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Siti Rahayu</h3>
                  <p className="text-md font-medium text-blue-600 mt-1">Co-Founder & COO</p>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    Pakar dalam operasional bisnis dengan pengalaman di berbagai perusahaan multinasional.
                    Lulusan UI dengan gelar Master dari Stanford University.
                  </p>
                  <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Lihat Profil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  