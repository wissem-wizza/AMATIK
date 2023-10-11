import { matchPath } from 'react-router-dom'
import Icon from '@mdi/react';
import { mdiSheep, mdiTruckCargoContainer, mdiCashMultiple } from '@mdi/js';

export const menuHierarchy = [
    {
        label: 'Dashboard',
        icon: 'bxs-bar-chart-alt-2',
        children: [
            {
                label: 'Dashboard',
                documentTitle: "Home",
                path: '/',
                menus: {
                    menu: "Dashboard",
                    subMenu: "",
                }
            },
        ],
    },
    {
        label: 'Partenaires',
        icon: 'bxs-group',
        children: [
            {
                label: 'Liste des éleveurs',
                documentTitle: "Les eleveurs",
                path: '/eleveur',
                menus: {
                    menu: "Éleveur",
                    subMenu: "Liste des éleveurs",
                }
            },
            {
                label: 'Fiche éleveur',
                documentTitle: "Nouvel Éleveur",
                path: '/eleveur/ajouter',
                parentPath: '/eleveur',
                menus: {
                    menu: "Éleveur",
                    subMenu: "Fiche éleveur",
                }
            },
            {
                label: 'Editer l\'éleveur',
                documentTitle: "Modification Éleveur",
                path: '/eleveur/editer/:id', // or { path: "/transport/editer/:id" }
                parentPath: '/eleveur',
                menus: {
                    menu: "Éleveur",
                    subMenu: "Editer un éleveur",
                }
            },
            {
                label: 'Liste des clients',
                documentTitle: "Clients",
                path: '/client',
                menus: {
                    menu: "Client",
                    subMenu: "Liste des clients",
                }
            },
            {
                label: 'Fiche client',
                documentTitle: "Nouveau Client",
                path: '/client/ajouter',
                parentPath: '/client',
                menus: {
                    menu: "Client",
                    subMenu: "Fiche client",
                }
            },
            {
                label: 'Editer le client',
                documentTitle: "Modification Client",
                path: '/client/editer/:id', // or { path: "/transport/editer/:id" }
                parentPath: '/client',
                menus: {
                    menu: "Client",
                    subMenu: "Editer un Client",
                }
            },
        ],
    },
    {
        label: 'Annonces',
        icon: 'bxs-megaphone',
        children: [
            {
                label: 'Gérer les annonces',
                documentTitle: "Les Annonces",
                path: '/annonce',
                menus: {
                    menu: "Annonce",
                    subMenu: "Listes des annonces",
                }
            },
            {
                label: 'Creation d\'une nouvelle annonce',
                documentTitle: "Nouvelle Annonces",
                path: '/annonce/ajouter',
                parentPath: '/annonce',
                menus: {
                    menu: "Annonce",
                    subMenu: "Créer une annonce",
                }
            },
            {
                label: 'Editer l\'annonce',
                documentTitle: " Modification Annonce",
                path: '/annonce/editer/:id', // or { path: "/annonce/editer/:id" }
                parentPath: '/annonce',
                menus: {
                    menu: "Annonce",
                    subMenu: "Editer une annonce",
                }
            },
            {
                label: 'Gérer les annonces laine',
                documentTitle: "Les Annonces Laine",
                path: '/annonce_laine',
                menus: {
                    menu: "Annonce Laine",
                    subMenu: "Listes des annonces laine",
                }
            },
            {
                label: 'Creation d\'une nouvelle annonce laine',
                documentTitle: "Nouvelle Annonces Laine",
                path: '/annonce_laine/ajouter',
                parentPath: '/annonce_laine',
                menus: {
                    menu: "Annonce Laine",
                    subMenu: "Créer une annonce laine",
                }
            },
        ],
    },
    {
        label: 'Transports',
        importedIcon: true,
        Icon: () =>
        <div style={{width: "78px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Icon
                path={mdiTruckCargoContainer}
                size="30px" // try 25 * 3 / 2 ==> path size got to be 25px
                color="white"
            />
        </div>,
        children: [
            {
                label: 'Planification',
                documentTitle: " Planification Transport",
                path: '/transport/ajouter',
                parentPath: '/transport',
                display: true,
                menus: {
                    menu: "Transport",
                    subMenu: "Nouveau transport",
                }
            },
            {
                label: 'Gérer les transports',
                documentTitle: "Transport",
                path: '/transport',
                menus: {
                    menu: "Transport",
                    subMenu: "Liste d'expédition",
                }
            },
            {
                label: 'Editer le transport',
                documentTitle: " Modification Transport",
                path: '/transport/editer/:id', // or { path: "/transport/editer/:id" }
                parentPath: '/transport',
                menus: {
                    menu: "Transport",
                    subMenu: "Editer un transport",
                }
            },
        ],
    },
    {
        label: 'Finances',
        importedIcon: true,
        Icon: () =>
        <div style={{width: "78px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Icon
                path={mdiCashMultiple}
                size="30px" // try 25 * 3 / 2 ==> path size got to be 25px
                color="white"
            />
        </div>,
        children: [
            {
                label: 'Les factures',
                documentTitle: "Factures",
                path: '/facture',
                menus: {
                    menu: "Facture Client",
                    subMenu: "Liste des factures clients",
                }
            },
            {
                label: 'Bons de livraison',
                documentTitle: "Bon Livraison",
                path: '/bon_livraison',
                menus: {
                    menu: "Bon Livraison",
                    subMenu: "Liste des bons",
                }
            },
            {
                label: 'Ristournes',
                documentTitle: "Consulter les ristournes",
                path: '/ristourne',
                menus: {
                    menu: "Ristournes",
                    subMenu: "Liste des ristournes",
                }
            },
            {
                label: 'Les parts sociales',
                documentTitle: "Part Sociale",
                path: '/part_sociale',
                menus: {
                    menu: "Part Sociale",
                    subMenu: " Liste des parts sociales",
                }
            },
        ],
    },
    {
        label: 'Élevage',
        importedIcon: true,
        Icon: () =>
        <div style={{width: "78px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Icon
                path={mdiSheep}
                size="30px" // 25 * 3 / 2 ==> path size got to be 25px
                color="white"
            />
        </div>
        ,
        children: [
            {
                label: 'Cheptel',
                documentTitle: "Cheptel",
                path: '/cheptel',
                menus: {
                    menu: "Cheptel",
                    subMenu: "Liste des cheptels",
                }
            },
            {
                label: 'Les tickets d\'abattage',
                documentTitle: "Tickets de saisie",
                path: '/abattage',
                menus: {
                    menu: "Abattage",
                    subMenu: "Liste des abattages",
                }
            },
        ],
    },
    {
        label: 'Administration',
        icon: 'bx-user-check',
        children: [
            {
                label: 'Utilisateurs',
                documentTitle: "Utilisateurs",
                path: '/user',
                menus: {
                    menu: "Utilisateur",
                    subMenu: "Liste des utilisateurs",
                }
            },
        ],
    },
];

export const getPageProps = (location) => {
    let foundIndex = 0
    let menu = {
        notFound: true,
        label: '',
        documentTitle: "",
        path: location.pathname,
        menus: {
            menu: "",
            subMenu: "",
        },
    }
    const foundMenu = menuHierarchy.find((item) => {
        const foundPath = item.children.find((subMenu, index) => {
            if (matchPath(subMenu.path, location.pathname)) {
                foundIndex = index
                return true
            }
            return false
        })
        return foundPath
    })

    if(foundMenu) {
        menu.notFound = false
        menu = { ...menu, ...foundMenu }
        return menu.children[foundIndex]
    }
    
    return menu
}