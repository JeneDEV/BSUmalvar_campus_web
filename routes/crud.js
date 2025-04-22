const express = require('express');
const router = express.Router();
const db = require('../config/dbconnection'); // Database connection
const path = require("path");
const fs = require("fs");

//<-----------------------------------------start of department table-------------------------------------------->

// API Route to fetch departments
router.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM tbl_departments';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results); // Send MySQL data as JSON
    });
});


router.post("/departments", (req, res) => {
    if (!req.files || !req.body.name || !req.body.description) {
        return res.status(400).json({ error: "Missing fields or files" });
    }

    const { name, description } = req.body;
    const logo = req.files.logo;
    const qr = req.files.qr;

    // Define upload paths
    const uploadDir = path.join(__dirname, "../public/uploads");
    const logoPath = logo ? path.join(uploadDir, logo.name) : "";
    const qrPath = qr ? path.join(uploadDir, qr.name) : "";

    // Move files to uploads folder
    if (logo) {
        logo.mv(logoPath, (err) => {
            if (err) return res.status(500).json({ error: "Logo upload failed", details: err.message });
        });
    }
    if (qr) {
        qr.mv(qrPath, (err) => {
            if (err) return res.status(500).json({ error: "QR code upload failed", details: err.message });
        });
    }

    // Insert into database
    const sql = "INSERT INTO tbl_departments (name, description, logo, qr) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, description, logo ? logo.name : "", qr ? qr.name : ""], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database insertion failed", details: err.message });
        }
        res.json({ message: "Department added successfully", insertedId: result.insertId });
    });
});



router.put("/departments/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const logo = req.files?.logo;
    const qr = req.files?.qr;

    // Define upload directory
    const uploadDir = path.join(__dirname, "../public/uploads");

    let updates = [];
    let values = [];

    // Add name and description to updates
    if (name) {
        updates.push("name = ?");
        values.push(name);
    }
    if (description) {
        updates.push("description = ?");
        values.push(description);
    }

    // Function to move a file
    const moveFile = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            const filePath = path.join(uploadDir, file.name);
            console.log("Moving file to:", filePath);
            file.mv(filePath, (err) => {
                if (err) {
                    console.error("Error moving file:", err);
                    reject(err);
                } else {
                    console.log("File moved successfully:", file.name);
                    resolve(file.name);
                }
            });
        });
    };
    

    try {
        // Move files if provided
        if (logo) {
            const newLogoName = await moveFile(logo);
            updates.push("logo = ?");
            values.push(newLogoName);
        }

        if (qr) {
            const newQrName = await moveFile(qr);
            updates.push("qr = ?");
            values.push(newQrName);
        }

        // If no fields to update, return an error
        if (updates.length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        // Add ID at the end for the WHERE condition
        values.push(id);

        // Construct the update SQL query
        const sql = `UPDATE tbl_departments SET ${updates.join(", ")} WHERE id = ?`;

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database update failed", details: err.message });
            }
            res.json({ message: "Department updated successfully" });
        });
    } catch (error) {
        return res.status(500).json({ error: "File upload failed", details: error.message });
    }
});


router.delete('/departments/:id', (req, res) => {
    const departmentId = req.params.id;
    const sql = 'DELETE FROM tbl_departments WHERE id = ?';

    db.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error('Error deleting department:', err);
            return res.status(500).json({ message: 'Failed to delete department' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json({ message: 'Department deleted successfully' });
    });
});

router.get('/sliders', (req, res) => {
    const sql = 'SELECT * FROM tbl_departments';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results); // Send MySQL data as JSON
    });
});


//<-----------------------------------------end of department table---------------------------------------------->







//<-----------------------------------------start of curriculum table-------------------------------------------->

router.get('/curriculums', (req, res) => {
    const sql = "SELECT *, DATE_FORMAT(date_upload, '%Y-%m-%d') AS formatted_date_upload FROM tbl_curriculum";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Remove the original date_upload and replace it with the formatted version
        const formattedResults = results.map(row => {
            return {
                ...row,
                date_upload: row.formatted_date_upload // Replace with formatted date
            };
        });

        // Remove the extra formatted_date_upload field
        formattedResults.forEach(row => delete row.formatted_date_upload);

        res.json(formattedResults);
    });
});

router.delete('/curriculum/:id', (req, res) => {
    const curriculumId = req.params.id;
    const sql = 'DELETE FROM tbl_curriculum WHERE id = ?';

    db.query(sql, [curriculumId], (err, result) => {
        if (err) {
            console.error('Error deleting curriculum:', err);
            return res.status(500).json({ message: 'Failed to delete curriculum' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'curriculum not found' });
        }

        res.json({ message: 'curriculum deleted successfully' });
    });
});


