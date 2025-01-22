import { TextInput } from '@mantine/core';
import { Menu, Button, Text, rem } from '@mantine/core';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="SearchBarContainer">
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
    </div>
  );
};

export default SearchBar;
