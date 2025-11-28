const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

async function testPets() {
  console.log("Testing PETS routes...");
  try {
    // GET all pets
    const getAll = await axios.get(`${BASE_URL}/pets`);
    console.log("GET /pets:", getAll.data);

    // POST a new pet
    const newPet = {
      id: "test-pet",
      name: "Testy",
      species: "Cat",
      breed: "Tabby",
      age: 2,
      photoUrl: "",
      vetContact: { name: "Dr. Vet", phone: "000-000-0000" },
    };
    const postPet = await axios.post(`${BASE_URL}/pets`, newPet);
    console.log("POST /pets:", postPet.data);

    // GET pet by id
    const getById = await axios.get(`${BASE_URL}/pets/test-pet`);
    console.log("GET /pets/:id:", getById.data);

    // PUT update pet
    const updatePet = await axios.put(`${BASE_URL}/pets/test-pet`, { age: 3 });
    console.log("PUT /pets/:id:", updatePet.data);
  } catch (err) {
    console.error("PETS route error:", err.response?.data || err.message);
  }
}

async function testTasks() {
  console.log("Testing TASKS routes...");
  try {
    // POST a new task
    const newTask = {
      id: "test-task",
      petId: "test-pet",
      type: "Feeding",
      dueDate: new Date().toISOString(),
      recurring: { type: "daily", interval: 1 },
      isDone: false,
      note: "Feed the cat.",
    };
    const postTask = await axios.post(`${BASE_URL}/tasks`, newTask);
    console.log("POST /tasks:", postTask.data);

    // GET daily tasks
    const getDaily = await axios.get(`${BASE_URL}/tasks/daily`);
    console.log("GET /tasks/daily:", getDaily.data);

    // GET upcoming tasks
    const getUpcoming = await axios.get(`${BASE_URL}/tasks/upcoming`);
    console.log("GET /tasks/upcoming:", getUpcoming.data);

    // PUT complete task
    const completeTask = await axios.put(
      `${BASE_URL}/tasks/test-task/complete`
    );
    console.log("PUT /tasks/:id/complete:", completeTask.data);
  } catch (err) {
    console.error("TASKS route error:", err.response?.data || err.message);
  }
}

async function testHealthLogs() {
  console.log("Testing HEALTH LOG routes...");
  try {
    // GET logs for pet
    const getLogs = await axios.get(`${BASE_URL}/logs/test-pet`);
    console.log("GET /logs/:petId:", getLogs.data);

    // GET timeline for pet
    const getTimeline = await axios.get(`${BASE_URL}/timeline/test-pet`);
    console.log("GET /timeline/:petId:", getTimeline.data);
  } catch (err) {
    console.error("HEALTH LOG route error:", err.response?.data || err.message);
  }
}

async function runAllTests() {
  await testPets();
  await testTasks();
  await testHealthLogs();
}

runAllTests();
