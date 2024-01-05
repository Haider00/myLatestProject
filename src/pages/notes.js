import {useAddnotesMutation} from "./api/usersapi"
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


const Notes = () => {
  const [notesList, setNotesList] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [updateNoteId, setUpdateNoteId] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateHeading, setUpdateHeading] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  const addNoteMutation = useAddnotesMutation();

  const handleAddNote = async () => {
    if (heading.trim() === "" || description.trim() === "") {
      return;
    }
    const newNote = {
        id: Date.now(),
        heading: heading,
        description: description,
    };
    const { data } = await addNoteMutation.mutateAsync(newNote);

    setNotesList((prevNotesList) => [...prevNotesList, newNote]);

    setHeading("");
    setDescription("");
  };

  const handleUpdateNote = (id) => {
    const noteToUpdate = notesList.find((note) => note.id === id);

    setUpdateHeading(noteToUpdate.heading);
    setUpdateDescription(noteToUpdate.description);

    setUpdateNoteId(id);

    setOpenUpdateDialog(true);
  };

  const handleDialogClose = () => {
    setUpdateHeading("");
    setUpdateDescription("");
    setUpdateNoteId(null);
    setOpenUpdateDialog(false);
  };

  const handleUpdateNoteDialog = () => {
    const updatedNotesList = notesList.map((note) =>
      note.id === updateNoteId
        ? { ...note, heading: updateHeading, description: updateDescription }
        : note
    );

    setNotesList(updatedNotesList);

    setOpenUpdateDialog(false);
  };

  const handleDeleteNote = (id) => {
    const updatedNotesList = notesList.filter((note) => note.id !== id);

    setNotesList(updatedNotesList);
  };

  return (
    <Grid container sx={{ height: "97vh" }}>
      {/* Left side: Add Note */}
      <Grid item xs={12} md={6} sx={{ padding: "30px" }}>
        <Paper
          elevation={5}
          sx={{ textAlign: "center", height: "100%", paddingTop: "20px", border:"2px solid black" }}
        >
          <Typography variant="h5">Add Note</Typography>
          <TextField
            label="Notes Title"
            variant="filled"
            margin="normal"
            fullWidth
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            sx={{ width: "80%" }}
          />
          <TextField
            label="Notes Description"
            variant="filled"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ width: "80%", borderRadius: "8px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
            sx={{ marginTop: "20px", width: "40%" }}
          >
            Add Note
          </Button>
        </Paper>
      </Grid>

      {/* Right side: List of Notes */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{ padding: "20px", overflowY: "auto", maxHeight: "97vh" }}
      >
        <Typography sx={{ mt: "20px"}} variant="h5">
          Notes List
        </Typography>
        <div>
          {notesList.map((note) => (
            <Card key={note.id} sx={{ marginTop: "10px" }}>
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
          ))}
        </div>
      </Grid>

      {/* Update Note Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Notes Heading"
            variant="outlined"
            margin="normal"
            fullWidth
            value={updateHeading}
            onChange={(e) => setUpdateHeading(e.target.value)}
          />
          <TextField
            label="Notes Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdateNoteDialog}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Notes;
