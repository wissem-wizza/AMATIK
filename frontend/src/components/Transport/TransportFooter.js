import { useState, useEffect, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Button } from '@mui/material';

import TotalBoard from './TotalBoard';
import { CustomFormContext } from './TransportForm';

// from Identification query fields to object keys of all sums varialbles (availableSums, etc...)
const keyMapping = {
  NB_AGNAUX: 'agnaux',
  NB_BELIERS: 'beliers',
  NB_BREBIES: 'brebies',
  NB_CHEVRES: 'chevres',
  NB_BOUCS: 'boucs',
  NB_BOVINS: 'bovins',
};

const initialSumsValues = {
  agnaux: 0,
  beliers: 0,
  brebies: 0,
  chevres: 0,
  boucs: 0,
  bovins: 0,
}


const TransportFooter = () => {

  const { handleSubmit } = useFormContext();
  const { 
    availableAnnonceList,
    toTransportAnnonceList,
    onSubmit,
  } = useContext(CustomFormContext);

  // using destructuring to get a new ref for each state & usage
  const [availableSums, setAvailableSums] = useState({...initialSumsValues})
  const [toTransportSums, setToTransportSums] = useState({...initialSumsValues})

  useEffect(() => {
    const newSums = { ...initialSumsValues };

    availableAnnonceList.forEach((item) => {
      for (const key in item) {
        if (key in keyMapping && typeof item[key] === 'number') {
          newSums[keyMapping[key]] += item[key];
        }
      }
    });

    setAvailableSums(prev => ({...prev, ...newSums}));
  }, [availableAnnonceList]);

  useEffect(() => {
    const newSums = { ...initialSumsValues };

    toTransportAnnonceList.forEach((item) => {
      for (const key in item) {
        if (key in keyMapping && typeof item[key] === 'number') {
          newSums[keyMapping[key]] += item[key];
        }
      }
    });

    setToTransportSums(prev => ({...prev, ...newSums}));
  }, [toTransportAnnonceList]);

  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center" xs={5} md={4}>
      <TotalBoard title="Annonces sélectionnées" sums={toTransportSums} toTransport />
      <Button variant="contained" size="large" onClick={handleSubmit(onSubmit)}>Valider</Button>
      <TotalBoard title="Annonces disponibles" sums={availableSums} />
    </Stack>
  )
}

export default TransportFooter