router.put('/curriculum/:id', (req, res) => {
    const { department, date_upload } = req.body;
    const file = req.files?.curriculum; // Check if a file is uploaded

    let sql = `UPDATE tbl_curriculum SET department = ?, date_upload = ?`;
    const values = [department, date_upload];

    if (file) {
        const uploadPath = `./public/uploads/${file.name}`;

        // Move file to uploads folder
        file.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).json({ error: "File upload failed", details: err.message });
            }

            sql += `, curriculum = ?`;
            values.push(file.name);

            completeUpdate(); // Call the function to execute DB update after moving file
        });
    } else {
        completeUpdate(); // Call directly if no file uploaded
    }

    function completeUpdate() {
        sql += ` WHERE id = ?`;
        values.push(req.params.id);

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database update failed", details: err.message });
            }
            res.json({ message: "Curriculum updated successfully" });
        });
    }
});


router.post("/curriculum", (req, res) => {
    const { department } = req.body;
    const file = req.files?.curriculum;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Define upload path
    const uploadPath = `./public/uploads/${file.name}`;

    // Move file to uploads folder
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed", details: err.message });
        }

        // Get current date and time
        const dateUpload = new Date().toISOString().slice(0, 19).replace("T", " ");

        // Save the department and filename in the database
        const sql = "INSERT INTO tbl_curriculum (department, curriculum, date_upload) VALUES (?, ?, ?)";
        db.query(sql, [department, file.name, dateUpload], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database insert failed", details: err.message });
            }
            res.json({ message: "Curriculum added successfully", file: file.name });
        });
    });
});


//<-----------------------------------------end of curriculum table---------------------------------------------->





//<-----------------------------------------start of laboratory table---------------------------------------------->

// API Route to fetch laboratory
router.get('/laboratory', (req, res) => {
    const sql = 'SELECT * FROM tbl_laboratory';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results); // Send MySQL data as JSON
    });
});


router.put("/laboratory/:id", async (req, res) => {
    const { id } = req.params;
    const { department, description, room_name } = req.body;
    const labimage = req.files?.labimage;
 

    // Define upload directory
    const uploadDir = path.join(__dirname, "../public/uploads");

    let updates = [];
    let values = [];

    // Add name and description to updates
    if (department) {
        updates.push("department = ?");
        values.push(department);
    }
    if (description) {
        updates.push("description = ?");
        values.push(description);
    }

    if (room_name) {
        updates.push("room_name = ?");
        values.push(room_name);
    }

    // Function to move a file
    const moveFile = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            const filePath = path.join(uploadDir, file.name);
            console.log("Moving file to:", filePath);
            file.mv(filePath, (err) => {
                if (err) {
                    console.error("Error moving file:", err);
                    reject(err);
                } else {
                    console.log("File moved successfully:", file.name);
                    resolve(file.name);
                }
            });
        });
    };
    

    try {
        // Move files if provided
        if (labimage) {
            const newLabimageName = await moveFile(labimage);
            updates.push("laboratory_image = ?");
            values.push(newLabimageName);
        }


        // If no fields to update, return an error
        if (updates.length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        // Add ID at the end for the WHERE condition
        values.push(id);

        // Construct the update SQL query
        const sql = `UPDATE tbl_laboratory SET ${updates.join(", ")} WHERE id = ?`;

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database update failed", details: err.message });
            }
            res.json({ message: "Department updated successfully" });
        });
    } catch (error) {
        return res.status(500).json({ error: "File upload failed", details: error.message });
    }
});

router.delete('/laboratory/:id', (req, res) => {
    const laboratoryID = req.params.id;
    const sql = 'DELETE FROM tbl_laboratory WHERE id = ?';

    db.query(sql, [laboratoryID], (err, result) => {
        if (err) {
            console.error('Error deleting laboratory:', err);
            return res.status(500).json({ message: 'Failed to delete laboratory' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'laboratory not found' });
        }

        res.json({ message: 'laboratory deleted successfully' });
    });
});




