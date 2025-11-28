const validateTask = (req, res, next) => {
    const { id, petId, type, recurring } = req.body;
    const validTypes = [
        "Vaccination",
        "Grooming",
        "Walk",
        "Feeding",
        "Medication",
        "Deworming",
    ];

    if (!id || !petId || !type) {
        return res.status(400).json({
            success: false,
            error: "Missing required fields: id, petId, type are required",
        });
    }

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            success: false,
            error: `Invalid task type.Must be one of: ${validTypes.join(", ")} `,
        });
    }

    if (recurring) {
        if (!recurring.type || typeof recurring.interval === "undefined") {
            return res.status(400).json({
                success: false,
                error: "Recurring tasks must have 'type' and 'interval'",
            });
        }
    }

    next();
};

const validatePet = (req, res, next) => {
    const { id, name, species } = req.body;
    if (!id || !name || !species) {
        return res.status(400).json({
            success: false,
            error: "Missing required fields: id, name, species are required",
        });
    }
    next();
};

module.exports = { validateTask, validatePet };
