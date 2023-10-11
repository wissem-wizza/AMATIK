import { useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  useGetPartSocialesQuery,
  selectAllPartSociales,
  useGetPartSocialesByEleveurQuery,
  selectAllPartSocialesByEleveur,
} from "../../features/part_sociale/extendedPartSocialeApi";
import { selectCurrentUser } from '../../features/auth/authSlice';
import withFilter from '../../hooks/withFilter';

import {
  formatNumberWithSpaces,
  parseDate,
  formatDate,
} from '../../utils/foramtting';

const columns = [
  {
    field: "preleve",
    headerName: "Prélèvement",
    width: 120,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    valueFormatter: params => Math.abs(params.value)
  },
  {
    field: "base_HT",
    headerName: "Base HT",
    width: 150,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: "datop", headerName: "Date Opération", width: 170, type: "date", flex: 1,
    valueGetter: (params) => parseDate(params.row.datop, '-'),
    valueFormatter: (params) => formatDate(params.value)
  },
  {
    field: "comfou",
    headerName: "Fournisseur",
    width: 150,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
    valueFormatter: (params) => formatNumberWithSpaces(params.value),
  },
  {
    field: "factureData",
    headerName: "N° Facture",
    width: 150,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => {
      const facture = params.row.factureData;
      const value = facture && facture.NUMFAC;
      return value || "";
    },
    valueFormatter: (params) => formatNumberWithSpaces(params.value),
  },
];

const reversedColumns = columns.reverse()

const supervisorColumns = [ // only his name for now
  {
    field: "eleveurData",
    headerName: "Eleveur",
    width: 200,
    valueGetter: (params) => {
      const eleveur = params.row.eleveurData;
      const value = eleveur && eleveur.NOM;
      return value || "";
    },
    type: 'string',
    flex: 1
  },
]


const PartSocialeList = () => {
  
  const { type, eleveur_id } = useSelector(selectCurrentUser);

  const bast_HT_sum = useRef({ value: 0, label: 'Total base ht', adornment: '€' })
  const totalPrelevement = useRef({ value: 0, label: 'Total prélèvement', adornment: '∑' })

  const sumCalculations = (filteredData) => {
    if (filteredData) {
      let temp_bast_HT_sum = 0;
      let temp_totalPrelevement = 0;
      filteredData.forEach(row => {
        temp_bast_HT_sum += row.base_HT
        temp_totalPrelevement += row.preleve
      });
      bast_HT_sum.current.value = parseFloat(temp_bast_HT_sum.toFixed(2));
      totalPrelevement.current.value = temp_totalPrelevement
      // console.log("sum", bast_HT_sum, "prelevement", totalPrelevement)
    }
  }

  const FilteredPartSociale = withFilter({
    // mainQueryHook: useGetPartSocialesQuery,
    // dataSelection: selectAllPartSociales,
    // columns,
    ...(type === "Eleveur" ?
      {
        mainQueryHook: useGetPartSocialesByEleveurQuery,
        dataSelection: selectAllPartSocialesByEleveur,
        eleveur_id,
        columns: reversedColumns,
        customPaginationStyling: { minWidth: 'auto' },
        rowsDensity: 'standard',
      } :
      {
        mainQueryHook: useGetPartSocialesQuery,
        dataSelection: selectAllPartSociales,
        columns: [...supervisorColumns, ...columns],
      }
    ),
    sumRefs: [bast_HT_sum, totalPrelevement],
    sumCalculations,
    route: 'part_sociale',
    listToForm: false,
  });

  return <FilteredPartSociale />
}

export default PartSocialeList