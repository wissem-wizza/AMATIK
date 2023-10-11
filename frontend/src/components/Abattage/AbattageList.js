import { useGetAbattagesQuery, selectAllAbattages } from "../../features/abattage/extendedAbattageApi";
import withFilter from "../../hooks/withFilter";
import {
  parseDate,
  formatDate,
} from '../../utils/foramtting';

// const columns = [
//   { field: 'NUM_BON_ENTREE', headerName: 'Num Bon Entree' },
//   { field: 'NUM_TUERIE', headerName: 'Num Tuerie' },
//   { field: 'NUM_PESEE', headerName: 'Num Pesee' },
//   { field: 'DATE_ABATTAGE', headerName: 'Date Abattage', type: "date",
//     valueGetter: (params) => parseDate(params.row.DATE_ABATTAGE, '/', [2, 1, 0]),
//     valueFormatter: (params) => formatDate(params.value)
//   },
//   { field: 'CODE_FOURNISSEUR', headerName: 'Code Fournisseur' },
//   { field: 'CODE_ABATTEUR', headerName: 'Code Abatteur' },
//   { field: 'ARTICLE', headerName: 'Article' },
//   { field: 'CHEPTEL_NAISSEUR', headerName: 'Cheptel Naisseur' },
//   { field: 'NUM_ELEVEUR', headerName: 'Num Eleveur' },
//   { field: 'OBSERVATION', headerName: 'Observation' },
//   { field: 'NUM_ANIMAL', headerName: 'Num Animal' },
//   { field: 'BOUCLE3', headerName: 'Boucle3' },
//   { field: 'CLASSEMENT', headerName: 'Classement' },
//   { field: 'POIDS_FROID', headerName: 'Poids Froid' },
//   { field: 'NUM_LOT', headerName: 'Num Lot' },
//   { field: 'AFFECT_IDENT', headerName: 'Affect Ident' },
//   { field: 'nom_fournisseur', headerName: 'Nom Fournisseur' },
//   { field: 'LIBELLE_MOTIF', headerName: 'Libelle Motif' },
// ];

const columns = [
  { field: 'NUM_BON_ENTREE', headerName: 'N° Bon Entree', width: 120, type: 'number',
    valueFormatter: (params) => {
      const parsed = parseInt(params.value)
      return parsed ?? params.value
    }
  },
  { field: 'NUM_TUERIE', headerName: 'N° Tuerie', width: 100, type: 'number',
    valueFormatter: (params) => {
      const parsed = parseInt(params.value)
      return parsed ?? params.value
    }
  },
  { field: 'DATE_ABATTAGE', headerName: 'Date Abattage', width: 150, type: "date",
    valueGetter: (params) => parseDate(params.row.DATE_ABATTAGE, '/', [2, 1, 0]),
    valueFormatter: (params) => formatDate(params.value)
  },
  { field: 'ARTICLE', headerName: 'Article', width: 90 },
  { field: 'CHEPTEL_NAISSEUR', headerName: 'Naisseur', width: 120, type: 'number' },
  { field: 'NUM_ELEVEUR', headerName: 'Clé Eleveur', width: 120 },
  { field: 'OBSERVATION', headerName: 'Observation', width: 150 },
  { field: 'CLASSEMENT', headerName: 'C', maxWwidth: 90 },
  { field: 'POIDS_FROID', headerName: 'Poids Froid', width: 100, type: 'number' },
  { field: 'LIBELLE_MOTIF', headerName: 'Libelle Motif', width: 150 }
];

const AbattageList = () => {

  const FilteredPartSociale = withFilter({
    mainQueryHook: useGetAbattagesQuery,
    dataSelection: selectAllAbattages,
    columns,
    route: 'abattage',
    listToForm: false,
  });

  return <FilteredPartSociale />
}

export default AbattageList