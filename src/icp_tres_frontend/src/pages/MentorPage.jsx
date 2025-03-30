import Header from "../templates/header";
import Footer from "../templates/footer";
import { useMentors } from "../hooks/useMentors";
import defaultAvatar from "../assets/foto.png";

const MentorPage = () => {
   const { mentors, loading, error } = useMentors();

   return (
      <div className="flex flex-col min-h-screen">
         <Header />
         <main className="flex-grow bg-base-100">
            <section className="py-16 bg-primary text-primary-content">
               <div className="container mx-auto px-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">Mentores Disponibles</h1>
                  <p className="text-xl max-w-2xl mx-auto">
                     Conecta con expertos dispuestos a compartir su conocimiento y experiencia contigo
                  </p>
               </div>
            </section>

            {loading && (
               <div className="container mx-auto px-4 py-12 text-center">
                  <progress className="progress progress-primary w-56"></progress>
                  <p className="mt-4">Cargando mentores...</p>
               </div>
            )}

            {error && (
               <div className="container mx-auto px-4 py-12">
                  <div className="alert alert-error shadow-lg">
                     <span>Error al cargar los mentores: {error}</span>
                  </div>
               </div>
            )}

            {!loading && !error && (
               <section className="container mx-auto px-4 py-8">
                  {mentors.length === 0 ? (
                     <div className="text-center py-12">
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No hay mentores disponibles</h3>
                        <p className="mt-1 text-gray-500">Intenta nuevamente más tarde.</p>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mentors.map((mentor) => (
                           <div key={mentor.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <figure className="px-6 pt-6">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={defaultAvatar} // ✅ Usa la imagen importada
                                            alt={`Foto de ${mentor.nombre}`}
                                        />
                                    </div>
                                </div>
                                </figure>
                              <div className="card-body items-center text-center">
                                 <h2 className="card-title">{mentor.nombre}</h2>
                                 <div className="badge badge-primary">{mentor.edad} años</div>
                                 <p className="font-semibold text-primary">{mentor.areaEspecializacion}</p>
                                 <p className="text-sm">{mentor.sobreMi}</p>
                                 <div className="card-actions mt-4">
                                    {mentor.sitioWeb && (
                                       <a
                                          href={mentor.sitioWeb}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="btn btn-outline btn-sm"
                                       >
                                          Visitar sitio web
                                       </a>
                                    )}
                                    <button className="btn btn-primary btn-sm">Contactar</button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </section>
            )}
         </main>
         <Footer />
      </div>
   );
};

export default MentorPage;
