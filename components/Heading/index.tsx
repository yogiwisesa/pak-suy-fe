import { Heading, HeadingProps } from '@chakra-ui/core';

export const Heading2: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      fontSize="1.5rem"
      fontWeight="500"
      letterSpacing="-0.01em"
      color="#484C4F"
      {...props}
    />
  );
};

export const Heading3: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      fontSize="1.25rem"
      fontWeight="500"
      letterSpacing="-0.01em"
      color="#484C4F"
      {...props}
    />
  );
};

export const Heading4: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      fontSize="1.125rem"
      fontWeight="500"
      letterSpacing="-0.01em"
      color="#484C4F"
      {...props}
    />
  );
};
