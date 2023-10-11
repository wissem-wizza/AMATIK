import React from "react";
import { Paper } from "@mui/material";
import { mdiHandshake } from "@mdi/js";
// import GroupIcon from "@mui/icons-material/Group";
import Icon from "@mdi/react";
import styled from "styled-components";
import { useGetTotalClientsQuery } from "../../features/client/extendedClientApi";

const StyledCard = styled(Paper)`
  width: 320px;
  height: 170px;
  padding: 16px;
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: space-between; /* Put space between items */
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 24px;
  color: #333333;
  margin-bottom: 16px;
`;

const Value = styled.div`
  font-size: 36px;
  color: #000000;
`;

const LogoContainer = styled.div`
  background-color: #1c4cd0;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

// const Logo = styled.img`
//   width: 40px;
//   height: 40px;
// `;

const TotalClient = () => {
  const { data, isLoading } = useGetTotalClientsQuery();
  let NumberTot = 0;
  if (!isLoading && data) {
    NumberTot = data;
  }
  return (
    <StyledCard sx={{ borderRadius: "15px" }}>
      <LeftContent>
        <Label>Total clients</Label>
        <Value>{NumberTot}</Value>
      </LeftContent>
      <LogoContainer>
        {/* <Logo path={mdiTruckCargoContainer} alt="Truck Icon" /> */}
        <Icon path={mdiHandshake} size="30px" color="white" />
      </LogoContainer>
    </StyledCard>
  );
};

export default TotalClient;
