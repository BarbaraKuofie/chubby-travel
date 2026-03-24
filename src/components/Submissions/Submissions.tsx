import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BoxIcon from '@mui/icons-material/Folder';
import {searchChubbyHotels} from '../Service/DataApi';


const Submissions = () => {
    const [value, setValue] = React.useState('');
    // new fields
    const [category, setCategory] = React.useState('FAT');
    const [contactEmail, setContactEmail] = React.useState('');
    const [contactName, setContactName] = React.useState('');
    // files state for styled file input: store file + preview URL + kind
    type FileWithPreview = { file: File; preview: string; kind: 'image' | 'video' };
    const [files, setFiles] = React.useState<FileWithPreview[]>([]);
    const [rejected, setRejected] = React.useState<string[]>([]);

    // Validation limits (assumptions — can be adjusted)
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB per file
    const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100 MB total

    const handleSubmitIconClick = (value: any) => {
        console.log('clicked', value);
        searchChubbyHotels(value)
    }

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;

        const selectedArr = Array.from(selected);
        const newAccepted: FileWithPreview[] = [];
        const newRejected: string[] = [];

        // compute current total size
        const currentTotal = files.reduce((s, f) => s + f.file.size, 0);
        let runningTotal = currentTotal;

        selectedArr.forEach((f) => {
            // Allow images (any image/*) or mp4 only for videos
            const isImage = f.type.startsWith('image/');
            const isMp4 = f.type === 'video/mp4';

            if (!isImage && !isMp4) {
                newRejected.push(`${f.name}: unsupported type (${f.type || 'unknown'})`);
                return;
            }

            if (f.size > MAX_FILE_SIZE) {
                newRejected.push(`${f.name}: file too large (${Math.round(f.size / 1024 / 1024)} MB)`);
                return;
            }

            if (runningTotal + f.size > MAX_TOTAL_SIZE) {
                newRejected.push(`${f.name}: exceeds total upload limit`);
                return;
            }

            const preview = URL.createObjectURL(f);
            newAccepted.push({ file: f, preview, kind: isImage ? 'image' : 'video' });
            runningTotal += f.size;
        });

        if (newAccepted.length > 0) setFiles((prev) => [...prev, ...newAccepted]);
        if (newRejected.length > 0) setRejected(newRejected);
        // reset the input so same files can be selected again if needed
        e.currentTarget.value = '';
    }

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const toRemove = prev[index];
            if (toRemove) URL.revokeObjectURL(toRemove.preview);
            return prev.filter((_, i) => i !== index);
        });
    }

    // cleanup previews on unmount
    React.useEffect(() => {
        return () => {
            files.forEach((f) => URL.revokeObjectURL(f.preview));
        };
    }, [files]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Collect form data - currently just logging. Hook this up to your API as needed.
        const formData = {
            propertySearch: value,
            category,
            contactEmail,
            contactName,
            files,
        };
        console.log('Form submitted', formData);
    }
    return (
       <form onSubmit={handleFormSubmit}>
         <Container maxWidth="sm">
           <Box sx={{ padding: 2 }}>
             <Typography variant="h4">Property Submissions</Typography>
             {/* Property Category (radio buttons) - moved to top */}
             <Box sx={{ padding: 2 }}>
               <FormControl component="fieldset">
                 <FormLabel component="legend">Property Category</FormLabel>
                 <RadioGroup
                   row
                   aria-label="property-category"
                   name="property-category"
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                 >
                   <FormControlLabel value="FAT" control={<Radio />} label="FAT" />
                   <FormControlLabel value="CHUBBY" control={<Radio />} label="CHUBBY" />
                 </RadioGroup>
               </FormControl>
             </Box>
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="propertyName"
                 label="Property Name"
                 variant="outlined"
                 onChange={(e) => setValue(e.target.value)}
                 fullWidth
                />
             </Box>
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="propertyLocation"
                 label="Property Location"
                 variant="outlined"
                 fullWidth
               />
             </Box>
             {/* Property Description (moved above contact fields) */}
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="propertyDescription"
                 label="Property Description"
                 variant="outlined"
                 fullWidth
                 multiline
                 rows={4}
               />
             </Box>
             {/* Contact Email */}
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="contactEmail"
                 label="Contact Email"
                 variant="outlined"
                 fullWidth
                 type="email"
                 value={contactEmail}
                 onChange={(e) => setContactEmail(e.target.value)}
               />
             </Box>
             {/* Contact Name (optional) */}
             <Box sx={{ padding: 2 }}>
               <TextField
                 id="contactName"
                 label="Contact Name"
                 variant="outlined"
                 fullWidth
                 value={contactName}
                 onChange={(e) => setContactName(e.target.value)}
               />
             </Box>
             <Box sx={{ padding: 2 }}>
               {/* Hidden input and styled button - allow images and mp4 only */}
               <input
                 accept="image/*,video/mp4"
                 id="images-upload"
                 type="file"
                 multiple
                 required
                 style={{ display: 'none' }}
                 onChange={handleFilesChange}
               />
               <label htmlFor="images-upload">
                 <Button
                   variant="outlined"
                   component="span"
                   startIcon={<UploadFileIcon />}
                   sx={{ textTransform: 'none' }}
                 >
                   Upload images or videos
                 </Button>
               </label>

               {/* Rejected files messages */}
               <Box sx={{ mt: 1 }}>
                 {rejected.length > 0 && (
                   <Box sx={{ mb: 1 }}>
                     {rejected.map((msg, i) => (
                       <Typography key={i} variant="body2" color="error">{msg}</Typography>
                     ))}
                   </Box>
                 )}

                 {/* Previews with Chips (allow delete) */}
                 {files.length > 0 ? (
                   <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
                     {files.map((fw, i) => (
                       <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
                         {fw.kind === 'image' ? (
                           <Box component="img" src={fw.preview} alt={fw.file.name} sx={{ width: 110, height: 70, objectFit: 'cover', borderRadius: 1, boxShadow: 1 }} />
                         ) : (
                           <Box component="video" src={fw.preview} sx={{ width: 110, height: 70, objectFit: 'cover', borderRadius: 1, boxShadow: 1 }} controls />
                         )}
                         <Chip label={fw.file.name} onDelete={() => removeFile(i)} sx={{ mt: 1, maxWidth: 110 }} />
                       </Box>
                     ))}
                   </Stack>
                 ) : (
                   <Typography variant="body2" color="text.secondary">No files selected</Typography>
                 )}
               </Box>
             </Box>
             <Box sx={{ padding: 2 }}>
               <Button variant="contained" color="primary" type="submit">
                 Submit
               </Button>
             </Box>
           </Box>
         </Container>
       </form>
    );
};

export default Submissions;

