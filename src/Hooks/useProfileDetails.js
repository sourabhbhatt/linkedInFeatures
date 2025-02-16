import { useEffect, useState, useCallback } from 'react';

const useProfileDetails = (initialDetails) => {
  const [name, setName] = useState(initialDetails?.name || '');
  const [age, setAge] = useState(initialDetails?.age || '');

  useEffect(() => {
    if (initialDetails) {
      setName(initialDetails.name);
      setAge(initialDetails.age);
    }
  }, [initialDetails]); // ✅ Ensures updates when initialDetails change

  const handleName = (newName) => setName(newName); // ✅ Correctly updates state
  const handleAge = (newAge) => setAge(newAge); // ✅ Correctly updates state

  const handleSubmit = useCallback(() => {
    console.log('Submitting:', { name, age });
    setName('');
    setAge('');
  }, [name, age]);

  return { name, handleName, age, handleAge, handleSubmit };
};

export default useProfileDetails;
