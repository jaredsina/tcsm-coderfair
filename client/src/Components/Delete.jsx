import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Delete() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete item',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this item? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return <Button onClick={openDeleteModal} color="red">Delete</Button>;
}
export default Delete;