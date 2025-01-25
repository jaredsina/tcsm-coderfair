import { Menu, Button, Text, rem, TextInput, Flex } from '@mantine/core';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <Flex justify="center" align="center" gap="10px">
      <div className="SearchBar">
        <TextInput placeholder="Search student or project" />
      </div>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Sort</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Sort By:</Menu.Label>
          <Menu.Item>Rank</Menu.Item>
          <Menu.Item>Student A-Z</Menu.Item>
          <Menu.Item>Project A-Z</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default SearchBar;
