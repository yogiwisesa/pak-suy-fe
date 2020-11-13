import { Box, BoxProps } from '@chakra-ui/core';

export const Card: React.FC<BoxProps> = (props) => {
  return <Box boxShadow="0 1px 1px 0 rgba(0,0,0,.25)" border="8px" {...props} />;
};
