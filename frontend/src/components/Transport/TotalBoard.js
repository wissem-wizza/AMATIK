import { useEffect, useContext } from 'react';
import { Grid, Typography } from '@mui/material';

import { CustomFormContext } from './TransportForm';


const calculateTotal = (sumsObj) => {
    let total = 0;
    for (const key in sumsObj) {
        if (typeof sumsObj[key] === 'number') {
            total += sumsObj[key];
        }
    }
    return total;
}


const TotalBoard = ({ title, sums, toTransport }) => {

    const { total, setTotal } = useContext(CustomFormContext);

    useEffect(() => {
        if(toTransport)
        setTotal(calculateTotal(sums))
    }, [sums, setTotal, toTransport])

    return (
        <Grid container direction="column" justifyContent="center" alignItems="start" sx={{
            backgroundColor: "transparent",
            borderRadius: "10px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#06603a",
            position: "relative",
            maxWidth: "20%",
            padding: "5px",
        }}>
            <Typography
                sx={{
                    position: "absolute",
                    top: "-12px",
                    left: "15px",
                    fontSize: "0.8rem",
                    paddingInline: "15px",
                    backgroundColor: "white",
                    whiteSpace: "nowrap"
                }} component="div">
                {title}
            </Typography>
            <Grid item container justifyContent="space-around" alignItems="center" p={0} sx={{ marginTop: "10px" }}>
                <Grid item>
                    <Typography variant='p' sx={{ fontSize: "0.8rem" }}>
                        Nb Bêtes du service
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='p' sx={{ fontSize: "0.8rem" }}>
                        <i>{toTransport ? total : calculateTotal(sums)}</i>
                    </Typography>
                </Grid>
            </Grid>
            {Object.entries(sums).map(([key, value]) => (
                <Grid item container justifyContent="space-around" alignItems="center" p={1} key={key}>
                    <Grid item>
                        <Typography variant='p' sx={{ fontSize: "0.8rem" }}>
                            {`Nb total des ${key}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='p' sx={{ fontSize: "0.8rem" }}>
                            <i>{value}</i>
                        </Typography>
                    </Grid>
                </Grid>
            ))}
            <Grid item></Grid>
        </Grid>
    )
}

export default TotalBoard