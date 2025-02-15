# Pesapal Payment Integration

## 🚀 Startup

### Run the Expo Project
```sh
npx expo start
```

### Start the Node.js Server
```sh
node server.js
```

### Expose the Server with Ngrok
```sh
ngrok http 3001
```
This will generate a public URL, e.g.,
```
https://randomsubdomain.ngrok-free.app
```

## 🌍 Local or Live Setup
- For live setups, use your actual domain where applicable.
- For testing, run:
  ```sh
  ngrok http 3001
  ```
  This will provide a temporary domain that can be used as the **IPN URL**.

## 🔗 Setting Up IPN (Instant Payment Notification) URLs
Use these hard-to-find links to set up IPN URLs (transaction receipts):
```
https://randomsubdomain.ngrok-free.app/pesapal/ipn
```
On the **Pesapal Merchant Dashboard**, set the **IPN URL** to:
```
https://randomsubdomain.ngrok-free.app/pesapal/ipn
```

✅ **Ensure that for order requests, the HTTP method is switched to POST.**

## ⚡ Implementing the IPN Endpoint
Add this code to the `pesapal/ipn.php` file (or equivalent) to retrieve transaction notifications:

```javascript
app.post("/pesapal/ipn", async (req, res) => {
  console.log("IPN received:", req.body);

  // Process payment update from Pesapal
  res.status(200).send("IPN received successfully");
});
```

## 🔑 Pesapal Consumer Keys & Secrets
Replace these in `server.js` with your actual **sandbox** or **live** keys:

### Sandbox Keys
#### Kenyan Merchant
```json
{
  "consumer_key": "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",
  "consumer_secret": "osGQ364R49cXKeOYSpaOnT++rHs="
}
```
#### Ugandan Merchant
```json
{
  "consumer_key": "TDpigBOOhs+zAl8cwH2Fl82jJGyD8xev",
  "consumer_secret": "1KpqkfsMaihIcOlhnBo/gBZ5smw="
}
```
#### Tanzanian Merchant
```json
{
  "consumer_key": "ngW+UEcnDhltUc5fxPfrCD987xMh3Lx8",
  "consumer_secret": "q27RChYs5UkypdcNYKzuUw460Dg="
}
```
#### Malawian Merchant
```json
{
  "consumer_key": "htMsEFfIVHfhqBL9O0ykz8wuedfFyg1s",
  "consumer_secret": "DcwkVNIiyijNWn1fdL/pa4K6khc="
}
```
#### Rwandan Merchant
```json
{
  "consumer_key": "wCGzX1fNzvtI5lMR5M4AxvxBmLpFgZzp",
  "consumer_secret": "uU7R9g2IHn9dkrKDVIfcPppktIo="
}
```
#### Zambian Merchant
```json
{
  "consumer_key": "v988cq7bMB6AjktYo/drFpe6k2r/y7z3",
  "consumer_secret": "3p0F/KcY8WAi36LntpPf/Ss0MhQ="
}
```
#### Zimbabwean Merchant
```json
{
  "consumer_key": "vknEWEEFeygxAX+C9TPOhvkbkPsj8qXK",
  "consumer_secret": "MOOP31smKijvusQbNXn/s7m8jC8="
}
```

## 🔔 Notification ID
After setting up the IPN, you will receive a **notification_id** like:
```
c3bb813ba750-0983-4fa0-91bc-e32182ca
```
Use this ID in your request payload.

## 🛒 Order Request Payload
When making a transaction request, structure your payload like this:

```json
{
  "id": "merchantReference", // Required unique reference
  "amount": 100,
  "currency": "KES",
  "description": "Test transaction",
  "callback_url": "http://localhost:8081/callback",
  "redirect_mode": "",
  "notification_id": "11167d6c-bf32-4130-85bc-dc28b8a0a07d",
  "branch": "Store Name - HQ",
  "billing_address": {
    "email_address": "user@example.com",
    "phone_number": "0712345678",
    "country_code": "KE",
    "first_name": "John",
    "middle_name": "",
    "last_name": "Doe",
    "line_1": "Pesapal Limited",
    "line_2": "",
    "city": "",
    "state": "",
    "postal_code": "",
    "zip_code": ""
  }
}
```

## 🌐 API Endpoints
### Order Request API
#### Sandbox/Demo
```
https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest
```
#### Production/Live
```
https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest
```

## 📌 Notes
- Ensure that the IPN URL is set up correctly.
- Switch to **POST** for order requests.
- For real applications, use actual domains instead of `ngrok`.
- Update `server.js` with the appropriate **consumer_key** and **consumer_secret**.

---

🎉 **You're now set up to accept payments with Pesapal!**

