userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
title: {
type: String,
required: [true, "Task title is required"],
},
description: {
type: String,
default: "",
},
completed: {
type: Boolean,
default: false,
},
},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);