router.post("/laboratory", async (req, res) => {
    try {
        if (!req.files || !req.body.department || !req.body.description || !req.body.room_name) {
            return res.status(400).json({ error: "Missing fields or file" });
        }

        const { department, description, room_name } = req.body;
        const labimg = req.files.labimg;

        // Define upload directory
        const uploadDir = path.join(__dirname, "../public/uploads");
        const labimgPath = path.join(uploadDir, labimg.name);

        // Move file to uploads folder
        await labimg.mv(labimgPath);

        // Insert into database
        const sql = "INSERT INTO tbl_laboratory (department, description, laboratory_image, room_name) VALUES (?, ?, ?, ?)";
        db.query(sql, [department, description, labimg.name, room_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database insertion failed", details: err.message });
            }
            res.json({ message: "Laboratory added successfully", insertedId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

//<-----------------------------------------end of laboratory table---------------------------------------------->





//<-----------------------------------------start of profile table---------------------------------------------->

// API Route to fetch profile
router.get('/profile', (req, res) => {
    const sql = 'SELECT * FROM tbl_profile';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results); // Send MySQL data as JSON
    });
});



//edit
router.put("/profile/:id", async (req, res) => {
    const { id } = req.params;
    const { name, position, description, category, department } = req.body;
    const image = req.files?.image;
    

    // Define upload directory
    const uploadDir = path.join(__dirname, "../public/uploads");

    let updates = [];
    let values = [];

    // Add text fields to updates
    if (name) {
        updates.push("name = ?");
        values.push(name);
    }
    if (position) {
        updates.push("position = ?");
        values.push(position);
    }
    if (description) {
        updates.push("description = ?");
        values.push(description);
    }
    if (category) {
        updates.push("category = ?");
        values.push(category);
    }
    if (department) {
        updates.push("department = ?");
        values.push(department);
    }

    // Function to move a file
    const moveFile = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            const filePath = path.join(uploadDir, file.name);
            console.log("Moving file to:", filePath);
            file.mv(filePath, (err) => {
                if (err) {
                    console.error("Error moving file:", err);
                    reject(err);
                } else {
                    console.log("File moved successfully:", file.name);
                    resolve(file.name);
                }
            });
        });
    };

    try {
        // Move files if provided
        if (image) {
            const newImageName = await moveFile(image);
            updates.push("image = ?");
            values.push(newImageName);
        }

        // If no fields to update, return an error
        if (updates.length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        // Add ID at the end for the WHERE condition
        values.push(id);

        // Construct the update SQL query
        const sql = `UPDATE tbl_profile SET ${updates.join(", ")} WHERE id = ?`;

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database update failed", details: err.message });
            }
            res.json({ message: "Profile updated successfully" });
        });
    } catch (error) {
        return res.status(500).json({ error: "File upload failed", details: error.message });
    }
});




router.delete("/profile/:id", (req, res) => {
    const profileID = req.params.id;

    // Step 1: Get the profile's image and logo file names before deleting the record
    const selectSql = "SELECT image FROM tbl_profile WHERE id = ?";
    
    db.query(selectSql, [profileID], (err, result) => {
        if (err) {
            console.error("Error fetching profile data:", err);
            return res.status(500).json({ message: "Failed to fetch profile data" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const { image } = result[0]; // Get filenames

        // Step 2: Delete the profile from the database
        const deleteSql = "DELETE FROM tbl_profile WHERE id = ?";
        db.query(deleteSql, [profileID], (err, deleteResult) => {
            if (err) {
                console.error("Error deleting profile:", err);
                return res.status(500).json({ message: "Failed to delete profile" });
            }

            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: "Profile not found" });
            }

            // Step 3: Delete the image and logo files from the server
            const uploadDir = path.join(__dirname, "../public/uploads");

            const deleteFile = (fileName) => {
                if (!fileName) return;
                const filePath = path.join(uploadDir, fileName);
                fs.unlink(filePath, (err) => {
                    if (err && err.code !== "ENOENT") {
                        console.error("Error deleting file:", filePath, err);
                    } else {
                        console.log("Deleted file:", filePath);
                    }
                });
            };

            deleteFile(image);

            res.json({ message: "Profile deleted successfully" });
        });
    });
});


router.post("/profile", async (req, res) => {
    try {
        if (!req.body.name || !req.body.position || !req.body.description || !req.body.category || !req.body.department) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const { name, position, description, category, department } = req.body;

        // Handle file uploads
        let profilePicture = null;
        const uploadDir = path.join(__dirname, "../public/uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        if (req.files) {
            if (req.files.image) {
                profilePicture = `profile_${Date.now()}_${req.files.image.name}`;
                await req.files.image.mv(path.join(uploadDir, profilePicture));
            }
        }

        // Insert into database
        const sql = "INSERT INTO tbl_profile (name, position, image, department, description, category) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [name, position, profilePicture, department, description, category], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database insertion failed", details: err.message });
            }
            res.json({ message: "Profile created successfully", insertedId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});



router.get('/dashboard', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM tbl_profile) AS total_profile,
            (SELECT COUNT(*) FROM tbl_departments) AS total_departments,
            (SELECT COUNT(*) FROM tbl_curriculum) AS total_curriculum,
            (SELECT COUNT(*) FROM tbl_laboratory) AS total_laboratory
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results[0]); // Send totals as JSON
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.json({ success: false, message: "Logout failed" });
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ success: true });
    });
  });
  


module.exports = router;  // Ensure this is here


