import { useState, createContext } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom'
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Paper } from '@mui/material';
import dayjs from 'dayjs';

import UpperForm from './TransportUpperForm';
import TransportSelection from './TransportSelection';
import TransportFooter from './TransportFooter';
import {
    useUpdateManyIdentificationsMutation,
} from '../../features/identification/extendedIdentificationApi'
import {
    useCreateTransportMutation,
    useUpdateTransportMutation,
} from '../../features/transport/extendedTransportApi'
import { formFields, mapToDatabaseObject, mapToEditInputs } from './formData';

const today = dayjs();
const tomorrow = today.add(1, 'day');
const eightAM = dayjs().set('hour', 8).startOf('hour');

export const CustomFormContext = createContext();


const TransportForm = () => {

    const formData = useLoaderData()
    const {
        nouvelle,
        creationData = {},
        updatingData = {},
    } = formData
    const { newID } = creationData
    const { toUpdate, toTransportAnnonces: linkedIdentifications = [] } = updatingData
    console.log("to update", toUpdate)

    const { selectedFields } = nouvelle ? creationData : updatingData
    const { availableAnnonces = [] } = nouvelle ? creationData : updatingData

    const [createTransport] = useCreateTransportMutation()
    const [updateTransport] = useUpdateTransportMutation()
    const [updateManyIdentifications] = useUpdateManyIdentificationsMutation()
    const [availableAnnonceList, setAvailableAnnonceList] = useState(availableAnnonces)
    const [toTransportAnnonceList, setToTransportAnnonceList] = useState(linkedIdentifications)

    const navigate = useNavigate()

    const [ date, heure, chauffeur, immatriculation, site ] = formFields

    const {
        chauffeur: defaultChauffeur,
        date: defaultDate,
        heure: defaultHeure,
        immatriculation: defaultImmatriculation,
        numOrdre,
        site: defaultSite,
        total: defaultTotal,
    } = (nouvelle ? {} : mapToEditInputs(toUpdate))

    const ID = numOrdre ?? newID;
    const [total, setTotal] = useState(defaultTotal ?? 0)
    const {
        IMMATRICULATION: immatriculationList,
        CHAUFFEUR: chauffeurList,
        DESIGNATION: siteList,
    } = selectedFields

    const defaultChauffeurIndex = chauffeurList.findIndex(c => c.value === defaultChauffeur)
    const defaultImmatriculationIndex = immatriculationList.findIndex(i => i.value === defaultImmatriculation)
    const defaultSiteIndex = siteList.findIndex(s => s.id === defaultSite)

    const methods = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            [date]: defaultDate || tomorrow,
            [heure]: defaultHeure || eightAM,
            [chauffeur]: chauffeurList[
                defaultChauffeurIndex > 0 ? defaultChauffeurIndex : 0].value,
            [immatriculation]: immatriculationList[
                defaultImmatriculationIndex > 0 ? defaultImmatriculationIndex : 0].value,
            [site]: siteList[
                defaultSiteIndex > 0 ? defaultSiteIndex : 0].id,
        }
    })

    const onSubmit = async (data) => {

        if(nouvelle) {
            await createTransport(
                mapToDatabaseObject({...data, toTransportAnnonceList, numOrdre: ID, total }))

            await updateManyIdentifications({
                ids: toTransportAnnonceList.map(transport => transport._id),
                modification: { dispoTransp: false, TRANSPORT: ID },
            })
        } else {
            // update transport
            await updateTransport(
                mapToDatabaseObject({...data, toTransportAnnonceList, numOrdre: ID, total, id: toUpdate._id }))
            // update identifications separatly .. those who are withdrawn VS old + added records
            const toWithdraw = linkedIdentifications.filter(
                linked => toTransportAnnonceList.findIndex(
                    item => item._id === linked._id
                ) === -1
            )
            await updateManyIdentifications({
                ids: toTransportAnnonceList.map(identification => identification._id),
                modification: { dispoTransp: false, TRANSPORT: ID },
            })
            await updateManyIdentifications({
                ids: toWithdraw.map(identification => identification._id),
                modification: { dispoTransp: true, TRANSPORT: 0 },
            })
        }
        navigate('/transport')
    }

    return (
        // splitting the whole page in 3 items: form + annonce selection + further info (sums + validate)
        <Paper sx={{
            margin: "20px",
            paddingBlock: "50px",
            paddingInline: "20px",
            maxWidth: "max(80vw, 480px)",
            minWidth: "100%"
        }} elevation={3}>
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={2}
                wrap="nowrap"
            >
                <CustomFormContext.Provider value={{
                    onSubmit,
                    total,
                    setTotal,
                    availableAnnonceList,
                    setAvailableAnnonceList,
                    toTransportAnnonceList,
                    setToTransportAnnonceList,
                    formData,
                    ID,
                    selectedFields,
                }}>
                    <FormProvider {...methods}>
                        <Grid item>
                            <UpperForm />
                        </Grid>
                        <Grid item>
                            <TransportSelection />
                        </Grid>
                        {/* Only GOD knows from where the extra space came. */}
                        <Grid item>
                            <TransportFooter />
                        </Grid>
                    </FormProvider>
                </CustomFormContext.Provider>
            </Grid>
        </Paper>
    );
}

export default TransportForm