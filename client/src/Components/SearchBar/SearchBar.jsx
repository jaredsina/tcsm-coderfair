import { TextInput } from '@mantine/core';
import { Menu, Button, Text, rem } from '@mantine/core';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="SearchBarContainer">
      <TextInput placeholder="Search student or project" />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Toggle menu</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Item>Messages</Menu.Item>
          <Menu.Item>Gallery</Menu.Item>
          <Menu.Item>Search</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item>Transfer my data</Menu.Item>
          <Menu.Item color="red">Delete my account</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default SearchBar;
