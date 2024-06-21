// Chakra imports
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { ProfileIcon } from "components/Icons/Icons";
import React from "react";

const CardIformation = ({
  backgroundImage,
  number,
  validity
}) => {
  return (
    <Card
      backgroundImage={backgroundImage}
      backgroundRepeat='round'
      background='cover'
      backgroundSize={'auto'}
      p='16px'
      h={{ sm: "220px", xl: "100%" }}
      gridArea={{ md: "1 / 1 / 2 / 3", xl: "1 / 1 / 2 / 3" }}>
      <CardBody h='100%' w='100%'>
        <Flex
          color='white'
          h='100%'
          p='0px 10px 20px 10px'
          w='100%'
          direction='row'
          alignItems={'center'}
          justifyContent={'space-around'}
        >
          <Flex direction='column'>
            <Box>
              <Text fontSize='xl' letterSpacing='2px' fontWeight='bold'>
                {number}
              </Text>
            </Box>
            <Flex mt='14px'>
              <Flex direction='column' me='34px'>
                <Text fontSize='xs'>{validity.name}</Text>
                <Text fontSize='xs' fontWeight='bold'>
                  {validity.createdAt}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex textAlign={'center'} style={{ textAlign: 'center' }}>
            <Box borderRadius={'50%'} backgroundColor={'rgba(0,0,0,0.23)'}>
              <ProfileIcon w={100} h={100} color="gray.100" />
            </Box>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardIformation;
