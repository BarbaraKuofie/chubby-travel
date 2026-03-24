import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {submitReview} from '../Service/DataApi';

export interface AddReviewProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
const steps = ['Property', 'Rooms', 'Food', 'Service', 'Extras'];
export const AddReview = (props: AddReviewProps) => {
    const { open, setOpen } = props;
    const [value, setValue] = React.useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [propertyName, setPropertyName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [rooms, setRooms] = React.useState('');
    const [food, setFood] = React.useState('');
    const [service, setService] = React.useState('');
    const [extras, setExtras] = React.useState('');
    const [overallRating, setOverallRating] = React.useState(0);
    const [foodRating, setFoodRating] = React.useState(0);
    const [roomRating, setRoomRating] = React.useState(0);
    const [serviceRating, setServiceRating] = React.useState(0);
    const [extrasRating, setExtrasRating] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = steps.length;
    const completedSteps = Object.keys(completed).length;

    const isLastStep = activeStep === totalSteps - 1;
    const isStepComplete = (step: number) => completed[step] === true;
    const handleFinalSubmit = () => {
        // Handle the final submission logic here
        const reviewData = {
            propertyName: propertyName,
            location: location,
            rooms: rooms,
            food: food,
            service: service,
            extras: extras,
            overallRating: overallRating,
            foodRating: foodRating,
            roomRating: roomRating,
            serviceRating: serviceRating,
            extrasRating: extrasRating
        };
        console.log('Review Submitted:', reviewData);
        submitReview(reviewData);
        // Reset all states after submission
        setPropertyName('');
        setLocation('');
        setRooms('');
        setFood('');
        setService('');
        setExtras('');
        setOverallRating(0);
        setFoodRating(0);
        setRoomRating(0);
        setServiceRating(0);
        setExtrasRating(0);
        setActiveStep(0);
        setCompleted({});
        
    }
    const handleNext = () => {
        const newActiveStep = isLastStep ? 0 : activeStep + 1;
        setActiveStep(newActiveStep);
        if (isLastStep) {
            setOpen(false);
            handleFinalSubmit();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        setCompleted({ ...completed, [activeStep]: true });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    }
    const handleClose = () => {
        setOpen(false);
    }
    const ratingComponent = (valueToChange: any) => (
        <Stack spacing={1}>
            <Rating
                name="simple-controlled"
                precision={0.5}
                defaultValue={0}
                onChange={(event, newValue) => {

                    if (typeof newValue === 'number') {
                        if (valueToChange === 'overall') {
                            setOverallRating(newValue);
                        } else if (valueToChange === 'food') {
                            setFoodRating(newValue);
                        } else if (valueToChange === 'room') {
                            setRoomRating(newValue);
                        } else if (valueToChange === 'service') {
                            setServiceRating(newValue);
                        } else if (valueToChange === 'extras') {
                            setExtrasRating(newValue);
                        }
                    }
                }}
            />
            <Typography variant="caption" color="textSecondary">
                {valueToChange === 'overall' ? 'Overall Rating' : valueToChange === 'food' ? 'Food Rating' : valueToChange === 'room' ? 'Room Rating' : valueToChange === 'service' ? 'Service Rating' : 'Extras Rating'}
            </Typography>
        </Stack>
    );
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent>
                <DialogTitle>Add A Property Review</DialogTitle>
                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label} completed={isStepComplete(index)}>
                                <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ padding: 2 }}>
                        {activeStep === 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    required
                                    id="propertyName"
                                    label="Property Name"
                                    variant="outlined"
                                    value={propertyName}
                                    onChange={(e) => setPropertyName(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="propertyLocation"
                                    label="Location (City, Country)"
                                    variant="outlined"
                                    fullWidth
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                                        Add Photos/Videos
                                    </Typography>
                                    <input
                                        type="file"
                                        name="images"
                                        multiple
                                        required
                                    />
                                </Box>
                                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                                    How would you rate your overall experience?
                                </Typography>
                                {ratingComponent('overall')}
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    required
                                    id="rooms"
                                    label="How was your room?"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={9}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                                    How would you rate the rooms?
                                </Typography>
                                {ratingComponent('room')}
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    required
                                    id="food"
                                    label="How were the food, drinks and dining experience?"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={9}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                                    How would you rate the food and dining experience?
                                </Typography>
                                {ratingComponent('food')}
                            </Box>
                        )}
                        {activeStep === 3 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    required
                                    id="service"
                                    label="How was the service?"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={9}
                                    value={value}
                                    onChange={(e) => setService(e.target.value)}
                                />
                                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                                    How would you rate the service?
                                </Typography>
                                {ratingComponent('service')}
                            </Box>
                        )}
                        {activeStep === 4 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    id="extras"
                                    label="Anything else you would like to add?"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={9}
                                    value={value}
                                    onChange={(e) => setExtras(e.target.value)}
                                />
                                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                                    How would you rate everything else?
                                </Typography>
                                {ratingComponent('extras')}
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleBack} disabled={activeStep === 0}>
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!propertyName}>
                    {isLastStep ? 'Finish' : 'Next'}
                </Button>
                <Button
                    onClick={handleComplete}
                    disabled={
                        isStepComplete(activeStep) ||
                        (activeStep === 0 && !propertyName) ||
                        (activeStep === 0 && !location) ||
                        (activeStep === 1 && !rooms) ||
                        (activeStep === 2 && !food) ||
                        (activeStep === 3 && !service) ||
                        (activeStep === 4 && !extras)
                    }
                >
                    {isStepComplete(activeStep) ? 'Completed' : 'Complete Step'}
                </Button>
                <Button onClick={handleReset} disabled={completedSteps === 0}>
                    Reset
                </Button>
            </DialogActions>
            <DialogContent>
                <Typography variant="body2" color="textSecondary">
                    {`Step ${activeStep + 1} of ${totalSteps}`}
                </Typography>


            </DialogContent>

        </Dialog>
    )

};

export default AddReview;

