## REST API Documentation

### Create

- description: Add a new Score
- request: `POST /api/scores/`
    - body: object
      - name: (String) the name of the player
      - points: (Number) the points that the player get
- response: 200
    - content-type: `application/json`
    - body: object
      - name: (String) the name of the player
      - points: (Number) the points that the player get
- response: 500
    - body: Internal Server Error

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{name: "CSCC09", points: 10}' 
       http://localhsot:3000/api/scores/
```
### READ

- description: Retrieve the top 5 scores
- request: `GET /api/scores/`   
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - name: (String) the name of the player
      - points: (Number) the points that the player get
- response: 500
    - body: Internal Server Error
 
``` 
$ curl http://localhsot:3000/api/scores/
``` 