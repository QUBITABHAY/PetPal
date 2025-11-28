const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

async function testTaskEnhancements() {
    console.log("Testing Task Enhancements...");
    try {
        // 1. Create a task with a valid type (Resetting state by creating new one)
        const validTask = {
            id: "task-valid-type-v3", // New ID to ensure clean state
            petId: "pet-1",
            type: "Vaccination",
            dueDate: new Date().toISOString(),
            recurring: { type: "monthly", interval: 1 },
            isDone: false,
        };
        await axios.post(`${BASE_URL}/tasks`, validTask);
        console.log("Created valid task: Success");

        // 2. Create a task with an invalid type (should fail)
        try {
            await axios.post(`${BASE_URL}/tasks`, {
                ...validTask,
                id: "task-invalid-type",
                type: "InvalidType",
            });
            console.error("Created invalid task: Failed (Expected error but got success)");
        } catch (err) {
            console.log("Created invalid task: Success (Got expected error)");
        }

        // 3. Get daily tasks (should be grouped by petId)
        const dailyTasks = await axios.get(`${BASE_URL}/tasks/daily`);
        console.log("Daily tasks structure:", JSON.stringify(dailyTasks.data, null, 2));

        // 4. Complete a task with a note
        const completeRes = await axios.put(`${BASE_URL}/tasks/task-valid-type-v3/complete`, {
            note: "All went well!",
        });
        console.log("Completed task with note:", completeRes.data.task.note === "All went well!" ? "Success" : "Failed");

        // 5. Verify recurring task creation
        const allTasksRes = await axios.get(`${BASE_URL}/tasks/upcoming`);
        const allTasks = allTasksRes.data.tasks;
        // Look for a task that is NOT the one we just completed
        const nextTask = allTasks.find(t => t.petId === "pet-1" && t.id !== "task-valid-type-v3" && !t.isDone);

        if (nextTask) {
            console.log("Recurring task created: Success");
            console.log("Next due date:", nextTask.dueDate);
        } else {
            console.error("Recurring task created: Failed");
            console.log("All tasks found:", allTasks.map(t => t.id));
        }

    } catch (err) {
        console.error("Test error:", err.response?.data || err.message);
    }
}

testTaskEnhancements();
