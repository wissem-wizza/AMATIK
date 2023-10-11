import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { extendedApiSlice as annonceSlice } from "../features/annonce/extendedAnnonceApi";
import { extendedApiSlice as annonceLaineSlice } from "../features/annonce/AnnonceLaineApi";
import { extendedApiSlice as transportSlice } from "../features/transport/extendedTransportApi";
import { extendedApiSlice as identificationSlice } from "../features/identification/extendedIdentificationApi";
import { extendedApiSlice as otherSlice } from "../features/others/otherRoutesApi";
import { extendedApiSlice as eleveurSlice } from "../features/eleveur/extendedEleveurApi";
import { extendedApiSlice as clientSlice } from "../features/client/extendedClientApi";
import { parametresDiversApi } from "../features/parametres_divers/parametreDiversApi";

import ProtectedRoute from "../components/ProtectedRoute";
import Container from '../components/Container/Container';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
// import Test from '../components/Foundation/TestComponent';
// import ErrorBoundary from '../components/Foundation/ErrorBoundary';
import ProfileList from '../components/Profile/ProfileList';
import EleveurList from '../components/EleveurList/EleveurList';
import EleveurForm from '../components/EleveurForm/EleveurForm';
import ClientList from '../components/Client/ClientList';
import ClientForm from '../components/Client/ClientForm';
import AnnonceList from '../components/Annonce/AnnonceList';
import AnnonceForm from '../components/AnnonceForm/AnnonceForm';
import AnnonceLaineList from '../components/AnnonceLaine/AnnonceLaineList';
import TransportForm from '../components/Transport/TransportForm';
import TransportList from '../components/Transport/TransportList';
import AbattageList from '../components/Abattage/AbattageList';
import PartSocialeList from '../components/PartSociale/PartSocialeList';
import FactureList from '../components/FactureList/FactureList';
import BonLivraison from '../components/BonLivraison/BonLivraisonList';
import RistourneList from '../components/Ristourne/RistourneList';
import Error404 from "../components/Erreur/Erreur";


