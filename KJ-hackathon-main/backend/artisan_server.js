import express, { response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { AImodel2 } from "./controllers/geminiAi.js"
import cors from "cors"
import bodyParser from "body-parser"
import { createOrUpdateDocument, fetchAllDocuments, updateDocument } from "./controllers/CRUD.js"
import multer from "multer"
import { admin, db } from "./controllers/firestore.js";

// CREATE or UPDATE document
const bucket = admin.storage().bucket()

const app = express()
const httpserver = createServer(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true }));

const upload = multer({ storage: multer.memoryStorage() })

const all_products = {
    "products": []
}

const all_orders = {

    "orders": []
}

async function fetch_all_orders() {
    all_orders.orders.push(...(await fetchAllDocuments("orders")))
}

async function fetch_all_products() {
    all_products.products.push(...(await fetchAllDocuments("product")))
}

await fetch_all_products()
await fetch_all_orders()

console.log("all_products", all_products)


const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.use((socket, next) => {
    const user_name = socket.handshake.auth.user_name;
    console.log(user_name)
    socket.user_name = user_name
    next()
});


io.on('connection', (socket) => {
    console.log(socket.id, socket.user_name)

    const actual_history = [{
        role: "user",
        parts: [
            {
                text: `You are a personal assistant named ArtisanHelper, designed to assist artisans in managing their products and accessing analytics on an eCommerce platform. Your responses should be plain text, free of any emojis.

If the user asks to go to or open a particular location, reply with "open LOCATION NAME," substituting "LOCATION NAME" with one of the four available locations on the website: the dashboard, inventory page, orders page, or add-product page.

If the user explicitly mentions the word "page," slice that part out, and do not include it in the response. Your command should simply be "open LOCATION NAME," without including the word "page." For example, if the user says "open dashboard page," your response should be "open dashboard."

When the user wants help with adding a product, respond with "open addproduct."

If the user wants to check product analytics, provide a summary based on the available data. If they inquire about a specific product, initially provide the name, status (e.g., in stock, low stock, out of stock), and the number of units sold. If the user expresses interest, follow up with additional details such as the product's performance trends or customer feedback.

If you are unable to perform a specific task, respond with "cannot perform this action.`
            },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_products) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_orders) },
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello, I am your personal shopping assistant. How may I assist you?" },
        ],
    },]


    const chatSession = AImodel2.startChat({

        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: actual_history
    });

    socket.on('prompt', async (response) => {
        console.log(response)

        actual_history.push({
            role: "user",
            parts: [
                { text: `${response}` }
            ]
        })

        try {
            const result = await chatSession.sendMessage(response);
            const Airesponse = result.response.text();

            if (Airesponse) {
                actual_history.push({
                    role: "model",
                    parts: [
                        { text: `${Airesponse}` }
                    ]
                })
            }
            socket.emit("response", Airesponse)

        }
        catch (err) {
            socket.emit("error", "some internal error occured")
            console.error(err)
        }

    })
})

app.use(cors())
app.use(bodyParser.json())

app.get("/profile", (req, res) => {
    res.status(200).send(profile)
})

app.get("/update-gemini-context", async (req, res) => {
    await fetch_all_products()
    await fetch_all_orders()
    res.status(200).send("context updated successfully")
})

app.get("/get-orders", async (req, res) => {
    const data = await fetchAllDocuments('orders')
    res.status(200).send(data)
})

app.post("/create-product", upload.any(), async (req, res) => {
    console.log("Request Body:", req.body);
    const { name, desc, stock, category, price, threshold, seller_name, status } = req.body;
    const pid = `pid${Date.now()}`;
    let images = [];
    let rating = 4.5;
    let questions = [];
    let sales = 10

    console.log("Files:", req.files);  // Log uploaded files
    console.log("Number of files:", req.files.length);  // Log number of files

    try {
        if (req.files && req.files.length > 0) {
            let count = 1; // Initialize file count for naming
            for (let file of req.files) {
                const blob = bucket.file(`products/${pid}/${count}`);

                // Upload the file to Google Cloud Storage
                await new Promise((resolve, reject) => {
                    const blobStream = blob.createWriteStream({
                        metadata: {
                            contentType: file.mimetype,  // Set content type
                        },
                    });

                    blobStream.on("error", (err) => {
                        console.error("Upload error:", err);
                        reject(new Error("File upload error occurred."));
                    });

                    blobStream.on("finish", async () => {
                        await blob.makePublic();  // Make file public
                        const img_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                        images.push(img_url);  // Add image URL to array
                        console.log(`Image uploaded: ${img_url}`);
                        count++;
                        resolve();  // Resolve promise when finished
                    });

                    blobStream.end(file.buffer);  // End the stream and upload the file
                });
            }
        }

        if (images.length > 0) {
            // Create product data object
            const product_data = {
                pid,
                name,
                desc,
                stock,
                category,
                price,
                threshold,
                images,  // Array of image URLs
                rating,
                questions,
                seller_name,
                status,
                sales
            };

            // Save product data to Firestore (or any other DB)
            await createOrUpdateDocument("product", pid, product_data);

            console.log("Product created successfully:", product_data);
            await fetch_all_products()
            return res.status(200).send("Product created successfully");
        }

        return res.status(400).send("No images were uploaded");
    } catch (error) {
        console.error("Error uploading product:", error);
        return res.status(500).send("Internal server error");
    }
});

app.get("/all_products", async (req, res) => {
    res.status(200).send(await fetchAllDocuments('product'))
})

httpserver.listen(8000, () => {
    console.log("server is running on port 8000")
})

export { io }
