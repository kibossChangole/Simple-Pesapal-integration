import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/pesapal", async (req, res) => {
  const { amount, phone, transactionType, email, firstName, lastName } = req.body;

  if (!amount || !phone || !transactionType || !email || !firstName || !lastName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

 

  try {
    // connect to Pesapal API plus authenticate access token with credentials
     const authResponse = await fetch(
      " ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        //consumer credentials (secrets) (3 & 4)
          consumer_key: " ",
          consumer_secret: " ",
        }),
      }
    );

    const authData = await authResponse.json();
    const accessToken = authData.token;

    // Generate a unique merchant reference
    const merchantReference = `REF-${Date.now()}`;

    // Submit Order Request to Pesapal (real or sandbox) (5)
    const orderRequest = await fetch(
      " ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        //check documentation for mandatory fields but to be safe most are to be treated as such
        body: JSON.stringify({
          id: merchantReference, // Required unique reference
          amount,
          currency: "KES",
          description: "Test transaction",
          callback_url: "http://localhost:8081/callback",
          redirect_mode: "",
          notification_id: " ", //use code generated from IPN (6)
          branch: "Store Name - HQ",
          billing_address: {
            email_address: email,
            phone_number: phone,
            country_code: "KE",
            first_name: firstName,
            middle_name: "",
            last_name: lastName,
            line_1: "Pesapal Limited",
            line_2: "",
            city: "",
            state: "",
            postal_code: "",
            zip_code: ""
          }
        }),
      }
    );

    const data = await orderRequest.json();
    res.status(200).json({ message: "Transaction initiated", data });
  } catch (error) {
    res.status(500).json({ message: "Pesapal API error", error: error.message });
  }
});

//include the below code in your pesapal/ipn.php file

app.post("/pesapal/ipn", async (req, res) => {
  console.log("IPN received:", req.body);

  // Process payment update from Pesapal
  res.status(200).send("IPN received successfully");
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
