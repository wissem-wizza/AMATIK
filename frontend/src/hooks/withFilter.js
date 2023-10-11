import { useState, useEffect, createContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, LinearProgress, Link, Stack, Grid } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import MainGrid from '../components/Foundation/MainGrid';
import FilterGrid from '../components/Foundation/FilterGrid';
import FilterTags from '../components/Foundation/FilterTags';

export const MainGridContext = createContext();


// Higher-Order Component (HOC)
const withFilter = (options) => {
    const {
        mainQueryHook, // query to grab main data to fill the DataGrid
        eleveur_id, // meant for "...ByEleveur" queries, no problem if it's undefined for other queries
        dataSelection, // rtk selectors for data to be easy to manipulate
        columns, // passed as they are in the hidden DataGrid but filtered in the displayed one
        optionsQueryHook = () => ({}), // for column of type singleSelect
        getColumnsWithOptions = () => [], // alt. for columns, only required if we passed optionsQueryHook
        listToForm = true, // if = false, then it's just consultation, no "ajouter" or "editer" options
        route, // to handle navigation to CRUD pages
        dialogForm = false, // if the "ajouter" or "editer" forms are going to be displayed in dialog 
        setFormDialogState = null, // if dialogForm = true, we can play on dialog state (editer VS ajouter)
        setRowToEdit, // when editing on the fly (with dialog), we need to know what row has been selected
        openFormDialog, // if the "ajouter" or "editer" are done through dialogs (when dialogForm = true)
        setOpenDeletionDialog, // needed when listToForm = true (when rows are editable)
        sumRefs = [], // references for totals to be displayed under the DataGrid
        sumCalculations, // handle calculation
        additionalStyling, // will be added to main DataGrid component styling
        customPaginationStyling, // each DataGrid demand a different position for pagination
        customWidth = "100%", // for DataGrid container
        rowsDensity, // default density value, one of: 'compact', 'comfortable' or 'standard'
        getDataForRecordToDelete, // data needed before opening deletion record, and when confirming
        deletableRow = () => true,
        deleteFeature = true, // delete buuton will be added only if this option is set to true
    } = options;

    return function DataGridWithFilter() {
        const { isLoading: isMainDataLoading } = mainQueryHook(eleveur_id);
        const { data: optionsData, isLoading: isOptionsDataLoading } = optionsQueryHook();
        const mainData = useSelector(dataSelection);

        const [filteredData, setFilteredData] = useState([]);
        const [newFilter, setNewFilter] = useState(null);
        const [filterList, setFilterList] = useState({});
        // find an alternative solution rather than this silly one
        const [alreadyAddedIds, setAlreadyAddedIds] = useState([]);
        const [columnsWithOptions, setColumnsWithOptions] = useState([]);
        const [selectedRows, setSelectedRows] = useState([]);

        const navigate = useNavigate();

        useEffect(() => {
            if(!isMainDataLoading)
            setFilteredData(mainData)
        }, [isMainDataLoading, mainData]);

        useEffect(() => {
            if (newFilter &&
                !alreadyAddedIds.includes(newFilter.id)
                && !Object.keys(filterList).includes(newFilter?.['field'])
                && newFilter.autoFilteredData) {
                const { id, operator, value, autoFilteredData } = newFilter
                setFilterList({ ...filterList,
                    [newFilter['field']]: { id, operator, value, autoFilteredData } })
                setAlreadyAddedIds(ids => [...ids, id])
            }
        }, [alreadyAddedIds, filterList, newFilter])

        useEffect(() => {
            // filters is the list of results of all filter => array of arrays,
            const filters = Object.values(filterList).map(v => v.autoFilteredData)
            if(!isMainDataLoading) {
                if (Object.keys(filterList).length !== 0) {
                    const intersection = filters.reduce((acc, curr) => {
                        return acc.filter(c => {
                            return curr.includes(c)
                        })
                    });
                    setFilteredData(mainData.filter(row => intersection.includes(row._id)))
                }
                else setFilteredData(mainData) // maybe a better approach is possible
            }
        }, [isMainDataLoading, mainData, filterList])

        useEffect(() => {
            if (sumCalculations) {
                sumCalculations(filteredData)
            }
        }, [filteredData])

        useEffect(() => {
            if(!isOptionsDataLoading && !columns) {
                setColumnsWithOptions(getColumnsWithOptions(optionsData))
            }
        }, [isOptionsDataLoading, optionsData])
        

        if (isMainDataLoading) {
            return ( // for some reasons .. LinearProgress only shows up inside Grid
                <Grid spacing={1} container sx={{ marginTop: '4rem' }}>
                    <Grid xs item>
                        <LinearProgress color="success" />
                    </Grid>
                </Grid>
            )
        }

        return (
            <div style={{ maxWidth: "max-content", minWidth: "80%" }}>
                {listToForm && 
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    sx={{ minWidth: "100%", margin: "0 5px 5px 0"}}
                >
                    <Link
                        onClick={() => {
                            if(dialogForm) {
                                if(setFormDialogState !== null) {
                                    setFormDialogState('ajouter')
                                }
                                openFormDialog()
                            } else {
                                navigate(`/${route}/ajouter`)
                            }
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button variant="contained" color="success"><AddIcon/> Ajouter</Button>
                    </Link>
                    <Button
                        variant="outlined"
                        color="success"
                        disabled={selectedRows.length === 0}
                        onClick={() => {
                            if(dialogForm) {
                                if(setFormDialogState !== null) {
                                    setFormDialogState('editer')
                                    setRowToEdit(selectedRows[0])
                                }
                                openFormDialog()
                            } else {
                                navigate(`/${route}/editer/${selectedRows[0]}`)
                            }
                        }}
                    >
                        <EditIcon />
                    </Button>
                    {
                        deleteFeature ?
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={
                                selectedRows.length === 0 ||
                                !deletableRow(filteredData.find(row => row._id === selectedRows[0]))
                            }
                            onClick={() => {
                                getDataForRecordToDelete(filteredData.find(row => row._id === selectedRows[0]))
                                setOpenDeletionDialog(true)
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                        : null
                    }
                </Stack>}
                <div style={{ maxHeight: "100%", width: `${customWidth}`, overflow: 'hidden',
                    marginTop: listToForm ? '' : '30px' }}>
                    {/* USED TO HAVE 632 as maxHeight */}
                    <div className='StyledGrid' style={{minHeight: "500px"}}>
                        {Object.keys(filterList).length > 0 && <FilterTags filterList={filterList}
                            setFilterList={setFilterList} />}

                        {/* THE DATAGRID THAT WILL BE DISPLAYED */}
                        {filteredData &&
                        <MainGridContext.Provider value={{sumRefs, customPaginationStyling}}>
                            <MainGrid data={filteredData}
                                columns={columns || columnsWithOptions}
                                setNewFilter={setNewFilter}
                                // we used 'key' attribute for auto reload as new component
                                key={filteredData}
                                setSelectedRows={setSelectedRows}
                                additionalStyling={additionalStyling}
                                rowsDensity={rowsDensity}
                            />
                        </MainGridContext.Provider>
                        }

                    </div>
                    {mainData && newFilter &&
                        <div style={{ height: 0, width: "100%", overflow: 'hidden' }}>
                            <FilterGrid data={mainData}
                                columns={columns || columnsWithOptions}
                                newFilter={newFilter}
                                setNewFilter={setNewFilter}
                                // has to re-mount to start filtering from scratch, hence the key
                                key={newFilter.id}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    };
};

const columnsShape = PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerName: PropTypes.string.isRequired,
});

const customPropTypes = (props, propName, componentName) => {
    if (
        !props.columns &&
        (!props.getColumns || !props.optionsQueryHook)
    ) {
        return new Error(
            `Either 'columns' or both 'getColumns' and 'optionsQueryHook' are required in
            '${componentName}'.`
        );
    }

    if (props.columns) {
        if (!Array.isArray(props.columns) || props.columns.some(col => !columnsShape.isRequired(col))) {
            return new Error(`'columns' must be an array of objects with 'field' and 'headerName' in
            '${componentName}'.`);
        }
    }

    if (props.getColumns) {
        if (typeof props.getColumns !== 'function') {
            return new Error(`'getColumns' must be a function in '${componentName}'.`);
        }

        const generatedColumns = props.getColumns();
        if (!Array.isArray(generatedColumns) ||
            generatedColumns.some(col => !columnsShape.isRequired(col))) {
            return new Error(`'getColumns' must return an array of objects with 'field' and 'headerName' in '
            ${componentName}'.`);
        }
    }
};

customPropTypes.isRequired = function (props, propName, componentName) {
    if (!props[propName]) {
        return new Error(`The prop '${propName}' is required in '${componentName}'.`);
    }

    return customPropTypes(props, propName, componentName);
};

withFilter.propTypes = {
    mainQueryHook: PropTypes.func.isRequired,
    columns: customPropTypes,
    title: PropTypes.string,
    sumRefs: PropTypes.arrayOf(
        PropTypes.shape({
            current: PropTypes.any,
        })
    ),
    sumCalculations: function (props, propName, componentName) {
        if (props.sumRefs && !props[propName]) {
            return new Error(`The prop '${propName}' is required when 'sumRefs' is provided in
            '${componentName}'.`);
        }
    },
};

export default withFilter;