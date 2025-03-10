import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';
import { useMultistepForm } from '../../../context/MultistepFormContext';
import SaveEditedFormButton from '../../buttons/SaveEditedFormButton';

interface PreparationMethodProps {
  isVisible: boolean;
}

const PreparationMethod: React.FC<PreparationMethodProps> = ({ isVisible }) => {
  const { goToPreviousStep, goToNextStep, isEditMode } = useMultistepForm();
  const { watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'preparationSteps',
  });

  const onNewStep = (): void => {
    append({ name: '' });
  };

  const isNextDisabled = (): boolean => {
    const steps = watch('preparationSteps');
    return steps.every((step: { name: string }) => step.name === '');
  };

  return (
    <Stack gap={4} sx={{ display: isVisible ? 'flex' : 'none' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Enter preparation method</Typography>
        <Stack direction="row" gap={1}>
          {isEditMode ? (
            <SaveEditedFormButton />
          ) : (
            <>
              <Button startIcon={<ChevronLeft />} onClick={goToPreviousStep}>
                Back
              </Button>

              <Button
                variant="contained"
                endIcon={<ChevronRight />}
                disabled={isNextDisabled()}
                onClick={goToNextStep}
                data-cy="next-button-3"
              >
                Next
              </Button>
            </>
          )}
        </Stack>
      </Stack>
      <Stack gap={1.5} component={TransitionGroup}>
        {fields.map((item, i) => (
          <Collapse key={item.id} data-cy={`step-${i}`}>
            <Controller
              key={item.id}
              name={`preparationSteps.${i}.name`}
              render={({ field }) => {
                return (
                  <TextField
                    label={`Step ${i + 1}`}
                    placeholder="Describe the step"
                    fullWidth
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => remove(i)}>
                          <Close sx={{ cursor: 'pointer' }} />
                        </IconButton>
                      ),
                    }}
                  />
                );
              }}
            />
          </Collapse>
        ))}
        <Box>
          <Button onClick={onNewStep} data-cy="add-step-button">
            Add a new step
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PreparationMethod;
