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
  Avatar
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useGetNotesQuery,
  useUpdateNoteMutation,
} from "./api/notesApi";
import { selectUserEmail } from "./api/userSlice";
import { useRouter } from "next/router";
const Notes = () => {
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const userEmail = useSelector(selectUserEmail);
  const { isLoading, isError, isSuccess, data, error } = useGetNotesQuery();

  let userNotes = [];
  if (isSuccess) {
    // Find the user object associated with the user's email
    const allNotes = data.filter((item) => item.email === userEmail);

    // If user object is found, extract the notes array
    if (allNotes) {
      userNotes = allNotes;
      console.log("User Notes:", userNotes);
    }
  }
  //to generate a unique id everytime
  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  const handleCreateNote = async () => {
    if (heading.trim() === "" || description.trim() === "") {
      return;
    }
    const uniqueId = generateUniqueId();
    const newNote = { id: uniqueId, email: userEmail, heading, description };

    await createNote(newNote);
    setDescription("");
    setHeading("");
  };
  const handleLogout = ()=>{
    router.push("/")
  }

  const handleUpdateNote = async (id) => {
    const updatedHeading = prompt("Enter updated heading:");
    const updatedDescription = prompt("Enter updated description:");

    if (updatedHeading !== null && updatedDescription !== null) {
      const updatedNote = {
        email: userEmail,
        heading: updatedHeading,
        description: updatedDescription,
      };
      await updateNote({ id, ...updatedNote });
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
  };

  return (
    <Grid container spacing={2} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}}>
      {/* Left side - Add Note */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            textAlign: "center",
            border: "3px solid blue",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{ textAlign: "center", marginBottom: 2, paddingTop: 2 }}
            variant="h5"
          >
            Add Note
          </Typography>
          <TextField
            label="Note Title"
            variant="filled"
            margin="normal"
            sx={{ width: "70%" }}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <TextField
            label="Note Description"
            variant="filled"
            margin="normal"
            sx={{ width: "70%" }}
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            sx={{ width: "50%", marginBottom: 2, marginTop:2, fontWeight:"bold", borderRadius:"10px" }}
            variant="outlined"
            color="primary"
            onClick={handleCreateNote}
          >
            Add Note
          </Button>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(0, 0, 0, 1)",
              marginBottom: 2,
              paddingLeft:"20px",
              paddingRight:"20px",
              fontWeight:"bold"
            }}
          >
            Welcome to the note-taking section! To add a new note, please follow
            the steps below:
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: "rgba(0, 0, 0, 1)",
              marginBottom: 2,
              paddingLeft:"20px",
              paddingRight:"20px"
            }}
          >
            Your newly added notes will be displayed in the "Notes List" section
            on the right side of the screen. You can update or delete notes
            using the corresponding buttons on each note card.
          </Typography>
          <Button
            sx={{ width: "50%", marginBottom: 2, marginTop:2, fontWeight:"bold", borderRadius:"10px"
            ,'&:hover': {
              backgroundColor: 'red',
              color:"white"
            }, }}
            variant="outlined"
            color="primary"
            onClick={handleLogout}
          >Logout</Button>

        </Paper>
      </Grid>

      {/* Right side - Notes List */}
      <Grid item xs={12} md={6}>
      <Paper sx={{ overflowY: "auto", height: "95vh", border: "3px solid blue", borderRadius: "10px" }}>
  <Typography sx={{ textAlign: "center", marginBottom: 3, paddingTop: 2 }} variant="h5">
    Notes List
  </Typography>
  <div style={{ display: "flex", justifyContent:"center" }}>
    {isSuccess ? (
      userNotes?.map((note) => (
        <Card key={note.id} sx={{ width: "40%", margin: "10px" }}>
          <CardContent>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>Title</Typography>
            <Typography variant="button">{note.heading}</Typography>
            <Typography variant="h6" sx={{fontWeight:"bold"}}>Description</Typography>
            <Typography variant="button">{note.description}</Typography>
          </CardContent>
          <CardActions>
            <Button
            sx={{fontWeight:"bold", borderRadius:"5px"}}
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleUpdateNote(note.id)}
            >
              Update
            </Button>
            <Button
            sx={{fontWeight:"bold", borderRadius:"5px"}}
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleDeleteNote(note.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))
    ) : (
      <Typography variant="body2" color="textSecondary">
        Loading notes...
      </Typography>
    )}
  </div>
</Paper>

      </Grid>
    </Grid>
  );
};

export default Notes;
