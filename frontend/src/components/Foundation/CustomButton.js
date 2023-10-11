import { styled } from '@mui/system';
import { blue } from '@mui/material/colors';


export const CustomButton = styled('button')`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    white-space: nowrap;
    background-color: ${({ color }) => color?.[500] || blue[500]};
    color: white;
    border-radius: 8px;
    font-weight: 200;
    padding: 4px 8px;
    cursor: pointer;
    transition: all 150ms ease;
    border: none;

    &:hover {
        background-color: ${({ color }) => color?.[600] || blue[600]};
    }

    &.active {
        background-color: ${({ color }) => color?.[700] || blue[700]};
    }

    &.focusVisible {
        box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
        outline: none;
    }

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;