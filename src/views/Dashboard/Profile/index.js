// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";

function Profile() {
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
    <Flex direction='column'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        name={"Esthera Jackson"}
        email={"esthera@simmmple.com"}
        tabs={[
          {
            name: "VISÃO GERAL",
            icon: <FaCube w='100%' h='100%' />,
          }
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap='22px'>
        <PlatformSettings
          title={"Configurações"}
        />
        <ProfileInformation
          title={"Editar Informações"}
          name={"Esthera Jackson"}
          mobile={"(44) 123 1234 123"}
          email={"esthera@simmmple.com"}
          location={"United States"}
        />
      </Grid>
    </Flex>
  );
}

export default Profile;
