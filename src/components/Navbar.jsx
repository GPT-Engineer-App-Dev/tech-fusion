import { Box, Flex, Link, Spacer, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Heading as="h1" size="lg" color="white">Electronics Store</Heading>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          width="200px"
          mr={4}
        />
        <Spacer />
        <Link as={RouterLink} to="/" color="white" mr={4}>Home</Link>
        <Link as={RouterLink} to="/products" color="white">Products</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;