import dayjs from 'dayjs';
import weekOfYear  from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

export const formFields = ["date", "heure", "chauffeur", "immatriculation", "site"];

export const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];


// Extract date and time components
const combinedDate = ({date, heure}) =>
    dayjs(date)
        .hour(heure.hour())
        .minute(heure.minute())
        .second(0);

export const mapToDatabaseObject = ({
    numOrdre,
    date,
    heure,
    total,
    immatriculation,
    chauffeur,
    site,
    id,
}) => {
    return {
        id,
        NUM_ORDRE: numOrdre,
        DATE_TRANS: combinedDate({ date, heure }).format('YYYY-MM-DD h:mm A'),
        SEMAINE: date.week(),
        JOUR_SEMAINE: days[date.day()],
        NB_DETAIL: total,
        IMMATRICULATION: immatriculation,
        CHAUFFEUR: chauffeur,
        CODE_SITE: site,
        ETAT_TRANSFERT: 0,
    };
};

export const mapToEditInputs = (dbObject) => {
    const { NUM_ORDRE, DATE_TRANS, NB_DETAIL, IMMATRICULATION, CHAUFFEUR, CODE_SITE } = dbObject;
    // const { date, heure } = reverseCombinedDate(DATE_TRANS);
    const parsedDate = dayjs(DATE_TRANS, 'YYYY-MM-DD h:mm A');
    const [date, heure] = [parsedDate, parsedDate]

    return {
        numOrdre: NUM_ORDRE,
        date,
        heure,
        total: NB_DETAIL,
        immatriculation: IMMATRICULATION,
        chauffeur: CHAUFFEUR,
        site: CODE_SITE
    };
};