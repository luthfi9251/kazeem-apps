import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        // Replace with proper file handling using `multer` or `fs`
        const file = req.body.foto; // Assuming the file field is named "file"
        console.log(file);
        // Save the file (replace with your desired location and logic)
        await fs.promises.writeFile("/path/to/uploads/" + file.name, file.data);

        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" });
    }
}
