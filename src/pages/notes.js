import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

import { useCreateNoteMutation, useDeleteNoteMutation, useGetNoteByIdQuery, useGetNotesQuery, useUpdateNoteMutation } from './api/notesApi';

const Notes = () => {
   
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  const {isLoading,isError, isSuccess, data,error} = useGetNotesQuery("");
 

 const handleCreateNote = async () => {
  if (heading.trim() === '' || description.trim() === '') {
        return; 
      } 
   const newNote = { heading, description };
   await createNote(newNote); 
   setDescription('');
   setHeading('');
  
 };  

 const handleUpdateNote = async (id) => {
     const updatedHeading = prompt('Enter updated heading:');
    const updatedDescription = prompt('Enter updated description:');
     
    if (updatedHeading !== null && updatedDescription !== null) {
    const updatedNote = { heading: updatedHeading, desc: updatedDescription };
   await updateNote({ id, ...updatedNote });
     } 
   
 };

 const handleDeleteNote = async (id) => {
   await deleteNote(id);
 };


 

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h5">Add Note</Typography>
          <TextField
            label="Note Title"
            variant="filled"
            margin="normal"
            fullWidth
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <TextField
            label="Note Description"
            variant="filled"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCreateNote}>
            Add Note
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Notes List</Typography>
        <div>
          { isSuccess? data?.map((note) => (
            <Card key={note.id} style={{ margin: '10px' }}>
              <CardContent>
                <Typography variant="h6">{note.heading}</Typography>
                <Typography>{note.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleUpdateNote(note.id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        :(
          <Typography variant="body2" color="textSecondary">
            Loading notes...
          </Typography>
        )
        }
        </div>
      </Grid>
    </Grid>
  );
};

export default Notes;
