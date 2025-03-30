import Header from "../templates/header";
import Footer from '../templates/footer';
import PixelGrid from '../templates/PixelGrid';

const DreamsPage = () => {
   return (
      <div className="flex flex-col min-h-screen">
         <Header />

         <main className="flex-grow bg-base-100">
            <section className="py-12 bg-primary text-primary-content">
               <div className="container mx-auto px-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">Explora tus Sueños</h1>
                  <p className="text-xl max-w-2xl mx-auto">
                     Descubre y comparte los sueños que inspiran nuestra comunidad
                  </p>
               </div>
            </section>


            <div className="container mx-auto px-4 py-12">
               <section className="mb-12 text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6">¿Qué sueñas hoy?</h2>
                  <p className="text-lg mb-8">
                     Cada sueño es una semilla de posibilidad. Explora esta colección de aspiraciones,
                     metas y visiones compartidas por nuestra comunidad.
                  </p>
               </section>

               {/* Espacio para la cuadrícula */}
               <section className="mb-16">
                  <PixelGrid></PixelGrid>

               </section>


               <section className="text-center bg-primary/10 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">¿Listo para compartir tu sueño?</h3>
                  <p className="mb-6 max-w-2xl mx-auto">
                     Comparte tus sueños para que podamos inspirarnos entre todos!!
                  </p>
               </section>
            </div>
         </main>

         <Footer />
      </div>
   );
};

export default DreamsPage;