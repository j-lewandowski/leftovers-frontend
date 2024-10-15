import { ImportExport } from '@mui/icons-material';
import { Button, MenuItem, Radio } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown from '../navbar/Dropdown';

interface SortingButtonProps {
  name: string;
  ascOptionName: string;
  descOptionName: string;
  fieldName: string;
}

const SortingButton = ({
  name,
  ascOptionName,
  descOptionName,
  fieldName,
}: SortingButtonProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const onSort = (value: string) => {
    setSearchParams((prev) => {
      prev.delete('sort', `${fieldName},${value === 'desc' ? 'asc' : 'desc'}`);
      prev.append('sort', `${fieldName},${value}`);
      return prev;
    });
    setAnchor(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ImportExport />}
        onClick={onClick}
      >
        {name}
      </Button>
      <Dropdown anchor={anchor} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => onSort('desc')}>
          <Radio
            defaultChecked={
              searchParams.has('sort', `${fieldName},desc`) ||
              !searchParams.has('sort')
            }
          />
          {descOptionName}
        </MenuItem>
        <MenuItem onClick={() => onSort('asc')}>
          <Radio
            defaultChecked={searchParams.has('sort', `${fieldName},asc`)}
          />
          {ascOptionName}
        </MenuItem>
      </Dropdown>
    </>
  );
};

export default SortingButton;
