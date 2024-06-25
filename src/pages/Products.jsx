import { Box, SimpleGrid, Image, Text, Button, VStack, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Smartphone", price: "$699", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: "$999", image: "/images/laptop.jpg" },
  { id: 3, name: "Headphones", price: "$199", image: "/images/headphones.jpg" },
];

const Products = ({ searchQuery, setSearchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);
  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={6}>Products</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map(product => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={product.image} alt={product.name} />
            <VStack p={4} align="start">
              <Heading as="h3" size="md">{product.name}</Heading>
              <Text>{product.price}</Text>
              <Button as={Link} to={`/products/${product.id}`} colorScheme="teal">View Details</Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;