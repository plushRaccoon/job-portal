# job-portal
A web app for applying to jobs
<br>
<br>

## To launch the application

1. Clone the repository.
2. Create a new database on MySQL.
3. Create a **.env** file in the root folder and provide all the necessary credentials as in *.env.example.*
4. Ensure you have Docker installed and running.
5. From the root folder of the app, run `npm run start` in the console.
6. After the Docker container is built and deployed, you can access:
    - FE on http://localhost:8080
    - BE on http://localhost:5000
    - database on http://localhost:3307

---

### You may also launch the app locally without Docker:

3. Complete steps 1 and 2 from the previous instructions.
4. Create __.env__ file in the *job-portal-server* folder
5. Run 
  ```
    npm install
    npm run start
```
5. In the new terminal go to the *job-portal-client* folder
5. In the src -> api -> axios-instance.ts update BACKEND_URL with the actual server's port
5. Run 
  ```
    npm install
    npm run dev
```
8. Access:
    - FE on http://localhost:8080,
    - BE http://localhost:{PORT PROVIDED}
<br>
<br>

## Technology stack and tools
*BE:* NestJs, TypeOrm, MySql, Jest, class-validator

*FE:* React, Material UI, Vite build tool, Vitest, axios
<br>
<br>

## Implementation details
#### Database:
According to the requirements the following database schema was chosen:
  - Position (one-to-many) Application
  - Candidate (one-to-many) Application
