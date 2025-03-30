import { useState, useEffect } from "react";
import { getMentors } from "../services/mentorService";

export const useMentors = () => {
   const [mentors, setMentors] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchMentors = async () => {
         try {
            const mentorsData = await getMentors(); // Llamada al servicio
            setMentors(mentorsData);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchMentors();
   }, []);

   return { mentors, loading, error };
};
