const express = require('express');
const path = require('path');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello home");
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
})
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    return res.json(users[id]);
})

const jsonFilePath = path.join(__dirname, 'MOCK_DATA.json');

app.post('/api/users', (req, res) => {
    // Extract data from the request body
    const { id, first_name, last_name, email, gender, job_title } = req.body;
    const newUser = { id, first_name, last_name, email, gender, job_title };
    users.push(newUser);
    fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing JSON file:', writeErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Respond with success status and data
        res.json({ status: 'success' });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Extract user ID from request parameters

    // Find the index of the user with the specified ID in the users array
    const index = users.findIndex(user => user.id === userId);

    // Check if the user with the specified ID exists
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' }); // User not found
    }

    // Remove the user from the users array
    const deletedUser = users.splice(index, 1)[0]; // Splice returns an array, so we take the first element

    // Write the updated users array back to the JSON file
    fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing JSON file:', writeErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Respond with success status and data
        res.json({ status: 'success', deletedUser });
    });
});



app.listen(port, (err) => {
    if (!err) {
        console.log("Server is runnig on port:" + port);
    }
    else {
        console.log("Error running the server.");
    }
})