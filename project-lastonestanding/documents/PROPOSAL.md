## Proposal

**Title:** LastOneStanding

**Members:**
* Nathan Chau
* Thasitathan Sivakumaran

**Description of Web Application:**
* Initial page where user types in username and enters game
* In game, ememies fly towards user at different angles and user have to destroy the enemies by tapping on the screen to shoot missiles at them.
* Games ends when user gets hit by an enemy
* A Score is given based on the number of enemies destroyed
* When user finishes a game, the screen automatically redirects to a scoreboard page displaying top 5 scores and has a “Play Again” button

**Features of Beta Version**
* Enemies flying towards user
* User clicks screen to destroy enemies
* Game ends when user is hit by an enemy
* Score stored in database with username
* Showing the endgame screen with Top scores and “Play Again” button


**Additional Features of Final Version**
* When user clicks on screen a missile will be shot that will move towards the enemy and destroy it
* Enemies coming from all directions
* Set Ammo with reload time

**Technologies:**
* Frontend
    * React
    * A-Frame - building virtual reality experience using HTML
* Backend 	
    * Redux - middleware connecting backend api with frontend
    * Express.js - creating the api
    * Mongodb - database to store informations

**Top 5 technical challenges:**
* Setting up and using React framework
* Working with A-Frame to create WebVR experience
* Creating objects with Three.js 
* Creating backend api and storing data with Express.js and MongoDB
* Deploying project and testing on mobile VR mode