import React, { useState, useEffect } from 'react'
import { LinearProgress } from "@mui/material";
import { styled } from '@mui/material/styles';

import { useGetPartSocialesQuery } from "../../features/part_sociale/partSocialeApi";
import Export from './PartSocialeMainGrid'
import SencondExport from './PartSocialeFilterGrid'
import FilterTags from './FilterTags'

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: "#9C1F08",
  color: 'white',
  padding: theme.spacing(1),
  marginBottom: '20px',
  textAlign: 'center'
}));

export function TypographyTheme() {
  return <Div>{"Les parts sociales"}</Div>;
}

const PartSocialeList = () => {
  const { data, isLoading } = useGetPartSocialesQuery();

  const [newFilter, setNewFilter] = useState(null)
  const [filterList, setFilterList] = useState({})
  const [filteredData, setFilteredData] = useState(data)
  // find an alternative solution rather than this silly solution
  const [alreadyAddedIds, setAlreadyAddedIds] = useState([])

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    if (newFilter &&
      !alreadyAddedIds.includes(newFilter.id)
      && !Object.keys(filterList).includes(newFilter?.['field'])
      && newFilter.autoFilteredData) {
      const { id, operator, value, autoFilteredData } = newFilter
      setFilterList({ ...filterList, [newFilter['field']]: { id, operator, value, autoFilteredData } })
      setAlreadyAddedIds(ids => [...ids, id])
    }
  }, [newFilter, filterList, alreadyAddedIds])

  useEffect(() => {
    // filters is the list of results of all filter => array of arrays,
    const filters = Object.values(filterList).map(v => v.autoFilteredData)
    
    if (Object.keys(filterList).length !== 0) {
      const intersection = filters.reduce((acc, curr) => {
        return acc.filter(c => {
          return curr.includes(c)
        })
      });
      setFilteredData(data.filter(row => intersection.includes(row._id)))
    }
    else setFilteredData(data) // maybe a better approach is possible
  }, [data, filterList])


  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  return (
    <div style={{ height: 632, width: "100%", overflow: 'auto' }}>
      {/* try replace condition with 'data' with early return with isLoading */}

      <div className='StyledGrid'>
        <TypographyTheme />
        {Object.keys(filterList).length > 0 && <FilterTags filterList={filterList} 
          setFilterList={setFilterList} />}
        {filteredData && <Export data={filteredData}
          setNewFilter={setNewFilter}
          // we used 'key' attribute for auto reload as new component
          key={filteredData}
        />}

      </div>
      {data && newFilter && <SencondExport data={data}
        newFilter={newFilter}
        setNewFilter={setNewFilter}
        // has to re-mount to start filtering from scratch, hence the key
        key={newFilter.id}
      />}
    </div>
  )
}

export default PartSocialeList