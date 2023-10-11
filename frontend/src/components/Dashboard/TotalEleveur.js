import React from "react";
import { Paper } from "@mui/material";
import { mdiAccountGroup } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import { useGetTotalEleveursQuery } from "../../features/eleveur/extendedEleveurApi";

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
  background-color: #06603a;
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

const TotalEleveur = () => {
  const { data, isLoading } = useGetTotalEleveursQuery();
  let NumberTot = 0;
  if (!isLoading && data) {
    NumberTot = data;
  }
  return (
    <StyledCard sx={{ borderRadius: "15px" }}>
      <LeftContent>
        <Label>Total éleveurs</Label>
        <Value>{NumberTot}</Value>
      </LeftContent>
      <LogoContainer>
        <Icon path={mdiAccountGroup} size="30px" color="white" />
      </LogoContainer>
    </StyledCard>
  );
};

export default TotalEleveur;