const prepareRoutes = (authenticated, userType, dispatch) => { // it will be called with each navigation
    const ruleList = ['logged in', 'logged out', 'Superviseur', 'Eleveur']
    const [ loggedIn, loggedOut, Superviseur, Eleveur ] = ruleList

    const generateProtectionProps = (rules) => {
        const protectionProps = {}
    
        rules.forEach(rule => {
            switch (rule) {
                case loggedIn:
                    protectionProps.pass = authenticated;
                    break;
                case loggedOut:
                    protectionProps.pass = !authenticated;
                    protectionProps.redirectTo = "/";
                    break;
                case Superviseur:
                    protectionProps.pass = userType === Superviseur;
                    protectionProps.redirectTo = "/annonce";
                    break;
                case Eleveur:
                    protectionProps.pass = userType === Eleveur;
                    protectionProps.redirectTo = "/";
                    break;
                default:
                    protectionProps.pass = true;
                    break;
            }
        });
        return protectionProps;
    };
    
    const preparedRoutes = [
        {
            path: '',
            Element: Dashboard,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'login',
            Element: Login,
            protectedProps: generateProtectionProps([loggedOut])
        },
        // {
        //     path: 'test',
        //     // Element: Test,
        //     protectedProps: generateProtectionProps([loggedOut]),
        //     AltElement: () => (
        //         <ErrorBoundary fallback={<div>Something went wrong</div>}>
        //             <Test />
        //         </ErrorBoundary>
        //     ),
        // },
        {
            path: 'user',
            Element: ProfileList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'annonce_laine',
            Element: AnnonceLaineList,
            loader: async () => {
                const laineOptionsResponse = dispatch(
                    annonceLaineSlice.endpoints.getAnnonceLaineSelectFields.initiate());

                try {
                    const laineOptions = await laineOptionsResponse.unwrap()
                    return laineOptions
                } catch (e) {
                    return redirect("/") // BAD !!!
                } finally {
                    laineOptionsResponse.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn])
        },
        {
            path: 'annonce',
            Element: AnnonceList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn])
        },
        {
            path: 'annonce/ajouter',
            Element: AnnonceForm,
            loader: async () => {
                const response = dispatch(parametresDiversApi.endpoints.getParametresDiversById.initiate(99));

                try {
                    const newID = await response.unwrap()
                    return { nouvelle: true, data: { newID: newID.valeur }}
                } catch (e) {
                    return redirect("/") // BAD !!!
                } finally {
                    response.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Eleveur])
        },
        {
            path: 'annonce/editer/:id',
            Element: AnnonceForm,
            loader: async ({ params }) => {
                const response = dispatch(annonceSlice.endpoints.getAnnonceById.initiate(params.id));

                try {
                    const annonce = await response.unwrap()
                    return { nouvelle: false, data: annonce?.entities?.[params.id] }
                } catch (e) {
                    return redirect("/") // BAD !!!
                } finally {
                    response.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Eleveur])
        },
        {
            path: 'eleveur',
            Element: EleveurList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'eleveur/ajouter',
            Element: EleveurForm,
            loader: async () => {
                const labelResponse = dispatch(otherSlice.endpoints.getLabels.initiate());
                const cléResponse = dispatch(
                    parametresDiversApi.endpoints.getParametresDiversById.initiate(101));
                const cheptelResponse = dispatch(
                    parametresDiversApi.endpoints.getParametresDiversById.initiate(102));

                try {
                    const labels = await labelResponse.unwrap()
                    const clé = await cléResponse.unwrap()
                    const numCheptel = await cheptelResponse.unwrap()

                    return {
                        nouveau: true,
                        labels: Object.values(labels.entities),
                        creationData: {
                            nouveauClé: String(clé.valeur),
                            numCheptel: String(numCheptel.valeur),
                        }
                    }
                } catch (e) {
                    return redirect("/") // BAD !!!
                } finally {
                    labelResponse.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'eleveur/editer/:id',
            Element: EleveurForm,
            loader: async ({ params }) => {
                const responseEleveur = dispatch(
                    eleveurSlice.endpoints.getEleveurById.initiate(params.id));
                const labelResponse = dispatch(otherSlice.endpoints.getLabels.initiate());

                try {
                    const eleveur = await responseEleveur.unwrap()
                    const labels = await labelResponse.unwrap()

                    return {
                        nouvelle: false,
                        labels: Object.values(labels.entities),
                        updatingData: {
                            toUpdate: eleveur?.entities?.[params.id],
                        }
                    }
                } catch (e) {
                    console.log("error", e)
                    return redirect("/") // BAD !!!
                } finally {
                    responseEleveur.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'client',
            Element: ClientList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'client/ajouter',
            Element: ClientForm,
            loader: async () => {
                const labelResponse = dispatch(otherSlice.endpoints.getLabels.initiate());
                const cléResponse = dispatch(
                    parametresDiversApi.endpoints.getParametresDiversById.initiate(103));

                try {
                    const labels = await labelResponse.unwrap()
                    const clé = await cléResponse.unwrap()

                    return {
                        nouveau: true,
                        labels: Object.values(labels.entities),
                        creationData: {
                            nouveauClé: String(clé.valeur),
                        }
                    }
                } catch (e) {
                    return redirect("/") // BAD !!!
                } finally {
                    labelResponse.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'client/editer/:id',
            Element: ClientForm,
            loader: async ({ params }) => {
                const responseClient = dispatch(
                    clientSlice.endpoints.getClientById.initiate(params.id));
                const labelResponse = dispatch(otherSlice.endpoints.getLabels.initiate());
        
                try {
                    const client = await responseClient.unwrap()
                    const labels = await labelResponse.unwrap()
        
                    return {
                        nouvelle: false,
                        labels: Object.values(labels.entities),
                        updatingData: {
                            toUpdate: client?.entities?.[params.id],
                        }
                    }
                } catch (e) {
                    console.log("error", e)
                    return redirect("/") // BAD !!!
                } finally {
                    responseClient.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'transport',
            Element: TransportList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'transport/ajouter',
            Element: TransportForm,
            loader: async () => {
                const responseID = dispatch(
                    parametresDiversApi.endpoints.getParametresDiversById.initiate(5));
                const responseOptions = dispatch(
                    transportSlice.endpoints.getTransportSelectFields.initiate());
                const responseIdentifications = dispatch(
                    identificationSlice.endpoints.getIdentificationsATransporter.initiate());

                try {
                    const newID = await responseID.unwrap()
                    const selectedFields = await responseOptions.unwrap()
                    const adaptedAvailableAnnonces = await responseIdentifications.unwrap()
                    const availableAnnonces = Object.values(adaptedAvailableAnnonces?.entities)

                    return {
                        nouvelle: true,
                        creationData: {
                            newID: newID.valeur, selectedFields, availableAnnonces
                        }
                    }
                } catch (e) {
                    return redirect("/") // BAD !!!
                } finally {
                    responseID.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'transport/editer/:id',
            Element: TransportForm,
            loader: async ({ params }) => {
                const responseTransport = dispatch(
                    transportSlice.endpoints.getTransportById.initiate(params.id));
                const responseRelatedIdentification = dispatch(
                    identificationSlice.endpoints.getIdentificationsByRelatedTransport.initiate(params.id));
                const responseOptions = dispatch(
                    transportSlice.endpoints.getTransportSelectFields.initiate());
                const responseIdentifications = dispatch(
                    identificationSlice.endpoints.getIdentificationsATransporter.initiate());
                try {
                    const transport = await responseTransport.unwrap()
                    const selectedFields = await responseOptions.unwrap()
                    const adaptedAvailableAnnonces = await responseIdentifications.unwrap()
                    const adaptedRelatedIdentification = await responseRelatedIdentification.unwrap()

                    const availableAnnonces = Object.values(adaptedAvailableAnnonces?.entities)
                    const relatedIdentifications = Object.values(adaptedRelatedIdentification?.entities)
                    return {
                        nouvelle: false,
                        updatingData: {
                            toUpdate: transport?.entities?.[params.id],
                            selectedFields,
                            availableAnnonces,
                            toTransportAnnonces: relatedIdentifications,
                        }
                    }
                } catch (e) {
                    console.log("error", e)
                    return redirect("/") // BAD !!!
                } finally {
                    responseTransport.unsubscribe()
                }
            },
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'part_sociale',
            Element: PartSocialeList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn])
        },
        {
            path: 'abattage',
            Element: AbattageList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'facture',
            Element: FactureList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'bon_livraison',
            Element: BonLivraison,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn, Superviseur])
        },
        {
            path: 'ristourne',
            Element: RistourneList,
            contained: true,
            protectedProps: generateProtectionProps([loggedIn])
        },
        {
            path: "*",
            Element: Error404,
            contained: false,
        },
    ]
    const routes = [
        {
            path: '',
            element: <Container />,
            children: []
        }
    ]
    preparedRoutes.forEach(({ path, Element, protectedProps, contained, ...rest }) => {
        let route = {}
        if(protectedProps) {
            route.element = <ProtectedRoute {...protectedProps} />
            route.children = [{ path, element: <Element/>, ...rest }]
        } else {
            route.element = <Element/>
            route.path = path
            route = {...route, ...rest}
        }
        if(contained)
            routes[0].children.push(route)
        else routes.push(route)
    })
    return routes
}

export const useRouting = (authenticated, user) => {

    const dispatch = useDispatch()
    const routes = prepareRoutes(authenticated, user?.type, dispatch)

    return routes
};