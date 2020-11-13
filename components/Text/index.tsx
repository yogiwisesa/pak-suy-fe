import { BoxProps, Text } from '@chakra-ui/core';

export const TextXLarge: React.FC<BoxProps> = (props) => {
  return <Text fontSize="1.5rem" fontWeight="300" letterSpacing="0em" color="#484C4F" {...props} />;
};

export const TextLarge: React.FC<BoxProps> = (props) => {
  return <Text fontSize="1rem" fontWeight="300" letterSpacing="0em" color="#484C4F" {...props} />;
};

export const TextMedium: React.FC<BoxProps> = (props) => {
  return (
    <Text fontSize="0.875rem" fontWeight="300" letterSpacing="0em" color="#484C4F" {...props} />
  );
};
