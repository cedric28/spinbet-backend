import app, { connectToDatabase } from './app'; // Import the connectToDatabase function

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectToDatabase(); // Connect to the database before starting the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process in case of failure
    }
};

// Start the server
startServer();
