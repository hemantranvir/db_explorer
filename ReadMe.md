# DB Explorer
- Project to connect to a database and inspect various metrics related to the table
- It uses ReactJs in the frontend and Python FastAPI as the backend

## How to run
- Run the following script:
```
$ ./deploy.sh
```

- Then visit http://localhost:3000 on your browser
- Please Note: The setup is tested with postgres database with connection scheme as "postgresql"
- The deployment includes a dummy postgres database for testing
- Input the following credentials in the "Connect to Database" screen to connect to the test postgres database
```
Connection Scheme: postgresql
Username: myuser
Password: mypassword
Database URL: host.docker.internal:5432/mydatabase
```


## Improvements
Listing down few improvements for the project:

### Frontend:
- Adding seach bar to search tables and columns
- Redux state management for React frontend
- Separating out api calls in separate module 
- Adding more connection options (connection schemes, database schema etc.) in connection form
- Adding session and db credentials persistence
- Adding Authentication
- Adding tests
- Adding sorting/pagination to tables where applicable
- UI Improvements: Breadcrumbs, Responsiveness

### Backend:
- Adding api to search tables and columns
- Session persistence, Authentication 
- Redis to cache query results
- Adding typing to API and functions
- Adding tests

### Infrastructure
- CI/CD pipeline
- Deployment in GCP/AWS