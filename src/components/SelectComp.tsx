import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SelectCompProps {
  parent: string;
  childs: string[];
}

const SelectComp: React.FC<SelectCompProps> = ({ parent, childs }) => {
  const [checked, setChecked] = React.useState<boolean[]>([]);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    setChecked(Array(childs.length).fill(false));
  }, [childs]);

  const handleChangeParent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(new Array(childs.length).fill(isChecked));
    setExpanded(isChecked);
  };

  const handleChangeChild = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);
  };

  return (
    <Box sx={{ backgroundColor: '#dcd5e3' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ExpandMoreIcon
          style={{ cursor: 'pointer', marginRight: '8px' }}
          onClick={() => setExpanded(!expanded)}
        />
        <FormControlLabel
          label={parent}
          control={
            <Checkbox
              checked={checked.every((value) => value)}
              indeterminate={checked.some((value) => value) && checked.some((value) => !value)}
              onChange={handleChangeParent}
            />
          }
        />
      </div>
      {expanded && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {childs.map((child, index) => (
            <FormControlLabel
              key={index}
              label={child}
              control={
                <Checkbox
                  checked={checked[index]}
                  onChange={(event) => handleChangeChild(event, index)}
                />
              }
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SelectComp;
