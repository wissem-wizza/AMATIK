import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function ChipsArray({filterList, setFilterList}) {

    const handleDelete = (fieldName) => () => {
        setFilterList((filters) => {
            let newFilterList = {}
            Object.keys(filters).forEach(filter => {
                if (filter !== fieldName) {
                    newFilterList[filter] = filters[filter]
                }
            })
            return newFilterList
        })
        // filters.filter((filter) => filter.key !== fieldName.key));
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            {Object.entries(filterList).map((filter) => {
                return (
                    <ListItem key={filter[1].id}>
                        <Chip
                            label={`${filter[0]} ${filter[1].operator} ${filter[1].value}`}
                            onDelete={handleDelete(filter[0])}
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}