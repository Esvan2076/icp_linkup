import Header from "../templates/header";
import { useNavigate } from "react-router-dom";

const SelectorPage = () => {
   const navigate = useNavigate();
   return (
      <div>
         <Header />
         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-primary to-accent h-screen">
            <div className="flex flex-row gap-8">
               <div className="flex p-8 rounded-lg shadow-lg w-96 bg-base-100 justify-center">
                  <div className="flex flex-col justify-center items-center">
                     <div>
                        <h2 className="text-2xl font-bold mb-4">Emprendedor</h2>
                     </div>

                     <div>
                        <button
                           className="btn btn-ghost btn-xl"
                           onClick={() => navigate("/signup")}
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" strokeWidth="2">
                              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                              <path d="M19 22v-6"></path>
                              <path d="M22 19l-3 -3l-3 3"></path>
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>

               <div className="flex p-8 rounded-lg shadow-lg w-96 bg-base-100 justify-center">
                  <div className="flex flex-col justify-center items-center">
                     <div>
                        <h2 className="text-2xl font-bold mb-4">Mentor</h2>
                     </div>

                     <div>
                        <button
                           className="btn btn-ghost btn-xl"
                           onClick={() => navigate("/signupMentor")}
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" strokeWidth="2">
                              <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
                              <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SelectorPage;