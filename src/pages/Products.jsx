import { Box, SimpleGrid, Image, Text, Button, VStack, Heading, Checkbox, CheckboxGroup, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Smartphone", price: 699, category: "Electronics", brand: "BrandA", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 999, category: "Electronics", brand: "BrandB", image: "/images/laptop.jpg" },
  { id: 3, name: "Headphones", price: 199, category: "Accessories", brand: "BrandA", image: "/images/headphones.jpg" },
];

const Products = ({ searchQuery, setSearchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
      )
    );
  }, [searchQuery, selectedCategories, selectedBrands, priceRange]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={6}>Products</Heading>
      <Box mb={6}>
        <Heading as="h4" size="md" mb={2}>Filter by Category</Heading>
        <CheckboxGroup onChange={handleCategoryChange}>
          <Stack spacing={2} direction="row">
            <Checkbox value="Electronics">Electronics</Checkbox>
            <Checkbox value="Accessories">Accessories</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Box mb={6}>
        <Heading as="h4" size="md" mb={2}>Filter by Brand</Heading>
        <CheckboxGroup onChange={handleBrandChange}>
          <Stack spacing={2} direction="row">
            <Checkbox value="BrandA">BrandA</Checkbox>
            <Checkbox value="BrandB">BrandB</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Box mb={6}>
        <Heading as="h4" size="md" mb={2}>Filter by Price</Heading>
        <Slider aria-label="price-range" defaultValue={[0, 1000]} min={0} max={1000} step={50} onChangeEnd={handlePriceChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} index={0} />
          <SliderThumb boxSize={6} index={1} />
        </Slider>
        <Text mt={2}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map(product => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={product.image} alt={product.name} />
            <VStack p={4} align="start">
              <Heading as="h3" size="md">{product.name}</Heading>
              <Text>${product.price}</Text>
              <Button as={Link} to={`/products/${product.id}`} colorScheme="teal">View Details</Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;