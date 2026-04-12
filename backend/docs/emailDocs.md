# Email Verification (OTP) - Flow & Local Setup

## 🔄 Flow of Logic

1. **Signup API**
   - Create user with `isVerified = false`
   - Generate 6-digit OTP
   - Hash OTP using bcrypt
   - Store OTP in DB (with expiry + attempts)
   - Push job to BullMQ queue (`emailQueue`)

2. **Queue (BullMQ + Redis)**
   - Job is stored in Redis
   - Contains: `{ email, otp }`

3. **Worker**
   - Listens to `emailQueue`
   - Picks job from Redis
   - Sends email ()

---

## ▶️ Steps to Run Locally

### 1. Start Redis (Docker)

```bash
docker run -d --name redis-bullmq -p 6379:6379 redis
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Start Backend Server

```bash
npm run dev
# or
node src/server.js
```

---

### 4. Start Worker (IMPORTANT)

```bash
node src/workers/emailWorker.js
```

---

### 5. Test Flow

- Call **Signup API**
- Check worker terminal → OTP will be printed
- Use that OTP in **Verify API**

---

## ⚠️ Notes

- Worker must be running, otherwise jobs won’t be processed
- Redis must be running on `localhost:6379`
- Email sending is mocked ()
- OTP expires in 10 minutes
