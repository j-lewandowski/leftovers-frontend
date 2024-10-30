import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useMultistepForm } from '../../../context/MultistepFormContext';
import SaveEditedFormButton from '../../buttons/SaveEditedFormButton';

interface PreparationMethodProps {
  isVisible: boolean;
}

const PreparationMethod: React.FC<PreparationMethodProps> = ({ isVisible }) => {
  const { goToPreviousStep, goToNextStep, isEdit } = useMultistepForm();
  const { watch } = useFormContext();
  const { fields, append } = useFieldArray({
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
          {isEdit ? (
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
              >
                Next
              </Button>
            </>
          )}
        </Stack>
      </Stack>
      <Stack gap={1.5}>
        {fields.map((item, i) => (
          <Controller
            key={item.id}
            name={`preparationSteps.${i}.name`}
            render={({ field }) => {
              return (
                <TextField
                  label={`Step ${i + 1}`}
                  placeholder="Describe the step"
                  {...field}
                />
              );
            }}
          />
        ))}
        <Box>
          <Button onClick={onNewStep}>Add a new step</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PreparationMethod;
