import { Link } from "react-router-dom";

const HomePage = () => {
   return (
      <div className="min-h-screen bg-gray-100">
         {/* Hero Section */}
         <section className="bg-primary text-white py-20">
            <div className="max-w-screen-xl px-6 mx-auto grid lg:grid-cols-12 gap-8 items-center">
               <div className="lg:col-span-7 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
                     Impulsa tu empresa con los mejores mentores
                  </h1>
                  <p className="mt-4 text-lg text-gray-200">
                     Conéctate con expertos que te ayudarán a llevar tu negocio al siguiente nivel.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                     <Link to="/mentores" className="btn btn-soft btn-primary">
                        Ver Mentores
                     </Link>
                     <Link to="/contacto" className="btn btn-primary">
                        Contáctanos
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Beneficios */}
         <section className="py-20 px-4 sm:px-8 lg:px-16 text-center bg-base-100">
            <div className="max-w-6xl mx-auto">
               <h2 className="text-4xl font-bold mb-4">¿Por qué elegirnos?</h2>
               <p className="text-lg opacity-80 max-w-2xl mx-auto mb-12">
                  Descubre cómo nuestra plataforma puede transformar tu crecimiento profesional
               </p>

               <div className="grid md:grid-cols-3 gap-8">
                  {[
                     {
                        title: "Mentoría Personalizada",
                        text: "Cada mentor se adapta a tus necesidades específicas.",
                        icon: "👥"
                     },
                     {
                        title: "Flexibilidad de Horarios",
                        text: "Reserva sesiones según tu disponibilidad.",
                        icon: "⏱️"
                     },
                     {
                        title: "Resultados Comprobados",
                        text: "Empresas como la tuya han crecido con nuestra ayuda.",
                        icon: "📈"
                     }
                  ].map((item, index) => (
                     <div
                        key={index}
                        className="p-8 bg-base-200 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                     >
                        <span className="text-4xl mb-4 block">{item.icon}</span>
                        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-base-content/80">{item.text}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Cómo Funciona */}
         <section className="py-20 bg-base-200 text-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
               <h2 className="text-4xl font-bold mb-4">¿Cómo funciona?</h2>
               <p className="text-lg opacity-80 max-w-2xl mx-auto mb-12">
                  Sigue estos simples pasos para comenzar tu viaje de aprendizaje
               </p>

               <div className="grid md:grid-cols-3 gap-8 relative">
                  {/* Línea decorativa */}
                  <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-1 bg-primary z-0"></div>

                  {[
                     {
                        step: "1",
                        title: "Explora Mentores",
                        text: "Busca expertos en distintas áreas.",
                        icon: "🔍"
                     },
                     {
                        step: "2",
                        title: "Agenda tu sesión",
                        text: "Elige la fecha y hora que más te convenga.",
                        icon: "📅"
                     },
                     {
                        step: "3",
                        title: "Recibe mentoría",
                        text: "Conéctate y obtén consejos personalizados.",
                        icon: "💡"
                     }
                  ].map((item, index) => (
                     <div
                        key={index}
                        className="relative z-10 p-8 bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                     >
                        <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                           {item.icon}
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-base-content/80">{item.text}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Testimonios */}
         <section className="py-20 bg-base-100 text-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
               <h2 className="text-4xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
               <p className="text-lg opacity-80 max-w-2xl mx-auto mb-12">
                  Experiencias reales de profesionales como tú
               </p>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                     {
                        text: "Gracias a los mentores, mi empresa creció un 200% en 6 meses.",
                        name: "Juan Pérez, CEO de StartupX",
                        avatar: "👨‍💼"
                     },
                     {
                        text: "La mejor inversión que he hecho para mi negocio.",
                        name: "Ana López, Fundadora de EcomFast",
                        avatar: "👩‍💼"
                     },
                     {
                        text: "Excelente plataforma, mentores muy capacitados.",
                        name: "Carlos Rodríguez, Emprendedor",
                        avatar: "🧑‍💼"
                     }
                  ].map((item, index) => (
                     <div
                        key={index}
                        className="p-8 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                     >
                        <div className="text-5xl mb-4">{item.avatar}</div>
                        <blockquote className="text-lg italic mb-6">"{item.text}"</blockquote>
                        <div className="border-t border-base-content/10 pt-4">
                           <h3 className="font-semibold text-lg">- {item.name}</h3>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default HomePage;