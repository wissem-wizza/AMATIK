import React from "react";
import { Paper } from "@mui/material";
import { mdiSheep } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import { useGetTotalCheptelQuery } from "../../features/identification/extendedIdentificationApi";

const StyledCard = styled(Paper)`
  width: 320px;
  height: 170px;
  padding: 16px;
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: space-between; /* Put space between items */
  background-color: yellow;
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
  background-color: #ff0000;
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

const TotalCheptel = () => {
  const { data, isLoading } = useGetTotalCheptelQuery();
  let Cheptel = 0;
  if (!isLoading && data) {
    Cheptel = data[0].total_cheptel;
    console.log(Cheptel, "Cheptel");
  }
  return (
    <StyledCard sx={{ borderRadius: "15px" }}>
      <LeftContent>
        <Label>Total Cheptel</Label>
        <Value>{Cheptel}</Value>
      </LeftContent>
      <LogoContainer>
        {/* <Logo path={mdiTruckCargoContainer} alt="Truck Icon" /> */}
        <Icon path={mdiSheep} size="30px" color="white" />
      </LogoContainer>
    </StyledCard>
  );
};

export default TotalCheptel;
